export async function onRequest(context) {
	var token = context.request.headers.get('Token')
	var result = {success: false, results: [], msg: "Invalid Input"}

	if (!token) {return Response.json(result)}
	var body = await context.request.json()



	function getID() {
		// 生成 id 时间戳
		const {year, month, day, hour, minute, second} = 
			new Intl.DateTimeFormat('en-US', {
				timeZone: 'Asia/Shanghai',
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: false
			})
			.formatToParts(new Date())
			.reduce((acc, part) => {
				if (part.type !== 'literal')
					acc[part.type] = part.value
					return acc
			}, {})

		return `${year}${month}${day}${hour}${minute}${second}`
	}

	function removeAndReindex(obj, keyToRemove) {
		// 删除并重排 json 键
		const keys = Object.keys(obj).map(Number).sort((a, b) => a - b)
		const filteredKeys = keys.filter(key => key !== keyToRemove)
		const result = {}
		filteredKeys.forEach((key, index) => {
			result[index] = obj[key]
		})
		return result
	}



	// 删除
	if (token === "0" && body.id.length == 14 && typeof body.at == "number") {
		var id = getID()

		if (body.at == -1) {
			// 删除留言
			if ((parseInt(body.id) + 7000000) < parseInt(id)) {
				result.msg = "no access"
				return Response.json(result)
			}

			await context.env.Xanadu
				.prepare('DELETE FROM pool WHERE op = 0 AND id = ?')
				.bind(body.id)
				.run()
			await context.env.Xanadu
				.prepare('UPDATE root SET data=data-1 WHERE name="comment"')
				.run()

			result.success = true
			result.msg = {delete: id}

		} else {
			// 删除回复
			var reply = await context.env.Xanadu
				.prepare('SELECT reply FROM pool WHERE id=?')
				.bind(body.id)
				.first()

			if (!reply) {return Response.json(result)}
			var reply = JSON.parse(reply.reply)

			if ((reply[body.at - 1].id + 7000000) < parseInt(id) || reply[body.at - 1].op == '1') {
				result.msg = "no access"
				return Response.json(result)
			}

			// 删除回复
			var reply = removeAndReindex(reply, body.at - 1)

			await context.env.Xanadu
				.prepare('UPDATE pool SET reply=? WHERE id=?')
				.bind(JSON.stringify(reply), body.id)
				.run()

			result.success = true
			result.msg = {delete_reply: body.id + '-' + body.at}
		}
	}

	// 发表
	if (token === "1" && body.name.length <= 20) {
		var id = getID()

		if (body.id == null) {
			// 留言
			if (body.content.length > 200) {return Response.json(result)}

			await context.env.Xanadu
				.prepare('INSERT INTO pool (id, op, name, content, reply) VALUES (?, ?, ?, ?, ?)')
				.bind(id, '0', body.name.replace(/\n/g, ''), body.content, '{}')
				.run()
			await context.env.Xanadu
				.prepare('UPDATE root SET data=data+1 WHERE name="comment"')
				.run()

			result.success = true
			result.msg = {add: id}

		} else {
			// 回复
			if (body.content.length > 100 || body.id.length != 14 || typeof body.at == "number") {return Response.json(result)}

			var reply = await context.env.Xanadu
				.prepare('SELECT reply FROM pool WHERE id=?')
				.bind(body.id)
				.first()

			if (!reply) {return Response.json(result)}
			var reply = JSON.parse(reply.reply)

			if (Object.keys(reply).length > 5) {
				result.msg = "out of the maximum"
				return Response.json(result)
			}

			// 添加回复
			reply[Math.max(...Object.keys(reply).map(Number), -1) + 1] = {"id": id, "op": "0", "name": body.name, "content": body.content}

			await context.env.Xanadu
				.prepare('UPDATE pool SET reply=? WHERE id=?')
				.bind(JSON.stringify(reply), body.id)
				.run()

			result.success = true
			result.msg = {add_reply: id} 

		}
	}

	// 读取留言数据
	if (token === "2") {
		result = await context.env.Xanadu
			.prepare('SELECT * FROM pool ORDER BY id DESC LIMIT ?, 5')
			.bind(body.page)
			.all()

		result.success = true
		result.msg = {page: body.page}
	}

	// 获取留言总数
	if (token === "3") {
		result = await context.env.Xanadu
			.prepare('SELECT * FROM root WHERE name="comment"')
			.all()

		result.success = true
		result.msg = null
	}

	delete result.meta
	return Response.json(result)
}



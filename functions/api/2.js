export async function onRequest(context) {
	var m = context.request.headers.get('Token')
	var r = {success: false, meta: {}, results: [], msg: "Invalid Input"}

	if (!m) {return Response.json(r)}
	var body = await context.request.json()

	// 删除留言
	if (m == "0") {
		if (body.id.length != 19 || typeof body.at != 'number') {return Response.json(r)}

		var now = new Date()
		var options = {timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }
		var formatter = new Intl.DateTimeFormat('en-US', options)
		var parts = formatter.formatToParts(now).reduce((acc, part) => ({ ...acc, [part.type]: part.value }), {})
		var id = `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`.replace(/:/g, '').replace(/-/g, '').replace(/ /g, '')

		if ((parseInt(body.id.replace(/:/g, '').replace(/-/g, '').replace(/ /g, '')) + 7000000) < parseInt(id)) {
			r.msg = "out of the deadline"
			return Response.json(r)
		}

		if (body.at == -1) {
			// 留言
			await context.env.MetaDB.prepare('DELETE FROM pool WHERE op = 0 and id = ?').bind(body.id).first()
			await context.env.MetaDB.prepare('UPDATE root set data=data-1 where name="comment"').first()

			r.success = true
			r.msg = {delete: id}
		} else {
			// 回复
			r = body.id
		}
	}

	// 添加留言
	if (m == "1") {
		// 生成一个 id
		var now = new Date()
		var options = {timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }
		var formatter = new Intl.DateTimeFormat('en-US', options)
		var parts = formatter.formatToParts(now).reduce((acc, part) => ({ ...acc, [part.type]: part.value }), {})
		var id = `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`

		if (body.isreply == false) {
			// 留言
			if (body.content.length > 200 || body.name.length > 20 || (body.name + body.content).includes('​') || (body.name + body.content).includes('‍')) {return Response.json(r)}

			await context.env.MetaDB.prepare('INSERT INTO pool (id, op, name, content, reply) VALUES (?, ?, ?, ?, ?)').bind(id, '0', body.name.replace(/\n/g, ''), body.content, 'null').first()
			await context.env.MetaDB.prepare('UPDATE root set data=data+1 where name="comment"').first()

			r.success = true
			r.msg = {add: id}
		} else {
			// 回复
			if (body.content.length > 100 || body.name.length > 20 || (body.name + body.content).includes('​') || (body.name + body.content).includes('‍')) {return Response.json(r)}

			r = await context.env.MetaDB.prepare('SELECT reply from pool where id=?').bind(body.id).first()
			r = r.reply
			var l = r.split('​')
			l.pop()
			if (l.length > 10) {
				r = {success: false, meta: {}, results: [], msg: "out of the maximum"}
				return Response.json(r)
			}

			if (r == "null") {
				r = await context.env.MetaDB.prepare('UPDATE pool set reply=? where id=?').bind(JSON.stringify({id: id, op: '0', name: body.name, content: body.content}) + '​', body.id).all()
			} else {
				r = await context.env.MetaDB.prepare('UPDATE pool set reply=? where id=?').bind(r + JSON.stringify({id: id, op: '0', name: body.name, content: body.content}) + '​', body.id).all()
			}
			r.success = true
			r.msg = {add_reply: id}
		}
	}

	// 读取留言数据
	if (m == "2") {
		r = await context.env.MetaDB.prepare('SELECT * FROM pool ORDER BY id DESC LIMIT ?, 5').bind(body.page).all()
		r.msg = {page: body.page}
	}

	// 获取留言总数
	if (m == "3") {
		r = await context.env.MetaDB.prepare('SELECT * from root where name="comment"').all()
		r.msg = null
	}



	return Response.json(r)
}



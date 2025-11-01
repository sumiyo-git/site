export async function onRequest(context) {
	var m = context.request.headers.get('Token')
	var r = {success: false, meta: {}, results: [], msg: "Invalid Input"}

	if (!m) {return Response.json(r)}
	var body = await context.request.json()

	// 删除留言
	if (m == "0") {
		if (body.id.length != 19 || typeof body.at != 'number') {return Response.json(r)}

		// 生成 id 时间戳
		var f = new Intl.DateTimeFormat('en-US', {timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false})
		var t = f.formatToParts(new Date()).reduce((acc, part) => ({ ...acc, [part.type]: part.value }), {})
		var id = `${t.year}-${t.month}-${t.day} ${t.hour}:${t.minute}:${t.second}`.replace(/:/g, '').replace(/-/g, '').replace(/ /g, '')

		if (body.at == -1) {
			// 留言
			if ((parseInt(body.id.replace(/:/g, '').replace(/-/g, '').replace(/ /g, '')) + 7000000) < parseInt(id)) {
				r = {success: false, meta: {}, results: [], msg: "out of the deadline"}
				return Response.json(r)
			}

			await context.env.MetaDB.prepare('DELETE FROM pool WHERE op = 0 and id = ?').bind(body.id).first()
			await context.env.MetaDB.prepare('UPDATE root set data=data-1 where name="comment"').first()

			r.success = true
			r.msg = {delete: id}
		} else {
			// 回复
			r = await context.env.MetaDB.prepare('SELECT reply from pool where id=?').bind(body.id).first()
			r = r.reply
			var l = r.split('​')
			l.pop()

			if ((parseInt(JSON.parse(l[body.at - 1]).id.replace(/:/g, '').replace(/-/g, '').replace(/ /g, '')) + 7000000) < parseInt(id)) {
				r = {success: false, meta: {}, results: [], msg: "out of the deadline"}
				return Response.json(r)
			}

			if (JSON.parse(l[body.at - 1]).op == '1') {
				r = {success: false, meta: {}, results: [], msg: "no access"}
				return Response.json(r)
			}

			l.splice(body.at - 1, 1)
			if (l[0] == undefined) {
				var n = 'null'
			} else {
				var n = l.join('​') + '​'
			}

			r = await context.env.MetaDB.prepare('UPDATE pool set reply=? where id=?').bind(n, body.id).all()
			r.success = true
			r.msg = {delete_reply: body.id + '-' + body.at}
		}
	}

	// 添加留言
	if (m == "1") {
		// 生成 id 时间戳
		var f = new Intl.DateTimeFormat('en-US', {timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false})
		var t = f.formatToParts(new Date()).reduce((acc, part) => ({ ...acc, [part.type]: part.value }), {})
		var id = `${t.year}-${t.month}-${t.day} ${t.hour}:${t.minute}:${t.second}`

		if (body.id == null) {
			// 留言
			if (body.content.length > 200 || body.name.length > 20 || (body.name + body.content).includes('​')) {return Response.json(r)}

			await context.env.MetaDB.prepare('INSERT INTO pool (id, op, name, content, reply) VALUES (?, ?, ?, ?, ?)').bind(id, '0', body.name.replace(/\n/g, ''), body.content, 'null').first()
			await context.env.MetaDB.prepare('UPDATE root set data=data+1 where name="comment"').first()

			r.success = true
			r.msg = {add: id}
		} else {
			// 回复
			if (body.content.length > 100 || body.name.length > 20 || (body.name + body.content).includes('​')) {return Response.json(r)}

			r = await context.env.MetaDB.prepare('SELECT reply from pool where id=?').bind(body.id).first()
			r = r.reply
			var l = r.split('​')
			l.pop()
			if (l.length > 5) {
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



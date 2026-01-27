export async function onRequest(context) {
	var token = context.request.headers.get('Token')
	var result = {success: false, results: []}

	// 读取访客数
	if (token === "0") {
		result = await context.env.Xanadu
			.prepare('SELECT * FROM root WHERE name="visits"')
			.all()
	}

	// 读取并增加访客数
	if (token === "1") {
		await context.env.Xanadu
			.prepare('UPDATE root SET data=data+1 WHERE name="visits"')
			.run()

		result = await context.env.Xanadu
			.prepare('SELECT * FROM root WHERE name="visits"')
			.all()
	}

	delete result.meta
	return Response.json(result)
}
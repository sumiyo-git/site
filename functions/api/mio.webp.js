export async function onRequest(context) {
	var img = ""
	var now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Shanghai" }))
	var date = (now.getMonth() + 1) * 100 + now.getDate()

	if (1220 <= date) {
		img = "_christmas"
	}

	if (201 === date) {
		img = "_birthday"
	}



	// 直接返回静态资源
	var url = new URL(`/src/img/mio${img}.webp`, context.request.url)
	var response = await context.env.ASSETS.fetch(url)
	var response = new Response(response.body, response)

	// 指定 MIME 类型
	response.headers.set(
		"Content-Type",
		"image/webp"
	)

	return response

}
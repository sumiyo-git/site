export async function onRequest(context) {
	var f = new Intl.DateTimeFormat('en-US', {timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false})
	var t = f.formatToParts(new Date()).reduce((acc, part) => ({ ...acc, [part.type]: part.value }), {})
	var k = (t.year * t.month + t.day).slice(-6)

    var html = `<!DOCTYPE html>
<head>
	<title>Token</title>
	<style>
		div {
			position: absolute;
			width: 300px;
			height: 60px;
			top: calc(50% - 30px);
			left: calc(50% - 150px);
			font-size: 45px;
			font-weight: bolder;
			text-align: center;
			opacity: 0.5;
			user-select: none;
			cursor: pointer;
			transition: 0.5s;
		}
		div:active {
			opacity: 0.7;
			transform: translateY(-20px);
		}
	</style>
</head>
<body>
	<div onclick="navigator.clipboard.writeText(this.innerHTML)" >${k}</div>
</body>`

    return new Response(html, {
		headers: {
			"content-type": "text/html; charset=UTF-8",
		},
    })
}
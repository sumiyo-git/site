export async function onRequest(context) {
	var f = new Intl.DateTimeFormat('en-US', {timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false})
	var t = f.formatToParts(new Date()).reduce((acc, part) => ({ ...acc, [part.type]: part.value }), {})
	var k = (t.year * t.month + t.day).slice(-6)

    var html = `<!DOCTYPE html>
<html>
	<head>
		<title>Token</title>
		<style>
			div {
				position: absolute;
				width: 300px;
				height: 60px;
				top: calc(50% - 30px);
				left: calc(50% - 150px);
				font-size: 80px;
				font-weight: bolder;
				text-align: center;
				opacity: 0.5;
				user-select: none;
				cursor: pointer;
				transition: 0.5s;
			}
			.animate {
				animation: jump 0.5s cubic-bezier(0.58, 0.11, 0.63, 1.62);
				animation-fill-mode: forwards;
			}
			@keyframes jump {
				0%, 100% { transform: translateY(0)}
				50% { transform: translateY(-20px)}
			}
		</style>
	</head>
	<body>
		<div onclick="this.classList.add('animate'); setTimeout(() => this.classList.remove('animate'), 500); navigator.clipboard.writeText(this.innerHTML);" >${k}</div>
	</body>
</html>`

    return new Response(html, {
		headers: {
			"content-type": "text/html; charset=UTF-8",
		},
    })
}
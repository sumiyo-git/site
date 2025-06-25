export async function onRequest(context) {
	var f = new Intl.DateTimeFormat('en-US', {timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false})
	var t = f.formatToParts(new Date()).reduce((acc, part) => ({ ...acc, [part.type]: part.value }), {})
	return Response.json(['NI', 'GE', 'KA', 'SU', 'MO', 'KI', 'DO'][new Date().getDay()] + (t.year * t.month + t.day).slice(-6))
}
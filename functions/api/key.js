export async function onRequest(context) {
	var n = new Date()
	var c = Math.min(Math.max((n.getFullYear() * n.getHours()).toString().substring(0, 1), 1), 5)
	var a = (((n.getMonth() + 1) + '0' + n.getDate()) * (n.getDay() + n.getHours() + n.getFullYear()) * 12345).toString().slice(-5)
	var b = ['NI', 'GE', 'KA', 'SU', 'MO', 'KI', 'DO'][n.getDay()] + (a.slice(0, c) + ['A', 'B', 'X', 'P', 'E', 'F', 'G', 'H', 'M'][Number((n.getFullYear() * n.getDate() * n.getHours()).toString().substring(0, 1)) - 1] + a.slice(c))
	return Response.json(b)
}
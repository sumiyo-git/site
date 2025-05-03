


/*	script.js
 *	created by sumiyo, 2025/1/10

	*/



const env = {
	'd': {
		'db': null,
		'p': 1,
		'cn': null,
		'pn': 1,
		'domain': 'sumiyo.link',
		'isNetwork': (document.domain ? true :false),
		'version': '1.0.100',
	},
	'f': {},
	'e': {
		'btn': [...document.querySelectorAll('footer a'), document.querySelector('.post a')],
	},
	'tmp': {
		't1': null
	},
}



env.f.time = function() {
	// 获取标准时间
	var now = new Date()
	var options = {timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }
	var formatter = new Intl.DateTimeFormat('en-US', options)
	var parts = formatter.formatToParts(now).reduce((acc, part) => ({ ...acc, [part.type]: part.value }), {})

	return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`.replace(/:/g, '').replace(/-/g, '').replace(/ /g, '')
}

env.f.wait = function() {
	// 防止触发速率限制
	clearInterval(env.tmp.t1)
	for (var i = 0; i < env.e.btn.length; i++) {env.e.btn[i].classList.add('wait')}

	env.tmp.t1 = setInterval(() => {
		for (var i = 0; i < env.e.btn.length; i++) {env.e.btn[i].classList.remove('wait')}
		clearInterval(env.tmp.t1)
	}, 5000)
}

env.f.err = function(str) {
	// 抛出请求错误
	document.querySelector('.list').innerHTML = '<span>' + str + '</span><br /><br class="f-1" />'
}

env.f.init = function() {
	// 初始化
	env.f.wait()
	if (env.d.isNetwork) {
		fetch(`https://${env.d.domain}/api/comments`, {
			method: "POST",
			headers: {
				"Token": 3,
			},
			body: JSON.stringify({})
		})
		.then(response => {
			if (response.ok) {
				return response.json()
			}
		})
		.then(json => {
			env.d.cn = Number(json.results[0].data)
			env.d.pn = Math.ceil(env.d.cn / 5)
			document.getElementById('_2').innerHTML = env.d.cn

			env.f.get(1)
		})
		.catch(err => {env.f.err(err)})
	}
}

env.f.get = function(n) {
	// 获取留言数据
	env.d.p = n
	document.getElementById('_1').innerHTML = n

	fetch(`https://${env.d.domain}/api/comments`, {
		method: "POST",
		headers: {
			"Token": 2,
		},
		body: JSON.stringify({
			"page": (n - 1) * 5,
		})
	})
	.then(response => {
		if (response.ok) {
			return response.json()
		}
	})
	.then(json => {
		env.d.db = json
		env.f.load()
	})
	.catch(err => {env.f.err(err)})
}

env.f.load = function() {
	// 加载留言
	var d = env.d.db.results
	var e = document.querySelector('.list')

	e.innerHTML = ''
	env.e.btn[0].setAttribute('class', (env.d.pn == 1) ? 'disabled' : '')
	env.e.btn[1].setAttribute('class', (env.d.p == env.d.pn) ? 'disabled' : '')

	for (var i = 0; i < d.length; i++) {
		var span = document.createElement('comment')
			e.appendChild(span)

		var name = document.createElement('name')
			name.innerText = d[i].name.replace(/\n/g, '') + ':  '
			span.appendChild(name)

		var cont = document.createElement('span')
			cont.innerHTML = d[i].content.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, " <br/>").replace(/(http[s]?:\/\/[^\s]+)/g, '<a target="_blank" class="link" href="$1">$1</a>')
			span.appendChild(cont)

		if (cont.offsetHeight>150) {
			cont.setAttribute('style', 'height: 150px')
			var unfold = document.createElement('a')
				unfold.innerHTML = '[展开]'
				unfold.setAttribute('class', 'unfold')
				unfold.setAttribute('onclick', "this.parentNode.querySelector('span').removeAttribute('style'); this.remove()")
				span.appendChild(unfold)
		}

		var info = document.createElement('info')
			info.innerText = '[' + d[i].id.substring(0, 16) + ']'
			span.appendChild(info)

		if (d[i].op == '0') {
			if (parseInt(d[i].id.replace(/:/g, '').replace(/-/g, '').replace(/ /g, '')) + 7000000 > parseInt(env.f.time())) {
				var a = document.createElement('a')
					a.innerHTML = '[删除]'
					a.setAttribute('class', 'zoltraak')
					a.setAttribute('onclick', 'env.f.zoltraak("' + env.d.db['results'][i]['id'] + '")')
					info.appendChild(a)
			}
		}

		if (d[i].op == '1') {
			name.setAttribute('class', 'op')
		}
	}
}

env.f.submit = function() {
	// 提交留言
	var e1 = document.querySelectorAll('textarea')[0]
	var e2 = document.querySelectorAll('textarea')[1]
	var n = e1.value.replace(/\n/g, '')
	var c = e2.value
	var ban = []

	//  排除违禁词
	if (ban.some(item => n.includes(item))) {return}
	if (n.length == 0 || n.length > 20 || c.length == 0 || c.length > 200) {return}
	if (/^[ \t]+$/.test(n)) {return}

	env.f.wait()
	fetch(`https://${env.d.domain}/api/comments`, {
		method: "POST",
		headers: {
			"Token": 1
		},
		body: JSON.stringify({
			"name": n,
			"content": c,
		})
	})
	.then(response => {
		if (response.ok) {
			e2.value = ''
			e2.removeAttribute('style')

			env.d.cn ++
			env.d.pn = Math.ceil(env.d.cn / 5)
			document.getElementById('_2').innerHTML = env.d.cn

			env.f.get(1)
		}
	})
	.catch(err => {env.f.err(err)})
}

env.f.zoltraak = function(id) {
	// 删除留言
	env.f.wait()
	fetch(`https://${env.d.domain}/api/comments`, {
		method: "POST",
		headers: {
			"Token": 0,
		},
		body: JSON.stringify({
			"id": id,
		})
	})
	.then(response => {
		if (response.ok) {
			return response.json()
		}
	})
	.then(json => {
		env.d.cn --
		env.d.pn = Math.ceil(env.d.cn / 5)
		document.getElementById('_2').innerHTML = env.d.cn

		env.f.get(1)
	})
	.catch(err => {env.f.err(err)})
}

env.f.page = function(n) {
	// 翻页
	if (((env.d.p + n) > 0) && ((env.d.p + n) <= env.d.pn)) {
		env.f.wait()
		env.e.btn[0].setAttribute('class', (env.d.p + n == 1) ? 'disabled' : '')
		env.e.btn[1].setAttribute('class', (env.d.p + n == env.d.pn) ? 'disabled' : '')

		env.f.get(env.d.p + n)
	}
}






env.f.init()



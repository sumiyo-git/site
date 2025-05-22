


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
		'content': document.querySelectorAll('textarea')[0],
		'name': document.querySelectorAll('textarea')[1],
		'challenge': document.querySelectorAll('textarea')[2],
		'can': document.querySelector('canvas'),
		'user': document.querySelectorAll('.user')[0],
		'footer': document.querySelector('footer'),
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
	var e = [...document.querySelectorAll('footer a'), document.querySelector('.post a')]

	for (var i = 0; i < e.length; i++) {e[i].classList.add('wait')}

	env.tmp.t1 = setInterval(() => {
		for (var i = 0; i < e.length; i++) {e[i].classList.remove('wait')}
		clearInterval(env.tmp.t1)
	}, 5000)
}

env.f.err = function(str) {
	// 抛出请求错误
	document.querySelector('.list').innerHTML = '<span>unable to load comment pool.</span><br /><br class="f-1" />'
	env.f.connect("env.f.root.prompt('意外的错误: <br />" + str + "', -1)")
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
			document.getElementById('_1').innerHTML = env.d.cn

			if (env.d.pn > 1) env.f.pagination(1)
			env.f.get(1)
		})
		.catch(err => {env.f.err(err)})
	}
}

env.f.get = function(n) {
	// 获取留言数据
	env.d.p = n
	env.f.pagination(n)

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

	for (var i = 0; i < d.length; i++) {
		var com = document.createElement('comment')

			com.innerHTML = `
<div class="user" data-icon="` + env.f.user(null, d[i].name.replace(/\n/g, '')) + `" ></div>
<div class="content" >
	<div class="comment-header" >` + d[i].name.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, '') + ` <span>` + d[i].id.substring(0, 16) + `</span></div>
	<div class="comment-body" >` + d[i].content.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, " <br/>").replace(/(http[s]?:\/\/[^\s]+)/g, '<a target="_blank" class="link" href="$1">$1</a>') + `</div>
	<div class="comment-footer" ><a onclick="env.f.reply()" >回复</a> | </div>
</div>
`
			e.appendChild(com)

		var span = com.querySelector('.comment-body')
		var header = com.querySelector('.comment-header')
		var footer = com.querySelector('.comment-footer')

		if (span.offsetHeight>145) {
			span.setAttribute('style', 'height: 145px')
			var unfold = document.createElement('a')
				unfold.innerHTML = '[展开]'
				unfold.setAttribute('class', 'unfold')
				unfold.setAttribute('onclick', "this.parentNode.querySelector('.comment-body').removeAttribute('style'); this.remove()")
				span.parentNode.insertBefore(unfold, footer)
		}



		var a = document.createElement('a')
			a.innerHTML = '删除'
			a.setAttribute('title', '删除这条留言')
			a.setAttribute('onclick', 'env.f.zoltraak("' + env.d.db['results'][i]['id'] + '")')
			footer.appendChild(a)

		if (parseInt(d[i].id.replace(/:/g, '').replace(/-/g, '').replace(/ /g, '')) + 7000000 < parseInt(env.f.time())) {
			a.setAttribute('title', '嗯？ 竟然删不掉')
			a.setAttribute('style', 'cursor: not-allowed;')
			a.removeAttribute('onclick')
		}

		if (d[i].op == '1') {
			header.setAttribute('class', 'comment-header op')
		}
	}
}

env.f.submit = function() {
	// 提交留言
	var e1 = env.e.name
	var e2 = env.e.content
	var e3 = env.e.content

	var n = e1.value.replace(/\n/g, '')
	var c = e2.value
	var ban = []

	if (!env.f.challenge.try()) {
		env.f.connect("env.f.root.prompt('验证码输错了哦', 3000)")
		return
	}
	if (ban.some(item => n.includes(item))) {
		env.f.connect("env.f.root.prompt('检测到非法字符', 3000)")
		return
	}
	if (n.length == 0) {
		env.f.connect("env.f.root.prompt('昵称是必填项哦', 3000)")
		return
	}
	if (c.length == 0) {
		env.f.connect("env.f.root.prompt('至少也要写几个字吧', 3000)")
		return
	}

	if (n.length == 0 || n.length > 16 || c.length == 0 || c.length > 200) {return}
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
			env.f.challenge.new()

			env.d.cn ++
			env.d.pn = Math.ceil(env.d.cn / 5)
			document.getElementById('_1').innerHTML = env.d.cn

			env.f.get(1)
			env.f.connect("env.f.root.prompt('留言成功', 5000)")
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
		document.getElementById('_1').innerHTML = env.d.cn

		env.f.get(1)
	})
	.catch(err => {env.f.err(err)})
}

env.f.page = function(n) {
	// 翻页
	if (((env.d.p + n) > 0) && ((env.d.p + n) <= env.d.pn)) {
		env.f.wait()
		env.f.get(env.d.p + n)
	}
}

env.f.debug = function() {
	// 调试
	env.d.db = {
		"results": [
		{
			"id": "2025-01-01 00:00:00",
			"op": "0",
			"name": "user",
			"content": "这是一条普通的留言，\nhttps://www.baidu.com/"
		},
		{
			"id": "2024-01-01 00:00:00",
			"op": "1",
			"name": "sumiyo",
			"content": "测试\n1\n2\n3\n4\n5\n6\n7"
		}
		],
		"msg": {
			"page": 0
		}
	}
	env.f.load()
}

env.f.random = function(min, max) {
	// 生成随机整数
	return Math.floor(Math.random() * (max - min + 1)) + min
}

env.f.connect = function(str) {
	// 页面通讯
	window.parent.postMessage(str, document.domain ? '/' : '*')
}

env.f.challenge = {}
	env.f.challenge.new = function() {
		env.e.challenge.value = ''
		var l = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9']
		var a = ''
		var e = env.e.can
		var c = getComputedStyle(document.documentElement).getPropertyValue('--t-c1')
		var ctx = e.getContext('2d')
		ctx.font = '18px Poppins Regular'
		ctx.clearRect(0, 0, 100, 100)

		for (var i = 0; i < 4; i++) {
			var r = env.f.random(0, l.length - 1)
			var a = a + l[r]
			ctx.fillStyle = 'rgba(' + c + ', ' + env.f.random(60, 100) / 100 + ')' 
			ctx.fillText(l[r], 12 + 16 * i, 20 + env.f.random(-5, 5));
		}

		for (var i = 0; i < 20; i++) {
			ctx.beginPath()
			ctx.fillStyle = 'rgba(' + c + ', ' + env.f.random(20, 40) / 100 + ')' 
			ctx.arc(env.f.random(0, e.width), env.f.random(0, e.height), env.f.random(2, 4), 0, Math.PI * 2)
			ctx.fill()
		}

		env.f.challenge.try = function() {
			if (env.e.challenge.value == a) {
				return true
			} else {
				env.f.challenge.new()
				return false
			}
		}
	}

env.f.user = function(e, str) {
	// 计算评论头像
	var l = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
	var r = (str.charCodeAt(0) * 77 || 0).toString().slice(-3, -1) / 100

	if (e) {
		e.setAttribute('data-icon', l[Math.floor(r * (l.length - 1))])
	} else {
		return l[Math.floor(r * (l.length - 1))]
	}
}

env.f.pagination = function(n) {
	var e = env.e.footer
	e.innerHTML = ''


	var a = document.createElement('a')
		a.innerHTML = ''
		a.setAttribute('onclick', 'env.f.page(-1)')
		e.appendChild(a)
		if (n <= 1) a.setAttribute('style', 'color: rgba(var(--t-c1), 0.2); pointer-events: none;')

	var st = Math.max(0, n - 3)
	var et = Math.min(n + 6, env.d.pn - 9)

	for (var i = 1; i < 10; i++) {
		var p = Math.min(et, st) + i
		if (p > env.d.pn || 0 >= p) continue

		var a = document.createElement('a')
			a.innerHTML = p
			a.setAttribute('onclick', 'env.f.page(' + (p - n) + ')')
			e.appendChild(a)

		if (p == n) a.setAttribute('class', 'active')
	}

	var a = document.createElement('a')
		a.innerHTML = ''
		a.setAttribute('onclick', 'env.f.page(1)')
		e.appendChild(a)
		if (n >= env.d.pn) a.setAttribute('style', 'color: rgba(var(--t-c1), 0.2); pointer-events: none;')


}

env.f.reply = function() {
	env.f.connect("env.f.root.prompt('回复功能还没有完成哦', 3000)")
}



env.f.challenge.new()
env.f.init()



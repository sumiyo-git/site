


/*	root.js
 *	created by sumiyo, 2024/8/27

	*/



env.d.version.root = '1.0.244'
env.f.root = {}

// 初始化元素列表
env.e = {...env.e, ...{
	root: {
		'prompt': document.querySelector('.prompt'),
		'blog': document.querySelector('.main .blog'),
		'btn': document.querySelector('.main header btn'),
		'des': document.querySelector('.des'),
		'canvas': document.querySelectorAll('.main .avatar'),
		'backdrop': document.querySelectorAll('.main backdrop'),
		'menu': document.querySelectorAll('.menu btn'),
		'counter': document.querySelectorAll('.main footer tag'),
	}
}}

// 初始化初始化列表
env.d.init = {...env.d.init, ...{
	'menu': 0,
}}

// 通知
env.d.list.news = `欢迎来到 sumiyo 的个人网站！\n这里仍在缓慢更新中 ...`



// 注册函数

env.f.root.fade = function(e, t, style = 'display: none;') {
	// 淡入淡出动画
	var n = null
	var i = (t > 0) ? 0 : 1
	var o = parseFloat(env.f.root.getCSS(e, 'opacity'))
	var t0 = Math.abs(t)
	e.setAttribute('style', 'transition: none;')

	function anime(t1) {
		if (n == null) {n = t1}
		var p = t1 - n
		e.style.opacity = (o * (i + p / t)).toFixed(2)
		if (p < t0) {
			requestAnimationFrame(anime)
		} else {
			t > 0 ? e.removeAttribute('style') : e.setAttribute('style', style)
		}
	}
	requestAnimationFrame(anime)
}

env.f.root.scroll = function(e, y, t = 300, abs = true) {
	// 滚动动画
	var n = null
	var s = e.scrollTop
	var d = abs ? y : (s + y)

	function anime(t1) {
		if (n == null) {n = t1}
		var t2 = t1 - n
		var p = Math.min(t2 / t, 1)

		// 使用缓动函数来实现平滑效果
		e.scrollTop = s + (d - s) * (p < 0.5 ? (2 * p * p) : (-1 + (4 - 2 * p) * p))
		if (t2 < t) {
			requestAnimationFrame(anime)
		}
	}
	requestAnimationFrame(anime)
}

env.f.root.avatar = function() {
	// 头像动画
	let x, y, xa, ya, p, s, i, w, h, l, timer
	x = y = xa = ya = p = s = i = 0

	const canvas = env.e.root.canvas[1]
	const ctx = canvas.getContext('2d')
	const img = env.e.root.canvas[0]
	w = h = window.innerHeight
	canvas.height = canvas.width = w

	const waypoint = [
		[0.40, 0.00, 0.00, 0.65, 9],
		[0.00, 0.85, 0.50, 0.00, 9],
		[0.60, 0.00, 0.00, 1.00, 9],
		[0.10, 1.00, 0.70, 0.00, 12],
		[0.80, 0.00, 0.20, 1.00, 12],
		[0.30, 1.00, 0.90, 0.00, 14],
		[1.00, 0.00, 0.40, 1.00, 14],
		[0.50, 1.00, 1.00, 0.15, 14],
		[1.00, 0.30, 0.60, 1.00, 14],
		[0.70, 1.00, 1.00, 0.50, 14],
		[1.00, 0.65, 0.80, 1.00, 20],
		[0.90, 1.00, 1.00, 0.85, 20],
	]

	function paint(x, y, r) {
		// 绘制圆形图片
		ctx.save()
		ctx.beginPath()
		ctx.arc(x, y, r, 0, Math.PI * 2)
		ctx.closePath()
		ctx.clip()
		ctx.drawImage(img, 0, 0, w, h)
		ctx.restore()
	}

	function reset() {
		// 准备下一次划线
		if (i >= waypoint.length) {
			clearInterval(timer)
			env.e.root.canvas[0].removeAttribute('style')
			env.e.root.canvas[1].remove()
			env.f.root.fade(env.e.root.des, 500)
			delete env.f.root.avatar
			return
		}

		l = waypoint[i]
		p = 0
		s = Math.ceil(500 / l[4])
		x = l[0] * w
		y = l[1] * h
		xa = (l[2] - l[0]) * w / s
		ya = (l[3] - l[1]) * h / s
	}

	timer = setInterval(() => {
		paint(x + xa * p, y + ya * p, 50)
		if (s < p) {
			i ++
			reset()
		}	
		p ++
	}, 3)

	reset()
}



env.f.root.cookie = {}
	env.f.root.cookie.set = function(value) {
		// 写入 Cookie
		document.cookie = `Cookie=${value}; expires=${new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toUTCString()}`
	}

	env.f.root.cookie.get = function(name) {
		// 读取 Cookie
		var c = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
		return c ? decodeURIComponent(c[1]) : null
	}

env.f.root.getRandom = function(min, max) {
	// 生成随机整数
	return Math.floor(Math.random() * (max - min + 1)) + min
}

env.f.root.getCSS = function(e, style) {
	// 获取元素计算样式
	return window.getComputedStyle(e)?.getPropertyValue(style)
}

env.f.root.fmt = {}
	env.f.root.fmt.date = function(formatter, date = new Date()) {
		// 日期格式化
		var pad = n => n.toString().padStart(2, '0')
		return formatter
			.replace(/YYYY|yyyy/g, date.getFullYear())
			.replace(/MM/g, pad(date.getMonth() + 1))
			.replace(/mm/g, pad(date.getMinutes()))
			.replace(/HH/g, pad(date.getHours()))
			.replace(/hh/g, pad(date.getHours() % 12 || 12))
			.replace(/DD|dd/g, pad(date.getDate()))
			.replace(/SS|ss/g, pad(date.getSeconds()))
	}

	env.f.root.fmt.size = function(n = 0) {
		// 文件大小转换
		var i = parseInt(Math.floor(Math.log(n || 1) / Math.log(1024)), 10)
		return (n / Math.pow(1024, i)).toFixed(2) + ' ' + ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', '你够了'][i]
	}

env.f.root.conv = {}
	env.f.root.conv.c0 = function(n = 0) {
		// 转换 ms --> mm:ss.fff
		var t = Math.floor(n / 1000)
		return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}.${String(n % 1000).padStart(3, '0')}`.substring(0, 9)
	}

	env.f.root.conv.c1 = function(str) {
		// 转换 mm:ss.fff --> ms
		var t = str.split(/[:.]/)
		return parseInt(t[0] * 60000) + parseInt(t[1] * 1000) + parseInt(t[2])
	}

	env.f.root.conv.c2 = function(str) {
		// 转换 mm:ss.fff --> s
		var t = str.split(/[:.]/)
		return parseFloat((parseInt(t[0] * 60) + parseInt(t[1])) + '.' + t[2])
	}

env.f.root.getUptime = function() {
	// 计算网站上线时间
	return Math.floor((new Date() -  new Date('2023-02-03')) / (1000 * 60 * 60 * 24))
}

env.f.root.getText = function() {
	// 开屏页随机标语
	var l = [
		"hoer heyato sia san: erando-na, yato-na, merai-na.",
		"oer-miite semimila hola oer-eramutu dekowa.",
		"haze i milecaze, miite mirano enkade suzerala.",
	]
	env.e.root.backdrop[0]?.setAttribute('data-text', l[env.f.root.getRandom(0, l.length - 1)])
	delete env.f.root.getText
}

env.f.root.post = function(event) {
	// 页面通信
	env.e.root.blog.children[0].contentWindow.postMessage(event, env.d.isNetwork ? '/' : '*')
}

env.f.root.linkto = function(id) {
	// 博客文章重定向
	env.f.root.blog.close()
	setTimeout(function (){
		env.f.root.url.set('id', id)
		env.f.root.blog.open(env.f.root.url.get('id'))
	}, 600)
}

env.f.root.url = {}
	env.f.root.url.clear = function(name) {
		// 清除参数
		var url = new URL(window.location.href)
		name ? (url.searchParams.delete(name)) : (url.search = '')
		history.replaceState(null, '', decodeURIComponent(url))
	}

	env.f.root.url.set = function(name, value) {
		// 修改参数
		var url = new URL(window.location.href)
		url.searchParams.set(name, value)
		history.replaceState(null, '', decodeURIComponent(url))
	}

	env.f.root.url.get = function(name) {
		// 读取参数
		var d = window.location.search.substr(1).match(new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i'))
		return d ? decodeURIComponent(d[2]) : null
	}

	env.f.root.url.read = function() {
		// 读取参数并打开
		var id = env.f.root.url.get('id')
		if (id) {
			if (env.d.init.root != 1) {env.e.root.backdrop[0].removeAttribute('data-text'); setTimeout(function (){env.e.root.backdrop[0].style.display = 'none'}, 500)}
			env.f.root.blog.open(id)
		} else {
			env.f.root.url.clear()
			document.title = env.d.title
		}
	}

// 博客框架
env.f.root.blog = {}
	env.f.root.blog.open = function(id) {
		// 打开博客
		var e = document.createElement('iframe')
		env.e.root.blog.prepend(e)
		env.f.root.page.load()
		env.f.root.fade(env.e.root.blog, 300)

		setTimeout(function (){
			env.f.root.url.set('id', id)
			e.src = `blog/${id}${env.d.isNetwork ? '' : '.html'}`
		}, 1000)
	}

	env.f.root.blog.close = function() {
		// 关闭博客
		env.f.root.url.clear()
		document.title = env.d.title
		env.f.root.fade(env.e.root.blog, -300)
		env.f.root.prompt.close()

		setTimeout(function (){
			env.e.root.blog.children[0].remove()
		}, 600)
	}

env.f.root.page = {}
	env.f.root.page.load = function() {
		// 博客加载动画
		clearInterval(env.tmp.root.t2)
		env.e.root.backdrop[2].style.display = 'block'

		env.tmp.root.d3 = new Date()
		env.tmp.root.t2 = setInterval(() => {
			env.e.root.backdrop[2].setAttribute('data-timer', ((new Date() - env.tmp.root.d3) / 1000).toFixed(2))
		}, 100)
	}

	env.f.root.page.load.stop = function() {
		// 停止加载动画
		clearInterval(env.tmp.root.t2)
		delete env.tmp.root.d3
		env.f.root.fade(env.e.root.backdrop[2], -500)

		setTimeout(function (){
			env.e.root.blog.children[2].removeAttribute('data-timer')
		}, 500)
	}

	env.f.root.page.ok = function(title) {
		// 博客加载完成
		document.title = `${title} | ${env.d.title}`
		setTimeout(function (){env.f.root.page.load.stop()}, 2000)
	}

env.f.root.init = function() {
	// 初始化菜单
	env.d.init.menu = 1

	// 文章
	var d = env.d.list.blog
	env.e.root.menu[0].setAttribute('data-item', d.length)
	for (var i = 0; i < d.length; i++) {
		var div = document.createElement('div')
			div.setAttribute('style', 'display: block')
			div.setAttribute('data-icon', d[i].type[0])
			div.innerHTML = `<a onclick="env.f.root.blog.open('${d[i].src}')" title="${d[i].des}" >${d[i].name}</a>`
			document.querySelector('.search list').appendChild(div)

		if (d[i].type[1] == 'pin') {div.setAttribute('class', 'pin')}
	}

	// 检索引擎
	document.querySelector('.search').setAttribute('style', `height: ${Math.min(8, d.length) * 22 + 55}px`)

	// 通知
	document.querySelector('.menu-c2').innerHTML = env.d.list.news

	setTimeout(function (){env.e.root.btn.removeAttribute('style'); env.f.root.menu.open()}, 1000)
}

env.f.root.menu = {}
	env.f.root.menu.open = function() {
		// 打开菜单
		if (env.d.init.menu) {
			document.querySelector('.menu').classList.add('menu-active')
			env.f.root.fade(env.e.root.backdrop[1], 300)
		} else {
			// 初始化
			env.e.root.btn.setAttribute('style', 'pointer-events: none')
			env.f.root.init()
		}
	}

	env.f.root.menu.close = function() {
		document.querySelector('.menu').classList.remove('menu-active')
		env.f.root.fade(env.e.root.backdrop[1], -300)
	}

	env.f.root.menu.folder = function(e) {
		if (e.classList.contains('active')) {
			e.removeAttribute('class')
			e.nextElementSibling.setAttribute('style', 'opacity: 0; height: 0; overflow: hidden;')
		} else {
			e.classList.add('active')
			if (e == env.e.root.menu[0]) {
				// 配合检索栏
				e.nextElementSibling.setAttribute('style', `opacity: 1; height: ${Math.min(8, (Number(env.e.root.menu[0].dataset.item) || 1)) * 22 + 55}px;`)
			} else {
				e.nextElementSibling.removeAttribute('style')
			}
		}
	}

env.f.root.prompt = {}
	env.f.root.prompt = function(str, t = -1) {
		// 弹出信息窗口
		var prompt = document.createElement('prompt')
			prompt.innerHTML = str
			prompt.id = Date.now()
			prompt.setAttribute('onclick', 'env.f.root.prompt.close(this)')
			env.e.root.prompt.appendChild(prompt)

		setTimeout(function (){prompt.setAttribute('class', 'active')}, 100)
		if (t > 0) {
			setTimeout(function (){
				env.f.root.prompt.close(prompt)
			}, t)
		}
	}
	env.f.root.prompt.close = function(e) {
		// 关闭信息窗口
		if (e) {
			e.removeAttribute('class')
			setTimeout(function (){e.remove()}, 500)
		} else {
			var e = env.e.root.prompt.children
			for (var i = 0; i < e.length; i++) {
				env.f.root.prompt.close(e[i])
			}
		}
	}

env.f.root.search = function() {
	//  站内检索引擎
	var s = document.querySelector('.search textarea').value
	var f = document.querySelector('.search')
	var o = [...document.querySelectorAll('.search list div')].slice(1)

	//  排除违禁词
	if ([].some(item => s.includes(item))) {return}
	for (var i = 0; i < o.length; i++) {
		o[i].setAttribute('style', 'display: none')
	}

	// 创建新数组，格式为 {'name': 符合条件的 name 值, 'index': 项数}
	const r = env.d.list.blog
		.map((item, index) => ({ name: item.name, index }))
		.filter(item => item.name.toLowerCase().includes(s.toLowerCase()))

	//  渲染结果
	for (var i = 0; i < r.length; i++) {
		o[r[i].index].children[0].innerHTML = r[i].name.replace(new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), (match) => `<key>${match}</key>`)
		o[r[i].index].setAttribute('style', 'display: block')
	}

	env.e.root.menu[0].setAttribute('data-item', r.length)
	f.setAttribute('style', `transition: none; height: ${Math.max(Math.min(8, r.length), 1) * 22 + 55}px`)
	document.querySelector('.search .none').setAttribute('style', `display: ${r.length ? 'none' : 'block'}`)
}



// 初始化环境
env.e.root.counter[0].innerHTML = env.d.uptime = env.f.root.getUptime()
env.f.root.getText()
env.f.root.url.read()



// 接受博客页面的信号
window.addEventListener('message', function(event) {
	if (event.origin == 'null' || event.origin.includes(`https://${env.d.domain}`)) {eval(event.data)}
})

// 页面加载完成后执行
window.addEventListener('load',function(){
	// 计算页面加载时间
	env.d.load = env.f.root.conv.c0(((new Date() - new Date(env.tmp.root.d1)) / 1000).toFixed(3) * 1000)
	delete env.tmp.root.d1

	// 获取访问量
	if (env.d.isNetwork) {
		// 重复访问不计数
		env.d.isNew = env.f.root.cookie.get('Cookie') ? false : true
		fetch(`https://${env.d.domain}/api/counter`, {
			method: "POST",
			headers: {
				"Token": (env.d.isNew ? 1 : 0)
			}
		})
		.then(response => {return response.json()})
		.then(json => {
			env.d.visitors = Number(json.results[0].data)
			env.f.root.cookie.set('Cookie !')

			env.e.root.counter[1].innerHTML = env.d.visitors
			env.e.root.counter[1].parentNode.removeAttribute('style')
		})
	}
})



env.tmp.root.d2 = 1
setTimeout(console.log.bind(
	console, 
	`\n%c %c snowyfox %c		${env.d.version.root}\n`,
	'background-color: rgba(186, 138, 219, 0.9); color: white; font-weight: bolder;',
	'background-color: rgba(186, 138, 219, 0.5); color: white;',
	'color: rgba(192, 194, 194, 1);',
));



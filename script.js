


/*	script.js
 *	created by sumiyo, 2024/8/27

	*/



env.d.version.main = '1.0.24'

// 通知列表
env.d.list.news = [
	{
		date: '1.16',
		name: '主题优化',
		des: '不优雅的东西，删掉！\n2025 新年快乐',
	},
	{
		date: '11.21',
		name: '注册 <ins>sumiyo.link/</ins>',
		des: '新的域名，新的开始！',
	},
	{
		date: '10.02',
		name: '网站界面优化',
		des: '一点点小调整',
	},
	{
		date: '8.31',
		name: '第 4 次重构',
		des: '重写了函数结构',
	},
	{
		date: '6.08',
		name: '留言板上线',
		des: '终于可以留言啦',
	},

]



// 添加函数

env.f.fade = function(e, t, style = '') {
	// 淡入淡出动画
	var s = null
	var t0 = Math.abs(t)
	e.setAttribute('style', `transition: 0s; opacity: ${(t > 0) ? 1 : 0}`)

	function animation(t1) {
		if (!s) {s = t1}
		var p = t1 - s
		if (t > 0) {
			e.style.opacity = Math.min(p / t0, 1).toFixed(2)
			if (p < t0) {
				requestAnimationFrame(animation)
			} else {
				e.setAttribute('style', style)
			}
		} else {
			e.style.opacity = Math.max(1 - p / t0, 0)
			if (p < t0) {
				requestAnimationFrame(animation)
			} else {
				e.setAttribute('style', style || 'display: none')
			}
		}
	}

	requestAnimationFrame(animation)
}

env.f.scroll = function(e, y, t = 300, abs = true) {
	// 滚动动画
	var start = e.scrollTop
	var end = abs ? y : (start + y)
	var d = end - start
	var s = null

	function ease(p) {
		return p < 0.5 
		? 2 * p * p 
		: -1 + (4 - 2 * p) * p
	}
	function animation(t1) {
		if (s === null) s = t1
		const timeElapsed = t1 - s
		const p = Math.min(timeElapsed / t, 1)

		// 使用缓动函数来实现平滑效果
		const easing = ease(p)
		e.scrollTop = start + d * easing

		if (timeElapsed < t) {
			requestAnimationFrame(animation)
		}
	}

	requestAnimationFrame(animation)
}

env.f.setCookie = function(value) {
	// 设置 Cookie
	document.cookie = `Cookie=${value}; expires=${new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toUTCString()}`
}

env.f.getCookie = function(name) {
	// 读取 Cookie
	var r = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
	if (r) {return decodeURIComponent(r[1])}
	return undefined
}

env.f.getRandom = function(min, max) {
	// 生成随机整数
	return Math.floor(Math.random() * (max - min + 1)) + min
}

env.f.dateFormatter = function(formatter, date) {
	// 日期格式化
	date = (date ? new Date(date) : new Date)
	const Y = date.getFullYear() + '',
		M = date.getMonth() + 1,
		D = date.getDate(),
		H = date.getHours(),
		m = date.getMinutes(),
		s = date.getSeconds()
	return formatter.replace(/YYYY|yyyy/g, Y)
		.replace(/YY|yy/g, Y.substr(2, 2))
		.replace(/MM/g, (M < 10 ? '0' : '') + M)
		.replace(/DD/g, (D < 10 ? '0' : '') + D)
		.replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
		.replace(/mm/g, (m < 10 ? '0' : '') + m)
		.replace(/ss/g, (s < 10 ? '0' : '') + s)
}

env.f.sizeFormatter = function(bytes) {
	// 文件大小转换
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
	if (bytes === 0) return '0 Bytes'
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
	return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i]
}

env.f.conv0 = function(n) {
	// 转换 ms --> mm:ss.fff
	var ts = Math.floor(n / 1000)
	var m = String(Math.floor(ts / 60)).padStart(2, '0')
	var s = String(ts % 60).padStart(2, '0')
	var ms = String(n % 1000).padStart(3, '0')

	return `${m}:${s}.${ms}`.substring(0, 9)
}

env.f.conv1 = function(str) {
	// 转换 mm:ss.fff --> ms
	var parts = str.split(':')
	return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10)
}

env.f.getUptime = function() {
	// 计算网站上线时间
	return Math.floor((new Date() -  new Date('2023-02-03')) / (1000 * 60 * 60 * 24))
}

env.f.post = function(event) {
	// 页面通信
	env.e.blog.children[1].contentWindow.postMessage(event, env.d.isNetwork ? '/' : '*')
}

env.f.linkto = function(id) {
	// 博客文章重定向
	env.e.blog.children[1].remove()
	env.e.blog.appendChild(document.createElement('env.e.blog.children[1]'))

	env.f.page.load()
	if (env.d.notification) env.f.notification.close()

	setTimeout(function (){
		env.f.url.set('id', id)
		env.e.blog.children[1].src = env.d.isNetwork ? (`${window.location.origin}/blog/${id}/page`) : (`blog/${id}/page.html`)
	}, 500)
}

env.f.url = {}
	env.f.url.clear = function() {
		// 清除参数
		let url = window.location.href
		if (url.indexOf('?') != -1) {
			history.replaceState(null, null, url.replace(/(\?|#)[^'"]*/, ''))
		}
	}

	env.f.url.set = function(name, value) {
		// 修改参数
		let url = location.href
		let url2

		if (typeof value === 'string') {value = value.toString().replace(/(^\s*)|(\s*$)/, "")}
		if (!value) {
			let reg = eval('/(([\?|&])' + name + '=[^&]*)(&)?/i')
			let res = url.match(reg)
			if (res) {
				if (res[2] && res[2] === '?') { // before has ?
					if (res[3]) {url2 = url.replace(reg, '?')} else {url2 = url.replace(reg, '')}
				} else {
					url2 = url.replace(reg, '$3')
				}
			}
		} else {
			let reg = eval('/([\?|&]' + name + '=)[^&]*/i')
			if (url.match(reg)) {
				url2 = url.replace(reg, '$1' + value)
			} else {
				let reg = /([?](\w+=?)?)[^&]*/i
				let res = url.match(reg)
				url2 = url
				if (res) {
					if (res[0] !== '?') {
						url2 += '&'
					}
				} else {
					url2 += '?'
				}
				url2 += name + '=' + value
			}
		}
		history.replaceState(null, null, url2)
	}

	env.f.url.get = function(name) {
		// 读取参数
		var d = window.location.search.substr(1).match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"))
		var r = ''
		if (d != null) {
			r = decodeURIComponent(d[2])
			return r == null || r == '' || r == undefined ? undefined : r
		}
	}

	env.f.url.read = function() {
		// 读取参数并打开
		var id = env.f.url.get('id')
		if (id) {
			env.f.blog.open(id)
		} else {
			env.f.url.clear()
			document.title = env.d.domain
			env.tmp.d4 = 1
		}
	}

// 博客框架
env.f.blog = {}
	env.f.blog.open = function(id) {
		// 打开博客
		env.e.blog.appendChild(document.createElement('iframe'))
		env.f.page.load()
		env.f.fade(env.e.blog, 300)

		setTimeout(function (){
			if (id != 'page/oops') {env.d.isNetwork ? (history.replaceState(null, null, window.location.origin + '/blog?id=' + id)) : ( env.f.url.set('id', id))}
			env.e.blog.children[1].src = env.d.isNetwork ? (`${window.location.origin}/blog/${id}/page`) : (`blog/${id}/page.html`)
		}, 500)
	}

	env.f.blog.close = function() {
		// 关闭博客
		env.f.fade(env.e.blog, -300)
		document.title = env.d.domain
		env.d.isNetwork ? (history.replaceState(null, null, window.location.origin)) : (env.f.url.clear())

		setTimeout(function (){
			if (env.d.notification) env.f.notification.close()
			env.e.blog.children[1].remove()
		}, 600)
	}


env.f.init = function() {
	// 初始化菜单

	// 文章
	var d = env.d.list.blog
	var e = document.querySelector('.search list')
	env.e.e1.innerHTML = d.length

	for (var i = 0; i < d.length; i++) {
		if (d[i].type != 'hide') {
			var div = document.createElement('div')
				div.setAttribute('style', 'display: block')
				div.setAttribute('type', d[i].type[0])
				e.appendChild(div)

			var a = document.createElement('a')
				a.setAttribute('onclick', `env.f.blog.open('${d[i].src}')`)
				a.setAttribute('title', d[i].des)
				a.innerHTML = d[i].name
				div.appendChild(a)

			if (d[i].type[1] == 'pin') {div.setAttribute('class', 'pin')}
		}
	}

	// 搜索引擎
	document.querySelector('.search').setAttribute('style', `height: ${Math.min(5, d.length) * 22 +55}px`)
	document.querySelector('.search textarea').addEventListener('keyup', function(e) {
		env.f.search()
	})

	// 通知
	var e = document.querySelector('.menu-c2')
	var l = env.d.list.news
	for (var i = 0; i < 5; i++) {
		var div = document.createElement('news')
			div.innerHTML = `<time>${l[i].date}</time><span title="${l[i].des}" >${l[i].name}</span>`
			e.appendChild(div)
	}

	setTimeout(function (){document.querySelector('btn1').removeAttribute('style'); env.f.menu.open()}, 1000)
}

env.f.msg = function(content, time) {
	// 弹窗
	env.e.msg.childNodes[0].innerHTML = content
	env.e.msg.classList.add('message-active')
	if (time > 0) {
		setTimeout(function (){env.e.msg.classList.remove('message-active')}, time)
	}
}
	env.f.msg.close = function() {
		// 关闭弹窗
		env.e.msg.classList.remove('message-active')
	}

env.f.menu = {}
	env.f.menu.open = function() {
		// 打开菜单
		if (!document.querySelector('.menu-c2 news')) {
			document.querySelector('.box-1 btn1').setAttribute('style', 'pointer-events: none')
			env.f.init()
		} else {
			document.querySelector('.menu').classList.add('menu-active')
			env.f.fade(document.querySelector('.box-1 btn2'), 300)
		}
	}

	env.f.menu.close = function() {
		document.querySelector('.menu').classList.remove('menu-active')
		env.f.fade(document.querySelector('btn2'), -300)
	}

	env.f.menu.folder = function(e, h = 0) {
		if (e.classList.contains('btn-active')) {
			e.removeAttribute('class')
			e.nextElementSibling.setAttribute('style', 'opacity: 0; height: 0; overflow: hidden;')
		} else {
			e.classList.add('btn-active')
			h ? e.nextElementSibling.setAttribute('style', `opacity: 1; height: ${Math.min(5, (Number(env.e.e1.innerHTML) || 1)) * 22 +55}px;`) : e.nextElementSibling.removeAttribute('style')
		}
	}

env.f.page = {}
	env.f.page.load = function() {
		// 博客加载动画
		clearInterval(env.tmp.t2)
		env.f.fade(document.querySelector('.loading'), 300)

		env.tmp.d5 = new Date()
		env.tmp.t2 = setInterval(() => {
			var t = new Date() - env.tmp.d5
			document.querySelector('.loading box2').innerHTML = (t / 1000).toFixed(2)
		}, 100)

		env.tmp.t5 = setInterval(() => {
			if (env.e.blog.children[1]) {
				env.e.blog.children[1].remove()
			}
			env.e.blog.appendChild(document.createElement('iframe'))
			env.e.blog.children[1].src = env.d.isNetwork ? (window.location.origin + '/blog/page/oops/page') : ('blog/page/oops/page.html')
			env.e.blog.removeAttribute('style')
		}, 60000)

	}
		env.f.page.load.stop = function() {
			// 停止加载动画
			clearInterval(env.tmp.t2)
			clearInterval(env.tmp.t5)
			env.tmp.d5 = null
			delete env.tmp.d5
			env.f.fade(document.querySelector('.loading'), -500)

			setTimeout(function (){
				document.querySelector('.loading box2').innerHTML = ''
			}, 500)
		}

	env.f.page.ok = function(title) {
		// 博客加载完成
		document.title = (title.slice(0, 1) == '-') ? (title.slice(1) + ' - ' + env.d.domain) : (title)
		setTimeout(function (){env.f.page.load.stop()}, 2000)
	}

env.f.type = function() {
	// 打字机动画
	var s = '私のサイト、###私##一##人#の##世界です。'
	var i = 0
	var e = document.querySelector('type')
	env.tmp.t3 = setInterval(() => {
		i ++
		s.substring(i - 1, i) == '#' ? null : (e.innerHTML += s.substring(i - 1, i))
		if (i == s.length) {clearInterval(env.tmp.t3)}
	}, 140)
}

env.f.notification = {}
	env.f.notification.open = function(str, t = 3000) {
		// 弹出信息窗口
		var e = document.querySelector('.notification')
		if (env.d.notification) {
			env.f.fade(e, -200)
			clearInterval(env.tmp.t6)
		}

		setTimeout(function (){
			env.d.notification = 1
			e.innerHTML = str
			env.f.fade(e, 200)
			env.tmp.t6 = setInterval(() => {
				if (env.d.notification) {
					env.f.notification.close()
				}
			}, t)
		}, 500)
	}
	env.f.notification.close = function() {
		// 关闭信息窗口
		var e = document.querySelector('.notification')
		clearInterval(env.tmp.t6)
		env.d.notification = 0
		env.f.fade(e, -200)

		setTimeout(function (){
			e.innerHTML = ''
		}, 500)
	}

env.d.version.search = '1.0.24'
env.f.search = function() {

	/*	站内检索引擎
	*	created by sumiyo, 2025/1/02	with the help of ChatGPT

		*/

	var d = env.d.list.blog
	var ban = []
	var k = document.querySelector('.search textarea').value
	var f = document.querySelector('.search')
	var o = [...document.querySelectorAll('.search list div')].slice(1)

	//  排除违禁词
	if (ban.some(item => k.includes(item))) {return}

	for (var i = 0; i < o.length; i++) {
		o[i].setAttribute('style', 'display: none')
	}

	// 创建新数组，格式为 {'name': 符合条件的 name 值, 'index': 项数}
	const r = d
		.map((item, index) => ({ name: item.name, index }))
		.filter(item => item.name.toLowerCase().includes(k.toLowerCase()))

	//  渲染结果
	var k = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	if (k != '') {
		for (var i = 0; i < r.length; i++) {
			o[r[i].index].children[0].innerHTML = r[i].name.replace(new RegExp(k, 'gi'), (match) => `<key>${match}</key>`)
			o[r[i].index].setAttribute('style', 'display: block')
		}
	} else {
		for (var i = 0; i < r.length; i++) {
			o[r[i].index].children[0].innerHTML = r[i].name
			o[r[i].index].setAttribute('style', 'display: block')
		}
	}

	env.e.e1.innerHTML = r.length
	f.setAttribute('style', `transition: none; height: ${Math.max(Math.min(5, r.length), 1) * 22 + 55}px`)
	document.querySelector('.search .null').setAttribute('style', `display: ${r.length ? 'none' : 'block'}`)
}

env.f.get‌Element = function() {
	// 初始化元素列表
	env.e = {
		'footer': document.querySelectorAll('footer span'),
		'menu': document.querySelectorAll('.menu btn'),
		'blog': document.querySelector('.blog'),
		'msg': document.querySelector('.message'),

		'e1': document.querySelector('.menu btn span span'),
	}
}






// 初始化环境
env.f.get‌Element()

env.e.footer[0].innerHTML = env.d.uptime = env.f.getUptime()
env.f.url.read()



// 接受博客页面的信号
window.addEventListener('message', function(event) {
	if (event.origin == 'null' || event.origin.includes('https://' + env.d.domain)) {eval(event.data)}
})

// 页面加载完成后执行
window.addEventListener('load',function(){
	// 计算页面加载时间
	env.d.load = env.f.conv0(((new Date() - new Date(env.tmp.d1)) / 1000).toFixed(3) * 1000)
	env.tmp.d1 = null
	delete env.tmp.d1

	// 获取访问量
	if (env.d.isNetwork) {
		// 一周内的重复访问不计数
		if (env.f.getCookie('Cookie') == undefined) {
			var m = 1
			env.d.isNew = true
		} else {
			var m = 0
			env.d.isNew = false
		}

		fetch(`https://${env.d.domain}/counter.api`, {
			method: "POST",
			headers: {
				"Token": m
			}
		})
		.then(response => {return response.json()})
		.then(json => {
			env.d.visitors = Number(json.results[0].data)
			env.f.setCookie('Cookie !')

			env.e.footer[1].innerHTML = env.d.visitors
			env.e.footer[1].parentNode.removeAttribute('style')
		})
	}
})






env.tmp.d2 = 1
setTimeout(console.log.bind(
	console, 
	'\n%c THEME %c しろい花 %c		ver.' + env.d.version.main + '\n',
	'background-color: rgba(186, 138, 219, 0.9); color: white; font-weight: bolder;',
	'background-color: rgba(186, 138, 219, 0.5); color: white;',
	'color: rgba(192, 194, 194, 1);',
));






/*	root.js
 *	created by sumiyo, 2024/8/27

	*/



env.d.version.root = "1.0.247"
env.f.root = {}

// 初始化元素列表
env.e = {...env.e, ...{
	root: {
		"prompt": document.querySelector(".prompt"),
		"blog": document.querySelector(".blog"),
		"btn": document.querySelector("header btn"),
		"backdrop": document.querySelectorAll("backdrop"),
		"menu": document.querySelectorAll(".menu btn"),
		"counter": document.querySelectorAll("footer tag"),
		"dm_btn": document.querySelectorAll(".menu .menu-c3 a")[3],
	}
}}

// 初始化初始化列表
env.d.init = {...env.d.init, ...{
	"menu": 0,
}}

// 通知
env.d.list.news = `欢迎连接到 sumiyo 的世界！<br />这里仍在缓慢更新中 ...`



// 注册函数

env.f.root.fade = function(e, t, style = "display: none") {
	// 淡入淡出动画
	var n = null
	var i = (t > 0) ? 0 : 1
	var o = parseFloat(env.f.root.getCSS(e, "opacity"))
	var t0 = Math.abs(t)
	e.style = "transition: none"

	function anime(t1) {
		if (n == null) {n = t1}
		var p = t1 - n
		e.style.opacity = (o * (i + p / t)).toFixed(2)
		if (p < t0) {
			requestAnimationFrame(anime)
		} else {
			t > 0 ? e.removeAttribute("style") : e.style = style
		}
	}
	requestAnimationFrame(anime)
}



env.f.root.cookie = function(value) {
	// 写入 Cookie
	document.cookie = `Cookie=${value}; expires=${new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000).toUTCString()}`
}
	env.f.root.cookie.set = function(key, value) {
		// 写入
		if (!env.d.isNetwork) return
		var obj = JSON.parse(env.f.root.cookie.get())
		value == "delete" ? (delete obj[key]) : (obj[key] = value)
		env.f.root.cookie(JSON.stringify(obj))
	}

	env.f.root.cookie.get = function(key) {
		// 读取
		var c = document.cookie.match(new RegExp(`(?:^|; )Cookie=([^;]*)`))
		return c ? decodeURIComponent(key ? JSON.parse(c[1])[key] : c[1]) : null
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
		var pad = n => n.toString().padStart(2, "0")
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
		return (n / Math.pow(1024, i)).toFixed(2) + " " + ["B", "KB", "MB", "GB", "TB", "PB", "EB", "你够了"][i]
	}

env.f.root.conv = {}
	env.f.root.conv.c0 = function(n = 0) {
		// 转换 ms --> mm:ss.fff
		var t = Math.floor(n / 1000)
		return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}.${String(n % 1000).padStart(3, "0")}`.substring(0, 9)
	}

	env.f.root.conv.c1 = function(str) {
		// 转换 mm:ss.fff --> ms
		var t = str.split(/[:.]/)
		return parseInt(t[0] * 60000) + parseInt(t[1] * 1000) + parseInt(t[2])
	}

	env.f.root.conv.c2 = function(str) {
		// 转换 mm:ss.fff --> s
		var t = str.split(/[:.]/)
		return parseFloat((parseInt(t[0] * 60) + parseInt(t[1])) + "." + t[2])
	}

env.f.root.getUptime = function() {
	// 计算网站上线时间
	return Math.floor((new Date() -  new Date("2023-02-02")) / (1000 * 60 * 60 * 24))
}

env.f.root.getText = function() {
	// 开屏页随机标语
	var e = env.e.root.backdrop[0].children[0]
	var l = [
		// 世界的边缘，白花遍野。
		"haze i  milecaze,    miite mirano  enkade  suzerala.",

		// 聆听，视物，沉默。
		"erilo,     miranka,      utarii.",

		// 全在即神明。
		"hazemoi sia  ihono      he   sorie.",

	]

	var t = l[env.f.root.getRandom(0, l.length - 1)].split("")
	var i = 0
	env.tmp.root.t3 = setInterval(() => {
		e.innerHTML = e.innerHTML + t[i]
		i ++
		if (i == t.length) {
			clearInterval(env.tmp.root.t3)
			setTimeout(function (){
				env.d.init.root = 1
				delete env.f.root.getText
			}, 500)
		}
	}, 100)
}



env.f.root.post = function(state, data) {
	// 页面通信
	env.e.root.blog.children[0].contentWindow.postMessage({"state": state, "data": data}, env.d.isNetwork ? "/" : "*")
}

env.f.root.linkto = function(id) {
	// 博客文章重定向
	env.f.root.blog.close()
	setTimeout(function (){
		env.f.root.url.set("id", id)
		env.f.root.blog.open(env.f.root.url.get("id"))
	}, 600)
}

env.f.root.url = {}
	env.f.root.url.clear = function(name) {
		// 清除参数
		var url = new URL(window.location.href)
		name ? (url.searchParams.delete(name)) : (url.search = "")
		history.replaceState(null, "", decodeURIComponent(url))
	}

	env.f.root.url.set = function(name, value) {
		// 修改参数
		var url = new URL(window.location.href)
		url.searchParams.set(name, value)
		history.replaceState(null, "", decodeURIComponent(url))
	}

	env.f.root.url.get = function(name) {
		// 读取参数
		var d = window.location.search.substr(1).match(new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i"))
		return d ? decodeURIComponent(d[2]) : null
	}

	env.f.root.url.read = function() {
		// 读取参数并打开
		var id = env.f.root.url.get("id")
		if (id) {
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
		var e = document.createElement("iframe")
		env.e.root.blog.prepend(e)
		env.f.root.fade(env.e.root.blog, 300)
		env.f.root.fade(env.e.root.backdrop[2], 300)
		if (env.d.player?.list) {
			env.d.isHandyNAVI ? env.f.root.fade(env.e.player.player, 300) : env.e.player.player.removeAttribute("style")
		}

		setTimeout(function (){
			env.f.root.url.set("id", id)
			e.src = `blog/${id}${env.d.isNetwork ? "" : ".html"}`
		}, 1000)
	}

	env.f.root.blog.close = function() {
		// 关闭博客
		env.f.root.url.clear()
		document.title = env.d.title
		env.f.root.fade(env.e.root.blog, -300)
		env.f.root.prompt.close()
		if (env.d.player?.list) {
			env.d.isHandyNAVI ? env.f.root.fade(env.e.player.player, -300) : env.e.player.player.setAttribute("style", "bottom: 10%; right: 80px; z-index: 8;")
		}

		setTimeout(function (){
			env.e.root.blog.children[0].remove()
		}, 600)
	}

	env.f.root.blog.show = function(title) {
		// 博客加载完成
		document.title = `${title}`
		env.f.root.fade(env.e.root.backdrop[2], -500)
	}

env.f.root.init = function() {
	// 初始化菜单
	env.d.init.menu = 1

	// 文章
	var d = env.d.list.blog
	env.e.root.menu[0].setAttribute("data-item", d.length)
	for (var i = 0; i < d.length; i++) {
		var div = document.createElement("div")
			div.setAttribute("data-icon", d[i].type[0])
			div.style = "display: block"
			div.innerHTML = `<a onclick="env.f.root.blog.open('${d[i].src}')" title="${d[i].des}" >${d[i].name}</a>`
			document.querySelector(".search list").appendChild(div)

		if (d[i].type[1] == "pin") {div.className = "pin"}
	}

	// 检索引擎
	document.querySelector(".search").style = `height: ${Math.min(8, d.length) * 22 + 55}px;`

	// 通知
	document.querySelector(".menu-c2").innerHTML = env.d.list.news

	// 打开菜单
	setTimeout(function (){
		env.e.root.btn.removeAttribute("style")
		env.f.root.menu.open()
	}, 1000)
}

env.f.root.menu = {}
	env.f.root.menu.open = function() {
		// 打开菜单
		if (env.d.init.menu) {
			document.querySelector(".menu").classList.add("menu-active")
			env.f.root.fade(env.e.root.backdrop[1], 300)
		} else {
			// 初始化
			env.e.root.btn.style = "pointer-events: none"
			env.f.root.init()
		}
	}

	env.f.root.menu.close = function() {
		document.querySelector(".menu").classList.remove("menu-active")
		env.f.root.fade(env.e.root.backdrop[1], -300)
	}

	env.f.root.menu.folder = function(e) {
		if (e.classList.contains("active")) {
			e.removeAttribute("class")
			e.nextElementSibling.style = "opacity: 0; height: 0; overflow: hidden;"
		} else {
			e.classList.add("active")
			if (e == env.e.root.menu[0]) {
				// 配合检索栏
				e.nextElementSibling.style = `opacity: 1; height: ${Math.min(8, (Number(env.e.root.menu[0].dataset.item) || 1)) * 22 + 55}px;`
			} else {
				e.nextElementSibling.removeAttribute("style")
			}
		}
	}

env.f.root.prompt = {}
	env.f.root.prompt = function(str, t = -1) {
		// 弹出信息窗口
		var prompt = document.createElement("prompt")
			prompt.innerHTML = str
			prompt.id = Date.now()
			prompt.setAttribute("onclick", "env.f.root.prompt.close(this)")
			env.e.root.prompt.appendChild(prompt)

		setTimeout(function (){prompt.setAttribute("class", "active")}, 100)
		if (t > 0) {
			setTimeout(function (){
				env.f.root.prompt.close(prompt)
			}, t)
		}
	}
	env.f.root.prompt.close = function(e) {
		// 关闭信息窗口
		if (e) {
			e.removeAttribute("class")
			setTimeout(function (){e.remove()}, 500)
		} else {
			var e = env.e.root.prompt.children
			for (var i = 0; i < e.length; i++) {
				env.f.root.prompt.close(e[i])
			}
		}
	}

env.f.root.search = function() {
	// 站内检索引擎
	var s = document.querySelector(".search textarea").value
	var o = [...document.querySelectorAll(".search list div")].slice(1)

	// 排除违禁词
	if ([].some(item => s.includes(item))) {return}
	for (var i = 0; i < o.length; i++) {
		o[i].style = "display: none"
	}

	// 创建新数组，格式为 {"name": 符合条件的 name 值, "index": 项数}
	const r = env.d.list.blog
		.map((item, index) => ({ name: item.name, index }))
		.filter(item => item.name.toLowerCase().includes(s.toLowerCase()))

	// 渲染结果
	for (var i = 0; i < r.length; i++) {
		o[r[i].index].children[0].innerHTML = r[i].name.replace(new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), (match) => `<key>${match}</key>`)
		o[r[i].index].style = "display: block"
	}

	env.e.root.menu[0].setAttribute("data-item", r.length)
	document.querySelector(".search").style = `transition: none; height: ${Math.max(Math.min(8, r.length), 1) * 22 + 55}px`
	document.querySelector(".search .none").style = `display: ${r.length ? "none" : "block"}`
}

env.f.root.theme = function() {
	// 深色模式
	env.f.root.theme.set(env.d.isDark ? 0 : 1)
}
	env.f.root.theme.set = function(bool){
		if (bool) {
			env.e.root.dm_btn.innerHTML = ""
			env.e.root.dm_btn.title = "浅色模式"
			env.d.isDark = true
			env.f.root.cookie.set("theme", 0)
			document.documentElement.setAttribute("theme", 0)
		} else {
			env.e.root.dm_btn.innerHTML = ""
			env.e.root.dm_btn.title = "深色模式"
			env.d.isDark = false
			env.f.root.cookie.set("theme", 1)
			document.documentElement.setAttribute("theme", 1)
		}
	}

	env.f.root.theme.init = function(){
		var c = env.f.root.cookie.get("theme") || "undefined"
		env.f.root.theme.set(c == "undefined" ? env.d.isDark : !Number(c))
		delete env.f.root.theme.init
	}






// 初始化
if (env.d.isNetwork) {
	(env.f.root.cookie.get()?.startsWith("{") ?? false) ? null : env.f.root.cookie("{}")
}

// 初始化环境
env.e.root.counter[0].innerHTML = env.d.uptime = env.f.root.getUptime()
env.f.root.url.read()
env.f.root.theme.init()
env.f.root.getText()



// 接受博客页面的信号
window.addEventListener("message", function(event) {
	if (event.origin != "null" && !event.origin.includes(`https://${env.d.domain}`)) return
	eval(event.data)
})

// 页面加载完成后执行
window.addEventListener("load",function(){
	// 计算页面加载时间
	env.d.load = env.f.root.conv.c0(((new Date() - new Date(env.tmp.root.d1)) / 1000).toFixed(3) * 1000)
	delete env.tmp.root.d1

	// 获取访问量
	if (env.d.isNetwork) {
		// 重复访问不计数
		env.d.isNew = (env.f.root.cookie.get("is_new") == "undefined" ? true : false)
		fetch(`https://${env.d.domain}/api/counter`, {
			method: "POST",
			headers: {
				"Token": (env.d.isNew ? 1 : 0)
			}
		})
		.then(response => {return response.json()})
		.then(json => {
			env.d.visitors = Number(json.results[0].data)
			env.f.root.cookie.set("date", env.f.root.fmt.date("YYYY-MM-DD"))
			env.f.root.cookie.set("is_new", false)

			env.e.root.counter[1].innerHTML = env.d.visitors
			env.e.root.counter[1].parentNode.removeAttribute("style")
		})
	}
})



env.tmp.root.d2 = 1

document.querySelector(".menu .menu-footer tag").innerHTML = new Date().getFullYear()
setTimeout(console.log.bind(
	console, 
	`\n%c %c  ${env.d.sys} %c		${env.d.version.root}\n`,
	"background-color: rgba(40, 158, 214, 0.9); color: white; font-weight: bolder; line-height: 20px;",
	"background-color: rgba(40, 158, 214, 0.5); color: white; line-height: 20px;",
	"color: rgba(192, 194, 194, 1);",
))



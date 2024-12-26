


/*	script.js
 *	created by sumiyo, 2024/8/27

	*/



env.data.version.main = '1.0.21'

// 通知列表
env.data.list.notice = [
	{
		date: '11.21',
		event: '注册 <ins>sumiyo.link/</ins>',
		content: '新的域名，新的开始！',
	},
	{
		date: '10.02',
		event: '网站设计优化',
		content: '最新的样式设计！',
	},
	{
		date: '8.31',
		event: '第 4 次重构',
		content: '重写了主页 & 播放器的函数结构\n优化了网站的部分 api',
	},
	{
		date: '8.12',
		event: '调整网站的样式',
		content: '调整了网站的样式\n更换了头像',
	},
	{
		date: '6.08',
		event: '留言板上线',
		content: '网站新增留言板功能！',
	},

]



// 添加函数
env.timer.t2 = null

/* --------------------------------------
	已占用的变量
	env.tmp.t1
	env.tmp.t2
	env.tmp.t3
	env.tmp.t4
	env.tmp.t5

	env.timer.t1
	env.timer.t2
*/



// 剔除博客中被隐藏的文章
env.f.filter = function(arr, key, value) {
	return arr.filter(obj => obj[key] != value)
}

// 设置 Cookie
env.f.setCookie = function(value) {
	var now = new Date()
	var oneWeekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) 
	var expires = oneWeekLater.toUTCString()
	document.cookie = "Cookie=" + value + "; expires=" + expires
	return expires
}

// 读取 Cookie
env.f.getCookie = function(name) {
	var pattern = new RegExp('(?:^|; )' + name + '=([^;]*)')
	var matches = document.cookie.match(pattern)
	if (matches) {
		return decodeURIComponent(matches[1])
	}
	return undefined
}

// 生成[min, max]范围内的随机整数
env.f.getRandom = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

// 获取浏览器类型
env.f.getBrowser = function() {
	var userAgent = window.navigator.userAgent;
	if (userAgent.indexOf("Chrome") !== -1) {
		return "Chrome"
	} else if (userAgent.indexOf("Firefox") !== -1) {
		return "Firefox"
	} else if (userAgent.indexOf("Safari") !== -1) {
		return "Safari"
	} else if (userAgent.indexOf("Edge") !== -1) {
		return "Edge"
	} else if (userAgent.indexOf("MSIE") !== -1 || userAgent.indexOf("Trident/") !== -1) {
		return "IE"
	} else {
		return "Unknown"
	}
}

// 日期格式化
env.f.dateFormatter = function(formatter, date) {
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

// 大小格式化
env.f.sizeFormatter = function(bytes) {
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
	if (bytes === 0) return '0 Bytes'
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
	return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i]
}

// 计算网站上线时间
env.f.getDate = function() {
	var seconds = 1000
	var minutes = seconds * 60
	var hours = minutes * 60
	var days = hours * 24
	var years = days * 365
	var today = new Date()
	var todaySecond = today.getSeconds()
	var t1 = Date.UTC(2023,1,3,11,23,35)
	var t2 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds())
	var diff = t2-t1
	var diffYears = Math.floor(diff/years)
	var diffDays = Math.floor((diff/days)-diffYears*365)

	document.getElementById('onlineDate').innerHTML = diffYears*365+diffDays
	return diffYears*365+diffDays
}

// iframe 通讯
env.f.post = function(event) {
	document.querySelector('iframe').contentWindow.postMessage(event, document.domain.length == 0 && '*' || '/')
}

// iframe 重定向
env.f.linkto = function(id) {
	$('iframe').fadeOut(300)
	env.f.page.load()

	setTimeout(function (){
		env.data.change = 1
		if (!env.data.isNetwork) {
			env.f.url.set('id', id)
			document.querySelector('iframe').src = 'blog/' + id + '/page.html'
		} else {
			history.replaceState(null, null, window.location.href.split('link',1)[0] + 'link/blog?id=' + id)
			document.querySelector('iframe').src = window.location.href.split('link',1)[0] + 'link/blog/' + id + '/page'
		}
	},400)
}

// 操作 url 中的参数
env.f.url = {}
	// 清除
	env.f.url.clear = function() {
		var url = window.location.href
		if (url.indexOf('?') !== -1) {
			var url = url.replace(/(\?|#)[^'"]*/, '')
			history.replaceState(null, null, url)
		}
	}

	// 修改
	env.f.url.set = function(name, value) {
		let url = location.href
		let url2

		if (typeof value === 'string') {
			value = value.toString().replace(/(^\s*)|(\s*$)/, "")
		}
		if (!value) {
			// 移除
			let reg = eval('/(([\?|&])' + name + '=[^&]*)(&)?/i')
			let res = url.match(reg)
			if (res) {
				if (res[2] && res[2] === '?') { // before has ?
					if (res[3]) {
						// 追加 &
						url2 = url.replace(reg, '?')
					} else {
						url2 = url.replace(reg, '')
					}
				} else {
					url2 = url.replace(reg, '$3')
				}
			}
		} else {
			let reg = eval('/([\?|&]' + name + '=)[^&]*/i')
			if (url.match(reg)) {
				// 编辑
				url2 = url.replace(reg, '$1' + value)
			} else {
				// 添加
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

	// 读取
	env.f.url.get = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		var context = "";
		if (r != null)
			context = decodeURIComponent(r[2]);
			reg = null;
			r = null;
			return context == null || context == "" || context == undefined ? undefined : context;
	}

	// 打开指定位置
	env.f.url.read = function() {
		var id = env.f.url.get('id')
		if (id) {
			var list = env.data.list.Bloglist
			var n = list.length

			for (var i = 0; i < n; i++) {
				if (list[i]['src'] == id + '/') {
					env.f.blog.open(id)
					break
				} else {
					if (i == n - 1) {
						env.f.blog.open('page/oops')
					}
				}
			}
		} else {
			env.f.url.clear()
			history.pushState(null, null, location.href)
			$('title').text('sumiyo.link')
			env.tmp.t4 = 1
		}
	}

// 博客框架
env.f.blog = {}
	env.f.blog.open = function(id) {
		// 打开博客界面
		env.f.page.load()
		$('.blog').fadeIn(300)

		setTimeout(function (){
			// 跳转指定文章
			env.data.change = 1
			if (!env.data.isNetwork) {
				env.f.url.set('id', id)
				document.querySelector('iframe').src = 'blog/' + id + '/page.html'
			} else {
				history.replaceState(null, null, window.location.href.split('link',1)[0] + 'link/blog?id=' + id)
				document.querySelector('iframe').src = window.location.href.split('link',1)[0] + 'link/blog/' + id + '/page'
			}
		},400)
	}

	env.f.blog.close = function() {
		// 关闭博客页面
		env.f.page.load.stop()
		$('.blog').fadeOut(300)
		$('title').text('sumiyo.link')
 
		if (document.domain!='') {
			history.replaceState(null, null, window.location.href.split('link',1)[0] + 'link/')
		} else {
			env.f.url.clear()
		}
		if(player.data.ask == 1) {
			player.f.add.ask(0)
		}

		setTimeout(function (){
			env.data.change = 1
			document.querySelector('iframe').src = ''
		},400)
	}

// 初始化博客、通知面板
env.f.initList = function() {

	// 博客
	env.data.list.Bloglist = env.f.filter(env.data.list.Bloglist, 'type', 'hide')
	var BlogTEMP = env.data.list.Bloglist

	var ul = document.querySelector('ul')
	for (var i = 0; i < BlogTEMP.length; i++) {
		if (BlogTEMP[i]['type'] != 'hide') {
			var div = document.createElement('div')
				div.setAttribute('class', 'search-list')
				div.setAttribute('style', 'display: block')
				div.setAttribute('id', BlogTEMP[i]['type'] + ' ' + BlogTEMP[i]['name'])
				ul.appendChild(div)

			var a = document.createElement('a')
				a.setAttribute('onclick', `env.f.blog.open('` + BlogTEMP[i]['src'].slice(0, -1) + `')`)
				a.setAttribute('title', BlogTEMP[i]['details'])
				div.appendChild(a)

			if (BlogTEMP[i]['name'].slice(-1) == '') {
				a.innerHTML = BlogTEMP[i]['type'] + ' ' + BlogTEMP[i]['name'].substring(0, BlogTEMP[i]['name'].length - 1)
				var div1 = document.createElement('div')
					div1.setAttribute('class', 'pin')
					div1.setAttribute('title', 'Pinned')
					div1.innerHTML = ''
					div.appendChild(div1)
			} else {
				a.innerHTML = BlogTEMP[i]['type'] + ' ' + BlogTEMP[i]['name']
			}
		}
	}

	// 显示博客文章数量
	document.querySelector('.blog-num').innerHTML = BlogTEMP.length
	// 初始化搜索引擎
	document.onkeydown = function(e) {
		var ev = (typeof event!= 'undefined') ? window.event : e
			 if(ev.keyCode == 13) {
				return false
			}
	}
	$('#searchInput').on('keyup', function () {
		new env.f.search('.search-list', $('#searchInput'))
	})
	// 初始化列表高度
	if (BlogTEMP.length > 5) {
		$('#search').css('height', '165px')
		document.getElementById('searchInput').name = 5
	} else {
		$('#search').css('height', BlogTEMP.length * 22 +55 + 'px')
		document.getElementById('searchInput').name = BlogTEMP.length
	}



	// 通知
	var NoticeList = document.querySelector('.MenuCheck2-inner')
	for (var i = 0; i < 5; i++) {
		var div = document.createElement('div')
			div.setAttribute('class', 'news-box')
			div.innerHTML = '<span class="news-date" >' + env.data.list.notice[i]['date'] + '</span><span title="' + env.data.list.notice[i]['content'] + '" >' + env.data.list.notice[i]['event'] + '</span>'
			NoticeList.appendChild(div)
	}

}

// 变量快照
env.f.snapshot = function() {
	var result = []
	for (let key in window) {
		result.push({name: key, value: window[key]})
	}

	return result
}

// 弹窗
env.f.msg = function(content, time) {
	$('.message-box').html(content)
	$('.message').addClass('message-active')

	if (time != -1) {
		setTimeout(function (){
			$('.message').removeClass('message-active')
		}, time)
	}
}
	// 关闭消息框
	env.f.msg.close = function() {
		$('.message').removeClass('message-active')
	}

// 菜单
env.f.menu = {}
	env.f.menu.open = function() {
		if ($('ul').hasClass('wait') == true) {
			return
		}
		if ($('ul')
.hasClass('ok') != true) {
			$('ul')
.addClass('ok')
			$('ul')
.addClass('wait')
			env.f.initList()

			setTimeout(function (){
				$('ul')
.removeClass('wait')
				$('.menu').addClass('menu-active')
				$('btn2').fadeIn(300)
			}, 600)
		} else {
			$('.menu').addClass('menu-active')
			$('btn2').fadeIn(300)
		}
	}

		env.f.menu.close = function() {
 			$('.menu').removeClass('menu-active')
			$('btn2').fadeOut(300)
		}

	env.f.menu.c1 = function() {
		$('#search').css('transition', 'all 0.3s ease-out 0s')
		if($('#menu-check-1').hasClass('menu-check-active')!=true) {
			$('#menu-check-1').addClass('menu-check-active')
			$('#search').css('opacity', '1')
			$('#search').css('height', document.getElementById('searchInput').name * 22 +55 + 'px')
		} else {
			$('#menu-check-1').removeClass('menu-check-active')
			$('#search').css('height', '0px')
			$('#search').css('opacity', '0')
		}
	}

	env.f.menu.c2 = function() {
		if($('#menu-check-2').hasClass('menu-check-active')!=true) {
			$('#menu-check-2').addClass('menu-check-active')
			$('.MenuCheck2-inner').css('height', '120px')
			$('.MenuCheck2-inner').css('opacity', '1')
			$('.MenuCheck2-inner').css('overflow', 'visible')
		} else {
			$('#menu-check-2').removeClass('menu-check-active')
			$('.MenuCheck2-inner').css('height', '0px')
			$('.MenuCheck2-inner').css('opacity', '0')
			$('.MenuCheck2-inner').css('overflow', 'hidden')
		}
	}

	env.f.menu.c3 = function() {
		if($('#menu-check-3').hasClass('menu-check-active')!=true) {
			$('#menu-check-3').addClass('menu-check-active')
			$('.MenuCheck3-inner').css('height', '80px')
			$('.MenuCheck3-inner').css('opacity', '1')
		} else {
			$('#menu-check-3').removeClass('menu-check-active')
			$('.MenuCheck3-inner').css('height', '0px')
			$('.MenuCheck3-inner').css('opacity', '0')
		}
	}

env.f.page = {}
	// 博客页面加载动画
	env.f.page.load = function() {
		clearInterval(env.timer.t2)
		$('.loading').fadeIn(300)
		$('.pageloading1').css('display', 'none')

		env.tmp.t5 = new Date()
		env.timer.t2 = setInterval(() => {
			var t = new Date() - env.tmp.t5
			$('.loading span').html((t / 1000).toFixed(2))
			if (t >= 30000) {
				$('.loading err').fadeIn(150)
			}
		},100)
	}
		env.f.page.load.stop = function() {
			setTimeout(function (){
				clearInterval(env.timer.t2)
				env.tmp.t5 = null
				delete env.tmp.t5

				$('.loading').fadeOut(300)
			}, 1500)
			setTimeout(function (){
				$('.loading span').html()
				$('.loading err').css('display', 'none')
			}, 2000)
		}

	// 博客页面加载完成后调用
	env.f.page.ok = function(title) {
		if (title.slice(0, 1) == '-') {
			$('title').text('sumiyo.link ' + title)
		} else {
			$('title').text(title)
		}

		env.f.page.load.stop()
	}

env.f.typewriter1 = function() {
	$('.t-39').typed({
		strings: ['私のサイト、^400私一人の^200世界です。'],
		typeSpeed: 90,
		showCursor: false,
	})
}






// 设置环境变量
env.data.uptime = env.f.getDate()
env.data.browser = env.f.getBrowser()
env.data.change = 0

env.f.url.read()



// 设置全局监听器

// 接受博客页面的信号
window.addEventListener('message', function(event) {
	if (event.origin == 'null' || event.origin.includes('https://sumiyo.link')) {
		eval(event.data)
	}
})

// 页面加载完成后执行
window.addEventListener('load',function(){
	// 计算页面加载时间
	env.data.load = player.f.conversion2(((new Date() - new Date(env.tmp.t1)) / 1000).toFixed(3))
	env.tmp.t1 = null
	delete env.tmp.t1

	// 获取访问量
	if (env.data.isNetwork) {
		// 一周内的重复访问不计数
		if (env.f.getCookie('Cookie') == undefined) {
			var mode = 1
			env.data.isNew = true
		} else {
			var mode = 0
			env.data.isNew = false
		}

		fetch('https://sumiyo.link/counter.api', {
			method: "POST",
			headers: {
				"Token": mode
			}
		})
		.then(response => {return response.json()})
		.then(json => {
			env.data.visitors = parseFloat(json.results[0].content)
			$('#visit_counter').html(env.data.visitors)
			document.querySelector('footer').querySelectorAll('div')[1].removeAttribute('style')

			env.f.setCookie('Cookie !')
		})
	} else {
		$('#visit_counter').html = env.data.visitors
		document.querySelector('footer').querySelectorAll('div')[1].removeAttribute('style')
	}

})

// 检测到后退，前进时，直接关闭博客页面
$('iframe').on('load', function() {
	if (env.data.change != 1) {
		env.f.blog.close()
		env.data.change = 0
	} else {
		env.data.change = 0
	}
})






setTimeout(console.log.bind(
	console, 
	'\n%c THEME %c しろい花 %c		ver.' + env.data.version.main + '\n',
	'background-color: rgba(186, 138, 219, 0.9); color: white; font-weight: bolder;',
	'background-color: rgba(186, 138, 219, 0.5); color: white;',
	'color: rgba(192, 194, 194, 1);',
));



if (window.jQuery) {env.tmp.t2 = 'ok'}



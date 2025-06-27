


/*	player.js
 *	created by sumiyo, 2024/11/16

	*/


env.d.version.player = '1.0.243'
env.d.player = {
	'id': 0,
	'mode': 0,
	'vol': 0.5,
	'offsetTop': 240,
	'pause': true,
	'loop': false,
	'init': false,
	'ui': false,
	'lrc': {
		'timeline': [],
		'raw': null,
		'now': 0,
	},
}

env.e = {...env.e, ...{
	player: {
		audio: new Audio(),
		ui0: document.querySelector('.player-ui'),
		ui1: document.querySelector('.player-blog'),
		img: document.querySelectorAll('.player-ui img'),
		list: document.querySelectorAll('.player-ui list'),
		bar: [document.querySelector('.player-ui bar'), document.querySelector('.player-ui bar div div')],
		ctrl: document.querySelectorAll('.player-ui .ctrl a'),
	}
}}



env.f.player = {}

// 加载默认音乐数据
env.f.player.album = function(){
	return [
	{
		name: 'この空であなたを待ってる',
		artist: 'KOKIA',
		src: '1830163710',
		img: 'resCPZ3quIJPxdn1HDt3ww==/109951165811423814',
		lrc: true,
	},
	{
		name: 'ワタリドリ',
		artist: 'KOKIA',
		src: '2101452199',
		img: 'rLHKvau26Wt2KA5DJc_u6A==/109951169067925149',
		lrc: true,
	},
	{
		name: 'One Last Adventure',
		artist: 'Evan Call',
		src: '2116382384',
		img: '8RdmkeoexrTxI7PdasUkhA==/109951169761664617',
		lrc: false,
	},
	{
		name: "原風景",
		artist: 'mamomo & 丘咲アンナ',
		src: '33469247',
		img: 'ct9bs4VXR1mrbVRsX9iboA==/3372202162443903',
		lrc: true,
	},
	{
		name: 'カメリア',
		artist: '大神ミオ',
		src: '2110680224',
		img: 'JlxHCRJi7i4OjvxsqhImog==/109951169195605007',
		lrc: true,
	},
	{
		name: 'Calling (feat. marok)',
		artist: 'MAROK & mamomo',
		src: '1944649836',
		img: 'vrXsouN6rhgah68sHv4Akg==/109951169530454564',
		lrc: false,
	},
	{
		name: 'Dóchas',
		artist: 'Aaron Dolan & Florian Bur',
		src: '2165170302',
		img: 'sMtYDaEmC2VGAsjGPaKZdg==/109951169674040753',
		lrc: false,
	},
	{
		name: 'There Is Still Wonder Left To Behold',
		artist: 'reche',
		src: '2017419119',
		img: 'b4dFvmdWVTmHv6gKgdgzEQ==/109951168261721978',
		lrc: true,
	},
	{
		name: 'One Day',
		artist: 'KISNOU',
		src: '448316625',
		img: '9QkYHkN8UCiybMg-qHempw==/109951168047707020',
		lrc: false,
	},
	{
		name: 'leaving home',
		artist: 'Park Bird & Chance Thrash',
		src: '1847674458',
		img: 'FPZrJuBWnJKtR9_4zXmMOQ==/109951166009136375',
		lrc: false,
	},
	{
		name: '変わり行く世界のために',
		artist: '茶太',
		src: '697291',
		img: 'eiR5oFPitGtu1hzka4Vm5g==/814738116182197',
		lrc: true,
	},
	{
		name: 'Underground River (opening version ft.Raj Ramayya)',
		artist: 'Kevin Penkin',
		src: '509098783',
		img: 'yZndmoC6UEsRZeyonfjahg==/109951163031981246',
		lrc: true,
	},
	{
		name: 'The Return of Made in Abyss',
		artist: 'Kevin Penkin',
		src: '1417133244',
		img: 'srpaNYLLl_pK5-xprM9txQ==/109951164637587239',
		lrc: false,
	}]
}

env.f.player.load = function(e){
	// 加载音乐信息
	var id = e.dataset.id
	var name = e.dataset.name
	var artist = e.dataset.artist
	var img = e.dataset.img

	env.e.player.ui1.innerHTML = name
	env.e.player.audio.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`

	env.e.player.bar[1].style.width = '0px'
	env.e.player.ctrl[0].innerHTML = '00:00'

	env.e.player.img[0].setAttribute('style', 'opacity: 0;')
	env.e.player.img[1].setAttribute('style', 'opacity: 0;')
	env.f.root.fade(env.e.player.img[0], -300)
	env.f.root.fade(env.e.player.img[1], -300)

	// 为当前播放歌曲添加样式
	if (document.querySelector('.player-ui .active')) document.querySelector('.player-ui .active').removeAttribute('class')
	e.setAttribute('class', 'active')
	env.f.root.scroll(env.e.player.list[1], e.offsetTop - env.d.player.offsetTop, 500)


	setTimeout(function (){
		env.e.player.list[0].innerHTML = `<line>${name}<lrc></lrc><trans>${artist}</trans><trans></trans></line>`
		env.f.player.lrc.get((e.dataset.lrc == 'true') ? id : null)
		env.e.player.img[0].src = env.e.player.img[1].src = `https://p1.music.126.net/${img}.jpg?param=1000y1000`
		env.d.player.init ? env.f.player.play.set(1) : null
	}, 500)

	var l = env.e.player.list[1].children
	for (let i = 0; i < l.length; i++) {
		if (l[i] === e) {
			env.d.player.id = i
			break
		}
	}

	// 更新 Media Session API 信息
	if ('mediaSession' in navigator) {
		navigator.mediaSession.metadata = new MediaMetadata({
			title: name,
			artist: artist,
			album: '',
			artwork: [{
				src: `https://p1.music.126.net/${img}.jpg?param=1000y1000`,
				sizes: '',
				type: "image/jpg"
			}]
		})
	}
}

env.f.player.mode = function(){
	// 切换播放模式
	env.f.player.mode.set(env.d.player.loop ? 0 : 1)
}
	env.f.player.mode.set = function(bool){
		if (bool) {
			env.e.player.ctrl[3].innerHTML = ''
			env.e.player.ctrl[3].title = '单曲循环'
			env.d.player.loop = true
		} else {
			env.e.player.ctrl[3].innerHTML = ''
			env.e.player.ctrl[3].title = '列表循环'
			env.d.player.loop = false
		}
	}

env.f.player.playlist = function(a, replace = false){
	// 初始化播放列表
	if (replace) env.e.player.list[1].innerHTML = ''
	for (var i = 0; i < a.length; i++) {
		var line = document.createElement('line')
			line.setAttribute('onclick', "env.f.player.load(this)")
			line.setAttribute('data-img', a[i].img)
			line.setAttribute('data-id', a[i].src)
			line.setAttribute('data-lrc', a[i].lrc)
			line.setAttribute('data-name', a[i].name)
			line.setAttribute('data-artist', a[i].artist)
			line.innerHTML = `<lrc>${a[i].name}</lrc><trans>${a[i].artist}</trans>`
			env.e.player.list[1].appendChild(line)
	}
}

env.f.player.play = function(){
	// 播放 & 暂停
	env.f.player.play.set(env.d.player.pause ? 1 : 0)
}
	env.f.player.play.set = function(bool){
		if (bool) {
			env.e.player.audio.play()
			env.d.player.pause = false
			env.e.player.ui1.removeAttribute('style')
		} else {
			env.e.player.audio.pause()
			env.d.player.pause = true
		}
	}

env.f.player.add = function(str) {
	// 更新播放器列表
	var a = str['1']
	env.d.player.id = str['0'] ? 0 : env.e.player.list[1].children.length
	env.f.player.playlist(a, str['0'])
	env.f.player.load(env.e.player.list[1].children[env.d.player.id])
	env.d.player.init ? null : env.f.player.play.set(1)
}
	env.f.player.add.ask = function(str) {
		// 弹出询问框
		setTimeout(function (){
			if (str['0']) {
				env.f.root.prompt(`发现一个隐藏的播放列表！<br /><a onclick='env.f.player.add(` + JSON.stringify(str) + `);'>播放</a>`, 20000)
			} else {
				env.f.root.prompt(`发现 ` + str['1'].length + ` 首隐藏的音乐！<br /><a onclick='env.f.player.add(` + JSON.stringify(str) + `);'>播放</a>`, 20000)
			}
		}, 3000)
	}

env.f.player.reset = function() {
	// 重置歌单
	env.f.player.playlist(env.f.player.album(), true)
	env.f.player.load(env.e.player.list[1].children[0])
	env.f.root.scroll(env.e.player.ctrl[5], 500, 1)
	env.d.player.id = 0
	env.f.player.mode.set(0)
	env.f.root.fade(env.e.player.ctrl[4], -1)
}

env.f.player.lrc = {}
	env.f.player.lrc.get = function(id) {
		// 下载歌词
		env.d.player.lrc.timeline = []

		if (id) {
			fetch(`https://${env.d.domain}/src/lrc/${id}.lrc`)
			.then(response => {
				if (response.ok) {
					return response.text();
				}
			})
			.then(lrc => {
				env.f.player.lrc.load(lrc)
			})
			.catch(error => {
				console.error(error)
				var l = document.createElement('line')
					l.innerHTML = `<trans>歌词加载异常: ${error}</trans>`
					env.e.player.list[0].appendChild(l)
			})
		} else {
			if (env.e.player.ctrl[4].style.display != 'none') env.f.root.fade(env.e.player.ctrl[4], -1)
			env.d.player.lrc.raw = null
			env.d.player.lrc.now = 0
			env.d.player.lrc.timeline = []

			var l = document.createElement('line')
				l.innerHTML = '<trans>没有找到这首歌的歌词 ...</trans>'
				env.e.player.list[0].appendChild(l)
		}
	}

	env.f.player.lrc.load = function(str) {
		// 渲染歌词

		// 歌词信息
		env.d.player.lrc.raw = str
		env.d.player.lrc.now = 0
		env.d.player.lrc.timeline = []

		var p = str.includes('\n------------------------------\n') ? str.split('\n------------------------------\n') : [null, str]
		var lrc = p[1].split('\n')
		lrc.push("[59:59.999]")

		if (str.includes('<ruby>')) {
			env.f.root.fade(env.e.player.ctrl[4], 1)
		} else {
			if (env.e.player.ctrl[4].style.display != 'none') env.f.root.fade(env.e.player.ctrl[4], -1)
		}

		if (p[0]) env.e.player.list[0].children[0].querySelectorAll('trans')[1].innerHTML = '<br class="f-1" >' + p[0]
		for (var i = 0; i < lrc.length; i++) {
			env.d.player.lrc.timeline.push(env.f.root.conv.c2(lrc[i].slice(1, 10)))
			var l = document.createElement('line')
				l.innerHTML = `<lrc>${lrc[i].split('#')[0].slice(12) || ''}</lrc><trans>${lrc[i].split('#')[1] || ''}</trans>`
				env.e.player.list[0].appendChild(l)
		}
	}

	env.f.player.lrc.ui = function() {
		// 打开歌词页面
		if (env.d.player.ui) {
			env.d.player.ui = false
			env.f.root.fade(env.e.player.ui0, -160)
		} else {
			env.d.player.ui = true
			env.f.player.lrc.find(env.e.player.audio.currentTime)
			env.f.root.fade(env.e.player.ui0, 160)

			if (!env.d.player.init) {
				env.d.player.init = true
				env.f.root.scroll(env.e.player.ctrl[5], 500, 1)
				if (!env.d.isMobile) env.e.player.list[1].parentNode.style.height = env.e.player.img[1].parentNode.parentNode.clientHeight + 'px'
			}
		}
	}

	env.f.player.lrc.find = function(n) {
		// 找到当前正在播放的歌词行数
		if (env.d.player.lrc.timeline[0] != undefined) {
			for (var i = 0; i < 100; i++) {
				if (env.e.player.audio.currentTime <= env.d.player.lrc.timeline[i]) {
					env.e.player.list[0].children[env.d.player.lrc.now].removeAttribute('class')
					env.d.player.lrc.now = i
					if (i != 0) env.e.player.list[0].children[i].setAttribute('class', 'highlight')
					env.f.root.scroll(env.e.player.list[0], env.e.player.list[0].children[i].offsetTop - env.d.player.offsetTop, 500)
					break
				}
			}
		}
	}

	env.f.player.lrc.debug = function() {
		// 调试模式
		document.addEventListener('keydown', function(event) {
			if (event.key === 'Enter' || event.keyCode === 13) {
				console.log(env.f.root.conv.c0(env.e.player.audio.currentTime))
			}
		})

		var div = document.createElement('div')
			div.setAttribute('style', 'position: fixed; z-index: 50; bottom: 0;')
			div.innerHTML = `
				<pre style="background: white; margin: 0; font-family: 'Microsoft YaHei'; overflow: scroll; max-height: 500px;" >preview</pre>
				<textarea type="text" autocomplete="off" style="font-family: 'Microsoft YaHei';" ></textarea>
				<button onclick="document.querySelector('.player-ui pre').innerHTML = document.querySelector('.player-ui textarea').value" >preview</button>
				<button onclick="env.e.player.list[0].innerHTML = '<line><lrc>null</lrc><trans>null</trans><trans></trans></line>'; env.f.player.lrc.load(document.querySelector('.player-ui textarea').value); env.f.player.lrc.find(env.e.player.audio.currentTime)" >load</button>
			`
			document.querySelector('.player-ui').appendChild(div)
	}

env.f.player.kana = function() {
	// 假名注音
	if (env.e.player.list[0].classList.contains('no-kana')) {
		env.e.player.list[0].classList.remove('no-kana')
		env.e.player.ctrl[4].innerHTML = 'ア'
	} else {
		env.e.player.list[0].classList.add('no-kana')
		env.e.player.ctrl[4].innerHTML = 'あ'
	}
}

env.f.player.list = function(){
	// 切换列表
	env.f.player.list.set((env.e.player.list[0].style.display == '') ? 0 : 1)
}
	env.f.player.list.set = function(bool){
		if (bool) {
			env.e.player.list[1].style.display = 'none'
			env.e.player.list[0].removeAttribute('style')
			env.e.player.ctrl[1].innerHTML = '歌单'
			env.f.player.lrc.find(env.e.player.audio.currentTime)
		} else {
			env.e.player.list[0].style.display = 'none'
			env.e.player.list[1].removeAttribute('style')
			env.e.player.ctrl[1].innerHTML = '歌词'
		}
	}

env.f.player.next = function(n){
	// 切换歌曲
	if (n == -1) {
		// 上一首
		if (env.d.player.id == 0) env.d.player.id = env.e.player.list[1].childElementCount
		env.d.player.id --

		env.f.player.load(env.e.player.list[1].children[env.d.player.id])
	} else {
		// 下一首
		if (env.d.player.id == env.e.player.list[1].childElementCount - 1) env.d.player.id = -1
		env.d.player.id ++
		env.f.player.load(env.e.player.list[1].children[env.d.player.id])
	}
}




env.e.player.audio.preload = 'none'
env.f.player.playlist(env.f.player.album(), true)
env.f.player.load(env.e.player.list[1].children[0])

env.e.player.audio.volume = 0.5



// 进度条
setInterval(() => {
	if(!env.d.player.pause){
		env.e.player.bar[1].setAttribute('style', `width: ${(env.e.player.audio.currentTime * 100 / env.e.player.audio.duration || 1).toFixed(3) || 0}%`)
		env.e.player.ctrl[0].innerHTML = env.f.root.conv.c0(env.e.player.audio.currentTime * 1000).substring(0, 5)
	}
}, 1000)

// 进度调整
env.e.player.bar[0].addEventListener('click', function(event) {
	var p = ((event.clientX - env.e.player.bar[0].getBoundingClientRect().left) / env.e.player.bar[0].offsetWidth).toFixed(4)
	var now = Math.floor(env.e.player.audio.duration || 0) * p
	env.e.player.bar[1].setAttribute('style', `width: ${p * 100}%`)

	env.e.player.audio.currentTime = now
	env.f.player.lrc.find(now)
})

// 歌词显示
env.e.player.audio.addEventListener('timeupdate', function () {
	if (env.d.player.lrc.timeline[0] != undefined && env.d.player.lrc.timeline[env.d.player.lrc.now] <= env.e.player.audio.currentTime) {
		env.e.player.list[0].children[env.d.player.lrc.now].removeAttribute('class')
		env.d.player.lrc.now ++
		env.e.player.list[0].children[env.d.player.lrc.now].setAttribute('class', 'highlight')
		env.f.root.scroll(env.e.player.list[0], env.e.player.list[0].children[env.d.player.lrc.now].offsetTop - env.d.player.offsetTop, 500)
	}
})

// 列表播放
env.e.player.audio.addEventListener('ended', function () {
	if (env.d.player.loop) {
		env.e.player.audio.currentTime = 0
		env.d.player.lrc.now = 0
		env.f.player.lrc.find(0)
		env.f.player.play.set(1)
	} else {
		if (env.d.player.id == env.e.player.list[1].childElementCount - 1) env.d.player.id = -1
		env.d.player.id ++
		env.f.player.load(env.e.player.list[1].children[env.d.player.id])
	}
})

// 调整音量
env.e.player.ctrl[5].addEventListener('scroll', () => {
	var s = 100 - (env.e.player.ctrl[5].scrollTop / 10).toFixed(0)
	if (s < 0) var s = 0
	if (s > 100) var s = 100
	var s = (s / 10).toFixed(0) * 10

	env.e.player.ctrl[5].setAttribute('volume', s + '%')
	env.e.player.audio.volume = s / 100
	env.d.player.vol = s / 100
})

// 监听 Media Session API 按钮事件
if ('mediaSession' in navigator) {
	navigator.mediaSession.setActionHandler('previoustrack', () => {
		// 上一首
		env.f.player.next(-1)
	})
	navigator.mediaSession.setActionHandler('nexttrack', () => {

		// 下一首
		env.f.player.next(1)
	})
}

// 键盘监听
env.e.player.ui0.addEventListener('keydown', function(event) {
	var k = event.key

	if (k == ' ') {
		env.f.player.play()
	} else if (k == 'Escape') {
		env.f.player.lrc.ui()
	} else if (k == 'ArrowUp') {
		env.f.root.scroll(env.e.player.ctrl[5], -100, 10, false)
	} else if (k == 'ArrowDown') {
		env.f.root.scroll(env.e.player.ctrl[5], 100, 10, false)
	} else if (k == 'ArrowLeft') {
		env.f.player.next(-1)
	} else if (k == 'ArrowRight') {
		env.f.player.next(1)
	}
})



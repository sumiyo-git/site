


/*	player.js
 *	created by sumiyo, 2024/11/16

	*/



env.d.player = {
	'mode': 0,
	'pause': 1,
	'vol': 0.5,
	'loop': false,
	'offsetTop': 0,
	'init': false,
	'lrc': {
		'data': [],
		'now': 0,
		'open': 0,
	},
	'now': {
		'leng': 0,
		'now': 0,
		'id': 0,
		'per': 0,
	},

	'id': 0,
}

// 加载默认音乐数据
env.f.playlist = function(){
	return [{
		name: 'この空であなたを待ってる - KOKIA',
		src: '1830163710',
		img: 'resCPZ3quIJPxdn1HDt3ww==/109951165811423814',
		lrc: true,
	},
	{
		name: 'One Last Adventure - Evan Call',
		src: '2116382384',
		img: 'n21kvn_4tw2AFdVHJX4bjg==/109951169594833348',
		lrc: false,
	},
	{
		name: 'Goodbye for Now, Eisen - Evan Call',
		src: '2146700515',
		img: 'n21kvn_4tw2AFdVHJX4bjg==/109951169594833348',
		lrc: false,
	},
	{
		name: "原風景 - mamomo & 丘咲アンナ",
		src: '33469247',
		img: 'ct9bs4VXR1mrbVRsX9iboA==/3372202162443903',
		lrc: true,
	},
	{
		name: 'ワタリドリ - KOKIA',
		src: '2101452199',
		img: 'rLHKvau26Wt2KA5DJc_u6A==/109951169067925149',
		lrc: true,
		},
	{
		name: 'Calling - MAROK & mamomo',
		src: '1944649836',
		img: 'vrXsouN6rhgah68sHv4Akg==/109951169530454564',
		lrc: false,
	},
	{
		name: 'Friend - Kozoro',
		src: '33004707',
		img: 'FR7zKYB8ujNRoWQuGCHbGg==/109951163288692527',
		lrc: false,
	},
	{
		name: 'Together - Bcalm & Purrple Cat',
		src: '1916742663',
		img: 'zJBR2s3mTC06Z-v4npw2Jw==/109951168736565471',
		lrc: false,
	},
	{
		name: 'Have You Ever - Darsena & eugenio izzi',
		src: '1980987766',
		img: 'rrUDhlEJKRBdz-1JcsUAFw==/109951169990022823',
		lrc: false,
	},
	{
		name: 'Gusts of Wind Blowing in Different Directions - The Last Dinosaur',
		src: '19498811',
		img: 'f3exPjEKfsnrQbsUqUlb2w==/109951169557730207',
		lrc: false,
	},
	{
		name: 'Figlia del cielo III - Roberto Cacciapaglia & Royal Philharmonic Orchestra',
		src: '18495513',
		img: '174ug-Xg_-IJ4aRxWs8SxQ==/109951167699550669',
		lrc: false,
	},
	{
		name: 'Flight of the Inner Bird - Sivan Talmor & Yehezkel Raz',
		src: '1807891944',
		img: 'fvX-PBuiZthCkZi6yZ6WnQ==/109951167146867364',
		lrc: false,
	},
	{
		name: 'There Is Still Wonder Left To Behold - reche',
		src: '2017419119',
		img: 'b4dFvmdWVTmHv6gKgdgzEQ==/109951168261721978',
		lrc: true,
	},
	{
		name: 'One Day - KISNOU',
		src: '448316625',
		img: '9QkYHkN8UCiybMg-qHempw==/109951168047707020',
		lrc: false,
	},
	{
		name: 'like water - Park Bird & Chance Thrash',
		src: '1847674461',
		img: 'FPZrJuBWnJKtR9_4zXmMOQ==/109951166009136375',
		lrc: false,
	},
	{
		name: '変わり行く世界のために - 茶太',
		src: '697291',
		img: 'eiR5oFPitGtu1hzka4Vm5g==/814738116182197',
		lrc: true,
	},
	{
		name: 'bliss - milet',
		src: '2122535814',
		img: 'b66bKUxVNZlC_S_3u7UCaA==/109951169268030489',
		lrc: true,
	},
	{
		name: 'Hanezeve Caradhina (ft.Takeshi Saito) - Kevin Penkin',
		src: '509098792',
		img: 'yZndmoC6UEsRZeyonfjahg==/109951163031981246',
		lrc: true,
	},
	{
		name: 'The Return of Made in Abyss - Kevin Penkin',
		src: '1417631425',
		img: 'srpaNYLLl_pK5-xprM9txQ==/109951164637587239',
		lrc: false,
	},
	{
		name: 'この空であなたを待ってる inst. - KOKIA',
		src: '1830163712',
		img: 'resCPZ3quIJPxdn1HDt3ww==/109951165811423814',
		lrc: true,
	}]
}



env.f.player = {}

env.e = { ...env.e, ...{
	p: {
		ui: document.querySelector('.player-ui'),
		btn: document.querySelector('.player a'),
		audio: document.querySelector('.player audio'),
		name: document.querySelector('.player span'),
		img: document.querySelectorAll('.player-ui img'),
		trans: document.querySelector('.player-ui .lrc trans'),
		time: document.querySelector('.player-ui .time a'),

		menu: document.querySelector('.player-menu'),
		mode: document.querySelector('.player-header-right a'),

		list: document.querySelectorAll('.player-ui list'),

		bar0: document.querySelector('.player-bar0'),
		bar1: document.querySelector('.player-bar1 div'),


		input: document.querySelector('.player-ui textarea'),
		pCtrl: document.querySelectorAll('.player-ui .ctrl a'),
	}
}}


env.f.player.load = function(e){
	// 加载音乐信息
	var id = e.dataset.id
	var img = e.dataset.img
	var name = e.dataset.name
	var lrc = e.dataset.lrc

	env.e.p.name.innerHTML = name.split(' - ')[0].split('(')[0]
	env.e.p.audio.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`

	env.e.p.bar1.style.width = '0px'
	env.d.player.now.per = 0

	env.e.p.img[0].setAttribute('style', 'opacity: 0;')
	env.e.p.img[1].setAttribute('style', 'opacity: 0;')
	env.f.fade(env.e.p.img[0], -300)
	env.f.fade(env.e.p.img[1], -300)

	// 为当前播放歌曲添加样式
	if (document.querySelector('.player-ui .active')) document.querySelector('.player-ui .active').removeAttribute('class')
	e.setAttribute('class', 'active')
	env.f.scroll(env.e.p.list[1], e.offsetTop - env.d.player.offsetTop, 500)

	// 加载歌词
	setTimeout(function (){
		env.e.p.list[0].innerHTML = `<line style="margin-top: ` + env.d.player.offsetTop + `px" >${name.split(' - ')[0]}<lrc></lrc><trans>${name.split(' - ')[1]}</trans></line>`
		env.f.lrc.get((lrc == 'true') ? id : null)

		env.e.p.img[0].src = env.e.p.img[1].src = `https://p1.music.126.net/${img}.jpg?param=600y600`

		if (!isNaN(env.e.p.audio.duration)) {
			env.d.player.now.leng = env.e.p.audio.duration
		}

		!env.d.player.pause ? env.f.play.set(1) : null
	}, 500)

	var l = env.e.p.list[1].children
	for (let i = 0; i < l.length; i++) {
		if (l[i] === e) {
			env.d.player.id = i
			break
		}
	}
}

env.f.mode = function(){
	// 切换播放模式
	env.f.mode.set(env.e.p.audio.loop ? 0 : 1)
}
	env.f.mode.set = function(bool){
		if (bool) {
			env.e.p.pCtrl[3].innerHTML = ''
			env.e.p.pCtrl[3].title = '单曲循环'
			env.e.p.audio.loop = env.d.player.loop = true
		} else {
			env.e.p.pCtrl[3].innerHTML = ''
			env.e.p.pCtrl[3].title = '列表循环'
			env.e.p.audio.loop = env.d.player.loop = false
		}
	}

env.f.list = function(a, m = 'add'){
	// 初始化播放列表
	if (m != 'add') env.e.p.list[1].innerHTML = ''
	for (var i = 0; i < a.length; i++) {
		var line = document.createElement('line')
			line.setAttribute('onclick', "env.f.player.load(this)")
			line.setAttribute('data-img', a[i].img)
			line.setAttribute('data-id', a[i].src)
			line.setAttribute('data-lrc', a[i].lrc)
			line.setAttribute('data-name', a[i].name)
			env.e.p.list[1].appendChild(line)

			var s1 = document.createElement('lrc')
				s1.innerHTML = a[i].name.split('-')[0]
				line.appendChild(s1)

			var s2 = document.createElement('trans')
				s2.innerHTML = a[i].name.split('-')[1]
				line.appendChild(s2)
	}

//	env.e.p.list = document.querySelectorAll('.player-list line')
//	env.e.p.list[env.d.player.now.id].setAttribute('class', 'active')
}

env.f.play = function(){
	// 播放 & 暂停
	env.f.play.set(env.d.player.pause ? 1 : 0)
}
	env.f.play.set = function(bool){
		if (bool) {
			env.e.p.audio.volume = 0
			env.d.player.pause = 0
			env.e.p.audio.play()

			env.e.p.audio.currentTime = (env.e.p.audio.duration * env.d.player.now.per) || 0
			env.e.p.audio.volume = env.d.player.vol

			env.e.p.btn.innerHTML = '暂停'
		} else {
			env.e.p.audio.pause()
			env.d.player.pause = 1

			env.e.p.btn.innerHTML = '播放'
		}
	}

	env.f.play.start = function(id, autoplay){
		// 函数调用播放器
		env.d.player.now.id = id
		env.f.load()

		setTimeout(function (){env.f.play.set(autoplay ? 1 : 0)}, 500)
		return env.d.list.playlist[id].name
	}

env.f.add = function(str) {
	// 更新播放器列表
	env.d.list.playlist = [str]

	env.d.player.now.id = 0
	env.d.player.num = 1

	if (env.e.p.list[1].length) env.f.list()
	env.f.load()
	env.f.play.set(1)
}
	env.f.add.ask = function(str) {
		setTimeout(function (){
			env.f.notification.open(str.name + `<br /><div><a onclick='env.f.add(` + JSON.stringify(str) + `); env.f.notification.close()'>播放</a> | <a onclick="env.f.notification.close()" >关闭</a></div>`, 20000)
		}, 3000)
	}

env.f.reset = function() {
	// 重置歌单
	env.d.list.playlist = env.f.data()
	env.d.player.num = env.d.list.playlist.length
	env.d.player.now.id = 0
	env.f.list()
	env.f.load()
	env.f.mode.set(0)
}

env.f.vol = function(n) {
	// 调整音量
	env.e.p.audio.volume = n
}

env.f.lrc = {}
	env.f.lrc.get = function(id) {
		// 下载歌词
		env.d.player.lrc.data = []
		env.d.player.lrc.leng = 0

		if (id) {
			fetch(`https://${env.d.domain}/src/lrc/${id}.lrc`)
			.then(response => {
				if (response.ok) {
					return response.text();
				}
			})
			.then(lrc => {
				lrc = lrc.split('\n')
				lrc.push("[59:59.999]")

				// 渲染歌词
				env.d.player.lrc.data = lrc
				env.d.player.lrc.now = 0

				for (var i = 0; i < lrc.length; i++) {
					var line = document.createElement('line')
						env.e.p.list[0].appendChild(line)

					var s1 = document.createElement('lrc')
						s1.innerHTML = lrc[i].split('#')[0].slice(12) || ''
						line.appendChild(s1)

					var s2 = document.createElement('trans')
						s2.innerHTML = lrc[i].split('#')[1] || ''
						line.appendChild(s2)
				}
			})
			.catch(error => {
				console.error(error)
//				setTimeout(function (){env.f.fade(env.e.p.list[0], 200)}, 1000)

				var line = document.createElement('line')
					env.e.p.list[0].appendChild(line)

				var s1 = document.createElement('trans')
					s1.innerHTML = '歌词加载异常: ' + error
					line.appendChild(s1)
			})
		} else {
			var line = document.createElement('line')
				env.e.p.list[0].appendChild(line)

			var s1 = document.createElement('trans')
				s1.innerHTML = '没有歌词的纯音乐哦'
				line.appendChild(s1)
		}
	}

	env.f.lrc.ui = function() {
		// 打开歌词页面
		if (env.d.player.lrc.open) {
			env.d.player.lrc.open = 0
			env.f.fade(env.e.p.ui, -160)
		} else {
			env.d.player.lrc.open = 1
			env.f.lrc.find(env.e.p.audio.currentTime)
			env.f.fade(env.e.p.ui, 160)

			if (!env.d.player.init) {
				env.d.player.init = true
				env.f.scroll(env.e.p.pCtrl[4], 500, 1)
				env.d.isMobile ? (env.d.player.offsetTop = 70) : (env.d.player.offsetTop = Math.max((window.innerHeight - env.e.p.img[1].parentNode.parentNode.clientHeight) / 2, 0))
				env.e.p.list[0].children[0].setAttribute('style', 'margin-top: ' + env.d.player.offsetTop + 'px')
			}
		}
	}

	env.f.lrc.find = function(n) {
		// 找到当前正在播放的歌词行数
		if (env.d.player.lrc.data[0]) {
			for (var i = 0; i < 100; i++) {
				if (env.e.p.audio.currentTime <= env.f.conv1((env.d.player.lrc.data[i]).substring(1, 10))) {
					env.e.p.list[0].children[env.d.player.lrc.now].removeAttribute('class')
					env.d.player.lrc.now = i
					env.e.p.list[0].children[i].setAttribute('class', 'highlight')
					env.f.scroll(env.e.p.list[0], env.e.p.list[0].children[i].offsetTop - env.d.player.offsetTop, 500)
					break
				}
			}
		}
	}

	env.f.lrc.debug = function() {
		// 调试模式
		document.addEventListener('keydown', function(event) {
			if (event.key === 'Enter' || event.keyCode === 13) {
				console.log(env.f.conv0(env.e.p.audio.currentTime))
			}
		});

		var div = document.createElement('div')
			div.setAttribute('style', 'position: fixed; z-index: 50; bottom: 0;')
			div.innerHTML = `
				<pre style="background: white; margin: 0; font-family: 'Microsoft YaHei'; overflow: scroll; max-height: 500px;" >preview</pre>
				<textarea type="text" autocomplete="off" style="font-family: 'Microsoft YaHei';" ></textarea>
					<button onclick="document.querySelector('.player-ui pre').innerHTML = document.querySelector('.player-ui textarea').value" >preview</button>
					<button onclick="env.f.lrc.load(document.querySelector('.player-ui textarea').value)" >load</button>
			`
			document.querySelector('.player-ui').appendChild(div)
	}

env.f.kana = function() {
	// 假名注音
	if (env.e.p.list[0].classList.contains('no-kana')) {
		env.e.p.list[0].classList.remove('no-kana')
	} else {
		env.e.p.list[0].classList.add('no-kana')
	}
}

env.f.player.list = function(){
	// 切换列表
	env.f.player.list.set((env.e.p.list[0].style.display == '') ? 0 : 1)
}
	env.f.player.list.set = function(bool){
		if (bool) {
			env.e.p.list[1].style.display = 'none'
			env.e.p.list[0].removeAttribute('style')
			env.e.p.pCtrl[1].innerHTML = '歌单'
		} else {
			env.e.p.list[0].style.display = 'none'
			env.e.p.list[1].removeAttribute('style')
			env.e.p.pCtrl[1].innerHTML = '歌词'
		}
	}







env.d.version.player = '1.0.24a'

env.f.list(env.f.playlist(), 'replace')
env.f.player.load(env.e.p.list[1].children[0])


env.e.p.audio.volume = 0.5

// 进度条
setInterval(() => {
	if(!env.d.player.pause){
		env.d.player.now.per = (env.e.p.audio.currentTime / env.e.p.audio.duration).toFixed(8) || env.d.player.now.per
		env.e.p.bar1.setAttribute('style', `width: ${env.d.player.now.per * 100}%`)
		env.e.p.pCtrl[0].innerHTML = env.f.conv0(env.e.p.audio.currentTime * 1000).substring(0, 5)
	}
}, 1000)

// 进度调整
env.e.p.bar0.addEventListener('click', function(event) {
	var p = ((event.clientX - env.e.p.bar0.getBoundingClientRect().left) / env.e.p.bar0.offsetWidth).toFixed(4)
	var now = Math.floor(env.e.p.audio.duration || env.d.player.now.leng) * p
	env.e.p.bar1.setAttribute('style', `width: ${p * 100}%`)
	env.d.player.now.per = p

	env.e.p.audio.currentTime = now
	env.f.lrc.find(now)

//	if (!env.d.player.pause) env.e.p.audio.currentTime = now
//	if (env.d.player.lrc.leng) env.e.p.list[0].parentNode.setAttribute('style', 'opacity: 0; pointer-events: none;')


})

// 歌词显示
env.e.p.audio.addEventListener('timeupdate', function () {
	if (env.d.player.lrc.data[0]) {
		if (env.f.conv1((env.d.player.lrc.data[env.d.player.lrc.now]).substring(1, 10)) - 1 <= env.e.p.audio.currentTime) {

			env.e.p.list[0].children[env.d.player.lrc.now].removeAttribute('class')
			env.d.player.lrc.now ++
			env.e.p.list[0].children[env.d.player.lrc.now].setAttribute('class', 'highlight')
			env.f.scroll(env.e.p.list[0], env.e.p.list[0].children[env.d.player.lrc.now].offsetTop - env.d.player.offsetTop, 500)

		} else if (env.d.player.loop && ((env.e.p.audio.duration - env.e.p.audio.currentTime) <= 1)) {
			// 单曲循环时重置歌词
			env.d.player.lrc.now = 0
		}
	}
})

// 列表播放
env.e.p.audio.addEventListener('ended', function () {
	if (env.d.player.id == env.e.p.list[1].childElementCount - 1) env.d.player.id = -1
	env.d.player.id ++
	env.f.player.load(env.e.p.list[1].children[env.d.player.id])
})

// 调整音量
env.e.p.pCtrl[4].addEventListener('scroll', () => {
	var s = 100 - (env.e.p.pCtrl[4].scrollTop / 10).toFixed(0)
	if (s < 0) var s = 0
	if (s > 100) var s = 100
	var s = (s / 10).toFixed(0) * 10

	env.e.p.pCtrl[4].setAttribute('volume', s + '%')
	env.e.p.audio.volume = s / 100
	env.d.player.vol = s / 100
})

// 键盘监听
env.e.p.ui.addEventListener('keydown', function(event) {
	var k = event.key

	if (k == ' ') {
		env.f.play()
	} else if (k == 'Escape') {
		env.f.lrc.ui()
	} else if (k == 'ArrowUp') {
		env.f.scroll(env.e.p.s1, -100, 10, false)
	} else if (k == 'ArrowDown') {
		env.f.scroll(env.e.p.s1, 100, 10, false)
	}
})






/*	player.js
 *	created by sumiyo, 2024/11/16

	*/


env.d.version.player = '1.0.241'
env.d.player = {
	'id': 0,
	'mode': 0,
	'vol': 0.5,
	'offsetTop': 0,
	'pause': true,
	'loop': false,
	'init': false,
	'ui': false,
	'lrc': {
		'data': [],
		'now': 0,
	},
}

env.e = {...env.e, ...{
	player: {
		ui0: document.querySelector('.player-1'),
		ui1: document.querySelector('.blog .player-2'),
		btn: document.querySelector('.player-0 a'),
		audio: document.querySelector('.player-0 audio'),
		name: document.querySelector('.player-0 span'),
		img: document.querySelectorAll('.player-1 img'),
		list: document.querySelectorAll('.player-1 list'),
		bar: [document.querySelector('.player-1 bar'), document.querySelector('.player-1 bar div div')],
		ctrl: document.querySelectorAll('.player-1 .ctrl a'),
	}
}}



env.f.player = {}

// 加载默认音乐数据
env.f.player.album = function(){
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

env.f.player.load = function(e){
	// 加载音乐信息
	var id = e.dataset.id
	var img = e.dataset.img
	var name = e.dataset.name
	var lrc = e.dataset.lrc

	env.e.player.name.innerHTML = env.e.player.ui1.innerHTML = name.split(' - ')[0].split('(')[0]
	env.e.player.audio.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`

	env.e.player.bar[1].style.width = '0px'
	env.e.player.ctrl[0].innerHTML = '00:00'

	env.e.player.img[0].setAttribute('style', 'opacity: 0;')
	env.e.player.img[1].setAttribute('style', 'opacity: 0;')
	env.f.root.fade(env.e.player.img[0], -300)
	env.f.root.fade(env.e.player.img[1], -300)

	// 为当前播放歌曲添加样式
	if (document.querySelector('.player-1 .active')) document.querySelector('.player-1 .active').removeAttribute('class')
	e.setAttribute('class', 'active')
	env.f.root.scroll(env.e.player.list[1], e.offsetTop - env.d.player.offsetTop, 500)

	setTimeout(function (){
		env.e.player.list[0].innerHTML = `<line style="margin-top: ` + env.d.player.offsetTop + `px" >${name.split(' - ')[0]}<lrc></lrc><trans>${name.split(' - ')[1]}</trans></line>`
		env.f.player.lrc.get((lrc == 'true') ? id : null)

		env.e.player.img[0].src = env.e.player.img[1].src = `https://p1.music.126.net/${img}.jpg?param=600y600`

		if (!isNaN(env.e.player.audio.duration)) {
			env.d.player.now.leng = env.e.player.audio.duration
		}

		!env.d.player.pause ? env.f.player.play.set(1) : null
	}, 500)

	var l = env.e.player.list[1].children
	for (let i = 0; i < l.length; i++) {
		if (l[i] === e) {
			env.d.player.id = i
			break
		}
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
			env.e.player.list[1].appendChild(line)

			var s1 = document.createElement('lrc')
				s1.innerHTML = a[i].name.split('-')[0]
				line.appendChild(s1)

			var s2 = document.createElement('trans')
				s2.innerHTML = a[i].name.split('-')[1]
				line.appendChild(s2)
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
			env.e.player.btn.innerHTML = '暂停'
			env.f.root.fade(env.e.player.ui1, 300)
		} else {
			env.e.player.audio.pause()
			env.d.player.pause = true
			env.e.player.btn.innerHTML = '播放'
			env.f.root.fade(env.e.player.ui1, -300)
		}
	}

env.f.player.add = function(str) {
	// 更新播放器列表
	var a = str['1']
	env.d.player.id = str['0'] ? 0 : env.e.player.list[1].children.length
	env.f.player.playlist(a, str['0'])
	env.f.player.load(env.e.player.list[1].children[env.d.player.id])
	env.d.player.pause = false
}
	env.f.player.add.ask = function(str) {
		// 弹出询问框
		setTimeout(function (){
			if (str['0']) {
				env.f.root.prompt(`发现一个隐藏的播放列表！<br /><a onclick='env.f.player.add(` + JSON.stringify(str) + `);'>播放</a>`, 20000)
			} else {
				env.f.root.prompt(`发现 ` + str['1'].length + ` 只隐藏的歌曲！<br /><a onclick='env.f.player.add(` + JSON.stringify(str) + `);'>播放</a>`, 20000)
			}
		}, 3000)
	}

env.f.player.reset = function() {
	// 重置歌单
	env.f.player.playlist(env.f.player.album(), true)
	env.f.player.load(env.e.player.list[1].children[0])
	env.f.root.scroll(env.e.player.ctrl[4], 500, 1)
	env.d.player.id = 0
	env.f.player.mode.set(0)
}

env.f.player.lrc = {}
	env.f.player.lrc.get = function(id) {
		// 下载歌词
		env.d.player.lrc.data = []

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
						env.e.player.list[0].appendChild(line)

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

				var line = document.createElement('line')
					env.e.player.list[0].appendChild(line)

				var s1 = document.createElement('trans')
					s1.innerHTML = '歌词加载异常: ' + error
					line.appendChild(s1)
			})
		} else {
			var line = document.createElement('line')
				env.e.player.list[0].appendChild(line)

			var s1 = document.createElement('trans')
				s1.innerHTML = '没有歌词的纯音乐哦'
				line.appendChild(s1)
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
				env.f.root.scroll(env.e.player.ctrl[4], 500, 1)
				env.d.isMobile ? (env.d.player.offsetTop = 70) : (env.d.player.offsetTop = Math.max((window.innerHeight - env.e.player.img[1].parentNode.parentNode.clientHeight) / 2, 0))
				env.e.player.list[0].children[0].setAttribute('style', 'margin-top: ' + env.d.player.offsetTop + 'px')
			}
		}
	}

	env.f.player.lrc.find = function(n) {
		// 找到当前正在播放的歌词行数
		if (env.d.player.lrc.data[0]) {
			for (var i = 0; i < 100; i++) {
				if (env.e.player.audio.currentTime <= env.f.root.conv.c1((env.d.player.lrc.data[i]).substring(1, 10))) {
					env.e.player.list[0].children[env.d.player.lrc.now].removeAttribute('class')
					env.d.player.lrc.now = i
					env.e.player.list[0].children[i].setAttribute('class', 'highlight')
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
		});

		var div = document.createElement('div')
			div.setAttribute('style', 'position: fixed; z-index: 50; bottom: 0;')
			div.innerHTML = `
				<pre style="background: white; margin: 0; font-family: 'Microsoft YaHei'; overflow: scroll; max-height: 500px;" >preview</pre>
				<textarea type="text" autocomplete="off" style="font-family: 'Microsoft YaHei';" ></textarea>
					<button onclick="document.querySelector('.player-1 pre').innerHTML = document.querySelector('.player-1 textarea').value" >preview</button>
					<button onclick="env.f.player.lrc.load(document.querySelector('.player-1 textarea').value)" >load</button>
			`
			document.querySelector('.player-1').appendChild(div)
	}

env.f.player.kana = function() {
	// 假名注音
	if (env.e.player.list[0].classList.contains('no-kana')) {
		env.e.player.list[0].classList.remove('no-kana')
	} else {
		env.e.player.list[0].classList.add('no-kana')
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
		} else {
			env.e.player.list[0].style.display = 'none'
			env.e.player.list[1].removeAttribute('style')
			env.e.player.ctrl[1].innerHTML = '歌词'
		}
	}






env.f.player.playlist(env.f.player.album(), true)
env.f.player.load(env.e.player.list[1].children[0])

env.e.player.audio.volume = 0.5

// 进度条
setInterval(() => {
	if(!env.d.player.pause){
		env.e.player.bar[1].setAttribute('style', `width: ${(env.e.player.audio.currentTime * 100 / env.e.player.audio.duration).toFixed(3) || 0}%`)
		env.e.player.ctrl[0].innerHTML = env.f.root.conv.c0(env.e.player.audio.currentTime * 1000).substring(0, 5)
	}
}, 1000)

// 进度调整
env.e.player.bar[0].addEventListener('click', function(event) {
	var p = ((event.clientX - env.e.player.bar[0].getBoundingClientRect().left) / env.e.player.bar[0].offsetWidth).toFixed(4)
	var now = Math.floor(env.e.player.audio.duration || env.d.player.now.leng) * p
	env.e.player.bar[1].setAttribute('style', `width: ${p * 100}%`)

	env.e.player.audio.currentTime = now
	env.f.player.lrc.find(now)
})

// 歌词显示
env.e.player.audio.addEventListener('timeupdate', function () {
	if (env.d.player.lrc.data[0]) {
		if (env.f.root.conv.c1((env.d.player.lrc.data[env.d.player.lrc.now]).substring(1, 10)) - 1 <= env.e.player.audio.currentTime) {
			env.e.player.list[0].children[env.d.player.lrc.now].removeAttribute('class')
			env.d.player.lrc.now ++
			env.e.player.list[0].children[env.d.player.lrc.now].setAttribute('class', 'highlight')
			env.f.root.scroll(env.e.player.list[0], env.e.player.list[0].children[env.d.player.lrc.now].offsetTop - env.d.player.offsetTop, 500)
		}
	}
})

// 列表播放
env.e.player.audio.addEventListener('ended', function () {
	if (env.d.player.loop) {
		env.e.player.audio.currentTime = 0
		env.d.player.lrc.now = 0
	} else {
		if (env.d.player.id == env.e.player.list[1].childElementCount - 1) env.d.player.id = -1
		env.d.player.id ++
		env.f.player.load(env.e.player.list[1].children[env.d.player.id])
	}
})

// 调整音量
env.e.player.ctrl[4].addEventListener('scroll', () => {
	var s = 100 - (env.e.player.ctrl[4].scrollTop / 10).toFixed(0)
	if (s < 0) var s = 0
	if (s > 100) var s = 100
	var s = (s / 10).toFixed(0) * 10

	env.e.player.ctrl[4].setAttribute('volume', s + '%')
	env.e.player.audio.volume = s / 100
	env.d.player.vol = s / 100
})

// 键盘监听
env.e.player.ui0.addEventListener('keydown', function(event) {
	var k = event.key

	if (k == ' ') {
		env.f.player.play()
	} else if (k == 'Escape') {
		env.f.player.lrc.ui()
	} else if (k == 'ArrowUp') {
		env.f.root.scroll(env.e.player.s1, -100, 10, false)
	} else if (k == 'ArrowDown') {
		env.f.root.scroll(env.e.player.s1, 100, 10, false)
	}
})



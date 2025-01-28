


/*	player.js
 *	created by sumiyo, 2024/11/16

	*/



const player = {
	'f': {},
	'data': {
		'mode': 0,
		'pause': 1,
		'vol': 0.5,
		'loop': false,
		'lrc': {
			'data': null,
			'leng': 0,
			'now': 0,
			'open': 0,
		},
		'timer': {},
		'now': {
			'leng': 0,
			'now': 0,
			'id': 0,
		},
	},
}

// 加载音乐信息
player.f.data = function(){
	return [

	{
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
		name: 'この空であなたを待ってる inst. - KOKIA',
		src: '1830163712',
		img: 'resCPZ3quIJPxdn1HDt3ww==/109951165811423814',
		lrc: true,
	},

	]

}



player.list = player.f.data()
player.data.num = player.list.length
env.data.version.player = '1.0.24a'

player.e = {
		ui: document.querySelector('.player-ui'),
		btn: document.querySelector('.player a'),
		audio: document.querySelector('.player audio'),
		name: document.querySelector('.player span'),
		img: document.querySelector('.player-ui img'),
		lrc: document.querySelector('.player-ui .lrc span'),
		trans: document.querySelector('.player-ui .lrc trans'),
		time: document.querySelector('.player-ui .time a'),

		menu: document.querySelector('.player-menu'),
		mode: document.querySelector('.player-header-right a'),
		list_body: document.querySelector('.player-list'),
		list: document.querySelectorAll('.player-list a'),
		s1: document.querySelector('.player-sound1'),
		s2: document.querySelector('.player-sound0'),
		bar0: document.querySelector('.player-bar0'),
		bar1: document.querySelector('.player-bar1 div'),
	}



player.f.load = function(){
	// 加载音乐信息
	var id = player.data.now.id

	player.e.name.innerHTML = player.list[id].name
	player.e.audio.src = 'https://music.163.com/song/media/outer/url?id=' + player.list[id].src + '.mp3'
	player.e.bar1.style.width = '0px'
	player.data.now.per = 0

	player.e.lrc.parentNode.setAttribute('style', 'opacity: 0; pointer-events: none;')
	player.e.img.setAttribute('style', 'opacity: 0;')
	env.f.fade(player.e.img, -300)

	// 为当前播放歌曲添加样式
	if (player.e.list[id]) {
		document.querySelector('.player-ui .active').removeAttribute('class')
		player.e.list[id].setAttribute('class', 'active')
		env.f.scroll(player.e.list_body, player.e.list[0].offsetHeight * (player.data.now.id - 3), 300)
	}

	// 加载歌词
	player.f.lrc.get()
	setTimeout(function (){
		player.e.lrc.innerHTML = player.list[id].name.split(' - ')[0]
		player.e.trans.innerHTML = player.list[id].name.split(' - ')[1]
		player.e.lrc.parentNode.setAttribute('style', 'opacity: 1')
		player.e.img.src = 'https://p1.music.126.net/' + player.list[id].img + '.jpg?param=600y600'

		if (!isNaN(player.e.audio.duration)) {
			player.data.now.leng = player.e.audio.duration
		}
	}, 500)
}

player.f.mode = function(){
	// 切换播放模式
	player.f.mode.set(player.e.audio.loop ? 0 : 1)
}
	player.f.mode.set = function(bool){
		if (bool) {
			player.e.mode.innerHTML = ''
			player.e.mode.title = '单曲循环'
			player.e.audio.loop = player.data.loop = true
		} else {
			player.e.mode.innerHTML = ''
			player.e.mode.title = '列表循环'
			player.e.audio.loop = player.data.loop = false
		}
	}

player.f.list = function(){
	// 初始化播放列表
	player.e.list_body.innerHTML = ''
	for (var i = 0; i < player.data.num; i++) {
		var a = document.createElement('a')
			a.innerHTML = player.list[i].name.split('-')[0]
			a.setAttribute('onclick', 'player.f.play.start(' + i + ', 1)')
			a.setAttribute('title', player.list[i].name)

		player.e.list_body.appendChild(a)
	}

	player.e.list = document.querySelectorAll('.player-list a')
	player.e.list[player.data.now.id].setAttribute('class', 'active')
	env.f.scroll(player.e.s1, 600, 10)
}

player.f.play = function(){
	// 播放 & 暂停
	player.f.play.set(player.data.pause ? 1 : 0)
}
	player.f.play.set = function(bool){
		if (bool) {
			player.e.audio.volume = 0
			player.data.pause = 0
			player.e.audio.play()

			player.e.audio.currentTime = (player.e.audio.duration * player.data.now.per) || 0
			player.e.audio.volume = player.data.vol

			player.e.btn.innerHTML = '暂停'
		} else {
			player.e.audio.pause()
			player.data.pause = 1

			player.e.btn.innerHTML = '播放'
		}
	}

	player.f.play.start = function(id, autoplay){
		// 函数调用播放器
		player.data.now.id = id
		player.f.load()

		setTimeout(function (){player.f.play.set(autoplay ? 1 : 0)}, 500)
		return player.list[id].name
	}

player.f.add = function(str) {
	// 更新播放器列表
	player.list = [str]

	player.data.now.id = 0
	player.data.num = 1

	if (player.e.list.length) player.f.list()
	player.f.load()
	player.f.play.set(1)
}
	player.f.add.ask = function(str) {
		setTimeout(function (){
			env.f.notification.open(str.name + `<br /><div><a onclick='player.f.add(` + JSON.stringify(str) + `); env.f.notification.close()'>播放</a> | <a onclick="env.f.notification.close()" >关闭</a></div>`, 20000)
		}, 3000)
	}

player.f.reset = function() {
	// 重置歌单
	player.list = player.f.data()
	player.data.num = player.list.length
	player.data.now.id = 0
	player.f.list()
	player.f.load()
	player.f.mode.set(0)
}

player.f.conv0 = function(n) {
	// 转换 ms --> mm:ss.fff
	var ts = Math.floor(n / 1000)
	var m = String(Math.floor(ts / 60)).padStart(2, '0')
	var s = String(ts % 60).padStart(2, '0')
	var ms = String(n % 1000).padStart(3, '0')

	return `${m}:${s}.${ms}`.substring(0, 9)
}

player.f.conv1 = function(str) {
	// 转换 mm:ss.fff --> ms
	var parts = str.split(':')
	return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10)
}

player.f.vol = function(n) {
	// 调整音量
	player.e.audio.volume = n
}

player.f.lrc = {}
	player.f.lrc.get = function() {
		// 下载歌词
		player.data.lrc.data = []
		player.data.lrc.leng = 0

		if (player.list[player.data.now.id].lrc) {
			fetch('https://' + env.data.domain + '/src/lrc/' + player.list[player.data.now.id].src + '.lrc')
			.then(response => {
				if (response.ok) {
					return response.text();
				}
			})
			.then(text => {player.f.lrc.load(text)})
			.catch(error => {
				console.error(error)
				setTimeout(function (){env.f.fade(player.e.lrc, 200)}, 1000)
				player.e.trans.innerHTML = '加载歌词失败 ...'
			})
		}
	}

	player.f.lrc.load = function(str) {
		// 渲染歌词
		player.data.lrc.leng = str.split('\n').length
		player.data.lrc.data = str.split('\n')
		player.data.lrc.data.push("[59:59.999]")
		player.data.lrc.now = 0
	}

	player.f.lrc.ui = function() {
		// 打开歌词页面
		if (player.data.lrc.open) {
			player.data.lrc.open = 0
			env.f.fade(player.e.ui, -160)
		} else {
			player.data.lrc.open = 1
			if (!player.e.list.length) player.f.list()
			player.f.lrc.find(player.e.audio.currentTime)
			env.f.fade(player.e.ui, 160)
		}
	}

	player.f.lrc.find = function(n) {
		// 找到当前正在播放的歌词行数
		if (player.data.lrc.leng) {
			for (var i = 0; i < player.data.lrc.leng + 1; i++) {
				if (player.e.audio.currentTime <= player.f.conv1((player.data.lrc.data[i]).substring(1, 10))) {
					player.data.lrc.now = i
					break
				}
			}
		}
	}

	player.f.lrc.debug = function() {
		// 调试模式
		document.addEventListener('keydown', function(event) {
			if (event.key === 'Enter' || event.keyCode === 13) {
				console.log(player.f.conv0(player.e.audio.currentTime))
			}
		});

		var div = document.createElement('div')
			div.setAttribute('style', 'position: fixed; z-index: 50; bottom: 0;')
			div.innerHTML = `
				<pre style="background: white; margin: 0; font-family: 'Microsoft YaHei'; overflow: scroll; max-height: 500px;" >preview</pre>
				<textarea type="text" autocomplete="off" style="font-family: 'Microsoft YaHei';" ></textarea>
					<button onclick="document.querySelector('.player-ui pre').innerHTML = document.querySelector('.player-ui textarea').value" >preview</button>
					<button onclick="player.f.lrc.load(document.querySelector('.player-ui textarea').value)" >load</button>
			`
			document.querySelector('.player-ui').appendChild(div)
	}

player.f.kana = function() {
	// 假名注音
	if (player.e.lrc.classList.contains('no-kana')) {
		player.e.lrc.removeAttribute('class')
	} else {
		player.e.lrc.classList.add('no-kana')
	}
}






player.f.load()
player.e.audio.volume = 0.5

// 进度条
setInterval(() => {
	if(!player.data.pause){
		player.data.now.per = (player.e.audio.currentTime / player.e.audio.duration).toFixed(8) || player.data.now.per
		player.e.bar1.setAttribute('style', 'width: ' + player.data.now.per * 100 + '%')
		player.e.time.innerHTML = player.f.conv0(player.e.audio.currentTime * 1000).substring(0, 5)
	}
}, 1000)

// 进度调整
player.e.bar0.addEventListener('click', function(event) {
	var p = ((event.clientX - player.e.bar0.getBoundingClientRect().left) / player.e.bar0.offsetWidth).toFixed(4)
	var now = Math.floor(player.e.audio.duration || player.data.now.leng) * p
	player.e.bar1.setAttribute('style', 'width: ' + p * 100 + '%')
	player.data.now.per = p

	if (!player.data.pause) player.e.audio.currentTime = now
	if (player.data.lrc.leng) player.e.lrc.parentNode.setAttribute('style', 'opacity: 0; pointer-events: none;')
	player.e.time.innerHTML = player.f.conv0(now * 1000).substring(0, 5)

	player.f.lrc.find(now)
})

// 歌词显示
player.e.audio.addEventListener('timeupdate', function () {
	if (player.data.lrc.open && player.data.lrc.leng) {
		if (player.f.conv1((player.data.lrc.data[player.data.lrc.now]).substring(1, 10)) - 1 <= player.e.audio.currentTime) {
			player.e.lrc.parentNode.setAttribute('style', 'opacity: 0; pointer-events: none;')
			player.data.lrc.now ++
			setTimeout(function (){
				var lrc = (player.data.lrc.data[player.data.lrc.now - 1] || '').slice(12)
				if (lrc.split('#')[0]) {
					player.e.lrc.innerHTML = lrc.split('#')[0] || ' '
					player.e.trans.innerHTML = lrc.split('#')[1] || ' '

					player.e.lrc.parentNode.setAttribute('style', 'opacity: 1')
				}
			}, 300)

		} else if (player.data.loop && ((player.e.audio.duration - player.e.audio.currentTime) <= 1)) {
			// 单曲循环时重置歌词
			player.data.lrc.now = 0
			player.e.lrc.parentNode.setAttribute('style', 'opacity: 0; pointer-events: none;')
		}
	}

})

// 列表播放
player.e.audio.addEventListener('ended', function () {
	if (player.data.now.id == player.data.num - 1) player.data.now.id = -1
	player.data.now.id ++
	player.f.load()
	player.f.play.set(1)
})

// 调整音量
player.e.s1.addEventListener('scroll', () => {
	var s = 100 - (player.e.s1.scrollTop / 10).toFixed(0) + 10
	if (s < 0) var s = 0
	if (s > 100) var s = 100
	var s = (s / 10).toFixed(0) * 10

	player.e.s2.innerHTML = s + '%'
	player.e.audio.volume = s / 100
	player.data.vol = s / 100
})

// 键盘监听
player.e.ui.addEventListener('keydown', function(event) {
	var k = event.key

	if (k == ' ') {
		player.f.play()
	} else if (k == 'Escape') {
		player.f.lrc.ui()
	} else if (k == 'ArrowUp') {
		env.f.scroll(player.e.s1, -100, 10, false)
	} else if (k == 'ArrowDown') {
		env.f.scroll(player.e.s1, 100, 10, false)
	} else if (k == 'ArrowRight') {
		if (player.data.now.id == player.data.num - 1) player.data.now.id = -1
		player.data.now.id ++
		player.f.load()
		player.f.play.set(1)
	} else if (k == 'ArrowLeft') {
		if (player.data.now.id == 0) player.data.now.id = player.list.length
		player.data.now.id --
		player.f.load()
		player.f.play.set(1)
	}
})



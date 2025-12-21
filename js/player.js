


/*	player.js
 *	created by sumiyo, 2024/11/16

	*/



env.d.version.player = '1.0.245'
env.d.player = {
	'id': 0,
	'mode': 0,
	'pause': true,
	'loop': false,
	'list': null,
}

env.e = {...env.e, ...{
	player: {
		'audio': new Audio(),
		'player': document.querySelector('.player'),
		'pause_btn': document.querySelectorAll('.player span')[0],
		'ui': document.querySelectorAll('.player span')[1],
		'img': document.querySelector('.player img'),
		'bar': [document.querySelector('.player bar'), document.querySelector('.player div div')],
	}
}}



env.f.player = {}

env.f.player.load = function(autoplay = false){
	// 加载音乐信息
	var d = env.d.player.list[env.d.player.id]
	var id = d.src
	var name = d.name
	var artist = d.artist
	var img = `https://p1.music.126.net/${d.img}.jpg?param=256y256`

	env.e.player.ui.innerHTML = name
	env.e.player.audio.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
	env.e.player.bar[1].style.width = '0%'

	env.f.root.fade(env.e.player.img, -300)

	setTimeout(function (){
		env.e.player.img.src = img
	}, 500)

	// 更新 Media Session API 信息
	if ('mediaSession' in navigator) {
		navigator.mediaSession.metadata = new MediaMetadata({
			title: name,
			artist: artist,
			album: '',
			artwork: [{
				src: img,
				sizes: '',
				type: 'image/jpg'
			}]
		})
	}

	// 加载完成后播放音乐
	if (!autoplay) return
	var play = function() {
		env.f.player.play.set(1)
		env.e.player.audio.removeEventListener('canplay', play)
	}

	env.e.player.audio.addEventListener('canplay', play)
}

env.f.player.mode = function(){
	// 切换播放模式
	env.f.player.mode.set(env.d.player.loop ? 0 : 1)
}
	env.f.player.mode.set = function(bool){
		env.d.player.loop = bool ? true : false
	}

env.f.player.play = function(){
	// 播放 & 暂停
	env.f.player.play.set(env.d.player.pause ? 1 : 0)
}
	env.f.player.play.set = function(bool){
		env.d.player.pause = !bool
		bool ? env.e.player.audio.play() : env.e.player.audio.pause()
		env.e.player.pause_btn.innerHTML = bool ? "" : ""
	}

env.f.player.init = function(bool) {
	// 初始化歌词页面
	if (env.d.lang == 'zh-CN') {
		if (bool) env.f.player.load()
	} else {
		env.f.root.prompt(`Our music player may not work properly in your region !<br /><br /><a onclick='env.f.player.load()'>[force loading]</a>`, -1)
	}
}

env.f.player.add = function(str) {
	// 更新播放器列表
	// 0 = 是否询问

	if (!env.d.player.list) {
		env.f.root.fade(env.e.player.player, 300)
		env.d.player.list = str["1"]
		env.f.player.init(1)
	}

	env.d.player.list = str["1"]
	env.d.player.id = 0
	env.f.player.load(1)
}

	env.f.player.add.ask = function(str) {
		// 弹出询问框
		setTimeout(function (){
			if (str['0']) {
				if (JSON.stringify(str['1']) != JSON.stringify(env.d.player.list)) {
					env.f.root.prompt(`发现 ${str['1'].length} 首隐藏的音乐！<br /><a onclick='env.f.player.add(${JSON.stringify(str)});'>播放</a>`, 20000)
				}
			} else {
				env.f.player.add(str)
			}
		}, 3000)
	}

env.f.player.next = function(n){
	// 切换歌曲
	if (n == -1) {
		// 上一首
		if (env.d.player.id == 0) env.d.player.id = env.d.player.list.length
		env.d.player.id --
		env.f.player.load(1)
	} else {
		// 下一首
		if (env.d.player.id == env.d.player.list.length - 1) env.d.player.id = -1
		env.d.player.id ++
		env.f.player.load(1)
	}
}






env.e.player.audio.preload = 'metadata'
env.e.player.audio.volume = 0.2



// 进度条
setInterval(() => {
	if(!env.d.player.pause){
		env.e.player.bar[1].setAttribute('style', `width: ${(env.e.player.audio.currentTime * 100 / env.e.player.audio.duration || 1).toFixed(3) || 0}%`)
	}
}, 1000)

// 进度调整
env.e.player.bar[0].addEventListener('click', function(event) {
	var p = (Math.abs((event.clientX - env.e.player.bar[0].getBoundingClientRect().left) / env.e.player.bar[0].offsetWidth)).toFixed(4)
	var now = Math.floor(env.e.player.audio.duration || 0) * p
	env.e.player.bar[1].setAttribute('style', `width: ${p * 100}%`)

	env.e.player.audio.currentTime = now
})

// 处理播放结束
env.e.player.audio.addEventListener('ended', function () {
	if (env.d.player.loop) {
		env.e.player.audio.currentTime = env.d.player.lrc.now = 0
		env.f.player.play.set(1)
	} else {
		env.f.player.next(1)
	}
})

// 若无法加载音频，则抛出错误
env.e.player.audio.addEventListener('error', function(event) {
	console.error(`音频加载失败:`, event, `\n	at env.e.player.audio\n	at https://music.163.com/song/media/outer/url?id=${env.d.player.list[env.d.player.id].src}`)
	console.warn('可能原因:\n	1. 当前歌曲资源链接超时（似乎是 30 min），请重新加载该歌曲\n	2. 该歌曲被会员掉了\n	3. 您所在地区不支持网易云音乐 https://music.163.com/ 的服务')
	env.f.root.prompt('当前歌曲播放失败', -1)
	if (env.d.player.list.length != 1) {setTimeout(function (){env.f.player.next(1)}, 5000)}
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
document.querySelector('.player').addEventListener('keydown', function(event) {
	var k = event.key

	if (k == ' ') {
		env.f.player.play()
	} else if (k == 'ArrowUp') {
		env.e.player.audio.volume = Math.min(1, env.e.player.audio.volume + 0.1)
	} else if (k == 'ArrowDown') {
		env.e.player.audio.volume = Math.max(0, env.e.player.audio.volume - 0.1)
	} else if (k == 'ArrowLeft') {
		env.f.player.next(-1)
	} else if (k == 'ArrowRight') {
		env.f.player.next(1)
	}
})



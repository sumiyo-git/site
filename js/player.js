


/*	player.js
 *	created by sumiyo, 2024/11/16

	*/



const player = {
	'f': {},
	'data': {
		'mode': 0,
		'pause': 1,
		'ask': 0,
		'vol': 0.5,
		'lrc': {
			'data': null,
			'leng': 0,
			'now': 0,
			'open': 0,
		},
		'timer': {
			't1': null,
			't2': null,
			't3': null,
		},
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
		act: {lrc: true, js: "$(player.e.img).css('margin', '-60px -20px')"},
	},
	{
		name: 'One Last Adventure - Evan Call',
		src: '2116382384',
		img: '8RdmkeoexrTxI7PdasUkhA==/109951169761664617',
		act: {lrc: false, js: null},
	},
	{
		name: 'Goodbye for Now, Eisen - Evan Call',
		src: '2146700515',
		img: 'n21kvn_4tw2AFdVHJX4bjg==/109951169594833348',
		act: {lrc: false, js: null},
	},
	{
		name: "原風景 - mamomo & 丘咲アンナ",
		src: '33469247',
		img: 'ct9bs4VXR1mrbVRsX9iboA==/3372202162443903',
		act: {lrc: true, js: null},
	},
	{
		name: 'ワタリドリ - KOKIA',
		src: '2101452199',
		img: 'rLHKvau26Wt2KA5DJc_u6A==/109951169067925149',
		act: {lrc: true, js: null},
	},
	{
		name: 'Calling - MAROK & mamomo',
		src: '1944649836',
		img: 'vrXsouN6rhgah68sHv4Akg==/109951169530454564',
		act: {lrc: false, js: null},
	},
	{
		name: 'Saudade (Original Mix) - Kupla',
		src: '518904157',
		img: 'c04kf5BCGexeunM4MfAkHw==/109951165069828217',
		act: {lrc: false, js: null},
	},
	{
		name: 'Friend - Kozoro',
		src: '33004707',
		img: 'FR7zKYB8ujNRoWQuGCHbGg==/109951163288692527',
		act: {lrc: false, js: null},
	},
	{
		name: 'Together - Bcalm & Purrple Cat',
		src: '1916742663',
		img: 'zJBR2s3mTC06Z-v4npw2Jw==/109951168736565471',
		act: {lrc: false, js: null},
	},
	{
		name: 'Disappear in Light - Equal Stones & Endless Melancholy',
		src: '29406314',
		img: 'JIeHyV-yad8BDq_4GmsVuA==/2572857209028564',
		act: {lrc: false, js: null},
	},
	{
		name: 'Gusts of Wind Blowing in Different Directions - The Last Dinosaur',
		src: '19498811',
		img: 'f3exPjEKfsnrQbsUqUlb2w==/109951169557730207',
		act: {lrc: false, js: null},
	},
	{
		name: 'There Is Still Wonder Left To Behold - reche',
		src: '2017419119',
		img: 'b4dFvmdWVTmHv6gKgdgzEQ==/109951168261721978',
		act: {lrc: true, js: null},
	},
	{
		name: 'One Day - KISNOU',
		src: '448316625',
		img: '9QkYHkN8UCiybMg-qHempw==/109951168047707020',
		act: {lrc: false, js: null},
	},
	{
		name: 'like water - Park Bird & Chance Thrash',
		src: '1847674461',
		img: 'FPZrJuBWnJKtR9_4zXmMOQ==/109951166009136375',
		act: {lrc: false, js: null},
	},
	{
		name: '変わり行く世界のために - 茶太',
		src: '697291',
		img: 'eiR5oFPitGtu1hzka4Vm5g==/814738116182197',
		act: {lrc: true, js: null},
	},
	{
		name: 'bliss - milet',
		src: '2122535814',
		img: 'b66bKUxVNZlC_S_3u7UCaA==/109951169268030489',
		act: {lrc: true, js: null},
	},
	{
		name: 'この空であなたを待ってる inst. - KOKIA',
		src: '1830163712',
		img: 'resCPZ3quIJPxdn1HDt3ww==/109951165811423814',
		act: {lrc: true, js: "$(player.e.img).css('margin', '-60px -20px')"},
	},

	]

}



player.list = player.f.data()
player.data.num = player.list.length
env.data.version.player = '1.0.23'

player.e = {
		body: document.querySelector('.player').querySelector('audio'),
		frame: document.querySelector('.player'),
		img: document.querySelector('.player-cover').querySelector('img'),
		name: document.querySelector('.player-name'),
		bar0: document.querySelector('.player-bar0'),
		bar1: document.querySelector('.player-bar1').querySelector('div'),
		mode: document.querySelector('.player-header-right').querySelector('a'),
		menu: document.querySelector('.player-menu'),
		list: document.querySelectorAll('.list-item'),
		list_body: document.querySelector('.player-list').children[0],
		btn1: document.querySelectorAll('.player-btn')[0],
		btn2: document.querySelectorAll('.player-btn')[1],
		ask: document.querySelector('.player-ask'),
		s1: document.querySelector('.player-sound1'),
		s2: document.querySelector('.player-sound0'),
		lrc: document.querySelector('.player-lrc').querySelector('list'),
		lrcI: document.querySelector('.player-lrc').querySelector('img'),
		lrcB: document.querySelector('.player-lrc'),
		lrcT: document.querySelector('.player-title').querySelector('span'),
		line: [],

		cover0: document.querySelector('.player-mobile0'),
		cover1: document.querySelector('.player-mobile1'),
	}



// 加载音乐信息
player.f.load = function(){
	var id = player.data.now.id;

	player.e.name.innerHTML = player.list[id]['name']
	$(player.e.lrcT).fadeOut(160)

	player.e.body.src = 'https://music.163.com/song/media/outer/url?id=' + player.list[id]['src'] + '.mp3'
	player.e.img.src = 'https://p1.music.126.net/' + player.list[id]['img'] + '.jpg?param=300y300'
	$(player.e.img).css('margin', '-124px -40px')
	player.e.bar1.style.width = '0px'
	player.data.now.per = 0

	$(player.e.lrcI).css('opacity', '0')
	player.f.lrc.get()

	setTimeout(function (){
		$(player.e.lrcT).fadeIn(300)
		player.e.lrcT.innerHTML = ('　' + player.list[id]['name']).repeat(4).toUpperCase().replace(/[(]/g, '「').replace(/[)]/g, '」')
		player.e.lrcT.setAttribute('style', 'animation: ' + player.list[id]['name'].length + 's wordsLoop linear infinite normal');

		player.e.lrcI.src = 'https://p1.music.126.net/' + player.list[id]['img'] + '.jpg?param=300y300'
		if (!isNaN(player.e.body.duration)) {
			player.data.now.leng = player.e.body.duration
		}
	}, 1000)
	if (player.e.list[0]) {
		$(player.e.list_body).animate({scrollTop: player.e.list[0].offsetHeight * (player.data.now.id - 1)}, 300)
	}

	// 为当前播放歌曲添加样式
	if (player.e.list[id] != undefined) {
		$('#list-item-active').removeAttr('id');
		player.e.list[id].id = 'list-item-active'
	}
	if (player.list[id].act.js) {
		eval(player.list[id].act.js)
	}
	if (($('player-lrc rt').length > 0)) {
		$('player-kana').fadeIn(300)
		$('rt').css('display', 'none')
	} else {
		$('player-kana').fadeOut(300)
	}
}

// 切换播放模式
player.f.mode = function(){
	if (player.e.mode.innerHTML=='') {
		player.f.mode.set(1)
	} else {
		player.f.mode.set(0)
	}
}
	player.f.mode.set = function(mode){
		if (mode=='1') {
			// 列表循环
			player.e.mode.innerHTML = ''
			player.e.mode.title = '列表循环'
			player.e.body.loop = false
		}
		if (mode=='0') {
			// 单曲循环
			player.e.mode.innerHTML = ''
			player.e.mode.title = '单曲循环'
			player.e.body.loop = true
		}
	}

// 播放器样式变化
player.f.menu = function(){
	if(player.e.frame.classList.contains('PlayerWait') || player.data.ask == 1) {return}

	// 展开
	if(player.data.mode == 0){
		player.f.menu.set(1)
		return
	}
	// 关闭
	if(player.data.mode == 1){
		player.f.menu.set(0)
		return
	}
}
	player.f.menu.set = function(mode){
		if (mode == '1') {
			player.e.frame.classList.add('PlayerWait')
			$(player.e.menu, 160).fadeIn(160)
			if (env.data.isMobile) {$(player.e.cover1).fadeOut(160)}
			player.f.list()

			player.data.mode = 1
			setTimeout(function (){
				$(player.e.frame).removeClass('PlayerWait')
			},250)
		} else {
			$(player.e.frame).addClass('PlayerWait')
			$(player.e.frame).addClass('player-active')
			$(player.e.menu).fadeOut(160)
			if (env.data.isMobile) {$(player.e.cover1).fadeIn(400)}
			setTimeout(function (){
				$(player.e.frame).fadeIn(300)
				$('.PlayerImgBox').fadeIn(200)
			},500)
			player.data.mode = 0;
			setTimeout(function (){
				$(player.e.frame).removeClass('PlayerWait')
			},250)
		}
	}

// 显示播放列表
player.f.list = function(force){
	if(player.e.list.length == 0 || force) {

		player.e.list_body.innerHTML = '';
		for (var i = 0; i < player.data.num; i++) {

			var a = document.createElement('a')
			a.innerHTML = player.list[i]['name'].split('-')[0]
			a.setAttribute('class', 'list-item')
			a.setAttribute('title', player.list[i]['name'])
			a.setAttribute('onclick', 'player.f.play.start(' + i + ', 1)')

			player.e.list_body.appendChild(a)
		}

		player.e.list = document.querySelectorAll(".list-item")
		player.e.list[player.data.now.id].id = 'list-item-active'
		$(player.e.s1).animate({scrollTop: 600}, 0)
	}

}

// 播放、暂停
player.f.play = function(){
	if(player.data.pause == 1){
		player.f.play.set(1)
	} else {
		player.f.play.set(0)
	}
}
	player.f.play.set = function(mode){
		if (mode=='1') {
			player.e.body.volume = 0
			player.e.body.play()
			player.e.body.currentTime = (player.e.body.duration || 0) * player.data.now.per
			player.e.body.volume = player.data.vol

			player.data.pause = 0
			$(player.e.btn1).addClass('player-btn1')
			$(player.e.btn2).addClass('player-btn1')
			$(player.e.btn1).removeClass('player-btn0')
			$(player.e.btn2).removeClass('player-btn0')
		}
		if (mode=='0') {
			player.e.body.pause();
			$(player.e.btn1).addClass('player-btn0')
			$(player.e.btn2).addClass('player-btn0')
			$(player.e.btn1).removeClass('player-btn1')
			$(player.e.btn2).removeClass('player-btn1')
			player.data.pause = 1
		}
	}

	// 函数调用播放器
	player.f.play.start = function(id, autoplay){
		player.data.now.id = id
		player.f.load()

		setTimeout(function (){
			if (autoplay) {
				player.f.play.set(1)
			} else {
				player.f.play.set(0)
			}
		}, 500)
		return player.list[id].name
	}

// 更新播放器列表
player.f.add = function(name, src, img, lrc, act) {
	player.list = [
		{
			'name': name,
			'src': src,
			'img': img,
			'act': {'lrc': lrc, 'js': act}
		}
	]
	player.data.now.id = 0
	player.data.num = 1
	player.f.menu.set(1)

	if (player.data.pause == 0) {
		player.f.play()
	}

	player.f.add.ask(0)
	setTimeout(function (){
		player.f.load()
		player.f.list(1)
		player.f.menu.set(1)
	}, 500)
}
	player.f.add.ask = function(mode, name, src, img, lrc, act) {
		if (mode == 1) {
			player.data.ask = 1
			clearInterval(player.data.timer.t1)
			clearInterval(player.data.timer.t2)

			setTimeout(function (){
				if(player.data.mode == 1){
					player.f.menu.set(0)
				}
			}, 2500)
			player.data.timer.t2 = setInterval(() => {
				if (env.data.isMobile) {$(player.e.cover1).fadeOut(200)}
				player.data.timer.t1 = setInterval(() => {
					if(player.data.ask == 1) {
						player.f.add.ask(0)
						clearInterval(player.data.timer.t2)
					}
				}, 20000)

				if (env.data.isMobile) {
					$(player.e.cove1).fadeOut(200)
					$(player.e.frame).addClass('player-phone')
					$(player.e.cover0).css('display',  'none')
				}
				$(player.e.ask).fadeIn(200)
				$(player.e.ask.querySelectorAll('span')[0].querySelectorAll('a')[0]).attr('onclick', 'player.f.add("' + name + '", "' + src + '", "' + img + '", ' + lrc + ', "' + act + '")')
				clearInterval(player.data.timer.t2)

			}, 3000)
		}
		if (mode == 0) {
			player.data.ask = 0
			$(player.e.ask).fadeOut(200)
			if (player.data.ask == 0) {if(player.data.mode == 0){ if (env.data.isMobile) {$(player.e.cover1).fadeIn(200)}}}
			clearInterval(player.data.timer.t2);
		}
	}

// 重置歌单
player.f.reset = function() {
	player.list = player.f.data()
	player.data.num = player.list.length
	player.data.now.id = 0
	player.f.list(1)
	player.f.load()
	player.f.mode.set(1)

	if (player.data.pause == 0) {
		player.f.play()
	}
}

// mm:ss
player.f.conversion0 = function(value) {
	var  minute = Math.floor(value / 60)
	var minute = minute.toString().length === 1 ? ('0' + minute) : minute
	var second = Math.round(value % 60)
	var second = second.toString().length === 1 ? ('0' + second) : second
	return `${minute}:${second}`
 }

player.f.conversion1 = function(str) {
	var parts = str.split(':')
	return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10)
}

// mm:ss.fff
player.f.conversion2 = function(n) {
	var t = player.f.conversion0(n)
	var f = n.toString().split('.')[1].slice(0, 3).padEnd(3, '0')
	return t + '.' + (f | '000')
}

// 调整音量
player.f.vol = function(n) {
	player.e.body.volume = n
}

// 显示、隐藏播放器
player.f.show = function() {
	if($(player.e.frame).hasClass('player-phone') && !player.data.mode) {
		$(player.e.frame).removeClass('player-phone')
		$(player.e.cover0).css('display',  'block')
	} else {
		$(player.e.frame).addClass('player-phone')
		$(player.e.cover0).css('display',  'none')
	}
}

// 激活播放器
player.f.loadPlayer = function() {
	if (typeof env.tmp.t3 == 'undefined') {
		env.tmp.t3 = ''
		return
	}

	env.tmp.t3 = null
	delete env.tmp.t3
	$(player.e.frame).addClass('player-active')
}

player.f.lrc = {}

	player.f.lrc.get = function() {
		$(player.e.lrc).fadeOut(160)

		if (player.list[player.data.now.id].act.lrc) {
			fetch('https://sumiyo.link/src/lrc/' + player.list[player.data.now.id]['src'] + '.lrc')
			.then(response => {
				if (response.ok) {
					return response.text();
				}
			})
			.then(text => {
				player.data.lrc.data = text
				player.f.lrc.load(text)
			})
			.catch(error => {
				console.error(error)
				setTimeout(function (){$(player.e.lrc).fadeIn(160)}, 1000)
				player.e.lrc.innerHTML = '<br /><br /><br /><br /><br /><br /><h1>' + player.list[player.data.now.id]['name'] + '<br /><br /><span>加载歌词失败 ...</span></h1><br /><br /><br /><br /><br /><br />'
			})
		} else {
			setTimeout(function (){
				player.e.lrc.innerHTML = '<br /><br /><br /><br /><br /><br /><h1>' + player.list[player.data.now.id]['name'] + '<br /><br /><span>没有填词的纯音乐哦 ...</span></h1><br /><br /><br /><br /><br /><br />'
				$(player.e.lrc).fadeIn(160)
			}, 1000)
		}
	}

	player.f.lrc.load = function(str) {
		player.data.lrc.leng = str.split('\n').length
		player.data.lrc.now = 0

		player.e.lrc.innerHTML = ''
		for (var i = 0; i < player.data.lrc.leng; i++) {

			var line = document.createElement('line')
				line.setAttribute('onclick', 'player.f.lrc.to("' + str.split('\n')[i].substring(1, 10) + '")')
				player.e.lrc.appendChild(line)

			var lrc = document.createElement('lrc')
				if (str.split('\n')[i].split('#')[1] != undefined) {
					lrc.innerHTML = (str.split('\n')[i].slice(12) || '<br /><br />').split('#')[0] + '<trans>' + str.split('\n')[i].split('#')[1] + '</trans>'
				} else {
					lrc.innerHTML = (str.split('\n')[i].slice(12) || '<br /><br />').split('#')[0]
				}
				line.appendChild(lrc)

			var time = document.createElement('time')
				time.innerHTML = str.split('\n')[i].substring(1, 6)
				line.appendChild(time)

		}
		setTimeout(function (){
			player.e.lrc.innerHTML = '<br /><br /><br /><br /><br /><br /><h1>' + player.list[player.data.now.id]['name'] + '</h1><br />' +  player.e.lrc.innerHTML + '<br /><br /><br /><br /><br /><br />'
			player.e.line = document.querySelectorAll('line')
			player.f.lrc.find(player.e.body.currentTime)

			$(player.e.lrc).css('opacity', '0')
			$(player.e.lrc).css('display', 'block')
			$(player.e.lrc).animate({scrollTop: 0}, 0)

			setTimeout(function (){
				$(player.e.lrc).css('display', 'none')
				$(player.e.lrc).css('opacity', '1')
				$(player.e.lrc).fadeIn(160)
			}, 100)
		}, 500)
	}

	player.f.lrc.conversion = function(str) {
		return +str.split(':')[0] * 60 + +str.split(':')[1];
	}

	player.f.lrc.read = function(n) {

		return player.data.lrc.data.split('\n')[n - 1] || null
	}

	player.f.lrc.gui = function() {

		if (!player.data.lrc.open) {
			player.f.lrc.find(player.e.body.currentTime)
			$(player.e.lrcB).fadeIn(160)
			player.data.lrc.open = 1
		} else {
			$(player.e.lrcB).fadeOut(160)
			player.data.lrc.open = 0
		}
	}

	player.f.lrc.find = function(n) {

		if (player.data.lrc.leng != 0) {
			for (var i = 0; i < player.data.lrc.leng - 1; i++) {
				if (Number(player.f.lrc.conversion((player.f.lrc.read(i) || '[00:00.000]').substring(1, 10))) <= n) {
					player.data.lrc.now = i - 1
				} else {
					$('.line-now').removeAttr('class')
				}
			}
		}
	}

	player.f.lrc.to = function(n) {

		player.f.lrc.find(player.f.lrc.conversion(n))
		player.f.play.set(1)
		player.e.body.currentTime = player.f.lrc.conversion(n)
	}

	player.f.lrc.debug = function() {

		console.warn('歌词时间轴矫正模式: 按下回车键获取当前的播放位置')
		document.addEventListener('keydown', function(event) {
			if (event.key === 'Enter' || event.keyCode === 13) {
				console.log(player.f.conversion2(player.e.body.currentTime))
			}
		});
	}

player.f.kana = function() {

	if (document.querySelector('.player-lrc').querySelector('rt').style.display == 'none') {
		$('rt').css('display', 'block')
	} else {
		$('rt').css('display', 'none')
	}
}


player.f.load()
player.e.body.volume = 0.5

// 进度条
setInterval(() => {
	if(player.data.pause == 0){
		player.data.now.per = (player.e.body.currentTime / player.e.body.duration).toFixed(8) || player.data.now.per
		$(player.e.bar1).css('width', player.data.now.per * 100 + '%')
	}
}, 2000)

// 进度调整
player.e.bar0.addEventListener('click', function(event) {
	var percent = ((event.clientX - player.e.bar0.getBoundingClientRect().left) / player.e.bar0.offsetWidth).toFixed(8)
	var now = Math.floor(player.e.body.duration || player.data.now.leng) * percent

	$(player.e.bar1).css('width', percent * 100 + '%')
	player.data.now.per = percent

	player.f.lrc.find(now)
	if (player.data.pause == 0) {
		player.e.body.currentTime = now
	}
})

// 歌词显示
player.e.body.addEventListener('timeupdate', function () {
	if (!player.data.pause && player.data.lrc.open && player.list[player.data.now.id].act.lrc && player.e.line[0]) {
		if ((Number(player.f.lrc.conversion((player.f.lrc.read(player.data.lrc.now + 1) || '[00:00.000]').substring(1, 10))) <= player.e.body.currentTime) && player.data.lrc.now < player.data.lrc.leng) {
			$('.line-now').removeAttr('class')

			$(player.e.lrc).animate({scrollTop: $(player.e.lrc).scrollTop() + $(player.e.line[player.data.lrc.now]).offset().top - 220}, 500)
			player.e.line[player.data.lrc.now].classList.add('line-now')
			player.data.lrc.now ++
		} else {
			// 单曲循环时重置歌词
			if (player.e.mode.innerHTML == '' && ((player.e.body.duration - player.e.body.currentTime) <= 1)) {
				player.data.lrc.now = 0
				$(player.e.lrc).animate({scrollTop: $(player.e.lrc).scrollTop() + $(player.e.line[0]).offset().top - 220}, 500)
			}
		}
	}
})

// 列表播放
player.e.body.addEventListener('ended', function () {
	if (player.data.now.id == player.data.num - 1) {
		player.data.now.id = -1
	}
	player.data.now.id ++
	player.f.load()
	player.f.play.set(1)
})

// 调整音量
player.e.s1.addEventListener('scroll', () => {
	var size = 100 - (player.e.s1.scrollTop / 10).toFixed(0) + 10
	if (size < 0) {var size = 0}
	if (size > 100) {var size = 100}

	player.e.s2.innerHTML = size + '%'
	player.e.body.volume = size / 100
	player.data.vol = size / 100
})

// 手机样式
if (env.data.isMobile) {
	$(player.e.frame).css('transform', 'translateX(182px)')
}



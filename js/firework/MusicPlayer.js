var MusicPlayer = (function() {
	function MusicPlayer() {
		this.player = document.createElement("AUDIO");
		this.player.setAttribute("src", "./assert/a.wav");
		//当前播放的是哪个烟花的音效
		this.currentPlayingFirework = null;
		// x.setAttribute("controls", "controls");
		// document.body.appendChild(this.x);
		this.idleState = true;

	}

	MusicPlayer.prototype.setFirework = function(firework) {
		this.currentPlayingFirework = firework;
	}

	// MusicPlayer.prototype.savePlayCurrentTime = function(){
	// 	if(this.currentPlayingFirework != null){
	// 		this.currentPlayingFirework.savePlayCurrentTime(this.player.currentTime);
	// 	}
	// }

	MusicPlayer.prototype.play = function(firework) {
		this.currentPlayingFirework = firework;
		this.player.currentTime = 1.5;
		this.player.play();
		// console.log('c='+this.player.currentTime+' all='+)
		this.idleState = false;
		firework.isPlayingState = true;
	}

	MusicPlayer.prototype.isFireworkPlayingState = function(firework) {
		return this.currentPlayingFirework === firework;
	}

	MusicPlayer.prototype.stop = function() {
		// console.log('stop con='+this.player);
		this.player.pause();
		this.currentPlayingFirework = null;
		this.idleState = true;
	}

	return MusicPlayer;
})();
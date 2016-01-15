var MusicPlayManager = (function() {
	//音乐播放管理类
	function MusicPlayManager() {
		this.players = [new MusicPlayer(), new MusicPlayer(), new MusicPlayer()];

	}

	MusicPlayManager.prototype.stopPlayForFirework = function(firework) {
		this.players.forEach(function(item) {
			if (item.isFireworkPlayingState(firework)) {
				item.stop();
			}
		});
	}

	MusicPlayManager.prototype.tryPlayForAllFireworks = function() {
		var fireworkIndex = 0;
		var item;
		for (var i = 0; i < this.players.length; i++) {
			item = this.players[i];
			if (item.idleState) {
				for (fireworkIndex; fireworkIndex < fireworks.length; ++fireworkIndex) {

					if (!fireworks[fireworkIndex].isPlayingState) {
						item.play(fireworks[fireworkIndex]);
						++fireworkIndex;
						break;
					}

				}

			}
			if (fireworkIndex >= fireworks.length - 1) {
				break;
			}
		}

	}
	return MusicPlayManager;
})();
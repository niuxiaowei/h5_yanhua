var Firework = (function(){
	// create firework
	function Firework( sx, sy, tx, ty ) {
		// actual coordinates
		this.x = sx;
		this.y = sy;
		// starting coordinates
		this.sx = sx;
		this.sy = sy;
		// target coordinates
		this.tx = tx;
		this.ty = ty;
		// distance from starting point to target
		this.distanceToTarget = calculateDistance( sx, sy, tx, ty );
		this.distanceTraveled = 0;
		// track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
		this.coordinates = [];
		this.coordinateCount = 3;
		// populate initial coordinate collection with the current coordinates
		while( this.coordinateCount-- ) {
			this.coordinates.push( [ this.x, this.y ] );
		}
		this.angle = Math.atan2( ty - sy, tx - sx );
		this.speed = 2;
		this.acceleration = 1.05;
		this.brightness = random( 50, 70 );
		// circle target indicator radius
		this.targetRadius = 1;

		// particle collection
		this.particles = [];
		//是否爆炸了
		this.isExplode = false;
		// this.playCurrentTime = 0;

		this.isPlayingState = false;
	}

	// Firework.prototype.savePlayCurrentTime = function(playTime){
	// 	// this.playCurrentTime = playTime;
	// }

	// create particle group/explosion
	Firework.prototype.createParticles = function ( x, y ) {
		// increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
		var particleCount = 30;
		while( particleCount-- ) {
			this.particles.push( new Particle( x, y ) );
		}
	}

	Firework.prototype.updateParticles = function(){
		// loop over each particle, draw it, update it
		var i = this.particles.length;
		while( i-- ) {
			this.particles[ i ].draw();
			//该质子已经消失了从屏幕上，从数组中移除它
			if(this.particles[ i ].update( i )){
				this.particles.splice(i,1);
			}
		}
	}

	Firework.prototype.drawParticles = function(){
		// loop over each particle, draw it, update it
		var i = this.particles.length;
		while( i-- ) {
			this.particles[ i ].draw();
			
		}
	}

	// update firework
	Firework.prototype.update = function(  ) {
		if(!this.isExplode){
			// remove last item in coordinates array
			this.coordinates.pop();
			// add current coordinates to the start of the array
			this.coordinates.unshift( [ this.x, this.y ] );
			// console.log(' coor len='+this.coordinates.length+' isExplode='+this.isExplode);
			// cycle the circle target indicator radius
			if( this.targetRadius < 8 ) {
				this.targetRadius += 0.3;
			} else {
				this.targetRadius = 1;
			}
			
			// speed up the firework
			this.speed *= this.acceleration;
			
			// get the current velocities based on angle and speed
			var vx = Math.cos( this.angle ) * this.speed,
					vy = Math.sin( this.angle ) * this.speed;
			// how far will the firework have traveled with velocities applied?
			this.distanceTraveled = calculateDistance( this.sx, this.sy, this.x + vx, this.y + vy );

		    
			// console.log('distanceTraveled='+this.distanceTraveled+" distanceToTarget="+this.distanceToTarget);
			
			// if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
			if( this.distanceTraveled >= this.distanceToTarget ) {
				this.createParticles( this.tx, this.ty );
				this.isExplode = true;
				
			} else {
				// target not reached, keep traveling
				this.x += vx;
				this.y += vy;
			}
		}else{
			this.updateParticles();
			if(this.isFireworkEnd()){
				musicPlayManager.stopPlayForFirework(this);
			}
		}
		

		// if(this.playCurrentTime >= 0){
		// 	console.log('cuti='+this.playCurrentTime+" id="+this.tx);
		// 	player.switchPlayTarget(this);
		// }
		
		
	}

	Firework.prototype.isFireworkEnd = function(){
		var result =  this.isExplode && this.particles.length == 0;
		// console.log('isExplode='+this.isExplode+' result='+result);
		return result;
	}

	Firework.prototype.destory = function(){

	}

	// draw firework
	Firework.prototype.draw = function() {
		if(!this.isExplode){
			// console.log('fi draw'+' tx='+this.tx+' ty='+this.ty+' ra='+this.targetRadius);
			ctx.beginPath();
			// move to the last tracked coordinate in the set, then draw a line to the current x and y
			ctx.moveTo( this.coordinates[ this.coordinates.length - 1][ 0 ], this.coordinates[ this.coordinates.length - 1][ 1 ] );
			ctx.lineTo( this.x, this.y );
			ctx.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
			ctx.stroke();
			
			ctx.beginPath();
			// draw the target for this firework with a pulsing circle
			ctx.arc( this.tx, this.ty, this.targetRadius, 0, Math.PI * 2 );
			ctx.stroke();
		}else{
			this.drawParticles();
			// console.log('draw pa');
		}
	}

	// calculate the distance between two points
	function calculateDistance( p1x, p1y, p2x, p2y ) {
		var xDistance = p1x - p2x,
				yDistance = p1y - p2y;
		return Math.sqrt( Math.pow( xDistance, 2 ) + Math.pow( yDistance, 2 ) );
	}

	return Firework;
	
}
)();
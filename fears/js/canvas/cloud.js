console.log('fear clouds is connected');

function Cloud(context){
	
	this.context = context;
	this.x = 0;

	this.class = 'cloud';

	this.speed = 1;
	var currCloud = this;
}

Cloud.prototype.tick = function(){
	console.log('ticking')
	this.x += this.speed;

	var width = this.context.canvas.width;

	var x = this.x;

	if (x > width){
		this.x = -200;
	} else {
		this.x = x + 1;
	}

	// this.x = (x + 3 * width/2) % width - width/2;
}

Cloud.prototype.render = function(){
	var canvas = document.getElementById('fear-canvas');
	ctx = this.context;

  ctx.save();
  ctx.translate(this.x,100);

	ctx.beginPath();
	ctx.moveTo(170,80);
	ctx.bezierCurveTo(130, 120, 100, 150, 230, 150);
  ctx.bezierCurveTo(250, 190, 290, 180, 340, 150);
  ctx.bezierCurveTo(400, 150, 420, 120, 390, 100);
  ctx.bezierCurveTo(400, 40, 370, 40, 340, 50);
  ctx.bezierCurveTo(300, 10, 250, 20, 250, 50);
  ctx.bezierCurveTo(200, 5, 150, 20, 170, 80);

  ctx.closePath();


  ctx.lineWidth = 5;
  ctx.fillStyle = 'rgba(255,255,255,.4)'
  ctx.fill();
  ctx.strokeStyle = 'white';
  ctx.stroke();

  ctx.restore();


	}
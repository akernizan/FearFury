console.log('akosua is connected');

function Cloud(context){
	this.context = context;
	this.x = 0;
	this.y = Math.random()*10;
	this.class = 'cloud';

	this.speed = .25;
}

Cloud.prototype.tick = function(){
   this.x += this.speed;

    // var width = this.context.canvas.width;
    // var height = this.context.canvas.height;

    // // here there be changes
    // var x = this.xPos, y = this.yPos;

    // this.x = (x + 3 * width/2) % width - width/2;
    // this.y = (y + 3 * height/2) % height - height/2;
}


Cloud.prototype.render = function(){
  var canvas = document.getElementById('akosua-canvas');
    	ctx = this.context;

      // ctx.save();

	    ctx.beginPath();
      ctx.moveTo(170, 80);
      ctx.bezierCurveTo(130, 120, 100, 150, 230, 150);
      ctx.bezierCurveTo(250, 190, 290, 180, 340, 150);
      ctx.bezierCurveTo(400, 150, 420, 120, 390, 100);
      ctx.bezierCurveTo(400, 40, 370, 40, 340, 50);
      ctx.bezierCurveTo(300, 10, 250, 20, 250, 50);
      ctx.bezierCurveTo(200, 5, 150, 20, 170, 80);

      ctx.closePath();

      // var time = new Date()/60;
      // var speed = this.speed/time;
      // console.log(time);
      // ctx.rotate(Math.PI * 6);
      // var linearSpeed = 100;
      // var newX = linearSpeed * time / 1000;
      // ctx.transform(1, 0, 0, 1, this.x, 0);
        var that = this;
      ctx.translate(canvas.width/3,0);
      setInterval(function(){
          ctx.setTransform(1, 0, 0, 1, that.x - 300, 0);
      },30);
      
      
      ctx.closePath();
      ctx.lineWidth = 5;
      ctx.fillStyle = '#fff';
      ctx.globalAlpha = 0.8;
      ctx.fill()
      ctx.strokeStyle = 'white';
      ctx.stroke(); 

      ctx.restore();


}


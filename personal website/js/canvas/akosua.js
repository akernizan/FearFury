console.log('akosua is connected');

function Akosua(context){
	this.context = context;
	this.x = 5;
	this.y = 5;
}

Akosua.prototype.moveRight = function(){
	this.x += 10;
}

Akosua.prototype.moveLeft = function(){
	this.x -= 10;
}

Akosua.prototype.render = function(){
	ctx = this.context;

	
	ctx.strokeStyle ='#222';
	ctx.fillStyle = '#222';
	ctx.lineWidth = 3;

	ctx.fillRect(this.x,window.innerWidth/4,20,20);
	ctx.stroke();
}
function Wall(context){
	this.context = context;
	this.x = 0;
	this.y = 0;
}

Wall.prototype.render = function(){
	ctx = this.context;

	ctx.strokeStyle = '#222';
	ctx.fillStyle = '#222';
	ctx.linewWidth = 3;
	ctx.fillRect(this.x,this.y, window.innerWidth/4, window.innerHeight);
	ctx.stroke();
}

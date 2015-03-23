function Island(context){
	this.context
}

Island.prototype.render = function(){

	ctx = this.context;
	ctx.strokeStyle ='#222';
	ctx.fillStyle = '#222';
	ctx.lineWidth = 3;
	// ctx.save();
	// ctx.clearRect(0, 0, window.innerWidth/2,window.innerHeight/2 );
	ctx.fillRect(0,window.innerHeight/2 ,window.innerWidth , window.innerHeight/2);
	ctx.stroke();
}
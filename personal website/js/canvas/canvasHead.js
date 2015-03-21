console.log('canvas is connected');

function Game(){
	this.setCanvas();
	this.sizeCanvas();
  this.hearInput();
  this.showName();
  this.watchCanvas();

  this.akosua = new Akosua(this.context);
  this.akosua.render();
}

Game.prototype.setCanvas = function(){
    this.canvas = document.getElementById('akosua')
    this.context = this.canvas.getContext('2d');
}

Game.prototype.sizeCanvas = function(){
    this.width = $(window).width();
    this.height = $(window).height()/1.5;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // $(this.canvas).css('left',25).css('top',25);
}

Game.prototype.showName = function(){
	var c = document.getElementById('akosua');
	var ctx = c.getContext('2d');
  ctx.font = "700% Helvetica Neue";
  ctx.fillStyle = "#E0336A ";
  ctx.fillText("Akosua Kernizan", window.innerWidth/5.15, 250);
}


Game.prototype.hearInput = function(){
  var that = this;

  $(window).keydown(function(event){
    var thisAkosua = that.akosua;
    var code = event.keyCode;

    if(code == 37){
      thisAkosua.moveLeft();
    }else if (code == 39){
      thisAkosua.moveRight();
    }else{
      return 'not valid';
    }
    that.render();
  });
}

Game.prototype.watchCanvas = function () {
  var thisGame = this;
  $(window).resize(function (event) {
    thisGame.sizeCanvas();
     thisGame.showName();
      thisGame.akosua.render();
  });
};


Game.prototype.render = function(){
  this.context.clearRect(0,0, this.width,this.height);
  this.showName();
  this.akosua.render();
}


Game.prototype.setGameInterval = function(){
  var game = this;
  var akosua = this.akosua;

  this.runInterval = setGameInterval(function(){






  })
}

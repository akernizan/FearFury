console.log('canvas is connected');

function Game(){
	this.setCanvas();
	this.sizeCanvas();
  this.watchCanvas();
  this.cloud = new Cloud(this.context);
  this.cloud.render();
  // this.island = new Island(this.context);
  // this.island.render();
  this.setGameInterval();
  
}

Game.prototype.setCanvas = function(){
    this.canvas = document.getElementById('akosua-canvas');
    this.context = this.canvas.getContext('2d');
}

Game.prototype.sizeCanvas = function(){
    this.width = $(window).width();
    this.height = $(window).height()/1.5;

    this.canvas.width = this.width;
    this.canvas.height = this.height;
}

Game.prototype.watchCanvas = function () {
  var thisGame = this;
  $(window).resize(function (event) {
    thisGame.sizeCanvas();
    thisGame.cloud.render();
  });
};


Game.prototype.render = function(){
  this.context.clearRect(0,0, this.width,this.height);
  this.cloud.render();
}

Game.prototype.setGameInterval = function(){
  var game = this;
  setInterval(function(){
    game.render();
    game.cloud.render();
    game.cloud.tick()
    game.render();

  }, 40);
}

$(function(){
  new Game();
}) 
  
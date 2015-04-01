function MainSet(){
	this.setCanvas();
	this.sizeCanvas();
	this.watchCanvas();
  // this.setGameInterval();

  this.cloud = new Cloud(this.context);
  this.cloud.render();
};


// MainSet.prototype.add = function(obj){
//   var collection = (obj.class == 'cloud') ? this.cloud : null;
//   collection.push(obj);
// }

// MainSet.prototype.cloudShooter = function(){
//   var set = this;

//   this.cloudInterval = setInterval(function(){
//     new Cloud(set);
//   },1000)
// }


MainSet.prototype.setCanvas = function(){
    this.canvas = document.getElementById('fear-canvas');
    this.context = this.canvas.getContext('2d');
};

MainSet.prototype.sizeCanvas = function(){
   this.width = $(window).width() - 25;
  this.height = $(window).height() - 25;


    this.canvas.width = this.width;
    this.canvas.height = this.height;

    $(this.canvas).css('left', 25).css('top', 25);
};

MainSet.prototype.watchCanvas = function () {
  var thisMainSet = this;
  $(window).resize(function (event) {
    thisMainSet.sizeCanvas();
  
  });
};

MainSet.prototype.setCartesian = function () {
  this.context.translate(this.width / 2, this.height / 2);
  this.context.scale(1, -1);
};

MainSet.prototype.render = function(){
  this.context.clearRect(0,0,this.width,this.height);
  this.cloud.render();
};

// MainSet.prototype.setGameInterval = function(){
//   var set = this;
//   var cloud = this.cloud;
//   setInterval(function(){
//     set.cloud.tick();
//     set.render();
//     set.cloud.render();
//   }, 40)
// };

$(function(){
  new MainSet();
});
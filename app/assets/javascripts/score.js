// canvas for leaderboard
 var leaderBoard = new Phaser.Game(1205-50, 581-50, Phaser.Canvas, '',{preload: preload, create: create, update: update})

 function preload(){
 	this.game.canvas.id = 'leaderBoard'
 	leaderBoard.load.image('diamond', './images/diamond.png');
 	leaderBoard.load.image('ground', './images/ground.png');
 }

 function create(){
 	leaderBoard.stage.backgroundColor = '#7ec0ee';

 	 leaderBoard.physics.startSystem(Phaser.Physics.Arcade);
 	 leaderBoard.physics.arcade.gravity.y = 200;

 	 	// add diamond group
		diamonds = leaderBoard.add.group();
		diamonds.enableBody = true;
		// add more diamonds
		// setInterval(function(){
		// 	for(var i =0; i < 40; i++){
		// 		var diamond = diamonds.create(i * 30, 0, 'diamond');
		// 		diamond.scale.setTo(0.5,0.5)
		// 		diamond.body.gravity.y = 3;
		// 		diamond.body.bounce.y = 0.2 + Math.random() * 0.3;
		// 		diamond.lifespan = 5000;
		// 	}
		// }, 4000)


		floor = leaderBoard.add.group();
		floor.enableBody = true;

		bottom = floor.create(0,530,'ground');
		bottom.body.allowGravity = false;
		bottom.body.immovable = true;
 }




function update(){
	// leaderBoard.physics.arcade.collide(diamonds,floor);
}

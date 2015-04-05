	var clouds = [];
	var diamonds = [];
	var platforms = [];
	var positions = [ 
			[0, 0, 0.5], 
			[550, 200, 0.25], 
			[300, 400, 0.33], 
			[600, 320, 0.6], 
			[900, 70, 0.45] 
	];
	var speeds = [
		0.5, 0.65, 0.6, 0.45, 0.46
	]
	score = 0;
	var scoreText; 
	var height;
	var width;
	var firballInt;

	// start game code
	var heightsGame = new Phaser.Game(1205 - 50 ,581 -50, Phaser.AUTO, 'heights', {preload: preload, create: create, update: update})
	var stickSpeed = 3;
	
	function preload(){
		heightsGame.load.image('cloud', './images/cloud.png');
		heightsGame.load.image('man', './images/stickman.png');
		heightsGame.load.image('diamond', './images/diamond.png');
		heightsGame.load.image('platform', './images/longplatform.png');
		heightsGame.load.image('ground', './images/ground.png');
		heightsGame.load.image('fire', './images/red_ball.png');

		heightsGame.load.audio('theme', './sounds/theme.mp3');
		heightsGame.load.audio('laser', './sounds/lazer.mp3');
		heightsGame.load.audio('cling', './sounds/diamond.mp3');
		heightsGame.load.audio('death', './sounds/deathsplosion.mp3');
	}
	function create(){
	
		height = heightsGame.world.height;
		width = heightsGame.world.width;
		this.game.canvas.id = 'heights-canvas';
		heightsGame.stage.backgroundColor = '#7ec0ee';


		theme = this.game.add.audio('theme');
		cling = this.game.add.audio('cling');
		laser = this.game.add.audio('laser');
		death = this.game.add.audio('death');

		// enabled arcade physics to game 
		heightsGame.physics.startSystem(Phaser.Physics.ARCADE);
		heightsGame.physics.arcade.gravity.y = 500;
		//add clouds to canvas
		for (var i = 0; i < positions.length; i++) {
			var cloud = heightsGame.add.sprite(positions[i][0],positions[i][1],'cloud');
			cloud.scale.setTo(positions[i][2], positions[i][2]);
			clouds.push(cloud);
		};
		// add platforms to canvas 
		platforms = heightsGame.add.group();
		platforms.enableBody = true;

		ledge = platforms.create(Math.floor(Math.random()*90),200, 'platform');
		ledge.scale.setTo(0.25,0.25);
		ledge.body.allowGravity = false;
		ledge.body.immovable = true;

		ledge2 = platforms.create(800,400,'platform');
		ledge2.scale.setTo(0.25,0.25);
		ledge2.body.allowGravity = false;
		ledge2.body.immovable = true;

		ledge3 = platforms.create(100,420,'platform');
		ledge3.scale.setTo(0.25,0.25);
		ledge3.body.allowGravity = false;
		ledge3.body.immovable = true;

		ledge4 = platforms.create(870,150,'platform');
		ledge4.scale.setTo(0.25,0.25);
		ledge4.body.allowGravity = false;
		ledge4.body.immovable = true;
	
		ledge5 = platforms.create(0,530,'ground');
		ledge5.body.allowGravity = false;
		ledge5.body.immovable = true;
		
		ledge6 = platforms.create(400,300,'platform');
		ledge6.scale.setTo(0.25,0.25);
		ledge6.body.allowGravity = false;
		ledge6.body.immovable = true;
			
		// add and scale stick figure
		player = heightsGame.add.sprite(1200,0,'man');
		player.scale.setTo(0.1,0.1);
		heightsGame.physics.arcade.enable(player);
		player.body.bounce.y = 0.3;
		player.body.collideWorldBounds = true;
		
	
		// add scoreboard 
		scoreText = heightsGame.add.text(16,16,'score:0', {
			fontSize: '32px', fill: '#222'
		});
		
		// add diamond group
		diamonds = heightsGame.add.group();
		diamonds.enableBody = true;
		// add more diamonds
		for(var i =0; i < 40; i++){
			var diamond = diamonds.create(i * 30, 0, 'diamond');
			diamond.scale.setTo(0.5,0.5)
			diamond.body.gravity.y = 6;
			diamond.body.bounce.y = 0.2 + Math.random() * 0.1;
		}
    // add fire group
    fireballs = heightsGame.add.group();
		fireballs.enableBody = true;
		// function to shoot fireballs
    var fireShooter = function(x,y, size, velocity){
			fireball = fireballs.create(x,y,'fire');
			heightsGame.physics.arcade.enable(fireball);
			fireball.body.immovable = true;
			fireball.scale.setTo(size,size);
			fireball.body.setSize(10,10,40,32);
			fireball.body.velocity.x = velocity;
			fireball.lifespan = 2000;
			return fireball;
		}

		// set interval to shoot firballs
		firballInt = setInterval(function(){
			laser.play();
		 	 fireShooter(900,height/4,0.9,-600),
			 // fireShooter(100,500,0.7,600),
			 fireShooter(0,height/2,0.7,600),
			 fireShooter(700, height/3, 0.6, 600),
			 fireShooter(700, 0, 0.6, -600)
			}, 2000)

		//adding keyboard code to move stick figure
		upKey = heightsGame.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = heightsGame.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftKey = heightsGame.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = heightsGame.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	};
	// 	var stopAnimation = function(){
	// 	fireball.animation.stop();
	// }


	function collectDiamonds(player, diamond){
		// removes diamonds from canvas
		cling.play();
		diamond.kill();
		// add and update the score
		score += 20;
		scoreText.text = 'Score: ' + score;
	}
	function deadMan(player, fireball){
		// if stickman gets hit by fireball
		// he gets killed
		// get player score
		player.kill();
		death.play();

		// stopAnimation();
		// activate modal
		$('#loser').modal('show');
		$('.loser-sign').text('You Lose! Your score is ' + score);
	}
		
		$('#add-score').on('click', function(){
			var values = {
				score: {
					player: $('#alias').val(),
					total: score
				}
			}
		
			$.ajax({
				url: '/scores',
				method: 'POST',
				data: values,
				dataType: 'json',
				success: function(data){
					console.log(data);
				}
			})
	})
	var newLevel = function(){
		if(score >= 300){
			player.kill();
			$('#heights-canvas').fadeOut(3000, function () {
				window.location.replace("<%= small_url %>");
			});
			
		}
	}





	function update(){
		newLevel();
		heightsGame.physics.arcade.collide(player, platforms);
		heightsGame.physics.arcade.collide(diamonds, platforms);
		heightsGame.physics.arcade.overlap(player, diamonds,collectDiamonds, null, this);
		heightsGame.physics.arcade.collide(player, fireballs, deadMan, null, this);
	
		// update clouds
		for (var i = 0; i < clouds.length; i++) {
			var cloud = clouds[i];
			var speed = speeds[i];
			cloud.y -= speed;
			if (cloud.y < -cloud.height) {
				cloud.y = height;
			}
		};
		// move stickman
		if (upKey.isDown){
			player.y-= stickSpeed;
		}else if(downKey.isDown){
			player.y+= stickSpeed;
		} 
		if (leftKey.isDown){
			player.x-= stickSpeed;
		}else if (rightKey.isDown){
			player.x+= stickSpeed;
		}
		if(upKey.isDown && player.body.y >= 1){
			player.body.velocity.y = -5;
		}
	};

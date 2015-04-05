	var eyes =[];
	var eyePosition = [
		[500,100,0.5],
		[600,320,0.5],
		[944,400,0.5],
		[100,350,0.5],
		[350,200,0.5],
		[800,150,0.5]
	]

	var score = 0;
	var scoreText; 

	var bossSpeed = 3;

	var darkGame = new Phaser.Game(1205 - 50 ,581 -50, Phaser.AUTO,'dark',{preload: preload, create: create, update: update})

	function preload(){
		darkGame.load.image('monster', './images/yellow-eye.png');
		darkGame.load.image('boss', './images/boss.png');
		darkGame.load.image('fireball', './images/red_ball.png');
		darkGame.load.image('man', './images/stickman.png');
		darkGame.load.image('darkground', './images/darkground.png');
		darkGame.load.image('gems', './images/diamond.png');
		darkGame.load.image('darkforms', './images/bossplatform.png');
		darkGame.load.image('pineapple','./images/pineapple.png');

		darkGame.load.audio('theme', './sounds/theme.mp3');
		darkGame.load.audio('laser', './sounds/lazer.mp3');
		darkGame.load.audio('cling', './sounds/diamond.mp3');
		darkGame.load.audio('fruit', './sounds/fruitgrab.mp3');
		darkGame.load.audio('death', './sounds/deathsplosion.mp3');
	}

	function create(){
		darkGame.canvas.id = 'dark-canvas'
		darkGame.stage.backgroundColor = '#423';

		theme = this.game.add.audio('theme');
		cling = this.game.add.audio('cling');
		laser = this.game.add.audio('laser');
		fruit = this.game.add.audio('fruit');
		death = this.game.add.audio('death');
  
    playMusic = function(){
      theme.play(); 
      setInterval(function(){
        setTimeout(function(){
          theme.play();
        }, 375);
      }, 90000)
    }

    playMusic();

		darkGame.physics.startSystem(Phaser.Physics.ARCADE);
		darkGame.physics.arcade.gravity.y = 500;

		// adding platforms
		grounds = darkGame.add.group();
		grounds.enableBody = true;

		ground = grounds.create(-100,520,'darkground');
		ground.body.allowGravity = false;
		ground.body.immovable = true;

		terrace = grounds.create(200, 400, 'darkforms');
		terrace.scale.setTo(0.3,0.3);
		terrace.body.allowGravity = false;
		terrace.body.immovable = true;

		terrace = grounds.create(750, 300, 'darkforms');
		terrace.scale.setTo(0.3,0.3);
		terrace.body.allowGravity = false;
		terrace.body.immovable = true;

		// add player to canvas
		player = darkGame.add.sprite(Math.floor(Math.random() * 1200), 0,'man');
		player.scale.setTo(0.1,0.1);
		darkGame.physics.arcade.enable(player);
		// player.body.allowGravity = true;
		player.body.bounce.y = 0.3;
		player.body.collideWorldBounds = true;

		// add background eyes
		for(var i=0; i<eyePosition.length; i++){
			var yellowEye = darkGame.add.sprite(eyePosition[i][0],eyePosition[i][1] ,'monster');
			yellowEye.anchor.setTo(eyePosition[i][2],eyePosition[i][2]);
			yellowEye.scale.setTo(eyePosition[i][2],eyePosition[i][2]);
			yellowEye.alpha = 0;
			darkGame.add.tween(yellowEye).to({alpha:1}, 5000,Phaser.Easing.Linear.None, true,0,8000,true);
		}


		bossy = darkGame.add.group();
		bossy.enableBody = true;

		boss = bossy.create(Math.floor(Math.random()*550),100,'boss');
		boss.scale.setTo(0.65,0.65);
		darkGame.physics.arcade.enable(boss);
		boss.body.allowGravity = false;
		boss.body.collideWorldBounds = true;

		// add diamonds
		gems = darkGame.add.group();
		gems.enableBody = true;

		for(var i =0; i < 20; i++ ){
			var gem = gems.create(i * 60, 0, 'gems');
			gem.scale.setTo(0.5,0.5);
			gem.body.gravity.y = 6;
			gem.body.bounce.y = 0.2 + Math.random() * 0.2;
		}

		// adding special obj for extra points
		orbs = darkGame.add.group();
		orbs.enableBody = true;

		// for(var i =0; i < 5; i++){
			var orb = orbs.create(Math.ceil(Math.random() * 1000 + 15), 0, 'pineapple');
			var pineapple = orbs.create(Math.ceil(Math.random() * 1000 + 500), 0, 'pineapple');
			var pine = orbs.create(Math.ceil(Math.random() * 1000 + 200), 0, 'pineapple');
			var apple = orbs.create(Math.ceil(Math.random() * 1000 + Math.floor(Math.random() * 300)), 0, 'pineapple');
	
			// orb.body.gravity.y = 6;
			// gem.body.bounce.y = 0.1;
		// }


		//adding keyboard code to move boss
		upKey = darkGame.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = darkGame.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftKey = darkGame.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = darkGame.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    spaceBar = darkGame.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

  	lasers = darkGame.add.group();
  	lasers.enableBody = true;

    laserEye = function(size,xVelocity, yVelocity){
    	var laser_array = ['fireball','fireball','fireball','fireball','fireball','fireball',
    	'fireball'];
    	random_laser = laser_array[Math.floor(laser_array.length * Math.random())];
    	laser = lasers.create(boss.x + 100, boss.y + 120,random_laser);
    	
    	darkGame.physics.arcade.enable(laser);
    	
    	laser.body.immovable = true;
    	laser.scale.setTo(size,size);
    	laser.body.velocity.x = xVelocity;
    	laser.body.velocity.y = yVelocity;
    	return laser;
    }

    laserEye2 = function(size,xVelocity, yVelocity){
    		var laser_array = ['fireball','fireball','fireball','fireball','fireball','fireball',
    	'fireball'];
    	random_laser = laser_array[Math.floor(laser_array.length * Math.random())];

    	laser = lasers.create(boss.x + 215, boss.y + 120,random_laser);
 
    	darkGame.physics.arcade.enable(laser);
    	laser.body.immovable = true;
    	laser.scale.setTo(size,size);
    	laser.body.velocity.x = xVelocity;
    	laser.body.velocity.y = yVelocity;
    	return laser;
    }

    bossMover = setTimeout(function(){
    	darkGame.add.tween(boss).to({ x: darkGame.world.width - 400}, 4000, Phaser.Easing.Quadratic.InOut, true, 0, 3000, true);
    	setInterval(function(){
    		// 	laser.play();
    		laserEye(0.5,-800, 800);
				laserEye2(0.5,-600, 600); 
    	}, 1000)	
    }, 2000)

    // setInterval(function(){
    // 	laser.play();
    // }, 1000)
    
    // add scoreboard 
		scoreText = darkGame.add.text(16,16,'score:0', {
			fontSize: '32px', fill: '#fff'
		});
	}

	function collectGems(player, gem){
		gem.kill();
		cling.play();

		score += 75;
		scoreText.text = 'Score: ' + score;
	}

	function collectPineapple(player, orb){
		orb.kill();
		fruit.play();

		score += 150;
		scoreText.text = 'Score: ' + score;
	}


	function Death(){
		player.kill();
		death.play();

		$('#darkLoser').modal('show');
		$('.loser-sign').text('You Lose! Your score is ' + score);
	}

	var Winner = function(){
		if(score >= 800){
			player.kill();
			$('#darkWinner').modal('show');
			$('.winner-sign').text('Winner!! Your score is ' + score);
			stopAnimation();
		}
	}

	var stopAnimation = function(){
		boss.stop();
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


	function update(){
		darkGame.physics.arcade.collide(player, lasers, Death, null, this);
		darkGame.physics.arcade.overlap(player, lasers, Death, null, this);

		darkGame.physics.arcade.collide(player, gems, collectGems, null, this);
		darkGame.physics.arcade.overlap(player, gems, collectGems, null, this);

		darkGame.physics.arcade.collide(player, orbs, collectPineapple, null, this);
		darkGame.physics.arcade.overlap(player, orbs, collectPineapple, null, this);


		darkGame.physics.arcade.collide(gems, grounds);
		darkGame.physics.arcade.collide(orbs, grounds);
		darkGame.physics.arcade.collide(player, grounds);

			
		if (upKey.isDown){
			player.y-= bossSpeed;
		}else if(downKey.isDown){
			player.y+= bossSpeed;
		} 
		if (leftKey.isDown){
			player.x-= bossSpeed;
		}else if (rightKey.isDown){
			player.x+= bossSpeed;
		}

		Winner();

		if(upKey.isDown && player.body.y >= 1){
			player.body.velocity.y = -5;
	
		}
	}

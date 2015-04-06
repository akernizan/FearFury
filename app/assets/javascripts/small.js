  var stickSpeed = 3;
  var score = 0;
  var scoreText; 
  // var melonScore = 0;
  // var melonText;

  var wallIsMoving = false;
  var wallSpeed = 0.7;
  var wallSwapInterval;

 
  var smallGame = new Phaser.Game(1155 ,531, Phaser.AUTO,'',{preload: preload, create: create, update: update})

  function preload(){
    smallGame.load.image('wall', './images/ceiling.png');
    smallGame.load.image('platform', './images/longplatform.png');
    smallGame.load.image('darkground', './images/darkground.png');
    smallGame.load.image('diamond', './images/diamond.png');
   
    smallGame.load.spritesheet('man', './images/catL.png', 16, 16);


    smallGame.load.image('melon', './images/melon.png');

    smallGame.load.audio('theme', './sounds/theme.mp3');
    smallGame.load.audio('laser', './sounds/lazer.mp3');
    smallGame.load.audio('cling', './sounds/diamond.mp3');
    smallGame.load.audio('fruit', './sounds/fruitgrab.mp3');
    smallGame.load.audio('death', './sounds/deathsplosion.mp3');
  }

  function create(){
    wallSwapInterval = setInterval(function () {
      wallIsMoving = !wallIsMoving;
    }, 2000)
    this.game.canvas.id = "small-canvas"
    smallGame.stage.backgroundColor = "#334";

    theme = this.game.add.audio('theme');
    cling = this.game.add.audio('cling');
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

    // melonText = smallGame.add.text(16,40, 'Melons:0',{
    //  fontSize: '32px', fill: '#fff'
    // });
    
    smallGame.physics.startSystem(Phaser.Physics.ARCADE);
    smallGame.physics.arcade.gravity.y = 500;

    jewels = smallGame.add.group();
    jewels.enableBody = true;

    for(var i =0; i < 40; i++){
      var jewel = jewels.create(i * 30, 0, 'diamond');
      jewel.scale.setTo(0.5,0.5)
      jewel.body.gravity.y = 6;
      jewel.body.bounce.y = 0.02 + Math.random() * 0.02;
    }

    melons = smallGame.add.group();
    melons.enableBody = true;

    for(var i =0; i < 4; i++){
      var melon = melons.create(i  * 200 , 0, 'melon');
      // melon.scale.setTo(0.5,0.5);
      melon.body.gravity.y = 6;
      melon.body.bounce.y = 0.02 + Math.random() * 0.02;
    }

    steps = smallGame.add.group();
    steps.enableBody = true;

    var step = steps.create(100, 300, 'platform')
    step.scale.setTo(0.25,0.25)
    step.body.allowGravity = false;
    step.body.immovable = true;
    // step.body.collideWorldBounds = true;

    step2 = steps.create(800,400,'platform');
    step2.scale.setTo(0.25,0.25)
    step2.body.allowGravity = false;
    step2.body.immovable = true;

    step3 = steps.create(100,420,'platform');
    step3.scale.setTo(0.25,0.25)
    step3.body.allowGravity = false;
    step3.body.immovable = true;
  
    step4 = steps.create(700,275,'platform');
    step4.scale.setTo(0.25,0.25)
    step4.body.allowGravity = false;
    step4.body.immovable = true;

    step5 = steps.create(-100,520,'darkground');
    step5.scale.setTo(1,1)
    step5.body.allowGravity = false;
    step5.body.immovable = true;
    // step4.body.collideWorldBounds = true;

    // add and scale stick figure
    player = smallGame.add.sprite(300,500,'man');
    player.scale.setTo(1.5,1.5);
    smallGame.physics.arcade.enable(player);
    // stickMan.body.gravity.y = 10
    player.body.bounce.y = 0.3;
    player.body.collideWorldBounds = true;

    // added drop ceiling
    ceiling = smallGame.add.group()
    ceiling.enableBody = true;

    greywall = ceiling.create(-10,-700,'wall');
    greywall.scale.setTo(1,1);
    greywall.body.allowGravity = false;
    smallGame.physics.arcade.enable(greywall);
    greywall.body.collideWorldBounds = false;
    greywall.body.setSize(greywall.width/2,greywall.height/2,200,350);

    // add scoreboard 
    scoreText = smallGame.add.text(16,16,'Score:0', {
      fontSize: '32px', fill: '#fff'
    });

    smallGame.add.tween(step4).to({ y: 200 }, 4000, Phaser.Easing.Quadratic.InOut, true, 0, 3000, true);
    smallGame.add.tween(step).to({ x: 300 }, 4000, Phaser.Easing.Quadratic.InOut, true, 0, 3000, true);

    //adding keyboard code to move stick figure
    upKey = smallGame.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = smallGame.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftKey = smallGame.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = smallGame.input.keyboard.addKey(Phaser.Keyboard.RIGHT);


  }

  function collectJewels(player, jewel){
    jewel.kill();
    cling.play();

    score += 20;
    scoreText.text = 'Score: ' + score;
  }


  function collectMelons(player, melon){
    melon.kill();
    fruit.play();
    // score += 100;
    score += 50;
    scoreText.text = 'Score: ' + score;

    // melonText.text = 'Score: ' + melonScore;
  }

  function deadMan(player, greywall){
    player.kill();
    death.play();

    $('#smLoser').modal('show');
    $('.loser-sign').text('You Lose! Your score is ' + score);

}
  // grab user alias and score
  // send to server
  // show scores
  $('#add-score').on('click', function(){
    var values = {
      scores: {
        alias: $('#alias').val(),
        score: score
      }
    }

    $.ajax({
      url: '/scores',
      method: 'POST',
      data: values,
      dataType: 'json',
      success: function(data){
        
      }
    })
  })

  var newLevel = function(){
    if(score >= 500){
      player.kill();
      $('#small-canvas').fadeOut(3000, function () {
        window.location.replace("/dark");
      });
    }
  }
  
  function update(){
    newLevel();

    if (wallIsMoving) {
      greywall.y += wallSpeed;
    }
    
    smallGame.physics.arcade.collide(jewels, steps)
    smallGame.physics.arcade.collide(melons, steps)
    smallGame.physics.arcade.collide(player, steps)

    smallGame.physics.arcade.collide(player, ceiling, deadMan, null, this)
    smallGame.physics.arcade.overlap(player, ceiling, deadMan, null, this)

    smallGame.physics.arcade.collide(player, jewels, collectJewels, null, this)
    smallGame.physics.arcade.overlap(player, jewels, collectJewels, null, this)

    smallGame.physics.arcade.collide(player, melons, collectMelons, null,this)
    smallGame.physics.arcade.overlap(player,melons,collectMelons, null, this)


    if(greywall.y > -50 && wallSpeed != 0){
      clearInterval(wallSwapInterval);
      wallIsMoving = false;
    } 

    // move stickman
    if (upKey.isDown){
      player.y-= stickSpeed;
    }else if(downKey.isDown){
      // player.y+= stickSpeed;
    } 
    if (leftKey.isDown){
      player.x-= stickSpeed;
       player.scale.x = 1.5;

    }else if (rightKey.isDown){
      player.x+= stickSpeed;

       player.scale.x = -1.5;
    }

    if(upKey.isDown && player.body.touching.down){
      player.body.velocity.y = -200;
    }
  }
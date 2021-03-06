 // // This is called with the results from from FB.getLoginStatus().
 //  function statusChangeCallback(response) {
 //    console.log('statusChangeCallback');
 //    console.log(response);
 //    // The response object is returned with a status field that lets the
 //    // app know the current login status of the person.
 //    // Full docs on the response object can be found in the documentation
 //    // for FB.getLoginStatus().
 //    if (response.status === 'connected') {
 //      // Logged into your app and Facebook.
 //      testAPI();
 //    } else if (response.status === 'not_authorized') {
 //      // The person is logged into Facebook, but not your app.
 //      document.getElementById('status').innerHTML = 'Please log ' +
 //        'into this app.';
 //    } else {
 //      // The person is not logged into Facebook, so we're not sure if
 //      // they are logged into this app or not.
 //      document.getElementById('status').innerHTML = 'Please log ' +
 //        'into Facebook.';
 //    }
 //  }

 //  // This function is called when someone finishes with the Login
 //  // Button.  See the onlogin handler attached to it in the sample
 //  // code below.
 //  function checkLoginState() {
 //    FB.getLoginStatus(function(response) {
 //      statusChangeCallback(response);
 //    });
 //  }

 //  window.fbAsyncInit = function() {
 //  FB.init({
 //    appId      : '1553615548245528',
 //    cookie     : true,  // enable cookies to allow the server to access 
 //                        // the session
 //    xfbml      : true,  // parse social plugins on this page
 //    version    : 'v2.2' // use version 2.2
 //  });

 //  // Now that we've initialized the JavaScript SDK, we call 
 //  // FB.getLoginStatus().  This function gets the state of the
 //  // person visiting this page and can return one of three states to
 //  // the callback you provide.  They can be:
 //  //
 //  // 1. Logged into your app ('connected')
 //  // 2. Logged into Facebook, but not your app ('not_authorized')
 //  // 3. Not logged into Facebook and can't tell if they are logged into
 //  //    your app or not.
 //  //
 //  // These three cases are handled in the callback function.

 //  FB.getLoginStatus(function(response) {
 //    statusChangeCallback(response);
 //  });

 //  };

 //  // Load the SDK asynchronously
 //    (function(d, s, id){
 //     var js, fjs = d.getElementsByTagName(s)[0];
 //     if (d.getElementById(id)) {return;}
 //     js = d.createElement(s); js.id = id;
 //     js.src = "//connect.facebook.net/en_US/sdk.js";
 //     fjs.parentNode.insertBefore(js, fjs);
 //   }(document, 'script', 'facebook-jssdk'));

 //  // Here we run a very simple test of the Graph API after login is
 //  // successful.  See statusChangeCallback() for when this call is made.
 //  function testAPI() {
 //    console.log('Welcome!  Fetching your information.... ');
 //    FB.api('/me', function(response) {
 //      console.log('Successful login for: ' + response.name);
 //      document.getElementById('status').innerHTML =
 //        'Thanks for logging in, ' + response.name + '!';
 //    });
 //  }




// start code for game
  var clouds = [];
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


  var game = new Phaser.Game(1155,531, Phaser.AUTO, '', {preload: preload, create: create, update:update})

  function preload(){
    game.load.image('cloud', './images/cloud.png');
    game.load.audio('theme', './sounds/theme.mp3');
  }

  function create(){

    this.game.canvas.id = 'home-canvas';
    game.stage.backgroundColor = '#7ec0ee';

    theme = this.game.add.audio('theme');
  
    playMusic = function(){
      theme.play(); 
      setInterval(function(){
        setTimeout(function(){
          theme.play();
        }, 375);
      }, 90000)
    }

    playMusic();
    
    for (var i = 0; i < positions.length; i++) {
      var cloud = game.add.sprite(positions[i][0],positions[i][1],'cloud');
      cloud.scale.setTo(positions[i][2], positions[i][2]);
      clouds.push(cloud);
    };
  };

  

  function update(){
    var height = game.world.height;

    // update clouds
    for (var i = 0; i < clouds.length; i++) {
      var cloud = clouds[i];
      var speed = speeds[i];
      cloud.y -= speed;

      if (cloud.y < -cloud.height) {
        cloud.y = height;
      }
    };
  };
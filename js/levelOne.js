

var player;
var platforms;
var cursors;

var chests;
var chest;

var key;
var keys;
var keyCollected = false;

var spikes;
var spike;

var board;
var boards;

var audio = new Audio ('assets/gameSound.mpeg');
var startAudio;
var stopAudio;

var stars;
var score = 0;
var scoreText;


var levelOne = {
    preload: function()
{

    game.load.image('background', 'assets/background.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.image('spike', 'assets/spike.png');
    game.load.image('chest', 'assets/chest.png');
    game.load.image('key', 'assets/key.png');
    game.load.image('button', 'assets/button.png');
    game.load.image('buttonTwo', 'assets/buttonTwo.png');
    game.load.image('boardRight', 'assets/boardRight.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

},

    create: function() {

        audio.play();

    //  Create the game physics.
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Background
    game.add.sprite(0, 0, 'background');

    
    platforms = game.add.group();

    platforms.enableBody = true;

    // Creating the ground
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    // Scaling to fit the screen
    ground.scale.setTo(2, 2);

    //  Stops it floating away if hit
    ground.body.immovable = true;

    //  Ledges
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(500, 170, 'ground');
    ledge.body.immovable = true;



    // STARS
    stars = game.add.group();

  
    stars.enableBody = true;

    

     
        star = stars.create(140,500,'star');
        star = stars.create(100,300,'star');
        star = stars.create(400,300,'star');
        star = stars.create(50,200,'star');
        star = stars.create(300,300,'star');
        star = stars.create(500,250,'star');
        star = stars.create(700,120,'star');
        star = stars.create(500,500,'star');
        star = stars.create(750,300,'star');
      //  star.body.gravity.y = 300;
       // star.body.bounce.y = 0.7 + Math.random() * 0.2;




    //  The score
    scoreText = this.game.add.text(16, 16, 'Score: ' + score, {fontSize: '32px', fill: '#000'});

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

    //  Creating the Chest for the win condition.
    chests = this.game.add.group();
    chests.enableBody = true;
    chest = chests.create(730, 469, 'chest');
    chest.body.immovable = true;
    chest.scale.setTo(1.5, 1.5);


    //  Creating the spikes to kill the player.
    spikes = this.game.add.group();
    spikes.enableBody = true;

    spike = spikes.create(200, 487, 'spike');
    spike.scale.setTo(2, 2);
    spike.body.immovable = true;
    spike.body.setSize(40,21,3,5);
    spike = spikes.create(550, 123, 'spike');
    spike.scale.setTo(2, 2);
    spike.body.immovable = true;
    spike.body.setSize(40,21,3,5);
    spike = spikes.create(120, 202, 'spike');
    spike.scale.setTo(2, 2);
    spike.body.immovable = true;
    spike.body.setSize(40,21,3,5);
    spike = spikes.create(600, 353, 'spike');
    spike.scale.setTo(2, 2);
    spike.body.immovable = true;
    spike.body.setSize(40,21,3,5);

    boards = this.game.add.group();
    boards.enableBody = true;
    board = boards.create(0,472, 'boardRight');
    board.scale.setTo(0.5,0.5);

    //  Create the key
    keys = this.game.add.group();
    keys.enableBody = true;
    key = keys.create(720, 90, 'key');

        startAudio = this.add.button(this.game.world.centerX - 50,
            this.game.world.centerY - 300,
            'buttonTwo', this.startMusic, this);
        startAudio.scale.setTo(0.25,0.25);

        stopAudio = this.add.button(this.game.world.centerX - -20,
            this.game.world.centerY - 300,
            'buttonTwo', this.stopMusic, this);
        stopAudio.scale.setTo(0.25,0.25);
        this.game.add.text(355, 10, 'Music On', { fontSize: '15px', fill: '#000' });
        this.game.add.text(430, 10, 'Music Off', { fontSize: '15px', fill: '#000' });



    // The player and its settings
        player = game.add.sprite(32, game.world.height - 150, 'dude');

       
        game.physics.arcade.enable(player);

        
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

},

   // render: function(){
    // this.game.debug.physicsGroup(spikes);
    // this.game.debug.body(player);
  //  },

    update: function() {

    //  Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);

    var hitKey = game.physics.arcade.collide(player, key);
    var hitChest = game.physics.arcade.collide(player, chest);
    var hitSpike = game.physics.arcade.collide(player, spikes);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, stars, this.collectStar, null, this);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    } else if (cursors.right.isDown) {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    } else {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
        player.body.velocity.y = -350;
    }

    if (hitKey) {
        key.kill();
        keyCollected = true;
        key = keys.create(165, 10, 'key');
        keys.enableBody = false;
        key.scale.setTo(.75, .75);

    }

    if (hitChest && keyCollected == true) {
        this.levelComplete();
    }

    if (hitSpike){
        this.state.restart();
        score = score - 100;

    }



},
collectStar: function(player, star) {

        // Removes the star from the screen
        star.kill();

        //  Add and update the score
        score += 10;
        scoreText.text = 'Score: ' + score;

    },

    levelComplete: function(){
        this.state.start('levelTwo');
    },


    startMusic: function(){
        audio.play();
    },

    stopMusic: function(){
        audio.pause();
    }

}

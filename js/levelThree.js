console.log('level TWO');

var player;
var platforms;
var cursors;

var chests;
var chest;

var chestsTwo;
var chestTwo;

var key;
var keys;
var keyCollected = false;

var keyTwo;
var keysTwo;
var keyTwoCollected = false;

var spikes;
var spike;

var board;
var boards;
var boardKill;
var boardsKill;

var gem;
var gems;

var water;
var river;

var audio = new Audio ('assets/gameSound.mpeg');
var startAudio;
var stopAudio;

var stars;
var score = 0;
var scoreText;
var levelThree = {
    preload: function()
    {

        game.load.image('background', 'assets/background.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.image('spike', 'assets/spike.png');
        game.load.image('chest', 'assets/chest.png');
        game.load.image('chestTwo', 'assets/chestTwo.png');
        game.load.image('key', 'assets/key.png');
        game.load.image('keyTwo','assets/keyTwo.png');
        game.load.image('button', 'assets/button.png');
        game.load.image('buttonTwo', 'assets/buttonTwo.png');
        game.load.image('boardLeft', 'assets/boardLeft.png');
        game.load.image('boardKill', 'assets/boardKill.png');
        game.load.image('gem', 'assets/gemRed.png');
        game.load.image('water', 'assets/water2.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

    },

    create: function() {

        audio.play();


        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        game.add.sprite(0, 0, 'background');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = game.add.group();

        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;

        // Here we create the ground.
        var ground = platforms.create(717, game.world.height - 64, 'ground');

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(0.5, 2);

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;



        river = this.game.add.group();
        river.enableBody = true;
        water = river.create(0, game.world.height - 64, 'water');
        water.body.immovable = true;
        water = river.create(119, game.world.height - 64, 'water');
        water.body.immovable = true;
        water = river.create(238, game.world.height - 64, 'water');
        water.body.immovable = true;
        water = river.create(357, game.world.height - 64, 'water');
        water.body.immovable = true;
        water = river.create(476, game.world.height - 64, 'water');
        water.body.immovable = true;
        water = river.create(595, game.world.height - 64, 'water');
        water.body.immovable = true;


        //  Now let's create two ledges
        var ledge = platforms.create(100, 320, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(0.5,1);


        ledge = platforms.create(0, 165, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(0.5,1);

        ledge = platforms.create(600, 125, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.25,1);

        ledge = platforms.create(0, 510, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(0.5,1);


        ledge = platforms.create(215, 100, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(0.5,1);

        ledge = platforms.create(475, 450, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(0.3,1);

        ledge = platforms.create(475, 250, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(0.5,1);

        ledge = platforms.create(700, 298, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(0.5,1);

        //  Finally some stars to collect
        stars = game.add.group();

        //  We will enable physics for any star that is created in this group
        stars.enableBody = true;

        //  Here we'll create 12 of them evenly spaced apart

        //  Create a star inside of the 'stars' group

        star = stars.create(320,55,'star');
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
        star = stars.create(350,55,'star');
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
        star = stars.create(380,55,'star');
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;


        //  The score
        scoreText = this.game.add.text(16, 16, 'Score: ' + score, {fontSize: '32px', fill: '#000'});

        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();

        //  Creating the Chest for the win condition.
        chests = this.game.add.group();
        chests.enableBody = true;
        chest = chests.create(10, 100, 'chest');
        chest.body.immovable = true;
        chest.scale.setTo(1.5, 1.5);

        chestsTwo = this.game.add.group();
        chestsTwo.enableBody = true;
        chestTwo = chestsTwo.create(232,32, 'chestTwo');
        chestTwo.body.immovable = true;
        chestTwo.scale.setTo(1.5, 1.5);


        //  Creating the spikes to kill the player.
        spikes = this.game.add.group();
        spikes.enableBody = true;

        spike = spikes.create(100, 462, 'spike');
        spike.scale.setTo(2, 2);
        spike.body.immovable = true;
        spike.body.setSize(40,21,3,5);

        spike = spikes.create(600, 77, 'spike');
        spike.scale.setTo(2, 2);
        spike.body.immovable = true;
        spike.body.setSize(40,21,3,5);

        spike = spikes.create(700, 250, 'spike');
        spike.scale.setTo(2, 2);
        spike.body.immovable = true;
        spike.body.setSize(40,21,3,5);


        boards = this.game.add.group();
        boards.enableBody = true;
        board = boards.create(700,472, 'boardLeft');
        board.scale.setTo(0.5,0.5);

        boardsKill = this.game.add.group();
        boardsKill.enableBody = true;

        boardKill = boardsKill.create(545,375, 'boardKill');
        boardKill.scale.setTo(0.6,0.6);


        //  Create the gem
        gems= this.game.add.group();
        gems.enableBody = true;
        gem = gems.create(300, 200, 'gem');
        gem.scale.setTo(0.5,0.5);


        //  Create the key
        keys = this.game.add.group();
        keys.enableBody = true;
        key = keys.create(720, 80, 'key');

        keysTwo = this.game.add.group();
        keysTwo.enableBody = true;
        keyTwo = keysTwo.create(0, 432,'keyTwo');


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
        player = game.add.sprite(730, game.world.height -  150, 'dude');

        //  We need to enable physics on the player
        game.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
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
        var hitBoardKill = game.physics.arcade.collide(player, boardsKill);
        var hitGem = game.physics.arcade.collide(player, gems);
        var hitWater = game.physics.arcade.collide(player, river);
        var hitChestTwo = game.physics.arcade.collide(player, chestsTwo);
        var hitKeyTwo = game.physics.arcade.collide(player, keyTwo);

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
            key = keys.create(165, 0, 'key');
            keys.enableBody = false;
            key.scale.setTo(.75, .75);

        }

        if (hitKeyTwo){
            keyTwo.kill();
            keyTwoCollected = true;
            keyTwo = keysTwo.create(260,0,'keyTwo');
            keysTwo.enableBody = false;
            keyTwo.scale.setTo(.75,.75);

        }



        if (hitGem){
            gem.kill();
            score += 100;
            scoreText.text = 'Score: ' + score;
        }
        if(hitBoardKill){
            this.state.restart();
            score = score - 100;
        }

        if (hitChest && keyCollected == true) {
            this.levelComplete();
        }

        if (hitChestTwo && keyTwoCollected == true){
            chestTwo.kill();
        }
        if (hitSpike){
            this.state.restart();
            score = score - 100;
        }

        if(hitWater){
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
        this.state.start('end');
    },


    startMusic: function(){
        audio.play();
    },

    stopMusic: function(){
        audio.pause();
    }

}
console.log('level TWO');

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
var boardKill;
var boardsKill;

var gem;
var gems;

var audio = new Audio ('assets/gameSound.mpeg');
var startAudio;
var stopAudio;

var stars;
var score = 0;
var scoreText;


var levelTwo = {
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
        game.load.image('boardLeft', 'assets/boardLeft.png');
        game.load.image('boardKill', 'assets/boardKill.png');
        game.load.image('gem', 'assets/gemRed.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

    },

    create: function() {

        audio.play();




        game.physics.startSystem(Phaser.Physics.ARCADE);


        game.add.sprite(0, 0, 'background');


        platforms = game.add.group();


        platforms.enableBody = true;


        var ground = platforms.create(0, game.world.height - 64, 'ground');


        ground.scale.setTo(2, 2);


        ground.body.immovable = true;


        var ledge = platforms.create(100, 320, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(0.5,1);

        ledge = platforms.create(255, 130, 'ground');
        ledge.scale.setTo(0.5,1);
        ledge.body.immovable = true;

        ledge = platforms.create(100, 230, 'ground');
        ledge.scale.setTo(0.25,1);
        ledge.body.immovable = true;

        ledge = platforms.create(500, 170, 'ground');
        ledge.body.immovable = true;

        ledge = platforms.create(500, 350, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(0.5,1);



        stars = game.add.group();


        stars.enableBody = true;




        star = stars.create(140,500,'star');
        star = stars.create(320,500,'star');
        star = stars.create(230,35,'star');
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;

        star = stars.create(280,35,'star');
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;

        star = stars.create(320,35,'star');
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;

        star = stars.create(360,35,'star');
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;

        star = stars.create(400,35,'star');
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;




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

        spike = spikes.create(100, 183, 'spike');
        spike.scale.setTo(2, 2);
        spike.body.immovable = true;
        spike.body.setSize(40,21,3,5);

        spike = spikes.create(600, 487, 'spike');
        spike.scale.setTo(2, 2);
        spike.body.immovable = true;
        spike.body.setSize(40,21,3,5);

        boards = this.game.add.group();
        boards.enableBody = true;
        board = boards.create(700,107, 'boardLeft');
        board.scale.setTo(0.5,0.5);

        boardsKill = this.game.add.group();
        boardsKill.enableBody = true;

        boardKill = boardsKill.create(500,120, 'boardKill');
        boardKill.scale.setTo(0.4,0.4);

        boardKill = boardsKill.create(375,473, 'boardKill');
        boardKill.scale.setTo(0.5,0.5);
        boardKill = boardsKill.create(400,473, 'boardKill');
        boardKill.scale.setTo(0.5,0.5);
        boardKill = boardsKill.create(425,473, 'boardKill');
        boardKill.scale.setTo(0.5,0.5);
        boardKill = boardsKill.create(450,473, 'boardKill');
        boardKill.scale.setTo(0.5,0.5);
        boardKill = boardsKill.create(475,473, 'boardKill');
        boardKill.scale.setTo(0.5,0.5);

        //  Create the gem
        gems= this.game.add.group();
        gems.enableBody = true;
        gem = gems.create(550, 200, 'gem');
        gem.scale.setTo(0.5,0.5);


        //  Create the key
        keys = this.game.add.group();
        keys.enableBody = true;
        key = keys.create(10, 450, 'key');

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




        player = game.add.sprite(700, game.world.height -  700, 'dude');


        game.physics.arcade.enable(player);


        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;


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
        this.state.start('levelThree');
    },


    startMusic: function(){
        audio.play();
    },

    stopMusic: function(){
        audio.pause();
    }

}
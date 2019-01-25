
var score;
var scoreText;

var end = {
    preload: function(){
        this.game.load.image('background', 'assets/background.png');
        this.game.load.image('button', 'assets/button.png')

    },

    create: function(){
        this.game.add.sprite(0,0,'background');

        scoreText = this.game.add.text(200, 250, 'Your Final Score was: ' + score, {fontSize: '32px', fill: '#000'});

        startButton = this.add.button(this.game.world.centerX - 170,
            this.game.world.centerY - 25,
            'button', this.startGame, this);

        this.game.add.text(275, 330, 'Play Game Again', { fontSize: '30px', fill: '#000' });
    },
    startGame: function() {
        this.state.start('levelOne');
    },


};
console.log('Menu');

var startButton;


var mainMenu = {
    preload: function(){
        this.game.load.image('background', 'assets/background.png');
        this.game.load.image('button', 'assets/button.png');
    },

    create: function(){
        this.game.add.sprite(0,0,'background');
        startButton = this.add.button(this.game.world.centerX - 170,
            this.game.world.centerY - 50,
            'button', this.startGame, this);


        this.game.add.text(160, 100, 'Adventure Man', { fontSize: '70px', fill: '#000' });
        this.game.add.text(260, 300, 'Start Game', { fontSize: '50px', fill: '#000' });


    },

    startGame: function() {
        this.state.start('levelOne');
    }


};
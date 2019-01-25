var game;

game = new Phaser.Game(800, 600, Phaser.AUTO, '')


game.state.add('mainMenu', mainMenu);
game.state.add('levelOne', levelOne);
game.state.add('levelTwo', levelTwo);
game.state.add('levelThree', levelThree);
game.state.add('end', end);



game.state.start('mainMenu');
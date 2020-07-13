var game;
var dpr = window.devicePixelRatio;

window.onload = function() {

    console.log("device pixel ratio:" + window.devicePixelRatio);

    var gameConfig = {
       type: Phaser.CANVAS,
       scale: {
        mode: Phaser.Scale.FIT, // we will resize the game with our own code (see Boot.js)
        width: 600 * window.devicePixelRatio, // set game width by multiplying window width with devicePixelRatio
        height: 600 * window.devicePixelRatio, // set game height by multiplying window height with devicePixelRatio
        zoom: 1 / window.devicePixelRatio // Set the zoom to the inverse of the devicePixelRatio
        },
       backgroundColor: 0x880044,
       audio: {
        disableWebAudio: true
        },
       scene: [playGame]
    };
        game = new Phaser.Game(gameConfig);

        // pure javascript to give focus to the page/frame and scale the game
        window.focus();
        //resize();
        //window.addEventListener("resize", resize, false);   
}

// PlayGame scene
class playGame extends Phaser.Scene{

    // constructor
    constructor(){
        super("PlayGame");
    }

    // method to be executed when the scene preloads
    preload(){
        if(dpr == 3){
            this.load.image("wheel", "assets/wheel@3.png");
            this.load.image("background", "assets/bg@3.png");
        }else if (dpr == 2){
            this.load.image("wheel", "assets/wheel@2.png");
            this.load.image("background", "assets/bg@2.png");
        }else{
            this.load.image("wheel", "assets/wheel@1.png");
            this.load.image("background", "assets/bg@1.png");
        }

        this.halfWidth = game.config.width / 2;
        this.halfHeight = game.config.height / 2;
    }

    // method to be executed once the scene has been created
    create(){
        this.bg = this.add.sprite(this.halfWidth, this.halfHeight, "background");
        this.wheel = this.add.sprite(this.halfWidth, this.halfHeight + (20 * dpr), "wheel").setInteractive();

        this.wheel.on("pointerdown", this.spin, this);
    }

    spin(){
        var rounds = Phaser.Math.Between(8, 12);
        var degrees = Phaser.Math.Between(0, 360);

        this.tweens.add({

            // adding the wheel to tween targets
            targets: [this.wheel],

            // angle destination
            angle: 360 * rounds + degrees,

            // tween duration
            duration: 1000,

            // tween easing
            ease: "Cubic.easeInOut",

            // callback scope
            callbackScope: this,
        });
    }
}

// pure javascript to scale the game
function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = (windowWidth / windowHeight );
    var gameRatio = (game.config.width / game.config.height) ;

    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}

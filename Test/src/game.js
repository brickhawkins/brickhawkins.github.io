var game;
var dpr = window.devicePixelRatio;
const width = 600 * dpr;
const height = 600 * dpr;

window.onload = function() {

    console.log(window.devicePixelRatio);

    var gameConfig = {
       type: Phaser.CANVAS,
       width: width,
       height: height,
       backgroundColor: 0x880044,
       audio: {
        disableWebAudio: true
        },
       scene: [playGame]
    };
        game = new Phaser.Game(gameConfig);

        // pure javascript to give focus to the page/frame and scale the game
        window.focus();
        resize();
        window.addEventListener("resize", resize, false);   
}

// PlayGame scene
class playGame extends Phaser.Scene{

    // constructor
    constructor(){
        super("PlayGame");
    }

    // method to be executed when the scene preloads
    preload(){
        this.load.image("wheel", "assets/wheel_bg.png");
        
        this.halfWidth = game.config.width / 2;
        this.halfHeight = game.config.height / 2;
    }

    // method to be executed once the scene has been created
    create(){
        this.wheel = this.add.sprite(this.halfWidth, this.halfHeight, "wheel").setInteractive();

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
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;

    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}

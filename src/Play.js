class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    preload() {
        this.load.path = './assets/img/'
        this.load.image('grass', 'grass.jpg')
        this.load.image('cup', 'cup.jpg')
        this.load.image('ball', 'ball.png');
        this.load.image('wall', 'wall.png');
        this.load.image('oneway', 'one_way_wall.png');
    }

    create() {
        // add background grass
        this.grass = this.add.image(0, 0, 'grass').setOrigin(0)

        // add cup
        this.cup = this.physics.add.sprite(width/2, height / 10, 'cup');       // add cup as a physics objects so it can collide with the ball
        this.cup.body.setCircle(this.cup.width/4);
        this.cup.body.setOffset(this.cup.width/4);
        this.cup.body.setImmovable(true);                                       // no opposing physics body can move it 

        // add ball 
        this.ball = this.physics.add.sprite(width/2, height - height/10, 'ball');
        // ball physics settings
        this.ball.body.setCircle(this.ball.width/2);                             // takes in a radius
        this.ball.body.setCollideWorldBounds(true);
        this.ball.body.setBounce(0.5);                                           // normalized value from 0-1
        this.ball.body.setDamping(true).setDrag(0.5);                            // can chain commands if we want     

        // add walls
        let wallA = this.physics.add.sprite(0, height/4, 'wall');
        wallA.setX(Phaser.Math.Between(0+wallA.width/2, width - wallA.width/2));
        wallA.body.setImmovable(true);
        wallA.setVelocityX(100);
        wallA.setBounceX(1);
        wallA.body.setCollideWorldBounds(true);

        let wallB = this.physics.add.sprite(0, height/2, 'wall');
        wallB.setX(Phaser.Math.Between(0+wallB.width/2, width - wallB.width/2));
        wallB.body.setImmovable(true);

        this.walls = this.add.group([wallA, wallB]);

        // one way wall
        this.oneway = this.physics.add.sprite(0, height/ 4 * 3, 'oneway');
        this.oneway.setX(Phaser.Math.Between(0+this.oneway.width/2, width - this.oneway.width/2));
        this.oneway.setImmovable(true);
        this.oneway.body.checkCollision.down = false;                   // turns off one side of collision

        // variables 
        this.shotVelocityX = 200;
        this.shotVelocityYMin = 700;
        this.shotVelocityYMax = 1100;

        this.input.on('pointerdown', (pointer)=> {
            let shotDirectionY;
            let shotDirectionX;
            // y directionality
            pointer.y <= this.ball.y ? shotDirectionY = 1 : shotDirectionY = -1;
            this.ball.body.setVelocityY(Phaser.Math.Between(this.shotVelocityYMin, this.shotVelocityYMax) * shotDirectionY);
            // x directionality
            pointer.x <= this.ball.x ? shotDirectionX = 1 : shotDirectionX = -1;
            this.ball.body.setVelocityX(Phaser.Math.Between(10, this.shotVelocityX) * shotDirectionX);

        });

        // collision with a colliders
        this.physics.add.collider(this.ball, this.cup, (ball, cup) => {
            ball.setY(height - height/10);
            ball.setVelocityX(0); 
            ball.setVelocityY(0);
        });
        this.physics.add.collider(this.ball, this.walls);               // no callback needed
        this.physics.add.collider(this.ball, this.oneway);

        // add text
        // let textConfig = {
        //     fontFamily: 'Courier',
        //     fontSize: '28px',
        //     backgroundColor: '#F3B141',
        //     color: '#843605',
        //     align: 'right',
        //     padding: {
        //         top: 5,
        //         bottom: 5,
        //     }
        // };
        // let this.shotsTaken = 0;
        // this.shots = this.add.text(10, height - 30, this.shotsTaken, textConfig);

    }

    update() {
        
    }
}
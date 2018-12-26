
import BaseObject from './base-object'
import Sprite from '../sprite';
import Keyboard from '../keyboard';
import ImageLoader from '../image-loader'
import Game from './game';
import { MoveDirection } from './move-direction';
import Bounds from './math/bounds';
import Vector2d from './math/vector2d';
import { Car } from './car';

export default class Chicken extends BaseObject {

    private images: Array<Sprite | undefined>;
    private animaitonCounter: number = 0;
    private singleFrameDuration: number = 0;
    private animationFrames: number[] = [1, 2, 1, 0];

    private direction: MoveDirection;
    private isMoving: boolean;
    private speed: number;

    private cb1: Bounds;
    private cb2: Bounds;

    private pressed: boolean = false;
    private collisionForce: Vector2d;
    private isExitFound: boolean;
    private isDead: boolean;
    private isInFinalPosition: boolean = false;

    private startX: number;
    private startY: number;

    public winCount:number = 0;
    public lostCount:number = 0;

    constructor(x: number, y: number) {
        super(x, y, 32, 32);
        this.setId("Chicken");
        this.isExitFound = false;
        this.isDead = false;

        this.startX = x;
        this.startY = y;

        this.images = [];

         

        this.images.push(ImageLoader.getSprite("chicken-top-1"));
        this.images.push(ImageLoader.getSprite("chicken-top-2"));
        this.images.push(ImageLoader.getSprite("chicken-top-3"));

        this.images.push(ImageLoader.getSprite("chicken-right-1"));
        this.images.push(ImageLoader.getSprite("chicken-right-2"));
        this.images.push(ImageLoader.getSprite("chicken-right-3"));

        this.images.push(ImageLoader.getSprite("chicken-bottom-1"));
        this.images.push(ImageLoader.getSprite("chicken-bottom-2"));
        this.images.push(ImageLoader.getSprite("chicken-bottom-3"));

        this.images.push(ImageLoader.getSprite("chicken-left-1"));
        this.images.push(ImageLoader.getSprite("chicken-left-2"));
        this.images.push(ImageLoader.getSprite("chicken-left-3"));

        this.images.push(ImageLoader.getSprite("feathers"));
        
        this.direction = MoveDirection.BOTTOM;
        this.speed = 0.2;
        this.isMoving = false;
        this.cb1 = new Bounds(
            this.getWidth() * 0.25, this.getHeight() * 0.2,
            this.getWidth() * 0.75, + this.getHeight() * 0.8);
        this.cb2 = new Bounds(
            this.getWidth() * 0.25, this.getHeight() * 0.5,
            this.getWidth() * 0.75, + this.getHeight());
        this.collisionForce = new Vector2d();
    }

    public setPosition(x: number, y: number): void {
        this.x = x; this.y = y;
    }

    public update(game: Game, delta: number): void {


        let { LEFT, TOP, RIGHT, BOTTOM } = MoveDirection;
        let { isPressed, SPACE, ARROW_LEFT, ARROW_RIGHT, ARROW_UP, ARROW_DOWN } = Keyboard;

        if(this.isDead){
            if(isPressed(SPACE)){
                this.x = this.startX;
                this.y = this.startY;
                this.isDead = false;
            }
            return;
        }

        if(this.isInFinalPosition){
            if(isPressed(SPACE)){
                this.x = this.startX;
                this.y = this.startY;
                this.isInFinalPosition = false;
            }
        }



        let moveDir: Vector2d = new Vector2d();

        this.isMoving = false;
        let tempDirection: MoveDirection = this.direction;

        if (isPressed(ARROW_LEFT)) {
            moveDir.x -= this.speed;
            this.direction = LEFT;
            this.isMoving = true;
        } else if (isPressed(ARROW_RIGHT)) {
            moveDir.x += this.speed;
            this.direction = RIGHT;
            this.isMoving = true;
        }

        if (isPressed(ARROW_UP)) {
            moveDir.y -= this.speed;
            this.direction = TOP;
            this.isMoving = true;
        } else if (isPressed(ARROW_DOWN)) {
            moveDir.y += this.speed;
            this.direction = BOTTOM;
            this.isMoving = true;
        }

        // Maybe make this optimal ;)
        this.x += moveDir.x * this.speed * delta;
        this.y += moveDir.y * this.speed * delta;

        if(this.y < 130){
            if(this.isInFinalPosition == false){
                this.winCount = this.winCount + 1;
            }
            this.isInFinalPosition = true;
        }


        this.singleFrameDuration = 20 / this.speed;

        if (!this.isMoving) {
            this.animaitonCounter = 0;
        } else {
            this.animaitonCounter += delta;
            if (this.animaitonCounter > this.singleFrameDuration * this.animationFrames.length) {
                this.animaitonCounter = 0;
            }
        }

        if (this.direction != tempDirection) {
            this.animaitonCounter = 0;
        }

        if (this.direction == MoveDirection.LEFT || this.direction == MoveDirection.RIGHT) {
            this.collisionBounds = this.cb2;
        } else {
            this.collisionBounds = this.cb1;
        }

    }

    public draw(context2D: CanvasRenderingContext2D) {

        if (this.isDead) {
            let sprite: Sprite|undefined = this.images[12];
            if (sprite) {
                context2D.drawImage(sprite.getImage(), sprite.getX(), sprite.getY(), sprite.getWidht(), sprite.getHeight(), this.x, this.y, this.width, this.height);
            }
        } else {

            let index: number = this.animationFrames[Math.floor(this.animaitonCounter / this.singleFrameDuration)];

            let sprite: Sprite | undefined;
            let { LEFT, TOP, RIGHT, BOTTOM } = MoveDirection;
            switch (this.direction) {
                case LEFT:
                    sprite = this.images[index + 9];
                    break
                case RIGHT:
                    sprite = this.images[index + 3];
                    break;
                case TOP:
                    sprite = this.images[index + 0];
                    break;
                case BOTTOM:
                    sprite = this.images[index + 6];
                    break;
            }
            if (sprite) {
                context2D.drawImage(sprite.getImage(), sprite.getX(), sprite.getY(), sprite.getWidht(), sprite.getHeight(), this.x, this.y, this.width, this.height);
            }
        }

        //TODO remove
        // this.drawDebugLines(context2D);
    }


    public onCollided(object: BaseObject): void {
        if (object instanceof Car) {
            if(this.isDead == false){
                this.lostCount = this.lostCount + 1;
            }
            this.isDead = true;
            // this.x = this.startX;
            // this.y = this.startY;
            
        }
    }

    public getIsDead():boolean{
        return this.isDead;
    }

    public getIsInFinalPosition():boolean{
        return this.isInFinalPosition;
    }
}
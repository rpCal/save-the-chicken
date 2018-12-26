import BaseObject from "./base-object";
import Game from "./game";
import Sprite from "../sprite";
import ImageLoader from "../image-loader";
import { MoveDirection } from "./move-direction";
import Bounds from "./math/bounds";


export class Car extends BaseObject {

    private images: Array<Sprite | undefined>;
    private direction: MoveDirection = MoveDirection.LEFT;
    private speed: number = 1;


    constructor(x: number, y: number, speed: number, type: number = 0, direction: MoveDirection = MoveDirection.LEFT) {
        super(x, y, 48, 32);

        this.direction = direction;
        this.speed = speed;

        this.images = [];
        if (type == 1) {
            this.images.push(ImageLoader.getSprite("car-gray-left-1"));
            this.images.push(ImageLoader.getSprite("car-gray-left-2"));
            this.images.push(ImageLoader.getSprite("car-gray-left-3"));
            this.images.push(ImageLoader.getSprite("car-gray-left-4"));
            this.images.push(ImageLoader.getSprite("car-gray-left-5"));
            this.images.push(ImageLoader.getSprite("car-gray-left-6"));
            this.images.push(ImageLoader.getSprite("car-gray-right-1"));
            this.images.push(ImageLoader.getSprite("car-gray-right-2"));
            this.images.push(ImageLoader.getSprite("car-gray-right-3"));
            this.images.push(ImageLoader.getSprite("car-gray-right-4"));
            this.images.push(ImageLoader.getSprite("car-gray-right-5"));
            this.images.push(ImageLoader.getSprite("car-gray-right-6"));
        } else if (type == 2) {
            this.images.push(ImageLoader.getSprite("car-orange-left-1"));
            this.images.push(ImageLoader.getSprite("car-orange-left-2"));
            this.images.push(ImageLoader.getSprite("car-orange-left-3"));
            this.images.push(ImageLoader.getSprite("car-orange-left-4"));
            this.images.push(ImageLoader.getSprite("car-orange-left-5"));
            this.images.push(ImageLoader.getSprite("car-orange-left-6"));
            this.images.push(ImageLoader.getSprite("car-orange-right-1"));
            this.images.push(ImageLoader.getSprite("car-orange-right-2"));
            this.images.push(ImageLoader.getSprite("car-orange-right-3"));
            this.images.push(ImageLoader.getSprite("car-orange-right-4"));
            this.images.push(ImageLoader.getSprite("car-orange-right-5"));
            this.images.push(ImageLoader.getSprite("car-orange-right-6"));
        } else {
            this.images.push(ImageLoader.getSprite("car-green-left-1"));
            this.images.push(ImageLoader.getSprite("car-green-left-2"));
            this.images.push(ImageLoader.getSprite("car-green-left-3"));
            this.images.push(ImageLoader.getSprite("car-green-left-4"));
            this.images.push(ImageLoader.getSprite("car-green-left-5"));
            this.images.push(ImageLoader.getSprite("car-green-left-6"));
            this.images.push(ImageLoader.getSprite("car-green-right-1"));
            this.images.push(ImageLoader.getSprite("car-green-right-2"));
            this.images.push(ImageLoader.getSprite("car-green-right-3"));
            this.images.push(ImageLoader.getSprite("car-green-right-4"));
            this.images.push(ImageLoader.getSprite("car-green-right-5"));
            this.images.push(ImageLoader.getSprite("car-green-right-6"));
        }

        this.collisionBounds = new Bounds(
            this.getWidth() * 0.15, this.getHeight() * 0.45,
            this.getWidth() * 0.85, this.getHeight());
    }

    public setX(x: number): void {
        this.x = x;
    }

    public setY(y: number): void {
        this.y = y;
    }


    public update(game: Game, delta: number): void {

        this.x += this.speed * delta * (this.direction == MoveDirection.LEFT ? -1 : 1);
    }

    public draw(context2D: CanvasRenderingContext2D) {

        let off = this.direction == MoveDirection.LEFT ? 0 : 6;
        for (let y = 0; y < 2; y++) {
            for (let x = 0; x < 3; x++) {
                let sprite = this.images[off + y * 3 + x];
                if (sprite) {
                    context2D.drawImage(sprite.getImage(),
                        sprite.getX(), sprite.getY(), sprite.getWidht(), sprite.getHeight(),
                        this.x + x * 16, this.y + y * 16, 16, 16);
                }
            }
        }

            //TODO remove
            // this.drawDebugLines(context2D);
    }

    public isCollided(object: BaseObject): boolean {
        return !(object instanceof Car) && super.isCollided(object);
        
    }

    public onCollided(object: BaseObject): void {
        //;
    }

}
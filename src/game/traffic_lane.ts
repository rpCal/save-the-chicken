import BaseObject from "./base-object";
import { MoveDirection } from "./move-direction";
import Game from "./game";
import { Car } from "./car";

export class TrafficLane extends BaseObject {

    private direction: MoveDirection;
    private speed: number;
    private laneDistance = 0;
    private startOffset: number = 0;
    private cars: Car[] = [];

    constructor(x: number, y: number, width: number, height: number, direction: MoveDirection, speed: number, startOffset: number) {
        super(x, y, width, height);
        this.direction = direction;
        this.speed = speed;
        this.startOffset = startOffset;
    }

    public addCar(game:Game, carType: number, startDelay: number): void {
        this.laneDistance = this.startOffset + this.speed * startDelay;
        let x = this.leftDirection() ? this.laneDistance : this.getWidth() - this.laneDistance;
        let y = this.y + this.getHeight() / 2 + (Math.random() - 0.5) * 10;
        let car:Car = new Car(x, y, this.speed, carType, this.direction);
        this.cars.push(car);
        game.addObject(car);
    }

    public update(game: Game, delta: number): void {
        this.cars.forEach(car => {
            // car.update(game, delta);
            if (this.leftDirection()) {
                if (car.getX() + car.getWidth() < 0) {
                    let x = car.getX() + Math.max(this.laneDistance, this.getWidth() + car.getWidth());
                    let y = this.y + this.getHeight() / 2 + (Math.random() - 0.5) * 10;
                    car.setX(x);
                    car.setY(y);
                }
            } else {
                if (car.getX() > this.getWidth()) {
                    let x = car.getX() - Math.max(this.laneDistance, this.getWidth() + car.getWidth());
                    let y = this.y + this.getHeight() / 2 + (Math.random() - 0.5) * 10;
                    car.setX(x);
                    car.setY(y);
                }
            }
        });
    }

    private leftDirection(): boolean {
        return this.direction == MoveDirection.LEFT;
    }

    public draw(context2D: CanvasRenderingContext2D) {
        // this.cars.forEach(car => {
        //     car.draw(context2D);
        // });
    }
}
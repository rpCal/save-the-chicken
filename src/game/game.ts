
import BaseGame from '../base-game';
import BaseObject from './base-object';
import Chicken from './chicken';
import Map from './map';
import { MoveDirection } from './move-direction';
import { TrafficLane } from './traffic_lane';
import InfoDialog from './info-dialog';

let canvasSize = {
    'canvasWidth': 400,
    'canvasHeight': 600,
};

class Game implements BaseGame {

    private objects: Array<BaseObject>;

    constructor(canvasWidth:number, canvasHeight:number) {
        canvasSize.canvasWidth = canvasWidth / 2;
        canvasSize.canvasHeight = canvasHeight / 2;
        this.objects = [];
        this.addObject(new Map(25, 19));
        let chicken = new Chicken(184, 288);
        this.addObject(chicken);

        let lane1 = new TrafficLane(0,230, 400, 32, MoveDirection.RIGHT, 0.05,100);
        // lane1.addCar(this,0, 0);
        // lane1.addCar(this,0, 500);
        lane1.addCar(this,0, 1000);
        // lane1.addCar(this,1, 3000);
        lane1.addCar(this,1, 3500);
        // lane1.addCar(this,1, 4000);
        // lane1.addCar(this,2, 6000);
        lane1.addCar(this,2, 6500);
        // lane1.addCar(this,2, 7000);
        this.addObject(lane1);

        let lane2 = new TrafficLane(0,200, 400, 32, MoveDirection.RIGHT, 0.1,100);
        lane2.addCar(this,0, 0);
        lane2.addCar(this,0, 500);
        lane2.addCar(this,0, 1000);
        lane2.addCar(this,1, 3000);
        // lane2.addCar(this,1, 3500);
        lane2.addCar(this,1, 4000);
        lane2.addCar(this,2, 6000);
        // lane2.addCar(2this,, 6500);
        lane2.addCar(this,2, 7000);
        this.addObject(lane2);


        let lane3 = new TrafficLane(0,165, 400, 32, MoveDirection.LEFT, 0.2,100);
        // lane3.addCar(this,0, 0);
        // lane3.addCar(this,0, 500);
        lane3.addCar(this,0, 1000);
        // lane3.addCar(this,1, 3000);
        // lane3.addCar(this,1, 3500);
        lane3.addCar(this,1, 4000);
        lane3.addCar(this,2, 6000);
        // lane3.addCar(this,2, 6500);
        lane3.addCar(this,2, 7000);
        this.addObject(lane3);

        
        let lane4 = new TrafficLane(0,135, 400, 32, MoveDirection.LEFT, 0.1,100);
        lane4.addCar(this,0, 0);
        // lane4.addCar(this,0, 500);
        lane4.addCar(this,0, 1000);
        lane4.addCar(this,1, 3000);
        lane4.addCar(this,1, 3500);
        lane4.addCar(this,1, 4000);
        lane4.addCar(this,2, 6000);
        lane4.addCar(this,2, 6500);
        lane4.addCar(this,2, 7000);
        this.addObject(lane4);

        
        this.addObject(new InfoDialog(50, 50, 200, 200, chicken));

    }

    public draw(context2D: CanvasRenderingContext2D, interpolator: number): void {
        context2D.fillStyle = "#525252";
        context2D.fillRect(0, 0, 640, 480);


        this.objects.forEach(function (object) {
            object.draw(context2D);
        })
    }

    public update(delta: number): void {

        let objectsList = this.objects;

        objectsList.forEach(function (o1) {
            objectsList.forEach(function (o2) {
                if (o1 != o2 && o1.isCollided(o2)) {
                    o1.onCollided(o2);
                    o2.onCollided(o1);
                }
            })
        })

        this.objects.forEach((object) => {
            object.update(this, delta);
        });

        // Remove recycled objects
        for (let i = 0; i < this.objects.length; i++) {
            let object = this.objects[i];
            if (object.shouldBeRecycled()) {
                this.objects.splice(i, 1);
                --i;
            }
        }

    }

    public addObject(object: BaseObject): void {
        this.objects.push(object);
    }

    public getObjectById(id: string): BaseObject | undefined {
        for (let i = 0; i < this.objects.length; i++) {
            let object = this.objects[i];
            if (object.getId() && object.getId() == id) {
                return object;
            }
        }
        return undefined;
    }

}

export default Game;
export { canvasSize, Game };
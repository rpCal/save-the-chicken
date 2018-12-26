import Game from './game';
import Bounds from './math/bounds';


export default abstract class BaseObject {
    protected x: number;
    protected y: number;
    protected width: number;
    protected height: number;
    private id: string | undefined;
    protected layer: number | undefined;
    protected collisionBounds: Bounds | null = null;
    
    protected isRecycled: boolean;
    public canvasHeight:number = 600;
    public canvasWidth:number = 600;

    constructor(x: number, y: number, width: number, height: number) {
        this.id = undefined;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isRecycled = false;
    }

    public getId(): string | undefined {
        return this.id;
    }

    protected setId(id: string): void {
        this.id = id;
    }

    public abstract update(game: Game, delta: number): void;
    public abstract draw(context2D: CanvasRenderingContext2D): void;

    public isCollided(object: BaseObject): boolean {
        if (this.collisionBounds) {
            let cb: Bounds | null = object.getCollistionBounds();
            if (cb) {
                return !(
                    this.x + this.collisionBounds.right <= object.getX() + cb.left ||
                    this.x + this.collisionBounds.left >= object.getX() + cb.right ||
                    this.y + this.collisionBounds.botttom <= object.getY() + cb.top ||
                    this.y + this.collisionBounds.top >= object.getY() + cb.botttom
                );
            } else {
                return !(
                    this.x + this.collisionBounds.right <= object.getX() ||
                    this.x + this.collisionBounds.left >= object.getX() + object.getWidth() ||
                    this.y + this.collisionBounds.botttom <= object.getY() ||
                    this.y + this.collisionBounds.top >= object.getY() + object.getHeight()
                );
            }
        } else {
            let cb: Bounds | null = object.getCollistionBounds();
            if (cb) {
                return !(
                    this.x + this.width <= object.getX() + cb.left ||
                    this.x >= object.getX() + cb.right ||
                    this.y + this.height <= object.getY() + cb.top ||
                    this.y >= object.getY() + cb.botttom
                );
            } else {
                return !(
                    this.x + this.width <= object.getX() ||
                    this.x >= object.getX() + object.getWidth() ||
                    this.y + this.height <= object.getY() ||
                    this.y >= object.getY() + object.getHeight()
                );
            }
        }
        // return !(
        //     this.x + this.width < object.x ||
        //     this.x > object.x + object.width ||
        //     this.y + this.height < object.y ||
        //     this.y > object.y + object.height
        // );
    }

    public onCollided(object: BaseObject): void {
        //;
    }

    public recycle(): void {
        this.isRecycled = true;
    }

    public shouldBeRecycled(): boolean {
        return this.isRecycled;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public getCollistionBounds(): Bounds | null {
        return this.collisionBounds;
    }

    public drawDebugLines(context2D: CanvasRenderingContext2D):void{
        let cb = this.collisionBounds;
        if (cb) {
            context2D.save();
            context2D.strokeStyle = "red";
            context2D.strokeRect(this.x + cb.left, this.y + cb.top, cb.width(), cb.height());
            context2D.strokeStyle = "green";
            context2D.strokeRect(this.x, this.y, this.width, this.height);
            context2D.restore();
        }
    }

    //TODO draw sprite on screen xy not obj.xy, add abstraction for draw sprite on canvas
}

export default class Vector2d {
    public x: number;
    public y: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    public set(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    public clear(): void {
        this.x = 0;
        this.y = 0;
    }

    public normalize(): void {
        let mag = this.magnitude();
        if (mag != 0) {
            this.x = this.x / mag;
            this.y = this.y / mag;
        }
    }

    public magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }


}
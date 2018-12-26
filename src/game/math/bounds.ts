
export default class Bounds {
    public left: number;
    public top: number;
    public right: number;
    public botttom: number;

    constructor(left = 0, top = 0, right = 0, bottom = 0) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.botttom = bottom;
    }

    public width(): number {
        return this.right - this.left;
    }

    public height(): number {
        return this.botttom - this.top;
    }

    public isEmpty(): boolean {
        return this.left >= this.right || this.top >= this.botttom;
    }

    public inset(dx: number, dy: number): void {
        this.left += dx;
        this.right -= dx;
        this.top += dy;
        this.botttom -= dy;
    }
}
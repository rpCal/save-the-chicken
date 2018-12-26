export default class Sprite {
    private id: string;
    private image: HTMLImageElement;
    private x: number;
    private y: number;
    private width: number;
    private height: number;

    constructor(id: string, image: HTMLImageElement, x: number, y: number, width: number, height: number) {
        this.id = id;
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public getId(): string {
        return this.id;
    }

    public getImage() {
        return this.image;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getWidht(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }
}


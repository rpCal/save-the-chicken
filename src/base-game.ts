export default interface BaseGame {
    draw(context2D: CanvasRenderingContext2D, interpolation: number): void;
    update(delta: number): void;
}

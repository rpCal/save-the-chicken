import Keyboard from './keyboard';
import ImageLoader from './image-loader';
import BaseGame from './base-game';

export default class Engine {
    private context2D: CanvasRenderingContext2D;

    private static UPS: number = 60;
    private static FRAME_TIME: number = 1000 / Engine.UPS;

    private acumulator: number = 0;
    private lastTime: number = 0;

    private game:BaseGame|null;

    constructor(context2D: CanvasRenderingContext2D) {
        this.context2D = context2D;
        this.game = null;
    }


    public start(game:BaseGame): void {

        this.game = game;
        this.lastTime = Engine.getTime();
        window.requestAnimationFrame(this.loop.bind(this));
    }

    private loop() {
        this.tick();
        window.requestAnimationFrame(this.loop.bind(this));
    }

    private tick(): void {

        // Cool stuff
        let { FRAME_TIME } = Engine;

        let time = Engine.getTime();
        let delta = time - this.lastTime;

        if (delta > 1000) {
            delta = FRAME_TIME;
        }

        this.acumulator += delta;

        while (this.acumulator >= FRAME_TIME) {
            this.update(FRAME_TIME);
            this.acumulator -= FRAME_TIME;
        }

        let interpolation: number = this.acumulator / FRAME_TIME;

        this.draw(this.context2D, interpolation);

        this.lastTime = time;
    }

    private update(delta: number): void {
        if(this.game){
            this.game.update(delta);
        }
    }

    private draw(context2D: CanvasRenderingContext2D, interpolation: number): void {
        if(this.game){
            this.game.draw(context2D, interpolation);
        }
    }

    private static getTime(): number {
        // TODO this my not work in some browsers
        return window.performance.now();
    }
}


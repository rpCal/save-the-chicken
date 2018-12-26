
import ImageLoader from './image-loader';
import Keyboard from './keyboard';
import Engine from './engine';
import Game from './game/game';

window.addEventListener("load", function () {
    window.addEventListener("keydown", (button) => Keyboard.setPressed(button.keyCode), false);
    window.addEventListener("keyup", (button) => Keyboard.setReleased(button.keyCode), false);

    let canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    let context2D: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;

    let G: Engine = new Engine(context2D);

    ImageLoader.load().then(() => {
        context2D.scale(2,2);
        context2D.imageSmoothingEnabled = false;
        let game: Game = new Game(canvas.width, canvas.height);
        G.start(game);
    }).catch((error) => {
        //TODO error
        console.error("Assets load error!",error);
    });
}, false);




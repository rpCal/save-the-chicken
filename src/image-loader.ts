
import Sprite from './sprite';

export default class ImageLoader {

    private static sprites: Map<string, Sprite> = new Map();

    public static load(): Promise<any> {
        return Promise.all([
            ImageLoader.loadAsset("assets/duck.png", "assets/duck.json"),
            ImageLoader.loadAsset("assets/map.png", "assets/map.json"),
            ImageLoader.loadAsset("assets/feathers.png", "assets/feathers.json")
        ]);
    }

    public static loadAsset(imageFilePath: string, jsonFilePath: string): Promise<any> {
        return Promise.all([
            ImageLoader.loadJSON(jsonFilePath),
            ImageLoader.loadImage(imageFilePath)])
            .then((response) => {
                let [json, images] = response;
                Object.keys(json).forEach((id) => {
                    let [x, y, w, h] = json[id];
                    let sprite: Sprite = new Sprite(id, images, x, y, w, h);
                    ImageLoader.sprites.set(id, sprite);
                });
            });

    }

    private static loadImage(filePath: string): Promise<HTMLImageElement> {
        return new Promise<HTMLImageElement>(function (resolve, reject) {

            let image: HTMLImageElement = new Image();

            image.addEventListener("load", function () {
                resolve(image);
            }, false);

            image.addEventListener("error", function (error) {
                reject(error);
            }, false);

            image.src = filePath;
        });
    }

    private static loadJSON(filePath: string): Promise<any> {
        return fetch(filePath).then((response) => response.json());
    }


    public static getSprite(id: string): Sprite | undefined {
        return ImageLoader.sprites.get(id);
    }

}


import BaseObject from "./base-object";
import Sprite from "../sprite";
import ImageLoader from "../image-loader";
import Game from "./game";

export default class Map extends BaseObject {

    public singleTileSize: number = 16;
    public images: Array<Sprite | undefined> = [];

    constructor(width:number, height:number) {

        super(0, 0, width, height);

        let _getSprite = ImageLoader.getSprite;
        this.images = [
            _getSprite("grass-center"),
            _getSprite("grass-center"),
            _getSprite("grass-dirty-top"),
            _getSprite("grass-dirty-center"),
            _getSprite("grass-dirty-center"),
            _getSprite("grass-dirty-center"),
            _getSprite("grass-dirty-center"),
            _getSprite("grass-dirty-center"),
            _getSprite("grass-dirty-bottom"),
            _getSprite("grass-center"),
            _getSprite("road-black-top"),
            _getSprite("road-black-line-bottom"),
            _getSprite("road-black-line-top"),
            _getSprite("road-black-line-bottom"),
            _getSprite("road-black-line-top"),
            _getSprite("road-black-line-bottom"),
            _getSprite("road-black-line-top"),
            _getSprite("road-black-bottom"),
            _getSprite("grass-center"),

        ]
    }

    public draw(context2D: CanvasRenderingContext2D): void {
        this.images.forEach((sprite: Sprite | undefined, heightIndex: number) => {
            if (sprite) {
                for(let i = 0; i < this.width; i++){
                    context2D.drawImage(sprite.getImage(), 
                        sprite.getX(), sprite.getY(), sprite.getWidht(), sprite.getHeight(), 
                        this.singleTileSize * i, this.singleTileSize * heightIndex, this.singleTileSize, this.singleTileSize);
                }
                
            }
        });
    }
    public update(game: Game, delta: number): void {

    }
}
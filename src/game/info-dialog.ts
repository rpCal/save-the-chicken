import BaseObject from "./base-object";
import Chicken from "./chicken";
import { Game, canvasSize } from "./game";

export default class InfoDialog extends BaseObject{
    private chicken: Chicken;
    private text:string = "Win";
    private isVisible: boolean = false;
    private animationDelta: number = 0;
    private animationMaxDelta: number = 400;
    private winTitle: string = "Winner winner chicken dinner!";
    private winSubtitle: string = "click SPACE to play again";
    private lostTitle: string = "You have lost!";
    private lostSubtitle: string = "click SPACE to play again";
    private title: string = "";
    private subtitle: string = "";

    constructor(x:number, y:number, width:number, height:number, chicken: Chicken){
        super(x, y, width, height)
        this.chicken = chicken;
    }

    public update(game: Game, delta: number): void {
        this.title = "";
        this.subtitle = "";
        if(this.chicken.getIsDead()){
            this.title = this.lostTitle;
            this.subtitle = this.lostSubtitle;
            this.animationDelta = this.animationDelta + delta;
            if(this.animationDelta > this.animationMaxDelta){
                this.animationDelta = 0;
            }
            if(this.animationDelta < this.animationMaxDelta / 2){
                this.isVisible = true;
            }else{
                this.isVisible = false;
            }
        }
        
        if(this.chicken.getIsInFinalPosition()){
            this.title = this.winTitle;
            this.subtitle = this.winSubtitle;
            this.animationDelta = this.animationDelta + delta;
            if(this.animationDelta > this.animationMaxDelta){
                this.animationDelta = 0;
            }
            if(this.animationDelta < this.animationMaxDelta / 2){
                this.isVisible = true;
            }else{
                this.isVisible = false;
            }
        }
    }

    public draw(context2D: CanvasRenderingContext2D) {
        if(this.isVisible){
            let w = 200;
            let h = 100;
            let x = canvasSize.canvasWidth / 2 - w / 2;
            let y = 30;
            if(this.title.length > 0){
                context2D.font = "25px Comic Sans MS";
                context2D.fillStyle = "red";
                context2D.textAlign = "center";
                context2D.textBaseline = "bottom";
                context2D.fillText(this.title, x + w / 2, y + h / 2 - 10 );
            }
            if(this.subtitle.length > 0){
                context2D.font = "14px Comic Sans MS";
                context2D.fillStyle = "black";
                context2D.textAlign = "center";
                context2D.textBaseline = "bottom";
                context2D.fillText(this.subtitle, x + w / 2, y + h / 2 + 15);
            }
        }

        context2D.font = "14px Comic Sans MS";
        context2D.fillStyle = "black";
        context2D.textAlign = "center";
        context2D.textBaseline = "top";
        context2D.fillText(this.chicken.winCount.toString(), 10, 20);

        context2D.font = "10px Comic Sans MS";
        context2D.fillStyle = "black";
        context2D.textAlign = "center";
        context2D.textBaseline = "top";
        context2D.fillText("win", 10, 10);

        context2D.font = "14px Comic Sans MS";
        context2D.fillStyle = "black";
        context2D.textAlign = "center";
        context2D.textBaseline = "top";
        context2D.fillText(this.chicken.lostCount.toString(), 35, 20);

        context2D.font = "10px Comic Sans MS";
        context2D.fillStyle = "black";
        context2D.textAlign = "center";
        context2D.textBaseline = "top";
        context2D.fillText("lost", 35, 10);
    }
}
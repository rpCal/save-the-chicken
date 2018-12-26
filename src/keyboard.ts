export default  class Keyboard {

    public static SPACE: number = 32;
    public static ARROW_UP: number = 38;
    public static ARROW_DOWN: number = 40;
    public static ARROW_LEFT: number = 37;
    public static ARROW_RIGHT: number = 39;

    private static keys: Array<boolean> = [];

    public static isPressed(key: number): boolean {
        return Keyboard.keys[key];
    }

    public static setPressed(key: number): void {
        Keyboard.keys[key] = true;
    }

    public static setReleased(key: number): void {
        Keyboard.keys[key] = false;
    }

} 


/// <reference path = "../jsuis.ts"/>
/**
 * JSComponentKeyListener
 * 
 * @author Yassuo Toda
 */
class JSComponentKeyListener implements JSKeyListener {
    
    keyTyped: (keyboardEvent: KeyboardEvent) => void;
    keyPressed: (keyboardEvent: KeyboardEvent) => void;
    keyReleased: (keyboardEvent: KeyboardEvent) => void;
    
    constructor(keyListener: JSKeyListener) {
        var componentKeyListener: JSComponentKeyListener = this;
        if (keyListener.keyTyped) {
            this.keyTyped = function(keyboardEvent: KeyboardEvent) {
                keyListener.keyTyped.apply(keyListener, arguments);
            }
        }
        if (keyListener.keyPressed) {
            this.keyPressed = function(keyboardEvent: KeyboardEvent) {
                keyListener.keyPressed.apply(keyListener, arguments);
            }
        }
        if (keyListener.keyReleased) {
            this.keyReleased = function(keyboardEvent: KeyboardEvent) {
                keyListener.keyReleased.apply(keyListener, arguments);
            }
        }
    }
}

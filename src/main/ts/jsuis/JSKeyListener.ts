/// <reference path = "../jsuis.ts"/>
/**
 * JSKeyListener
 * 
 * @author Yassuo Toda
 */
interface JSKeyListener {
    keyTyped?(keyboardEvent: KeyboardEvent): void;
    keyPressed?(keyboardEvent: KeyboardEvent): void;
    keyReleased?(keyboardEvent: KeyboardEvent): void;
}
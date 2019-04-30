/// <reference path = "../jsuis.ts"/>
/**
 * ActionListener
 * 
 * @author Yassuo Toda
 */
interface ActionListener {
    actionPerformed(mouseEvent: MouseEvent, component?: JSComponent): void;
}
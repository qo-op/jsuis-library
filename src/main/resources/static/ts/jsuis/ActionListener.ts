/// <reference path = "../jsuis.ts"/>
/**
 * ActionListener
 * 
 * @author Yassuo Toda
 */
interface ActionListener {
    actionPerformed(actionEvent: JSActionEvent, component?: JSComponent): void;
}
/// <reference path = "../jsuis.ts"/>
/**
 * JSActionListener
 * 
 * @author Yassuo Toda
 */
class JSActionListener implements ActionListener {
    
    actionPerformed: (mouseEvent: MouseEvent, component?: JSComponent) => void;
    
    constructor(actionListener: ActionListener) {
        this.actionPerformed = function(mouseEvent: MouseEvent, component: JSComponent) {
            actionListener.actionPerformed.call(actionListener, mouseEvent, component);
        }
    }
}
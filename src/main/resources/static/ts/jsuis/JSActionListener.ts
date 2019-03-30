/// <reference path = "../jsuis.ts"/>
class JSActionListener implements ActionListener {
    
    actionPerformed: (actionEvent: JSActionEvent, component?: JSComponent) => void;
    
    constructor(actionListener: ActionListener) {
        this.actionPerformed = function(actionEvent: JSActionEvent, component: JSComponent) {
            actionListener.actionPerformed.call(actionListener, actionEvent, component);
        }
    }
}
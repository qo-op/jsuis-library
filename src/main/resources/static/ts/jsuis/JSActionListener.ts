/// <reference path = "../jsuis.ts"/>
class JSActionListener implements ActionListener {
    
    actionPerformed: (actionEvent: JSActionEvent) => void;
    
    constructor(actionListener: ActionListener);
    constructor(thisValue: any, actionListener: ActionListener);
    // overload
    constructor(actionListenerOrThisValue: any, actionListener?: ActionListener) {
        if (actionListener === undefined) {
            actionListener = actionListenerOrThisValue;
            this.actionPerformed = function(actionEvent: JSActionEvent) {
                actionListener.actionPerformed(actionEvent);
            }
        } else {
            var thisValue = actionListenerOrThisValue;
            this.actionPerformed = function(actionEvent: JSActionEvent) {
                actionListener.actionPerformed.call(thisValue, actionEvent);
            }
        }
    }
}
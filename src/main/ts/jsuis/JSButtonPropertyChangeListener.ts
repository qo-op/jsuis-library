/// <reference path = "../jsuis.ts"/>
/**
 * JSCheckBoxMenuItemMouseListener
 * 
 * @author Yassuo Toda
 */
class JSButtonPropertyChangeListener implements JSPropertyChangeListener {
    
    private button: JSButton
    
    constructor(button: JSButton) {
        this.setButton(button);
    }
    getButton(): JSButton {
        return this.button;
    }
    setButton(button: JSButton) {
        this.button = button;
    }
    propertyChange(propertyChangeEvent: JSPropertyChangeEvent, ...parameters: any[]): void {
        var button: JSButton = this.getButton();
        var action: JSAction = button.getAction();
        if (action) {
            button.setEnabled(action.isEnabled());
        }
    }
}

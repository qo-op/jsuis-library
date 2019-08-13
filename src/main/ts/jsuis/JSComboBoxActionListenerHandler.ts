/// <reference path = "../jsuis.ts"/>
/**
 * JSComboBoxActionListenerHandler
 * 
 * @author Yassuo Toda
 */
class JSComboBoxActionListenerHandler implements JSChangeListener {
    
    private comboBox: JSComboBox;
    
    constructor(comboBox: JSComboBox) {
        this.setComboBox(comboBox);
    }
    getComboBox(): JSComboBox {
        return this.comboBox;
    }
    setComboBox(component: JSComboBox) {
        this.comboBox = component;
    }
    stateChanged(event: Event) {
        var comboBox: JSComboBox = this.getComboBox();
        comboBox.fireActionPerformed(event);
        event.stopPropagation();
    }
}

/// <reference path = "../jsuis.ts"/>
/**
 * JSRadioButtonInputUI
 * 
 * @author Yassuo Toda
 */
class JSRadioButtonInputUI implements JSUI {
    
    private static instance: JSRadioButtonInputUI;
    static getInstance(): JSRadioButtonInputUI {
        if (JSRadioButtonInputUI.instance === undefined) {
            JSRadioButtonInputUI.instance = new JSRadioButtonInputUI();
        }
        return JSRadioButtonInputUI.instance;
    }
    
    installUI(component: JSRadioButtonInput): void {
        component.setClass("JSRadioButtonInput");
        component.setStyle("vertical-align", "middle");
    }
}

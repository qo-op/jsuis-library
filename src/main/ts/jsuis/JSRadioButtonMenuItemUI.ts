/// <reference path = "../jsuis.ts"/>
/**
 * JSRadioButtonMenuItemUI
 * 
 * @author Yassuo Toda
 */
class JSRadioButtonMenuItemUI implements JSUI {
    
    private static instance: JSRadioButtonMenuItemUI;
    static getInstance(): JSRadioButtonMenuItemUI {
        if (JSRadioButtonMenuItemUI.instance === undefined) {
            JSRadioButtonMenuItemUI.instance = new JSRadioButtonMenuItemUI();
        }
        return JSRadioButtonMenuItemUI.instance;
    }
    
    installUI(component: JSRadioButtonMenuItem): void {
        component.setClass("JSRadioButtonMenuItem");
    }
}

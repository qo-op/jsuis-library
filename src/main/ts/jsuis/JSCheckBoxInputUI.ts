/// <reference path = "../jsuis.ts"/>
/**
 * JSCheckBoxInputUI
 * 
 * @author Yassuo Toda
 */
class JSCheckBoxInputUI implements JSUI {
    
    private static instance: JSCheckBoxInputUI;
    static getInstance(): JSCheckBoxInputUI {
        if (JSCheckBoxInputUI.instance === undefined) {
            JSCheckBoxInputUI.instance = new JSCheckBoxInputUI();
        }
        return JSCheckBoxInputUI.instance;
    }
    
    installUI(component: JSCheckBoxInput): void {
        component.setClass("JSCheckBoxInput");
        component.setStyle("cursor", "pointer");
        component.setStyle("vertical-align", "middle");
    }
}

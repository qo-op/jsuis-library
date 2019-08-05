/// <reference path = "../jsuis.ts"/>
/**
 * JSCheckBoxInputUI
 * 
 * @author Yassuo Toda
 */
class JSCheckBoxInputUI implements UI {
    
    private static instance: JSCheckBoxInputUI;
    static getInstance(): JSCheckBoxInputUI {
        if (JSCheckBoxInputUI.instance === undefined) {
            JSCheckBoxInputUI.instance = new JSCheckBoxInputUI();
        }
        return JSCheckBoxInputUI.instance;
    }
    
    installUI(component: JSCheckBoxInput): void {
        component.setClass("JSCheckBoxInput");
        component.setStyle("vertical-align", "middle");
    }
}

/// <reference path = "../jsuis.ts"/>
/**
 * JSButtonUI
 * 
 * @author Yassuo Toda
 */
class JSButtonUI implements UI {
    
    private static instance: JSButtonUI;
    static getInstance(): JSButtonUI {
        if (JSButtonUI.instance === undefined) {
            JSButtonUI.instance = new JSButtonUI();
        }
        return JSButtonUI.instance;
    }
    
    installUI(component: JSButton): void {
        component.setClass("JSButton");
        component.setStyle("white-space", "nowrap");
    }
}

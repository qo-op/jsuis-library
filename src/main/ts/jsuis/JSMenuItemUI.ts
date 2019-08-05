/// <reference path = "../jsuis.ts"/>
/**
 * JSMenuItemUI
 * 
 * @author Yassuo Toda
 */
class JSMenuItemUI implements UI {
    
    private static instance: JSMenuItemUI;
    static getInstance(): JSMenuItemUI {
        if (JSMenuItemUI.instance === undefined) {
            JSMenuItemUI.instance = new JSMenuItemUI();
        }
        return JSMenuItemUI.instance;
    }
    
    installUI(component: JSMenuItem): void {
        component.setClass("JSMenuItem");
        component.setStyle("padding", "0 4px");
        component.setStyle("white-space", "nowrap");
    }
}

/// <reference path = "../jstutorial.ts"/>
/**
 * JSButton_CollapseButton
 */
namespace jstutorial {
    export class JSButton_CollapseButton extends JSButton {
        
        static instance: JSButton_CollapseButton;
        static getInstance(): JSButton_CollapseButton {
            if (JSButton_CollapseButton.instance === undefined) {
                JSButton_CollapseButton.instance = new JSButton_CollapseButton();
            }
            return JSButton_CollapseButton.instance;
        }
        constructor() {
            super(JSAction_Collapse.getInstance());
            this.addClass("JSButton_CollapseButton");
            this.setUndecorated(true);
        }
    }
}

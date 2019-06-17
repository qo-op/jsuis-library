/// <reference path = "../jstutorial.ts"/>
/**
 * JSButton_RunExample
 */
namespace jstutorial {
    export class JSButton_RunExample extends JSButton {
        
        constructor(panel_Example: JSPanel_Example) {
            super(new JSAction_RunExample(panel_Example));
            this.addClass("JSButton_RunExample");
        }
    }
}

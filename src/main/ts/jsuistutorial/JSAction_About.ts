/// <reference path = "../jsuistutorial.ts"/>
/**
 * JSAction_About
 */
namespace jsuistutorial {
    export class JSAction_About extends JSAction {
        
        dialog_About: JSDialog_About;
        
        constructor() {
            super("About", new JSImageIcon("/img/baseline-info-24px-Gold.svg", 16, 16));
        }
        actionPerformed(mouseEvent: MouseEvent): void {
            this.dialog_About.setVisible(true);
        }
    }
}

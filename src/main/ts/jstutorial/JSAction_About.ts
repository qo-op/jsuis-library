/// <reference path = "../jstutorial.ts"/>
/**
 * JSAction_About
 */
namespace jstutorial {
    export class JSAction_About extends JSAction {
        
        static instance: JSAction_About;
        static getInstance(): JSAction_About {
            if (JSAction_About.instance === undefined) {
                JSAction_About.instance = new JSAction_About();
            }
            return JSAction_About.instance;
        }
        constructor() {
            super("About", new JSImageIcon("/img/baseline-info-24px-Gold.svg", 16, 16));
        }
        actionPerformed(mouseEvent: MouseEvent): void {
            var dialog_About: JSDialog_About = JSDialog_About.getInstance();
            dialog_About.setVisible(true);
        }
    }
}

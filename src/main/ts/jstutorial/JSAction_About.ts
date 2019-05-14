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
            // super("About", new JSImageIcon("/img/baseline-info-24px.svg", 16, 16));
            super("About", new JSPathIcon("0 0 24 24", "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z", 16, 16).withFill("GoldenRod"));
        }
        actionPerformed(mouseEvent: MouseEvent): void {
        }
    }
}

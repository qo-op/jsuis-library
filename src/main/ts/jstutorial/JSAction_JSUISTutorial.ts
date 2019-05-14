/// <reference path = "../jstutorial.ts"/>
/**
 * JSAction_JSUISTutorial
 */
namespace jstutorial {
    export class JSAction_JSUISTutorial extends JSAction {
        
        static instance: JSAction_JSUISTutorial;
        static getInstance(): JSAction_JSUISTutorial {
            if (JSAction_JSUISTutorial.instance === undefined) {
                JSAction_JSUISTutorial.instance = new JSAction_JSUISTutorial();
            }
            return JSAction_JSUISTutorial.instance;
        }
        constructor() {
            super("How to use JSUIS");
        }
        actionPerformed(mouseEvent: MouseEvent): void {
            JSForm.post("/tutorials/jsuis.html");
        }
    }
}

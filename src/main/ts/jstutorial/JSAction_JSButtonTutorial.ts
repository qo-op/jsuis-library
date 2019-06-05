/// <reference path = "../jstutorial.ts"/>
/**
 * JSAction_JSButtonTutorial
 */
namespace jstutorial {
    export class JSAction_JSButtonTutorial extends JSAction {
        
        static instance: JSAction_JSButtonTutorial;
        static getInstance(): JSAction_JSButtonTutorial {
            if (JSAction_JSButtonTutorial.instance === undefined) {
                JSAction_JSButtonTutorial.instance = new JSAction_JSButtonTutorial();
            }
            return JSAction_JSButtonTutorial.instance;
        }
        constructor() {
            super("How to use JS Button", JSIcon_Leaf.getInstance());
        }
        actionPerformed(mouseEvent: MouseEvent): void {
            JSForm.post("/tutorials/jsbutton", JSFrame_JSTutorial.getParams());
        }
    }
}

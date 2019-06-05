/// <reference path = "../jstutorial.ts"/>
/**
 * JSAction_JSFrameTutorial
 */
namespace jstutorial {
    export class JSAction_JSFrameTutorial extends JSAction {
        
        static instance: JSAction_JSFrameTutorial;
        static getInstance(): JSAction_JSFrameTutorial {
            if (JSAction_JSFrameTutorial.instance === undefined) {
                JSAction_JSFrameTutorial.instance = new JSAction_JSFrameTutorial();
            }
            return JSAction_JSFrameTutorial.instance;
        }
        constructor() {
            super("How to use JS Frame", JSIcon_Leaf.getInstance());
        }
        actionPerformed(mouseEvent: MouseEvent): void {
            JSForm.post("/tutorials/jsframe", JSFrame_JSTutorial.getParams());
        }
    }
}

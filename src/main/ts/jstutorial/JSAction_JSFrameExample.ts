/// <reference path = "../jstutorial.ts"/>
/**
 * JSAction_JSFrameExample
 */
namespace jstutorial {
    export class JSAction_JSFrameExample extends JSAction {
        
        static instance: JSAction_JSFrameExample;
        static getInstance(): JSAction_JSFrameExample {
            if (JSAction_JSFrameExample.instance === undefined) {
                JSAction_JSFrameExample.instance = new JSAction_JSFrameExample();
            }
            return JSAction_JSFrameExample.instance;
        }
        constructor() {
            super("JS Frame example(s)", JSIcon_Leaf.getInstance());
        }
        actionPerformed(mouseEvent: MouseEvent): void {
            JSForm.post("/examples/jsframe", JSFrame_JSTutorial.getParams());
        }
    }
}

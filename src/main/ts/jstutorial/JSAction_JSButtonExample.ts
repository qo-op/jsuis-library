/// <reference path = "../jstutorial.ts"/>
/**
 * JSAction_JSButtonExample
 */
namespace jstutorial {
    export class JSAction_JSButtonExample extends JSAction {
        
        static instance: JSAction_JSButtonExample;
        static getInstance(): JSAction_JSButtonExample {
            if (JSAction_JSButtonExample.instance === undefined) {
                JSAction_JSButtonExample.instance = new JSAction_JSButtonExample();
            }
            return JSAction_JSButtonExample.instance;
        }
        constructor() {
            super("JS Button example(s)", JSIcon_Leaf.getInstance());
        }
        actionPerformed(mouseEvent: MouseEvent): void {
            JSForm.post("/examples/jsbutton", JSFrame_JSTutorial.getParams());
        }
    }
}

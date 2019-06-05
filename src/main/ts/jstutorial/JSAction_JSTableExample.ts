/// <reference path = "../jstutorial.ts"/>
/**
 * JSAction_JSTableExample
 */
namespace jstutorial {
    export class JSAction_JSTableExample extends JSAction {
        
        static instance: JSAction_JSTableExample;
        static getInstance(): JSAction_JSTableExample {
            if (JSAction_JSTableExample.instance === undefined) {
                JSAction_JSTableExample.instance = new JSAction_JSTableExample();
            }
            return JSAction_JSTableExample.instance;
        }
        constructor() {
            super("JS Table example(s)", JSIcon_Leaf.getInstance());
        }
        actionPerformed(mouseEvent: MouseEvent): void {
            JSForm.post("/examples/jstable", JSFrame_JSTutorial.getParams());
        }
    }
}

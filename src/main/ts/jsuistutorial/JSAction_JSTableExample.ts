/// <reference path = "../jsuistutorial.ts"/>
/**
 * JSAction_JSTableExample
 */
namespace jsuistutorial {
    export class JSAction_JSTableExample extends JSAction {
        
        constructor() {
            super("JS Table example(s)");
        }
        actionPerformed(mouseEvent: MouseEvent): void {
            var tutorial: JSUIS_Tutorial = JSUIS_Tutorial.getInstance();
            JSForm.post("/examples/jstable", tutorial.getParams());
        }
    }
}

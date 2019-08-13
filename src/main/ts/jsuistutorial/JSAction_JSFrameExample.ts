/// <reference path = "../jsuistutorial.ts"/>
/**
 * JSAction_JSFrameExample
 */
namespace jsuistutorial {
    export class JSAction_JSFrameExample extends JSAction {
        
        constructor() {
            super("JS Frame example(s)");
        }
        actionPerformed(mouseEvent: MouseEvent): void {
            var tutorial: JSUIS_Tutorial = JSUIS_Tutorial.getInstance();
            JSForm.post("/examples/jsframe", tutorial.getParams());
        }
    }
}

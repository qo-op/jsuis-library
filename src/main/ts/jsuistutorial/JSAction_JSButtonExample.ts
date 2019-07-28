/// <reference path = "../jsuistutorial.ts"/>
/**
 * JSAction_JSButtonExample
 */
namespace jsuistutorial {
    export class JSAction_JSButtonExample extends JSAction {
        
        constructor() {
            super("JS Button example(s)");
        }
        actionPerformed(mouseEvent: MouseEvent): void {
            var tutorial: JSUIS_Tutorial = JSUIS_Tutorial.getInstance();
            JSForm.post("/examples/jsbutton", tutorial.getParams());
        }
    }
}

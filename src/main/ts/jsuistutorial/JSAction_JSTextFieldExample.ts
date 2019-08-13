/// <reference path = "../jsuistutorial.ts"/>
/**
 * JSAction_JSTextFieldExample
 */
namespace jsuistutorial {
    export class JSAction_JSTextFieldExample extends JSAction {
        
        constructor() {
            super("JS TextField example(s)");
        }
        actionPerformed(mouseEvent: MouseEvent): void {
            var jsuis_Tutorial: JSUIS_Tutorial = JSUIS_Tutorial.getInstance();
            JSForm.post("/examples/jstextfield", jsuis_Tutorial.getParams());
        }
    }
}

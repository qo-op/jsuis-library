/// <reference path = "../jsuistutorial.ts"/>
/**
 * JSAction_JSUISTutorial
 */
namespace jsuistutorial {
    export class JSAction_JSUISTutorial extends JSAction {
        
        constructor() {
            super("How to use JSUIS");
        }
        actionPerformed(mouseEvent: MouseEvent): void {
            var tutorial: JSUIS_Tutorial = JSUIS_Tutorial.getInstance();
            JSForm.post("/", tutorial.getParams());
        }
    }
}

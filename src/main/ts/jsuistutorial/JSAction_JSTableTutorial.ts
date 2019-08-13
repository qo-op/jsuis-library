/// <reference path = "../jsuistutorial.ts"/>
/**
 * JSAction_JSTableTutorial
 */
namespace jsuistutorial {
    export class JSAction_JSTableTutorial extends JSAction {
        
        constructor() {
            super("How to use JS Table");
        }
        actionPerformed(mouseEvent: MouseEvent): void {
            var tutorial: JSUIS_Tutorial = JSUIS_Tutorial.getInstance();
            JSForm.post("/tutorials/jsframe", tutorial.getParams());
        }
    }
}

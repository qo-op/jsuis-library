/// <reference path = "../jsuistutorial.ts"/>
/**
 * JSAction_JSFrameTutorial
 */
namespace jsuistutorial {
    export class JSAction_JSFrameTutorial extends JSAction {
        
        constructor() {
            super("How to use JS Frame");
        }
        actionPerformed(mouseEvent: MouseEvent): void {
            var tutorial: JSUIS_Tutorial = JSUIS_Tutorial.getInstance();
            JSForm.post("/tutorials/jsframe", tutorial.getParams());
        }
    }
}

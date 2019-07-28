/// <reference path = "../jsuistutorial.ts"/>
/**
 * JSAction_JSButtonTutorial
 */
namespace jsuistutorial {
    export class JSAction_JSButtonTutorial extends JSAction {
        
        constructor() {
            super("How to use JS Button");
        }
        actionPerformed(mouseEvent: MouseEvent): void {
            var tutorial: JSUIS_Tutorial = JSUIS_Tutorial.getInstance();
            JSForm.post("/tutorials/jsbutton", tutorial.getParams());
        }
    }
}

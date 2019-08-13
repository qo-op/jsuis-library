/// <reference path = "../jsuistutorial.ts"/>
/**
 * JSAction_JSProgressBarExample
 */
namespace jsuistutorial {
    export class JSAction_JSProgressBarExample extends JSAction {
        
        constructor() {
            super("JS ProgressBar example(s)");
        }
        actionPerformed(mouseEvent: MouseEvent): void {
            var jsuis_Tutorial: JSUIS_Tutorial = JSUIS_Tutorial.getInstance();
            JSForm.post("/examples/jsprogressbar", jsuis_Tutorial.getParams());
        }
    }
}

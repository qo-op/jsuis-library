/// <reference path = "../jstutorial.ts"/>
/**
 * JSSplitPane_JSTutorial
 */
namespace jstutorial {
    export class JSSplitPane_JSTutorial extends JSSplitPane {
        
        static instance: JSSplitPane_JSTutorial;
        static getInstance(): JSSplitPane_JSTutorial {
            if (JSSplitPane_JSTutorial.instance === undefined) {
                JSSplitPane_JSTutorial.instance = new JSSplitPane_JSTutorial();
            }
            return JSSplitPane_JSTutorial.instance;
        }
        constructor() {
            super();
            this.addClass("JSSplitPane_JSTutorial");
        }
    }
}

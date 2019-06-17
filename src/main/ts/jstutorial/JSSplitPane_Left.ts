/// <reference path = "../jstutorial.ts"/>
/**
 * JSSplitPane_Left
 */
namespace jstutorial {
    export class JSSplitPane_Left extends JSSplitPane {
        
        static instance: JSSplitPane_Left;
        static getInstance(): JSSplitPane_Left {
            if (JSSplitPane_Left.instance === undefined) {
                JSSplitPane_Left.instance = new JSSplitPane_Left();
            }
            return JSSplitPane_Left.instance;
        }
        constructor() {
            super();
            this.addClass("JSSplitPane_Left");
        }
    }
}

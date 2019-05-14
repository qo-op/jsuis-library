/// <reference path = "../jstutorial.ts"/>
/**
 * JSFrame_JSUISTutorial
 */
namespace jstutorial {
    export class JSFrame_JSUISTutorial extends JSFrame_JSTutorial {
        
        constructor() {
            super();
            this.addClass("JSFrame_JSUISTutorial");
            var jsTutorialSplitPane: JSSplitPane_JSTutorial = JSSplitPane_JSTutorial.getInstance();
            var contentPanel: JSPanel = new JSPanel();
            jsTutorialSplitPane.setRightComponent(contentPanel);
            var blahLabel: JSLabel = new JSLabel("blah");
            contentPanel.add(blahLabel);
        }
    }
}

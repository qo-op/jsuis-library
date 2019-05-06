/// <reference path = "../tutorial.ts"/>
/**
 * JSButton tutorial
 */
class JSButtonTutorial extends JSTutorial {
    
    constructor() {
        super();
        var splitPane: JSSplitPane = this.getSplitPane();
        var contentPanel: JSPanel = new JSPanel();
        splitPane.setRightComponent(contentPanel);
        var blahLabel: JSLabel = new JSLabel("blah");
        contentPanel.add(blahLabel);
    }
}

/// <reference path = "../jsuistutorial.ts"/>
/**
 * JSAction_Collapse
 */
namespace jsuistutorial {
    export class JSAction_Collapse extends JSAction {
        
        panel_ToggleButton: JSPanel_ToggleButton;
        splitPane: JSSplitPane_Tutorial;
        
        constructor() {
            super(new JSImageIcon("/img/baseline-keyboard_arrow_left-24px.svg", 24, 24));
        }
        actionPerformed(mouseEvent: MouseEvent): void {
            var splitPaneLeftContainer_Tutorial: JSSplitPaneLeftContainer = this.splitPane.getLeftContainer();
            this.splitPane.setDividerLocation(splitPaneLeftContainer_Tutorial.getBorderRightWidth());
            this.panel_ToggleButton.first();
        }
    }
}

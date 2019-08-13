/// <reference path = "../jsuistutorial.ts"/>
/**
 * JSAction_Expand
 */
namespace jsuistutorial {
    export class JSAction_Expand extends JSAction {
        
        panel_ToggleButton: JSPanel_ToggleButton;
        splitPane: JSSplitPane_Tutorial;
        
        constructor() {
            super(new JSImageIcon("/img/baseline-keyboard_arrow_right-24px.svg", 24, 24));
        }
        actionPerformed(mouseEvent: MouseEvent): void {
            var panel_ToggleButton: JSPanel_ToggleButton = this.panel_ToggleButton;
            if (panel_ToggleButton.isFirst()) {
                this.splitPane.setDividerLocation(this.splitPane.getLeftContainer().getPreferredOuterWidth());
                panel_ToggleButton.last();
            }
        }
    }
}

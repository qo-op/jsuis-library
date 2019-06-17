/// <reference path = "../jstutorial.ts"/>
/**
 * JSAction_RunExample
 */
namespace jstutorial {
    export class JSAction_RunExample extends JSAction {
        
        panel_Example: JSPanel_Example;
        
        constructor(panel_Example: JSPanel_Example) {
            super("Run", JSIcon_Run.getInstance());
            this.setPanel(panel_Example);
        }
        getPanel(): JSPanel_Example {
            return this.panel_Example;
        }
        setPanel(panel_Example: JSPanel_Example) {
            this.panel_Example = panel_Example;
        }
        actionPerformed(mouseEvent: MouseEvent): void {
            var panel_Example: JSPanel_Example = this.getPanel();
            var iframe: JSIFrame = panel_Example.getIFrame();
            iframe.setSource("javascript:void(0);");
            var splitPane: JSSplitPane = panel_Example.getSplitPane();
            var leftComponent: JSComponent = splitPane.getLeftComponent();
            var content: string = leftComponent.getText();
            iframe.open();
            iframe.write(content);
            iframe.close();
        }
    }
}

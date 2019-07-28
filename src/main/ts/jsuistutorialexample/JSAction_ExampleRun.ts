/// <reference path = "../jsuistutorial.ts"/>
/**
 * JSAction_ExampleRun
 */
namespace jsuistutorial {
    export class JSAction_ExampleRun extends JSAction {
        
        iFrame: JSIFrame_Example;
        panel: JSPanel_Example;
        splitPane: JSSplitPane_Example;
        
        constructor() {
            super("Run");
        }
        actionPerformed(mouseEvent: MouseEvent): void {
            var iframe: JSIFrame = this.iFrame;
            var panel: JSPanel_Example = this.panel;
            var splitPane: JSSplitPane = this.splitPane;
            
            iframe.setSource("javascript:void(0);");
            var leftComponent: JSComponent = splitPane.getLeftComponent();
            var content: string = leftComponent.getText();
            iframe.open();
            iframe.write(content);
            iframe.close();
        }
    }
}

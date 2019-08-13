/// <reference path = "../jsuistutorial.ts"/>
/**
 * JSUIS_Tutorial
 */
namespace jsuistutorial {
    export class JSUIS_Example {
        
        private action_Run: JSAction_ExampleRun;
        private button_Run: JSButton_ExampleRun;
        private icon_Run: JSIcon_ExampleRun;
        private iFrame: JSIFrame_Example;
        private panel: JSPanel_Example;
        private splitPane: JSSplitPane_Example;
        private toolBar: JSToolBar_Example;
        
        getRunAction(): JSAction_ExampleRun {
            if (!this.action_Run) {
                this.action_Run = new JSAction_ExampleRun();
                this.action_Run.setIcon(this.getRunIcon());
                this.action_Run.iFrame = this.getIFrame();
                this.action_Run.panel = this.getPanel();
                this.action_Run.splitPane = this.getSplitPane();
            }
            return this.action_Run;
        }
        getRunButton(): JSButton_ExampleRun {
            if (!this.button_Run) {
                this.button_Run = new JSButton_ExampleRun();
                this.button_Run.setAction(this.getRunAction());
            }
            return this.button_Run;
        }
        getRunIcon(): JSIcon_ExampleRun {
            if (!this.icon_Run) {
                this.icon_Run = new JSIcon_ExampleRun();
            }
            return this.icon_Run;
        }
        getIFrame(): JSIFrame_Example {
            if (!this.iFrame) {
                this.iFrame = new JSIFrame_Example();
            }
            return this.iFrame;
        }
        getPanel(): JSPanel_Example {
            if (!this.panel) {
                this.panel = new JSPanel_Example();
            
                var toolBar: JSToolBar = this.getToolBar();
                this.panel.add(toolBar, JSBorderLayout.NORTH);
                
                var runButton: JSButton = this.getRunButton();
                toolBar.add(runButton);
                
                var splitPane: JSSplitPane = this.getSplitPane();
                this.panel.add(splitPane);
                
                var iframe: JSIFrame = this.getIFrame();
                splitPane.setRightComponent(iframe);
            }
            return this.panel;
        }
        getSplitPane(): JSSplitPane_Example {
            if (!this.splitPane) {
                this.splitPane = new JSSplitPane_Example();
            }
            return this.splitPane;
        }
        getToolBar(): JSToolBar_Example {
            if (!this.toolBar) {
                this.toolBar = new JSToolBar_Example();
            }
            return this.toolBar;
        }
    }
}

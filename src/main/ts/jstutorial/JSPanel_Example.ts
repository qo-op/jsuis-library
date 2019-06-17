/// <reference path = "../jstutorial.ts"/>
/**
 * JSPanel_Example
 */
namespace jstutorial {
    export class JSPanel_Example extends JSPanel {
        
        static instance: JSPanel_Example;
        static getInstance(): JSPanel_Example {
            if (JSPanel_Example.instance === undefined) {
                JSPanel_Example.instance = new JSPanel_Example();
            }
            return JSPanel_Example.instance;
        }
        constructor() {
            super(new JSBorderLayout());
            this.addClass("JSPanel_Example");
            
            var toolBar: JSToolBar = this.getToolBar();
            this.add(toolBar, JSBorderLayout.NORTH);
            
            var runButton: JSButton = this.getRunButton();
            toolBar.add(runButton);
            
            var splitPane_Example: JSSplitPane = this.getSplitPane();
            this.add(splitPane_Example);
            
            var iframe: JSIFrame = this.getIFrame();
            splitPane_Example.setRightComponent(iframe);
        }
        getToolBar(): JSToolBar {
            var toolBar: JSToolBar = this.getData("toolBar");
            if (!toolBar) {
                toolBar = new JSToolBar_Example();
                this.setData("toolBar", toolBar);
            }
            return toolBar;
        }
        getRunButton(): JSButton {
            var runButton: JSButton = this.getData("runButton");
            if (!runButton) {
                runButton = new JSButton_RunExample(this);
                this.setData("runButton", runButton);
            }
            return runButton;
        }
        getSplitPane(): JSSplitPane {
            var splitPane: JSSplitPane = this.getData("splitPane");
            if (!splitPane) {
                splitPane = new JSSplitPane_Example();
                this.setData("splitPane", splitPane);
            }
            return splitPane;
        }
        getIFrame(): JSIFrame {
            var iframe: JSIFrame = this.getData("iframe");
            if (!iframe) {
                iframe = new JSIFrame_Example();
                this.setData("iframe", iframe);
            }
            return iframe;
        }
    }
}


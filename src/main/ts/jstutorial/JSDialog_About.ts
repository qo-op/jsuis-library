/// <reference path = "../jstutorial.ts"/>
/**
 * JSDialog_About
 */
namespace jstutorial {
    export class JSDialog_About extends JSDialog {
        
        static instance: JSDialog_About;
        static getInstance(): JSDialog_About {
            if (JSDialog_About.instance === undefined) {
                JSDialog_About.instance = new JSDialog_About();
            }
            return JSDialog_About.instance;
        }
        constructor() {
            super("About", true);
            this.addClass("JSDialog_About");
            
            this.setLayout(new JSBorderLayout());
            
            this.add(new JSParagraph("JSUIS library").withStyle("margin-bottom", "4px"), JSLayout.NORTH);
            
            var buttonPanel: JSPanel = new JSPanel();
            buttonPanel.setStyle("white-space", "nowrap");
            this.add(buttonPanel, JSLayout.SOUTH);
            
            var okButton: JSButton = new JSButton("OK");
            buttonPanel.add(okButton);
            
            var cancelButton: JSButton = new JSButton("Cancel");
            cancelButton.setStyle("margin-left", "4px");
            buttonPanel.add(cancelButton);
            
            var actionListener: JSDialogActionListener = new JSDialogActionListener(this);
            
            okButton.addActionListener(actionListener);
            cancelButton.addActionListener(actionListener);
        }
    }
}

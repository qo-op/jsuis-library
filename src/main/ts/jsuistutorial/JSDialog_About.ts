/// <reference path = "../jsuistutorial.ts"/>
/**
 * JSDialog_About
 */
namespace jsuistutorial {
    export class JSDialog_About extends JSDialog {
        
        constructor() {
            super("About", true);
            
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

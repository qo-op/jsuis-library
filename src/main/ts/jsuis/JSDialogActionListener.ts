/// <reference path = "../jsuis.ts"/>
/**
 * JSDialogActionListener
 * 
 * @author Yassuo Toda
 */
class JSDialogActionListener implements JSActionListener {
    
    dialog: JSDialog;
    
    constructor(dialog: JSDialog) {
        this.setDialog(dialog);
    }
    getDialog(): JSDialog {
        return this.dialog;
    }
    setDialog(dialog: JSDialog) {
        this.dialog = dialog;
    }
    actionPerformed(mouseEvent: MouseEvent): void {
        var dialog: JSDialog = this.getDialog();
        dialog.setVisible(false);
        var body: JSBody = JSBody.getInstance();
        body.getModal().setStyle("display", "none");
        mouseEvent.stopPropagation();
    }
}

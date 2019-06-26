/// <reference path = "../jsuis.ts"/>
/**
 * JSDialogMouseListener
 * 
 * @author Yassuo Toda
 */
class JSDialogMouseListener implements MouseListener {
    
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
    mousePressed(mouseEvent: MouseEvent): void {
        var dialog: JSDialog = this.getDialog();
        dialog.setData("dx", mouseEvent.x - dialog.getX());
        dialog.setData("dy", mouseEvent.y - dialog.getY());
        mouseEvent.stopPropagation();
    }
    mouseDragged(mouseEvent: MouseEvent): void {
        var dialog: JSDialog = this.getDialog();
        dialog.setX(mouseEvent.x - dialog.getData("dx"));
        dialog.setY(mouseEvent.y - dialog.getData("dy"));
        mouseEvent.stopPropagation();
    }
}
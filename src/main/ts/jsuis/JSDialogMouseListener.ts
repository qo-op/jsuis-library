/// <reference path = "../jsuis.ts"/>
/**
 * JSDialogMouseListener
 * 
 * @author Yassuo Toda
 */
class JSDialogMouseListener implements JSMouseListener {
    
    dialog: JSDialog;
    
    private x: number;
    private y: number;
    
    constructor(dialog: JSDialog) {
        this.setDialog(dialog);
    }
    getDialog(): JSDialog {
        return this.dialog;
    }
    setDialog(dialog: JSDialog) {
        this.dialog = dialog;
    }
    getX(): number {
        return this.x;
    }
    setX(x: number) {
        this.x = x;
    }
    getY(): number {
        return this.y;
    }
    setY(y: number) {
        this.y = y;
    }
    mousePressed(mouseEvent: MouseEvent): void {
        var dialog: JSDialog = this.getDialog();
        this.setX(mouseEvent.x - dialog.getX());
        this.setY(mouseEvent.y - dialog.getY());
        mouseEvent.stopPropagation();
    }
    mouseDragged(mouseEvent: MouseEvent): void {
        var dialog: JSDialog = this.getDialog();
        dialog.setX(mouseEvent.x - this.getX());
        dialog.setY(mouseEvent.y - this.getY());
        mouseEvent.stopPropagation();
    }
}
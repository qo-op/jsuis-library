/// <reference path = "../jsuis.ts"/>
/**
 * JSTreeCellButton
 * 
 * @author Yassuo Toda
 */
class JSTreeCellButton extends JSButton {
    constructor(icon: JSIcon) {
        super(icon);
        this.setUndecorated(true);
    }
}

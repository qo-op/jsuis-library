/// <reference path = "../jsuis.ts"/>
/**
 * JSPopupMouseListener
 * 
 * @author Yassuo Toda
 */
class JSPopupMouseListener implements JSMouseListener {
    
    private popup: JSPopup;
    
    constructor(popup: JSPopup) {
        this.setPopup(popup);
    }
    getPopup(): JSPopup {
        return this.popup;
    }
    setPopup(popup: JSPopup) {
        this.popup = popup;
    }
    mousePressed(mouseEvent: MouseEvent) {
        var popup: JSPopup = this.getPopup();
        popup.setClosing(false);
    }
}

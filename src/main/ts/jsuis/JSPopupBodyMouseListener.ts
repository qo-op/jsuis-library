/// <reference path = "../jsuis.ts"/>
/**
 * JSPopupBodyMouseListener
 * 
 * @author Yassuo Toda
 */
class JSPopupBodyMouseListener implements JSMouseListener {
    
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
        popup.setClosing(true);
        setTimeout(function() {
            var closing = popup.isClosing();
            if (closing) {
                popup.setVisible(false);
            }
        }, 0);
    }
}

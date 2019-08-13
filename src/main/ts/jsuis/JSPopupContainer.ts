/// <reference path = "../jsuis.ts"/>
/**
 * JSPopupContainer
 * 
 * @author Yassuo Toda
 */
namespace googol {
    export class JSPopupContainer extends JSDiv {
        constructor() {
            super();
            this.setStyle("position", "absolute");
        }
        getPreferredWidth() {
            return 0;
        }
        getPreferredHeight() {
            return 0;
        }
    }
}

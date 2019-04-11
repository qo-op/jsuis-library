/// <reference path = "../jsuis.ts"/>
/**
 * JSMenuBar
 * 
 * @author Yassuo Toda
 */
class JSMenuBar extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        var menuBarContainer: JSMenuBarContainer = this.getMenuBarContainer();
        if (!menuBarContainer) {
            menuBarContainer = new JSMenuBarContainer();
            super.add(menuBarContainer);
            this.setMenuBarContainer(menuBarContainer);
        }
        this.setClass("JSMenuBar");
        this.setBackground("#f2f2f2");
    }
    getMenuBarContainer(): JSMenuBarContainer {
        return this.getData("menuBarContainer");
    }
    setMenuBarContainer(menuBarContainer: JSMenuBarContainer) {
        this.setData("menuBarContainer", menuBarContainer);
    }
    add(menu: JSMenu): void {
        var menuBarContainer: JSMenuBarContainer = this.getMenuBarContainer();
        menuBarContainer.add(menu);
    }
}
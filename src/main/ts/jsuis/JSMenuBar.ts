/// <reference path = "../jsuis.ts"/>
/**
 * JSMenuBar
 * 
 * @author Yassuo Toda
 */
class JSMenuBar extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        var menuContainer: JSMenuContainer = this.getMenuContainer();
        super.add(menuContainer);
    }
    init(): void {
        this.addClass("JSMenuBar");
    }
    add(menu: JSMenu) {
        var menuContainer = this.getMenuContainer();
        menuContainer.add(menu);
    }
    getMenuContainer(): JSMenuContainer {
        var menuContainer: JSMenuContainer = this.getData("menuContainer");
        if (!menuContainer) {
            menuContainer = new JSMenuContainer();
            this.setData("menuContainer", menuContainer);
        }
        return menuContainer;
    }
}
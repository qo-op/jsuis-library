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
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSMenuBar");
        
        var menuContainer: JSMenuContainer = this.getMenuContainer();
        super.add(menuContainer);
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
/// <reference path = "../jsuis.ts"/>
class JSMenuBar extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    // overload
    constructor(element?: HTMLDivElement) {
        // constructor();
        // constructor(element: HTMLDivElement);
        super(element === undefined ? document.createElement("div") : element);
        var menuBarContainer: JSMenuBarContainer = this.getMenuBarContainer();
        if (!menuBarContainer) {
            menuBarContainer = new JSMenuBarContainer();
            super.add(menuBarContainer);
            this.setMenuBarContainer(menuBarContainer);
        }
    }
    init(): void {
        this.addClass("JSMenuBar");
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
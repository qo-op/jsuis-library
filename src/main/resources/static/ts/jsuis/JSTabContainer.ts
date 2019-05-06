/// <reference path = "../jsuis.ts"/>
/**
 * JSTabContainer
 * 
 * @see JSTabbedPane
 * 
 * @author Yassuo Toda
 */
class JSTabContainer extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(tabPlacement: string);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: HTMLDivElement);
            // constructor(tabPlacement: string);
            if (args[0] instanceof HTMLDivElement) {
            } else if (typeof args[0] === "string") {
                var tabPlacement: string = args[0];
                this.setTabPlacement(tabPlacement);
            }
            break;
        default:
        }
        var tabPlacement = this.getTabPlacement();
        switch (tabPlacement) {
        case JSTabContainer.LEFT:
            this.setLayout(new JSFlowLayout(JSFlowLayout.WEST, JSFlowLayout.TOP));
            // this.setStyle("padding", "1px 0");
            break;
        case JSTabContainer.RIGHT:
            this.setLayout(new JSFlowLayout(JSFlowLayout.EAST, JSFlowLayout.TOP));
            // this.setStyle("padding", "1px 0");
            break;
        case JSTabContainer.BOTTOM:
            this.setLayout(new JSFlowLayout(JSFlowLayout.SOUTH, JSFlowLayout.LEFT));
            // this.setStyle("padding", "0 1px");
            break;
        case JSTabContainer.TOP:
        default:
            this.setLayout(new JSFlowLayout(JSFlowLayout.NORTH, JSFlowLayout.LEFT));
            // this.setStyle("padding", "0 1px");
        }
        var tabSelection: JSSelection = this.getTabSelection();
        if (!tabSelection) {
            tabSelection = new JSSelection();
            this.setTabSelection(tabSelection);
        }
    }
    init(): void {
        this.addClass("JSTabContainer");
    }
    getTabPlacement(): string {
        return this.getAttribute("data-tab-placement");
    }
    setTabPlacement(tabPlacement: string) {
        this.setAttribute("data-tab-placement", tabPlacement);
    }
    addTab(title: string): JSTab;
    addTab(title: string, icon: JSIcon): JSTab;
    // overload
    addTab(...args: any[]): JSTab {
        var tabPlacement: string = this.getTabPlacement();
        var tab: JSTab;
        switch (args.length) {
        case 1:
            // addTab(title: string): JSComponent;
            if (typeof args[0] === "string") {
                var title: string = args[0];
                tab = new JSTab(tabPlacement || JSTabContainer.TOP, false, title);
            }
            break;
        case 2:
            // addTab(title: string, icon: JSIcon): JSComponent;
            if (typeof args[0] === "string" && args[1] instanceof JSIcon) {
                var title: string = args[0];
                var icon: JSIcon = args[1];
                tab = new JSTab(tabPlacement || JSTabContainer.TOP, false, title, icon);
            }
            break;
        default:
        }
        var tabPlacement = this.getTabPlacement();
        switch (tabPlacement) {
        case JSTabContainer.LEFT:
            tab.setAlign(JSFlowLayout.RIGHT);
            break;
        case JSTabContainer.RIGHT:
            tab.setAlign(JSFlowLayout.LEFT);
            break;
        case JSTabContainer.BOTTOM:
            tab.setAlign(JSFlowLayout.TOP);
            break;
        case JSTabContainer.TOP:
        default:
            tab.setAlign(JSFlowLayout.BOTTOM);
        }
        var tabSelection: JSSelection = this.getTabSelection();
        tabSelection.add(tab);
        var selected: JSComponent = tabSelection.getSelected();
        if (!selected) {
            tabSelection.setSelectedIndex(0);
        }
        this.add(tab);
        var tabs: JSComponent[] = this.getTabs();
        tabs.push(tab);
        return tab;
    }
    addCloseabeTab(title: string): JSTab;
    addCloseabeTab(title: string, icon: JSIcon): JSTab;
    // overload
    addCloseabeTab(...args: any[]): JSTab {
        var tabPlacement: string = this.getTabPlacement();
        var tab: JSTab;
        switch (args.length) {
        case 1:
            // addTab(title: string): JSComponent;
            if (typeof args[0] === "string") {
                var title: string = args[0];
                var closeable: boolean = args[1];
                tab = new JSTab(tabPlacement || JSTabContainer.TOP, true, title);
            }
            break;
        case 2:
            // addTab(title: string, icon: JSIcon): JSComponent;
            if (typeof args[0] === "string" && args[1] instanceof JSIcon) {
                var title: string = args[0];
                var icon: JSIcon = args[1];
                var closeable: boolean = args[2];
                tab = new JSTab(tabPlacement || JSTabContainer.TOP, true, title, icon);
            }
            break;
        default:
        }
        var tabPlacement = this.getTabPlacement();
        switch (tabPlacement) {
        case JSTabContainer.LEFT:
            tab.setAlign(JSFlowLayout.RIGHT);
            break;
        case JSTabContainer.RIGHT:
            tab.setAlign(JSFlowLayout.LEFT);
            break;
        case JSTabContainer.BOTTOM:
            tab.setAlign(JSFlowLayout.TOP);
            break;
        case JSTabContainer.TOP:
        default:
            tab.setAlign(JSFlowLayout.BOTTOM);
        }
        var tabSelection: JSSelection = this.getTabSelection();
        tabSelection.add(tab);
        var selected: JSComponent = tabSelection.getSelected();
        if (!selected) {
            tabSelection.setSelectedIndex(0);
        }
        this.add(tab);
        var tabs: JSComponent[] = this.getTabs();
        tabs.push(tab);
        return tab;
    }
    addButton(button: JSComponent): void {
        var tabPlacement: string = this.getTabPlacement();
        switch (tabPlacement) {
        case JSTabContainer.RIGHT:
            break;
        case JSTabContainer.LEFT:
            break;
        case JSTabContainer.BOTTOM:
        case JSTabContainer.TOP:
        default:
            button.setStyle("float", "right");
        }
        this.add(button);
    }
    remove(component: JSComponent): void;
    remove(index: number): void;
    // overload
    remove(...args: any[]): void {
        var component: JSComponent;
        switch (args.length) {
        case 1:
            // remove(index: number): void;
            if (args[0] instanceof JSComponent) {
                component = args[0];
            } else if (typeof args[0] === "number") {
                var index: number = args[0];
                var components: JSComponent[] = this.getComponents();
                component = components[index];
            }
            break;
        default:
        }
        var tabSelection: JSSelection = this.getTabSelection();
        tabSelection.remove(component);
        super.remove(component);
        var tabs: JSComponent[] = this.getTabs();
        var index = tabs.indexOf(component);
        tabs.splice(index, 1);
    }
    getTabSelection(): JSSelection {
        return this.getData("tabSelection");
    }
    setTabSelection(tabSelection: JSSelection) {
        this.setData("tabSelection", tabSelection);
    }
    getTabs(): JSComponent[] {
        var tabs: JSComponent[] = this.getData("tabs");
        if (tabs === undefined) {
            tabs = [];
            this.setData("tabs", tabs);
        }
        return tabs;
    }
    getTabCount(): number {
        var tabs: JSComponent[] = this.getTabs();
        return tabs.length;
    }
    getTabComponentAt(index: number): JSComponent {
        var tabs: JSComponent[] = this.getTabs();
        return tabs[index];
    }
    indexOfTab(tab: JSComponent): number {
        var tabs: JSComponent[] = this.getTabs();
        return tabs.indexOf(tab);
    }
    setTabComponentAt(index: number, tab: JSComponent) {
        var tabSelection: JSSelection = this.getTabSelection();
        tabSelection.add(tab);
        var selected: JSComponent = tabSelection.getSelected();
        if (!selected) {
            tabSelection.setSelectedIndex(0);
        }
        var tabs: JSComponent[] = this.getTabs();
        tabs.push(tab);
        return tab;
    }
    getSelectedIndex(): number {
        var tabSelection: JSSelection = this.getTabSelection();
        return tabSelection.getSelectedIndex();
    }
    setSelectedIndex(selectedIndex: number) {
        var tabSelection: JSSelection = this.getTabSelection();
        tabSelection.setSelectedIndex(selectedIndex);
    }
}
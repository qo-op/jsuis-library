/// <reference path = "../jsuis.ts"/>
/**
 * JSTabbedPaneTabContainer
 * 
 * @see JSTabbedPane
 * 
 * @author Yassuo Toda
 */
class JSTabbedPaneTabContainer extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    constructor(tabPlacement: string);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSTabbedPaneTabContainer");
        switch (arguments.length) {
        case 1:
            // constructor(tabPlacement: string);
            if (typeof arguments[0] === "string") {
                var tabPlacement: string = arguments[0];
                this.setTabPlacement(tabPlacement);
            }
            break;
        default:
        }
        var tabPlacement = this.getTabPlacement();
        switch (tabPlacement) {
        case JSTabbedPaneTabContainer.LEFT:
            this.setLayout(new JSFlowLayout(JSFlowLayout.WEST, JSFlowLayout.TOP));
            break;
        case JSTabbedPaneTabContainer.RIGHT:
            this.setLayout(new JSFlowLayout(JSFlowLayout.EAST, JSFlowLayout.TOP));
            break;
        case JSTabbedPaneTabContainer.BOTTOM:
            this.setLayout(new JSFlowLayout(JSFlowLayout.SOUTH, JSFlowLayout.LEFT));
            break;
        case JSTabbedPaneTabContainer.TOP:
        default:
            this.setLayout(new JSFlowLayout(JSFlowLayout.NORTH, JSFlowLayout.LEFT));
        }
        var tabSelection: JSSelection = this.getTabSelection();
        if (!tabSelection) {
            tabSelection = new JSSelection();
            this.setTabSelection(tabSelection);
        }
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
    addTab(): JSTab {
        var tabPlacement: string = this.getTabPlacement();
        var tab: JSTab;
        switch (arguments.length) {
        case 1:
            // addTab(title: string): JSComponent;
            if (typeof arguments[0] === "string") {
                var title: string = arguments[0];
                tab = new JSTab(tabPlacement || JSTabbedPaneTabContainer.TOP, false, title);
            }
            break;
        case 2:
            // addTab(title: string, icon: JSIcon): JSComponent;
            if (typeof arguments[0] === "string" && arguments[1] instanceof JSIcon) {
                var title: string = arguments[0];
                var icon: JSIcon = arguments[1];
                tab = new JSTab(tabPlacement || JSTabbedPaneTabContainer.TOP, false, title, icon);
            }
            break;
        default:
        }
        var tabPlacement = this.getTabPlacement();
        switch (tabPlacement) {
        case JSTabbedPaneTabContainer.LEFT:
            tab.setAlign(JSFlowLayout.RIGHT);
            break;
        case JSTabbedPaneTabContainer.RIGHT:
            tab.setAlign(JSFlowLayout.LEFT);
            break;
        case JSTabbedPaneTabContainer.BOTTOM:
            tab.setAlign(JSFlowLayout.TOP);
            break;
        case JSTabbedPaneTabContainer.TOP:
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
    addCloseabeTab(): JSTab {
        var tabPlacement: string = this.getTabPlacement();
        var tab: JSTab;
        switch (arguments.length) {
        case 1:
            // addTab(title: string): JSComponent;
            if (typeof arguments[0] === "string") {
                var title: string = arguments[0];
                var closeable: boolean = arguments[1];
                tab = new JSTab(tabPlacement || JSTabbedPaneTabContainer.TOP, true, title);
            }
            break;
        case 2:
            // addTab(title: string, icon: JSIcon): JSComponent;
            if (typeof arguments[0] === "string" && arguments[1] instanceof JSIcon) {
                var title: string = arguments[0];
                var icon: JSIcon = arguments[1];
                var closeable: boolean = arguments[2];
                tab = new JSTab(tabPlacement || JSTabbedPaneTabContainer.TOP, true, title, icon);
            }
            break;
        default:
        }
        var tabPlacement = this.getTabPlacement();
        switch (tabPlacement) {
        case JSTabbedPaneTabContainer.LEFT:
            tab.setAlign(JSFlowLayout.RIGHT);
            break;
        case JSTabbedPaneTabContainer.RIGHT:
            tab.setAlign(JSFlowLayout.LEFT);
            break;
        case JSTabbedPaneTabContainer.BOTTOM:
            tab.setAlign(JSFlowLayout.TOP);
            break;
        case JSTabbedPaneTabContainer.TOP:
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
        case JSTabbedPaneTabContainer.RIGHT:
            break;
        case JSTabbedPaneTabContainer.LEFT:
            break;
        case JSTabbedPaneTabContainer.BOTTOM:
        case JSTabbedPaneTabContainer.TOP:
        default:
            button.setStyle("float", "right");
        }
        this.add(button);
    }
    remove(component: JSComponent): void;
    remove(index: number): void;
    // overload
    remove(): void {
        var component: JSComponent;
        switch (arguments.length) {
        case 1:
            // remove(index: number): void;
            if (arguments[0] instanceof JSComponent) {
                component = arguments[0];
            } else if (typeof arguments[0] === "number") {
                var index: number = arguments[0];
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
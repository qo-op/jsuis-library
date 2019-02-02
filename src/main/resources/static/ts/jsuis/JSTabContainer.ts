/// <reference path = "../jsuis.ts"/>
class JSTabContainer extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(tabPlacement: string);
    // overload
    constructor(elementOrTabPlacement?: HTMLDivElement | string) {
        // constructor();
        // constructor(element: HTMLDivElement);
        super(elementOrTabPlacement === undefined || !(elementOrTabPlacement instanceof HTMLDivElement) ? document.createElement("div") : elementOrTabPlacement);
        if (elementOrTabPlacement !== undefined && !(elementOrTabPlacement instanceof HTMLDivElement)) {
            // constructor(tabPlacement: string);
            this.setTabPlacement(elementOrTabPlacement);
        }
        var tabPlacement = this.getTabPlacement();
        if (!tabPlacement) {
            tabPlacement = JSTabContainer.TOP;
            this.setTabPlacement(tabPlacement);
        }
        var tabSelection: JSSelection = this.getTabSelection();
        if (!tabSelection) {
            tabSelection = new JSSelection();
            this.setTabSelection(tabSelection);
        }
        this.setBackground("#BFBFBF");
        switch (tabPlacement) {
        case JSTabContainer.RIGHT:
            // this.setLayout(new JSFlowLayout(JSFlowLayout.RIGHT_TO_LEFT, JSFlowLayout.TOP));
            this.setStyle("padding", "1px 0");
            break;
        case JSTabContainer.LEFT:
            // this.setLayout(new JSFlowLayout(JSFlowLayout.LEFT_TO_RIGHT, JSFlowLayout.TOP));
            this.setStyle("padding", "1px 0");
            break;
        case JSTabContainer.BOTTOM:
            // this.setLayout(new JSFlowLayout(JSFlowLayout.BOTTOM_TO_TOP, JSFlowLayout.LEFT));
            this.setStyle("padding", "0 1px");
            break;
        case JSTabContainer.TOP:
        default:
            // this.setLayout(new JSFlowLayout(JSFlowLayout.TOP_TO_BOTTOM, JSFlowLayout.LEFT));
            this.setStyle("padding", "0 1px");
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
    getTabSelection(): JSSelection {
        return this.getData("tabSelection");
    }
    setTabSelection(tabSelection: JSSelection) {
        this.setData("tabSelection", tabSelection);
    }
    getTabComponents(): JSComponent[] {
        var tabComponents: JSComponent[] = this.getData("tabComponents");
        if (tabComponents === undefined) {
            tabComponents = [];
            this.setData("tabComponents", tabComponents);
        }
        return tabComponents;
    }
    getTabCount(): number {
        var tabComponents: JSComponent[] = this.getTabComponents();
        return tabComponents.length;
    }
    getTabComponentAt(index: number): JSComponent {
        var tabComponents: JSComponent[] = this.getTabComponents();
        return tabComponents[index];
    }
    indexOfTab(tabComponent: JSComponent): number {
        var tabComponents: JSComponent[] = this.getTabComponents();
        return tabComponents.indexOf(tabComponent);
    }
    addTab(closeable: boolean, icon: JSComponent): JSComponent;
    addTab(closeable: boolean, title: string): JSComponent;
    addTab(closeable: boolean, title: string, icon: JSComponent): JSComponent;
    // overload
    addTab(closeable: boolean, iconOrTitle: JSComponent | string, icon?: JSComponent): JSComponent {
        var title: string;
        if (iconOrTitle instanceof JSComponent) {
            // addCloseableTab(closeable: boolean, icon: JSComponent): JSComponent;
            icon = iconOrTitle;
        } else {
            // addCloseableTab(closeable: boolean, title: string): JSComponent;
            // addCloseableTab(closeable: boolean, title: string, icon: JSComponent): JSComponent;
            title = iconOrTitle;
        }
        var tabComponent: JSComponent;
        var tabPlacement: string = this.getTabPlacement();
        if (!title) {
            tabComponent = new JSTab(closeable, tabPlacement, icon);
        } else if (!icon) {
            tabComponent = new JSTab(closeable, tabPlacement, title);
        } else {
            tabComponent = new JSTab(closeable, tabPlacement, title, icon);
        }
        var tabSelection: JSSelection = this.getTabSelection();
        tabSelection.add(tabComponent);
        var selected: JSComponent = tabSelection.getSelected();
        if (!selected) {
            tabSelection.setSelectedIndex(0);
        }
        switch (tabPlacement) {
        case JSTabContainer.RIGHT:
            this.add(tabComponent, { anchor: JSFlowLayout.WEST });
            break;
        case JSTabContainer.LEFT:
            this.add(tabComponent, { anchor: JSFlowLayout.EAST });
            break;
        case JSTabContainer.BOTTOM:
            this.add(tabComponent, { anchor: JSFlowLayout.NORTH });
            break;
        case JSTabContainer.TOP:
        default:
            this.add(tabComponent, { anchor: JSFlowLayout.SOUTH });
        }
        var tabComponents: JSComponent[] = this.getTabComponents();
        tabComponents.push(tabComponent);
        this.fireTabOpened(new JSTabEvent(tabComponent));
        return tabComponent;
    }
    remove(index: number): void;
    remove(component: JSComponent): void;
    // overload
    remove(indexOrComponent: number | JSComponent): void {
        var component: JSComponent;
        var components: JSComponent[] = this.getComponents();
        if (typeof indexOrComponent === "number") {
            if (indexOrComponent < components.length) {
                component = components[indexOrComponent];
            } else {
                return;
            }
        } else {
            component = indexOrComponent;
        }
        var tabSelection: JSSelection = this.getTabSelection();
        tabSelection.remove(component);
        super.remove(component);
        var tabComponents: JSComponent[] = this.getTabComponents();
        var index = tabComponents.indexOf(component);
        tabComponents.splice(index, 1);
        this.fireTabClosed(new JSTabEvent(component));
    }
    setTabComponentAt(index: number, tabComponent: JSComponent) {
        var tabPlacement: string = this.getTabPlacement();
        var tabSelection: JSSelection = this.getTabSelection();
        tabSelection.add(tabComponent);
        var selected: JSComponent = tabSelection.getSelected();
        if (!selected) {
            tabSelection.setSelectedIndex(0);
        }
        switch (tabPlacement) {
        case JSTabContainer.RIGHT:
            this.add(tabComponent, { anchor: JSFlowLayout.WEST }, index);
            break;
        case JSTabContainer.LEFT:
            this.add(tabComponent, { anchor: JSFlowLayout.EAST }, index);
            break;
        case JSTabContainer.BOTTOM:
            this.add(tabComponent, { anchor: JSFlowLayout.NORTH }, index);
            break;
        case JSTabContainer.TOP:
        default:
            this.add(tabComponent, { anchor: JSFlowLayout.SOUTH }, index);
        }
        var tabComponents: JSComponent[] = this.getTabComponents();
        tabComponents.push(tabComponent);
        this.fireTabOpened(new JSTabEvent(tabComponent));
        return tabComponent;
    }
    addButton(button: JSComponent): void;
    addButton(button: JSComponent, constraints: { [ key: string]: number | string }): void
    // overload
    addButton(button: JSComponent, constraints?: { [ key: string]: number | string }): void {
        if (constraints === undefined) {
            var tabPlacement: string = this.getTabPlacement();
            switch (tabPlacement) {
            case JSTabContainer.RIGHT:
                constraints = { anchor: JSFlowLayout.EAST };
                break;
            case JSTabContainer.LEFT:
                constraints = { anchor: JSFlowLayout.WEST };
                break;
            case JSTabContainer.BOTTOM:
                // constraints = { anchor: JSFlowLayout.SOUTHEAST };
                button.setStyle("float", "right");
                break;
            case JSTabContainer.TOP:
            default:
                // constraints = { anchor: JSFlowLayout.NORTHEAST };
                button.setStyle("float", "right");
            }
        }
        this.add(button, constraints);
    }
    getSelectedIndex(): number {
        var tabSelection: JSSelection = this.getTabSelection();
        return tabSelection.getSelectedIndex();
    }
    setSelectedIndex(selectedIndex: number) {
        var tabSelection: JSSelection = this.getTabSelection();
        this.fireTabDeactivated(new JSTabEvent(tabSelection.getSelected()));
        tabSelection.setSelectedIndex(selectedIndex);
        this.fireTabActivated(new JSTabEvent(tabSelection.getSelected()));
    }
    getTabListeners(): TabListener[] {
        var tabListeners: TabListener[] = this.getData("tabListeners");
        if (tabListeners === undefined) {
            tabListeners = [];
            this.setData("tabListeners", tabListeners);
        }
        return tabListeners;
    }
    addTabListener(tabListener: TabListener): void {
        var tabListeners: TabListener[] = this.getTabListeners();
        tabListeners.push(tabListener);
    }
    removeTabListener(tabListener: TabListener) {
        var tabListeners: TabListener[] = this.getTabListeners();
        var index = tabListeners.indexOf(tabListener);
        if (index !== -1) {
            tabListeners.splice(index, 1);
        }
    }
    fireTabOpened(tabEvent: JSTabEvent): void {
        var tabListeners: TabListener[] = this.getTabListeners();
        for (var i: number = 0; i < tabListeners.length; i++) {
            var tabListener = tabListeners[i];
            if (tabListener.tabOpened) {
                tabListener.tabOpened(tabEvent);
            }
        }
    }
    fireTabClosing(tabEvent: JSTabEvent): void {
        var tabListeners: TabListener[] = this.getTabListeners();
        for (var i: number = 0; i < tabListeners.length; i++) {
            var tabListener = tabListeners[i];
            if (tabListener.tabClosing) {
                tabListener.tabClosing(tabEvent);
            }
        }
    }
    fireTabClosed(tabEvent: JSTabEvent): void {
        var tabListeners: TabListener[] = this.getTabListeners();
        for (var i: number = 0; i < tabListeners.length; i++) {
            var tabListener = tabListeners[i];
            if (tabListener.tabClosed) {
                tabListener.tabClosed(tabEvent);
            }
        }
    }
    fireTabActivated(tabEvent: JSTabEvent): void {
        var tabListeners: TabListener[] = this.getTabListeners();
        for (var i: number = 0; i < tabListeners.length; i++) {
            var tabListener = tabListeners[i];
            if (tabListener.tabActivated) {
                tabListener.tabActivated(tabEvent);
            }
        }
    }
    fireTabDeactivated(tabEvent: JSTabEvent): void {
        var tabListeners: TabListener[] = this.getTabListeners();
        for (var i: number = 0; i < tabListeners.length; i++) {
            var tabListener = tabListeners[i];
            if (tabListener.tabDeactivated) {
                tabListener.tabDeactivated(tabEvent);
            }
        }
    }
}
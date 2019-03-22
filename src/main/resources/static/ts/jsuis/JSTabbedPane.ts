/// <reference path = "../jsuis.ts"/>
class JSTabbedPane extends JSHTMLComponent {
    
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
            tabPlacement = JSTabbedPane.TOP;
            this.setTabPlacement(tabPlacement);
        }
        this.setLayout(new JSBorderLayout());
        var tabContainer: JSTabContainer = this.getTabContainer();
        if (!tabContainer) {
            tabContainer = new JSTabContainer(tabPlacement);
            switch (tabPlacement) {
            case JSTabbedPane.RIGHT:
                this.add(tabContainer, JSBorderLayout.EAST);
                break;
            case JSTabbedPane.LEFT:
                this.add(tabContainer, JSBorderLayout.WEST);
                break;
            case JSTabbedPane.BOTTOM:
                this.add(tabContainer, JSBorderLayout.SOUTH);
                break;
            case JSTabbedPane.TOP:
            default:
                this.add(tabContainer, JSBorderLayout.NORTH);
            }
            this.setTabContainer(tabContainer);
        }
        var componentContainer: JSPanel = this.getComponentContainer();
        if (!componentContainer) {
            componentContainer = new JSPanel(new JSCardLayout());
            this.add(componentContainer);
            this.setComponentContainer(componentContainer);
        }
        tabContainer.addTabListener(new JSTabListener(this, {
            tabOpened(tabEvent: JSTabEvent) {
                var tab: JSComponent = tabEvent.getSource();
                var tabContainer: JSTabContainer = this.getTabContainer();
                var index: number = tabContainer.indexOfTab(tab);
                tabContainer.setSelectedIndex(index);
            },
            tabActivated(tabEvent: JSTabEvent) {
                var tabContainer: JSTabContainer = this.getTabContainer();
                var componentContainer: JSPanel = this.getComponentContainer();
                (<JSCardLayout> componentContainer.getLayout()).show(componentContainer, tabContainer.getSelectedIndex());
            },
            tabClosed(tabEvent: JSTabEvent) {
                var tabContainer: JSTabContainer = this.getTabContainer();
                var selectedIndex: number = tabContainer.getSelectedIndex();
                if (selectedIndex === -1) {
                    tabContainer.setSelectedIndex(0);
                }
            }
        }));
    }
    init(): void {
        this.addClass("JSTabbedPane");
    }
    getTabPlacement(): string {
        return this.getAttribute("data-tab-placement");
    }
    setTabPlacement(tabPlacement: string) {
        this.setAttribute("data-tab-placement", tabPlacement);
    }
    getTabContainer(): JSTabContainer {
        return this.getData("tabContainer");
    }
    setTabContainer(tabContainer: JSTabContainer) {
        this.setData("tabContainer", tabContainer);
    }
    getComponentContainer(): JSPanel {
        return this.getData("componentContainer");
    }
    setComponentContainer(componentContainer: JSPanel) {
        this.setData("componentContainer", componentContainer);
    }
    getTabCount(): number {
        var tabContainer: JSTabContainer = this.getTabContainer();
        return tabContainer.getTabCount();
    }
    getTabComponentAt(index: number): JSComponent {
        var tabContainer: JSTabContainer = this.getTabContainer();
        return tabContainer.getTabComponentAt(index);
    }
    addTab(icon: JSComponent, component: JSComponent): JSComponent;
    addTab(title: string, component: JSComponent): JSComponent;
    addTab(title: string, icon: JSComponent, component: JSComponent): JSComponent;
    // overload
    addTab(iconOrTitle: JSComponent | string, componentOrIcon: JSComponent, component?: JSComponent): JSComponent {
        if (iconOrTitle instanceof JSComponent) {
            // addTab(icon: JSComponent, component: JSComponent): JSComponent;
            return this._addTab(iconOrTitle, componentOrIcon, false);
        } else if (component === undefined) {
            // addTab(title: string, component: JSComponent): JSComponent;
            return this._addTab(iconOrTitle, componentOrIcon, false);
        } else {
            // addTab(title: string, icon: JSComponent, component: JSComponent): JSComponent;
            return this._addTab(iconOrTitle, componentOrIcon, component, false);
        }
    }
    addCloseableTab(icon: JSComponent, component: JSComponent): JSComponent;
    addCloseableTab(title: string, component: JSComponent): JSComponent;
    addCloseableTab(title: string, icon: JSComponent, component: JSComponent): JSComponent;
    // overload
    addCloseableTab(iconOrTitle: JSComponent | string, componentOrIcon: JSComponent, component?: JSComponent): JSComponent {
        if (iconOrTitle instanceof JSComponent) {
            // addTab(icon: JSComponent, component: JSComponent): JSComponent;
            return this._addTab(iconOrTitle, componentOrIcon, true);
        } else if (component === undefined) {
            // addTab(title: string, component: JSComponent): JSComponent;
            return this._addTab(iconOrTitle, componentOrIcon, true);
        } else {
            // addTab(title: string, icon: JSComponent, component: JSComponent): JSComponent;
            return this._addTab(iconOrTitle, componentOrIcon, component, true);
        }
    }
    _addTab(icon: JSComponent, component: JSComponent, closeable: boolean): JSComponent;
    _addTab(title: string, component: JSComponent, closeable: boolean): JSComponent;
    _addTab(title: string, icon: JSComponent, component: JSComponent, closeable: boolean): JSComponent;
    // overload
    _addTab(iconOrTitle: JSComponent | string, componentOrIcon: JSComponent, closeableOrComponent: boolean | JSComponent, closeable?: boolean): JSComponent {
        var icon: JSComponent;
        var title: string;
        var component: JSComponent;
        if (iconOrTitle instanceof JSComponent) {
            // _addTab(icon: JSComponent, component: JSComponent, closeable: boolean): JSComponent;
            icon = iconOrTitle;
            component = componentOrIcon;
            closeable = <boolean> closeableOrComponent;
        } else {
            // _addTab(title: string, component: JSComponent, closeable: boolean): JSComponent;
            // _addTab(title: string, icon: JSComponent, component: JSComponent, closeable: boolean): JSComponent;
            title = iconOrTitle
            if (closeable === undefined) {
                component = componentOrIcon;
                closeable = <boolean> closeableOrComponent;
            } else {
                icon = componentOrIcon;
                component = <JSComponent> closeableOrComponent;
            }
        }
        var componentContainer: JSPanel = this.getComponentContainer();
        componentContainer.add(component);
        var tabContainer: JSTabContainer = this.getTabContainer();
        if (!title) {
            return tabContainer.addTab(icon, closeable);
        } else if (!icon) {
            return tabContainer.addTab(title, closeable);
        } else {
            return tabContainer.addTab(title, icon, closeable);
        }
    }
    removeTabAt(index: number): void {
        var tabContainer: JSTabContainer = this.getTabContainer();
        var tabComponent = tabContainer.getTabComponentAt(index);
        tabContainer.remove(tabComponent);
        var componentContainer: JSPanel = this.getComponentContainer();
        componentContainer.remove(index);
    }
    setTabComponentAt(index: number, tabComponent: JSComponent) {
        var tabContainer: JSTabContainer = this.getTabContainer();
        tabContainer.setTabComponentAt(index, tabComponent);
    }
    indexOfComponent(component: JSComponent): number {
        var componentContainer: JSPanel = this.getComponentContainer();
        var components: JSComponent[] = componentContainer.getComponents();
        return components.indexOf(component);
    }
    getComponentAt(index: number): JSComponent {
        var componentContainer: JSPanel = this.getComponentContainer();
        var components: JSComponent[] = componentContainer.getComponents();
        return components[index];
    }
    indexOfTab(tabComponent: JSComponent): number {
        var tabContainer: JSTabContainer = this.getTabContainer();
        return tabContainer.indexOfTab(tabComponent);
    }
    addButton(button: JSComponent): void;
    addButton(button: JSComponent, constraints: { [ key: string]: number | string }): void
    // overload
    addButton(button: JSComponent, constraints?: { [ key: string]: number | string }): void {
        var tabContainer: JSTabContainer = this.getTabContainer();
        if (constraints !== undefined) {
            // addButton(button: JSButton): void;
            tabContainer.addButton(button);
        } else {
            // addButton(button: JSButton, constraints: { [ key: string]: number | string }): void
            tabContainer.addButton(button, constraints);
        }
    }
    addTabListener(tabListener: TabListener): void {
        var tabContainer: JSTabContainer = this.getTabContainer();
        tabContainer.addTabListener(tabListener);
    }
    removeTabListener(tabListener: TabListener): void {
        var tabContainer: JSTabContainer = this.getTabContainer();
        tabContainer.removeTabListener(tabListener);
    }
    getSelectedIndex(): number {
        var tabContainer: JSTabContainer = this.getTabContainer();
        return tabContainer.getSelectedIndex();
    }
    setSelectedIndex(selectedIndex: number) {
        var tabContainer: JSTabContainer = this.getTabContainer();
        tabContainer.setSelectedIndex(selectedIndex);
    }
}
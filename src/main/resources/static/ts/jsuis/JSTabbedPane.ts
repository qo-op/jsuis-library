/// <reference path = "../jsuis.ts"/>
/**
 * JSTabbedPane
 * 
 * @author Yassuo Toda
 */
class JSTabbedPane extends JSHTMLComponent {
    
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
        this.addTabListener(new JSTabListener({
            tabOpened(tabEvent: JSTabEvent, tabbedPane: JSTabbedPane) {
                var tab: JSComponent = tabEvent.getSource();
                var index: number = tabbedPane.indexOfTab(tab);
                tabbedPane.setSelectedIndex(index);
            },
            tabActivated(tabEvent: JSTabEvent, tabbedPane: JSTabbedPane) {
                var componentContainer: JSPanel = tabbedPane.getComponentContainer();
                (<JSCardLayout> componentContainer.getLayout()).show(componentContainer, tabbedPane.getSelectedIndex());
            },
            tabClosed(tabEvent: JSTabEvent, tabbedPane: JSTabbedPane) {
                var selectedIndex: number = tabbedPane.getSelectedIndex();
                if (selectedIndex === -1) {
                    tabbedPane.setSelectedIndex(0);
                }
            }
        }));
        this.setClass("JSTabbedPane");
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
    addTab(icon: JSIcon, component: JSComponent): JSComponent;
    addTab(title: string, component: JSComponent): JSComponent;
    addTab(title: string, icon: JSIcon, component: JSComponent): JSComponent;
    // overload
    addTab(...args: any[]): JSComponent {
        var tab: JSComponent;
        switch (args.length) {
        case 2:
            // addTab(icon: JSIcon, component: JSComponent): JSComponent;
            // addTab(title: string, component: JSComponent): JSComponent;
            if (args[0] instanceof JSIcon && args[1] instanceof JSComponent) {
                var icon: JSIcon = args[0];
                var component: JSComponent = args[1];
                tab = this._addTab(icon, component, false);
            } else if (typeof args[0] === "string" && args[1] instanceof JSComponent) {
                var title: string = args[0];
                var component: JSComponent = args[1];
                tab = this._addTab(title, component, false);
            }
            break;
        case 3:
            // addTab(title: string, icon: JSIcon, component: JSComponent): JSComponent;
            if (typeof args[0] === "string" && args[1] instanceof JSIcon && args[2] instanceof JSComponent) {
                var title: string = args[0];
                var icon: JSIcon = args[1];
                var component: JSComponent = args[2];
                tab = this._addTab(title, icon, component, false);
            }
            break;
        default:
        }
        return tab;
    }
    addCloseableTab(icon: JSIcon, component: JSComponent): JSComponent;
    addCloseableTab(title: string, component: JSComponent): JSComponent;
    addCloseableTab(title: string, icon: JSIcon, component: JSComponent): JSComponent;
    // overload
    addCloseableTab(...args: any[]): JSComponent {
        var tab: JSComponent;
        switch (args.length) {
        case 0:
            break;
        case 1:
            break;
        case 2:
            // addCloseableTab(icon: JSIcon, component: JSComponent): JSComponent;
            // addCloseableTab(title: string, component: JSComponent): JSComponent;
            if (args[0] instanceof JSIcon && args[1] instanceof JSComponent) {
                var icon: JSIcon = args[0];
                var component: JSComponent = args[1];
                tab = this._addTab(icon, component, true);
            } else if (typeof args[0] === "string" && args[1] instanceof JSComponent) {
                var title: string = args[0];
                var component: JSComponent = args[1];
                tab = this._addTab(title, component, true);
            }
            break;
        case 3:
            // addCloseableTab(title: string, icon: JSIcon, component: JSComponent): JSComponent;
            if (typeof args[0] === "string" && args[1] instanceof JSIcon && args[2] instanceof JSComponent) {
                var title: string = args[0];
                var icon: JSIcon = args[1];
                var component: JSComponent = args[2];
                tab = this._addTab(title, icon, component, true);
            }
            break;
        default:
        }
        return tab;
    }
    _addTab(icon: JSIcon, component: JSComponent, closeable: boolean): JSComponent;
    _addTab(title: string, component: JSComponent, closeable: boolean): JSComponent;
    _addTab(title: string, icon: JSIcon, component: JSComponent, closeable: boolean): JSComponent;
    // overload
    _addTab(...args: any[]): JSComponent {
        var tabContainer: JSTabContainer = this.getTabContainer();
        var component: JSComponent;
        var tab: JSComponent;
        switch (args.length) {
        case 0:
            break;
        case 1:
            break;
        case 2:
            break;
        case 3:
            // _addTab(icon: JSIcon, component: JSComponent, closeable: boolean): JSComponent;
            // _addTab(title: string, component: JSComponent, closeable: boolean): JSComponent;
            if (args[0] instanceof JSIcon && args[1] instanceof JSComponent && typeof args[2] === "boolean") {
                var icon: JSIcon = args[0];
                component = args[1];
                var closeable: boolean = args[2];
                tab = tabContainer.addTab(icon, closeable);
            } else if (typeof args[0] === "string" && args[1] instanceof JSComponent && typeof args[2] === "boolean") {
                var title: string = args[0];
                component = args[1];
                var closeable: boolean = args[2];
                tab = tabContainer.addTab(title, closeable);
            }
            break;
        case 4:
            // _addTab(title: string, icon: JSIcon, component: JSComponent, closeable: boolean): JSComponent;
            if (typeof args[0] === "string" && args[1] instanceof JSIcon && args[2] instanceof JSComponent && typeof args[3] === "boolean") {
                var title: string = args[0];
                var icon: JSIcon = args[1];
                component = args[2];
                var closeable: boolean = args[3];
                tab = tabContainer.addTab(title, icon, closeable);
            }
            break;
        default:
        }
        var componentContainer: JSPanel = this.getComponentContainer();
        componentContainer.add(component);
        var tabbedPane: JSTabbedPane = this;
        tab.addMouseListener(new JSMouseListener({
            mouseClicked(mouseEvent: MouseEvent, component: JSComponent) {
                tabbedPane.setSelectedIndex(tabbedPane.indexOfTab(component));
            }
        }));
        if (closeable) {
            var closeButton: JSComponent = (<JSTab> tab).getCloseButton();
            closeButton.addMouseListener(new JSMouseListener({
                mouseClicked(mouseEvent: MouseEvent, component: JSComponent) {
                    tabbedPane.fireTabClosing(new JSTabEvent(tab));
                }
            }));
        }
        this.fireTabOpened(new JSTabEvent(tab));
        return tab;
    }
    removeTabAt(index: number): void {
        var tabContainer: JSTabContainer = this.getTabContainer();
        var tabComponent = tabContainer.getTabComponentAt(index);
        tabContainer.remove(tabComponent);
        var componentContainer: JSPanel = this.getComponentContainer();
        componentContainer.remove(index);
        this.fireTabClosed(new JSTabEvent(tabComponent));
    }
    setTabComponentAt(index: number, tabComponent: JSComponent) {
        var tabContainer: JSTabContainer = this.getTabContainer();
        tabContainer.setTabComponentAt(index, tabComponent);
        this.fireTabOpened(new JSTabEvent(tabComponent));
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
    addButton(...args: any[]): void {
        var tabContainer: JSTabContainer = this.getTabContainer();
        switch (args.length) {
        case 1:
            // addButton(button: JSComponent): void;
            if (args[0] instanceof JSComponent) {
                var button: JSComponent = args[0];
                tabContainer.addButton(button);
            }
            break;
        case 2:
            // addButton(button: JSComponent, constraints: { [ key: string]: number | string }): void;
            if (args[0] instanceof JSComponent && args[1] instanceof Object) {
                var button: JSComponent = args[0];
                var constraints: { [ key: string]: number | string } = args[1];
                tabContainer.addButton(button, constraints);
            }
            break;
        default:
        }
    }
    getSelectedIndex(): number {
        var tabContainer: JSTabContainer = this.getTabContainer();
        return tabContainer.getSelectedIndex();
    }
    setSelectedIndex(selectedIndex: number) {
        var tabContainer: JSTabContainer = this.getTabContainer();
        var tabSelection: JSSelection = tabContainer.getTabSelection();
        this.fireTabDeactivated(new JSTabEvent(tabSelection.getSelected()));
        tabContainer.setSelectedIndex(selectedIndex);
        this.fireTabActivated(new JSTabEvent(tabSelection.getSelected()));
    }
    /*
    addTabListener(tabListener: TabListener): void {
        var tabContainer: JSTabContainer = this.getTabContainer();
        tabContainer.addTabListener(tabListener);
    }
    removeTabListener(tabListener: TabListener): void {
        var tabContainer: JSTabContainer = this.getTabContainer();
        tabContainer.removeTabListener(tabListener);
    }
    */
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
                tabListener.tabOpened(tabEvent, this);
            }
        }
    }
    fireTabClosing(tabEvent: JSTabEvent): void {
        var tabListeners: TabListener[] = this.getTabListeners();
        for (var i: number = 0; i < tabListeners.length; i++) {
            var tabListener = tabListeners[i];
            if (tabListener.tabClosing) {
                tabListener.tabClosing(tabEvent, this);
            }
        }
    }
    fireTabClosed(tabEvent: JSTabEvent): void {
        var tabListeners: TabListener[] = this.getTabListeners();
        for (var i: number = 0; i < tabListeners.length; i++) {
            var tabListener = tabListeners[i];
            if (tabListener.tabClosed) {
                tabListener.tabClosed(tabEvent, this);
            }
        }
    }
    fireTabActivated(tabEvent: JSTabEvent): void {
        var tabListeners: TabListener[] = this.getTabListeners();
        for (var i: number = 0; i < tabListeners.length; i++) {
            var tabListener = tabListeners[i];
            if (tabListener.tabActivated) {
                tabListener.tabActivated(tabEvent, this);
            }
        }
    }
    fireTabDeactivated(tabEvent: JSTabEvent): void {
        var tabListeners: TabListener[] = this.getTabListeners();
        for (var i: number = 0; i < tabListeners.length; i++) {
            var tabListener = tabListeners[i];
            if (tabListener.tabDeactivated) {
                tabListener.tabDeactivated(tabEvent, this);
            }
        }
    }
}
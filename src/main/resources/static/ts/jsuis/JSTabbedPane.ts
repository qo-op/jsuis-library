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
        this.setClass("JSTabbedPane");
        this.setLayout(new JSBorderLayout());
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
        this.addTabListener(new JSTabListener({
            tabOpened(tabEvent: JSTabEvent, component: JSComponent) {
                var tabbedPane: JSTabbedPane = <JSTabbedPane> component;
                var tab: JSComponent = tabEvent.getSource();
                var index: number = tabbedPane.indexOfTab(tab);
                tabbedPane.setSelectedIndex(index);
            },
            tabActivated(tabEvent: JSTabEvent, component: JSComponent) {
                var tabbedPane: JSTabbedPane = <JSTabbedPane> component;
                var cardContainer: JSPanel = tabbedPane.getCardContainer();
                (<JSCardLayout> cardContainer.getLayout()).show(cardContainer, tabbedPane.getSelectedIndex());
            },
            tabClosed(tabEvent: JSTabEvent, component: JSComponent) {
                var tabbedPane: JSTabbedPane = <JSTabbedPane> component;
                var selectedIndex: number = tabbedPane.getSelectedIndex();
                if (selectedIndex === -1) {
                    tabbedPane.setSelectedIndex(0);
                }
            }
        }));
    }
    getTabPlacement(): string {
        return this.getAttribute("data-tab-placement");
    }
    setTabPlacement(tabPlacement: string) {
        this.setAttribute("data-tab-placement", tabPlacement);
    }
    addTab(title: string, component: JSComponent): JSComponent;
    addTab(title: string, icon: JSIcon, component: JSComponent): JSComponent;
    // overload
    addTab(...args: any[]): JSComponent {
        var tab: JSComponent;
        var tabContainer: JSTabContainer = this.getTabContainer();
        switch (args.length) {
        case 2:
            // addTab(icon: JSIcon, component: JSComponent): JSComponent;
            // addTab(title: string, component: JSComponent): JSComponent;
            if (typeof args[0] === "string" && args[1] instanceof JSComponent) {
                var title: string = args[0];
                var component: JSComponent = args[1];
                // tab = this._addTab(title, component, false);
                tab = tabContainer.addTab(title, false);
            }
            break;
        case 3:
            // addTab(title: string, icon: JSIcon, component: JSComponent): JSComponent;
            if (typeof args[0] === "string" && args[1] instanceof JSIcon && args[2] instanceof JSComponent) {
                var title: string = args[0];
                var icon: JSIcon = args[1];
                var component: JSComponent = args[2];
                // tab = this._addTab(title, icon, component, false);
                tab = tabContainer.addTab(title, icon, false);
            }
            break;
        default:
        }
        var cardContainer: JSPanel = this.getCardContainer();
        cardContainer.add(component);
        var tabbedPane: JSTabbedPane = this;
        tab.addMouseListener(new JSMouseListener({
            mouseClicked(mouseEvent: MouseEvent, component: JSComponent) {
                tabbedPane.setSelectedIndex(tabbedPane.indexOfTab(component));
            }
        }));
        this.fireTabOpened(new JSTabEvent(tab));
        return tab;
    }
    addCloseableTab(title: string, component: JSComponent): JSComponent;
    addCloseableTab(title: string, icon: JSIcon, component: JSComponent): JSComponent;
    // overload
    addCloseableTab(...args: any[]): JSComponent {
        var tab: JSComponent;
        var tabContainer: JSTabContainer = this.getTabContainer();
        switch (args.length) {
        case 2:
            // addCloseableTab(icon: JSIcon, component: JSComponent): JSComponent;
            // addCloseableTab(title: string, component: JSComponent): JSComponent;
            if (typeof args[0] === "string" && args[1] instanceof JSComponent) {
                var title: string = args[0];
                var component: JSComponent = args[1];
                tab = tabContainer.addCloseabeTab(title, true);
            }
            break;
        case 3:
            // addCloseableTab(title: string, icon: JSIcon, component: JSComponent): JSComponent;
            if (typeof args[0] === "string" && args[1] instanceof JSIcon && args[2] instanceof JSComponent) {
                var title: string = args[0];
                var icon: JSIcon = args[1];
                var component: JSComponent = args[2];
                tab = tabContainer.addCloseabeTab(title, icon, true);
            }
            break;
        default:
        }
        var cardContainer: JSPanel = this.getCardContainer();
        cardContainer.add(component);
        var tabbedPane: JSTabbedPane = this;
        tab.addMouseListener(new JSMouseListener({
            mouseClicked(mouseEvent: MouseEvent, component: JSComponent) {
                tabbedPane.setSelectedIndex(tabbedPane.indexOfTab(component));
            }
        }));
        this.fireTabOpened(new JSTabEvent(tab));
        var closeButton: JSComponent = (<JSTab> tab).getButton();
        closeButton.addActionListener({
            actionPerformed(mouseEvent: MouseEvent, component: JSComponent) {
                tabbedPane.fireTabClosing(new JSTabEvent(tab));
                mouseEvent.stopPropagation();
            }
        });
        return tab;
    }
    getTabContainer(): JSTabContainer {
        var tabContainer = this.getData("tabContainer");
        if (!tabContainer) {
            var tabPlacement: string = this.getTabPlacement();
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
            this.setData("tabContainer", tabContainer);
        }
        return tabContainer;
    }
    getCardContainer(): JSPanel {
        var cardContainer = this.getData("cardContainer");
        if (!cardContainer) {
            cardContainer = new JSPanel(new JSCardLayout());
            this.add(cardContainer);
            this.setData("cardContainer", cardContainer);
        }
        return cardContainer;
    }
    removeTabAt(index: number): void {
        var tabContainer: JSTabContainer = this.getTabContainer();
        var tabComponent = tabContainer.getTabComponentAt(index);
        tabContainer.remove(tabComponent);
        var cardContainer: JSPanel = this.getCardContainer();
        cardContainer.remove(index);
        this.fireTabClosed(new JSTabEvent(tabComponent));
    }
    setTabComponentAt(index: number, tabComponent: JSComponent) {
        var tabContainer: JSTabContainer = this.getTabContainer();
        tabContainer.setTabComponentAt(index, tabComponent);
        this.fireTabOpened(new JSTabEvent(tabComponent));
    }
    indexOfComponent(component: JSComponent): number {
        var cardContainer: JSPanel = this.getCardContainer();
        var components: JSComponent[] = cardContainer.getComponents();
        return components.indexOf(component);
    }
    getComponentAt(index: number): JSComponent {
        var cardContainer: JSPanel = this.getCardContainer();
        var components: JSComponent[] = cardContainer.getComponents();
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
    getTabCount(): number {
        var tabContainer: JSTabContainer = this.getTabContainer();
        return tabContainer.getTabCount();
    }
    getTabComponentAt(index: number): JSComponent {
        var tabContainer: JSTabContainer = this.getTabContainer();
        return tabContainer.getTabComponentAt(index);
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
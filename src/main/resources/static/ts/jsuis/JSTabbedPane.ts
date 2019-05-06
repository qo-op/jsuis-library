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
    addTab(title: string, component: JSComponent): JSTab;
    addTab(title: string, icon: JSIcon, component: JSComponent): JSTab;
    // overload
    addTab(...args: any[]): JSTab {
        var tab: JSTab;
        var tabContainer: JSTabContainer = this.getTabContainer();
        switch (args.length) {
        case 2:
            // addTab(title: string, component: JSComponent): JSComponent;
            if (typeof args[0] === "string" && args[1] instanceof JSComponent) {
                var title: string = args[0];
                var component: JSComponent = args[1];
                tab = tabContainer.addTab(title);
            }
            break;
        case 3:
            // addTab(title: string, icon: JSIcon, component: JSComponent): JSComponent;
            if (typeof args[0] === "string" && args[1] instanceof JSIcon && args[2] instanceof JSComponent) {
                var title: string = args[0];
                var icon: JSIcon = args[1];
                var component: JSComponent = args[2];
                tab = tabContainer.addTab(title, icon);
            }
            break;
        default:
        }
        var cardContainer: JSPanel = this.getCardContainer();
        cardContainer.add(component);
        this.setSelectedIndex(this.indexOfTab(tab));
        tab.addActionListener({
            actionPerformed(mouseEvent: MouseEvent, tab: JSTab, tabbedPane: JSTabbedPane) {
                tabbedPane.setSelectedIndex(tabbedPane.indexOfTab(tab));
                mouseEvent.stopPropagation();
            }
        }).withArgs(tab, this);
        return tab;
    }
    addCloseableTab(title: string, component: JSComponent): JSTab;
    addCloseableTab(title: string, icon: JSIcon, component: JSComponent): JSTab;
    // overload
    addCloseableTab(...args: any[]): JSTab {
        var tab: JSTab;
        var tabContainer: JSTabContainer = this.getTabContainer();
        switch (args.length) {
        case 2:
            // addCloseableTab(title: string, component: JSComponent): JSComponent;
            if (typeof args[0] === "string" && args[1] instanceof JSComponent) {
                var title: string = args[0];
                var component: JSComponent = args[1];
                tab = tabContainer.addCloseabeTab(title);
            }
            break;
        case 3:
            // addCloseableTab(title: string, icon: JSIcon, component: JSComponent): JSComponent;
            if (typeof args[0] === "string" && args[1] instanceof JSIcon && args[2] instanceof JSComponent) {
                var title: string = args[0];
                var icon: JSIcon = args[1];
                var component: JSComponent = args[2];
                tab = tabContainer.addCloseabeTab(title, icon);
            }
            break;
        default:
        }
        var cardContainer: JSPanel = this.getCardContainer();
        cardContainer.add(component);
        this.setSelectedIndex(this.indexOfTab(tab));
        tab.addActionListener({
            actionPerformed(mouseEvent: MouseEvent, tab: JSTab, tabbedPane: JSTabbedPane) {
                tabbedPane.setSelectedIndex(tabbedPane.indexOfTab(tab));
                mouseEvent.stopPropagation();
            }
        }).withArgs(tab, this);
        var closeButton: JSComponent = tab.getCloseButton();
        closeButton.addActionListener({
            actionPerformed(mouseEvent: MouseEvent, tab: JSTab, tabbedPane: JSTabbedPane) {
                tabbedPane.removeTabAt(tabbedPane.indexOfTab(tab));
                var tabContainer = tabbedPane.getTabContainer();
                tabContainer.getParent().validate();
                var selectedIndex: number = tabbedPane.getSelectedIndex();
                if (selectedIndex === -1) {
                    tabbedPane.setSelectedIndex(0);
                }
            }
        }).withArgs(tab, this);
        return tab;
    }
    addButton(button: JSComponent): void {
        var tabContainer: JSTabContainer = this.getTabContainer();
        tabContainer.addButton(button);
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
            cardContainer = new JSPanel();
            cardContainer.setLayout(new JSCardLayout());
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
    }
    setTabComponentAt(index: number, tabComponent: JSComponent) {
        var tabContainer: JSTabContainer = this.getTabContainer();
        tabContainer.setTabComponentAt(index, tabComponent);
        this.setSelectedIndex(index);
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
    getSelectedIndex(): number {
        var tabContainer: JSTabContainer = this.getTabContainer();
        return tabContainer.getSelectedIndex();
    }
    setSelectedIndex(selectedIndex: number) {
        var tabContainer: JSTabContainer = this.getTabContainer();
        var tabSelection: JSSelection = tabContainer.getTabSelection();
        tabContainer.setSelectedIndex(selectedIndex);
        var cardContainer: JSPanel = this.getCardContainer();
        (<JSCardLayout> cardContainer.getLayout()).show(cardContainer, this.getSelectedIndex());
    }
    getTabCount(): number {
        var tabContainer: JSTabContainer = this.getTabContainer();
        return tabContainer.getTabCount();
    }
    getTabComponentAt(index: number): JSComponent {
        var tabContainer: JSTabContainer = this.getTabContainer();
        return tabContainer.getTabComponentAt(index);
    }
}
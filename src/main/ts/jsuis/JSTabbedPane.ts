/// <reference path = "../jsuis.ts"/>
/**
 * JSTabbedPane
 * 
 * @author Yassuo Toda
 */
class JSTabbedPane extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    constructor(tabPlacement: string);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSTabbedPane");
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
        this.setLayout(new JSBorderLayout());
        
        var tabContainer: JSTabbedPaneTabContainer = this.getTabContainer();
        var tabPlacement: string = this.getTabPlacement();
        switch (tabPlacement) {
        case JSTabbedPane.LEFT:
            this.add(tabContainer, JSBorderLayout.WEST);
            break;
        case JSTabbedPane.RIGHT:
            this.add(tabContainer, JSBorderLayout.EAST);
            break;
        case JSTabbedPane.BOTTOM:
            this.add(tabContainer, JSBorderLayout.SOUTH);
            break;
        case JSTabbedPane.TOP:
        default:
            this.add(tabContainer, JSBorderLayout.NORTH);
        }
        var cardContainer: JSTabbedPaneCardContainer = this.getCardContainer();
        this.add(cardContainer);
        var buttonContainer: JSTabbedPaneButtonContainer = this.getButtonContainer();
        tabContainer.add(buttonContainer);
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
    addTab(): JSTab {
        var tab: JSTab;
        var tabContainer: JSTabbedPaneTabContainer = this.getTabContainer();
        switch (arguments.length) {
        case 2:
            // addTab(title: string, component: JSComponent): JSComponent;
            if (typeof arguments[0] === "string" && arguments[1] instanceof JSComponent) {
                var title: string = arguments[0];
                var component: JSComponent = arguments[1];
                tab = tabContainer.addTab(title);
            }
            break;
        case 3:
            // addTab(title: string, icon: JSIcon, component: JSComponent): JSComponent;
            if (typeof arguments[0] === "string" && arguments[1] instanceof JSIcon && arguments[2] instanceof JSComponent) {
                var title: string = arguments[0];
                var icon: JSIcon = arguments[1];
                var component: JSComponent = arguments[2];
                tab = tabContainer.addTab(title, icon);
            }
            break;
        default:
        }
        var cardContainer: JSTabbedPaneCardContainer = this.getCardContainer();
        cardContainer.add(component);
        this.setSelectedIndex(this.indexOfTab(tab));
        tab.addActionListener({
            actionPerformed(mouseEvent: MouseEvent, tab: JSTab, tabbedPane: JSTabbedPane) {
                tabbedPane.setSelectedIndex(tabbedPane.indexOfTab(tab));
                mouseEvent.stopPropagation();
            }
        }).withParameters(tab, this);
        var tabContainerParent: JSComponent = tabContainer.getParent();
        if (this.isValid()) {
            tabContainerParent.revalidate(tabContainerParent);
        }
        return tab;
    }
    addCloseableTab(title: string, component: JSComponent): JSTab;
    addCloseableTab(title: string, icon: JSIcon, component: JSComponent): JSTab;
    // overload
    addCloseableTab(): JSTab {
        var tab: JSTab;
        var tabContainer: JSTabbedPaneTabContainer = this.getTabContainer();
        switch (arguments.length) {
        case 2:
            // addCloseableTab(title: string, component: JSComponent): JSComponent;
            if (typeof arguments[0] === "string" && arguments[1] instanceof JSComponent) {
                var title: string = arguments[0];
                var component: JSComponent = arguments[1];
                tab = tabContainer.addCloseabeTab(title);
            }
            break;
        case 3:
            // addCloseableTab(title: string, icon: JSIcon, component: JSComponent): JSComponent;
            if (typeof arguments[0] === "string" && arguments[1] instanceof JSIcon && arguments[2] instanceof JSComponent) {
                var title: string = arguments[0];
                var icon: JSIcon = arguments[1];
                var component: JSComponent = arguments[2];
                tab = tabContainer.addCloseabeTab(title, icon);
            }
            break;
        default:
        }
        var cardContainer: JSTabbedPaneCardContainer = this.getCardContainer();
        cardContainer.add(component);
        this.setSelectedIndex(this.indexOfTab(tab));
        tab.addActionListener({
            actionPerformed(mouseEvent: MouseEvent, tab: JSTab, tabbedPane: JSTabbedPane) {
                tabbedPane.setSelectedIndex(tabbedPane.indexOfTab(tab));
                mouseEvent.stopPropagation();
            }
        }).withParameters(tab, this);
        var closeButton: JSComponent = tab.getCloseButton();
        closeButton.addActionListener({
            actionPerformed(mouseEvent: MouseEvent, tab: JSTab, tabbedPane: JSTabbedPane) {
                tabbedPane.removeTabAt(tabbedPane.indexOfTab(tab));
                var tabContainer = tabbedPane.getTabContainer();
                tabContainer.getParent().revalidate();
                var selectedIndex: number = tabbedPane.getSelectedIndex();
                if (selectedIndex === -1) {
                    tabbedPane.setSelectedIndex(0);
                }
            }
        }).withParameters(tab, this);
        var tabContainerParent: JSComponent = tabContainer.getParent();
        if (this.isValid()) {
            tabContainerParent.revalidate(tabContainerParent);
        }
        return tab;
    }
    getTabContainer(): JSTabbedPaneTabContainer {
        var tabContainer: JSTabbedPaneTabContainer = this.getData("tabContainer");
        if (!tabContainer) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSTabbedPaneTabContainer");
            if (element) {
                tabContainer = new JSTabbedPaneTabContainer(element);
            } else {
                var tabPlacement: string = this.getTabPlacement();
                tabContainer = new JSTabbedPaneTabContainer(tabPlacement);
            }
            this.setData("tabContainer", tabContainer);
        }
        return tabContainer;
    }
    getCardContainer(): JSTabbedPaneCardContainer {
        var cardContainer: JSTabbedPaneCardContainer = this.getData("cardContainer");
        if (!cardContainer) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSTabbedPaneCardContainer");
            if (element) {
                cardContainer = new JSTabbedPaneCardContainer(element);
            } else {
                cardContainer = new JSTabbedPaneCardContainer();
            }
            this.setData("cardContainer", cardContainer);
        }
        return cardContainer;
    }
    getButtonContainer(): JSTabbedPaneButtonContainer {
        var buttonContainer: JSTabbedPaneButtonContainer = this.getData("buttonContainer");
        if (!buttonContainer) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSTabbedPaneButtonContainer");
            if (element) {
                buttonContainer = new JSTabbedPaneButtonContainer(element);
            } else {
                var tabPlacement: string = this.getTabPlacement();
                buttonContainer = new JSTabbedPaneButtonContainer(tabPlacement);
            }
            this.setData("buttonContainer", buttonContainer);
        }
        return buttonContainer;
    }
    removeTabAt(index: number): void {
        var tabContainer: JSTabbedPaneTabContainer = this.getTabContainer();
        var tabComponent = tabContainer.getTabComponentAt(index);
        tabContainer.remove(tabComponent);
        var cardContainer: JSTabbedPaneCardContainer = this.getCardContainer();
        cardContainer.remove(index);
    }
    setTabComponentAt(index: number, tabComponent: JSComponent) {
        var tabContainer: JSTabbedPaneTabContainer = this.getTabContainer();
        tabContainer.setTabComponentAt(index, tabComponent);
        this.setSelectedIndex(index);
    }
    indexOfComponent(component: JSComponent): number {
        var cardContainer: JSTabbedPaneCardContainer = this.getCardContainer();
        var components: JSComponent[] = cardContainer.getComponents();
        return components.indexOf(component);
    }
    getComponentAt(index: number): JSComponent {
        var cardContainer: JSTabbedPaneCardContainer = this.getCardContainer();
        var components: JSComponent[] = cardContainer.getComponents();
        return components[index];
    }
    indexOfTab(tabComponent: JSComponent): number {
        var tabContainer: JSTabbedPaneTabContainer = this.getTabContainer();
        return tabContainer.indexOfTab(tabComponent);
    }
    getSelectedIndex(): number {
        var tabContainer: JSTabbedPaneTabContainer = this.getTabContainer();
        return tabContainer.getSelectedIndex();
    }
    setSelectedIndex(selectedIndex: number) {
        var tabContainer: JSTabbedPaneTabContainer = this.getTabContainer();
        var tabSelection: JSSelection = tabContainer.getTabSelection();
        tabContainer.setSelectedIndex(selectedIndex);
        var cardContainer: JSTabbedPaneCardContainer = this.getCardContainer();
        (<JSCardLayout> cardContainer.getLayout()).show(cardContainer, this.getSelectedIndex());
    }
    getTabCount(): number {
        var tabContainer: JSTabbedPaneTabContainer = this.getTabContainer();
        return tabContainer.getTabCount();
    }
    getTabComponentAt(index: number): JSComponent {
        var tabContainer: JSTabbedPaneTabContainer = this.getTabContainer();
        return tabContainer.getTabComponentAt(index);
    }
    /*
    revalidate(): void {
        var tabContainer: JSTabbedPaneTabContainer = this.getTabContainer();
        var tabContainerParent: JSComponent = tabContainer.getParent();
        if (this.isValid()) {
            tabContainerParent.revalidate(tabContainerParent);
        }
        var cardContainer: JSPanel = this.getCardContainer();
        cardContainer.revalidate(cardContainer);
    }
    */
}
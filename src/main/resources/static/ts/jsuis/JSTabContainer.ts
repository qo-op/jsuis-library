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
        this.setClass("JSTabContainer");
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
            tabPlacement = JSTabContainer.TOP;
            this.setTabPlacement(tabPlacement);
        }
        switch (tabPlacement) {
        case JSTabContainer.RIGHT:
            this.setStyle("padding", "1px 0");
            break;
        case JSTabContainer.LEFT:
            this.setStyle("padding", "1px 0");
            break;
        case JSTabContainer.BOTTOM:
            this.setStyle("padding", "0 1px");
            break;
        case JSTabContainer.TOP:
        default:
            this.setStyle("padding", "0 1px");
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
    addTab(title: string, closeable: boolean): JSComponent;
    addTab(title: string, icon: JSIcon, closeable: boolean): JSComponent;
    // overload
    addTab(...args: any[]): JSComponent {
        var tabPlacement: string = this.getTabPlacement();
        var tabComponent: JSComponent;
        switch (args.length) {
        case 2:
            // addTab(icon: JSIcon, closeable: boolean): JSComponent;
            // addTab(title: string, closeable: boolean): JSComponent;
            if (typeof args[0] === "string" && typeof args[1] === "boolean") {
                var title: string = args[0];
                var closeable: boolean = args[1];
                tabComponent = new JSTab(tabPlacement, false, title);
            }
            break;
        case 3:
            // addTab(title: string, icon: JSIcon, closeable: boolean): JSComponent;
            if (typeof args[0] === "string" && args[1] instanceof JSIcon && typeof args[2] === "boolean") {
                var title: string = args[0];
                var icon: JSIcon = args[1];
                var closeable: boolean = args[2];
                tabComponent = new JSTab(tabPlacement, false, title, icon);
            }
            break;
        default:
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
        return tabComponent;
    }
    addCloseabeTab(title: string, closeable: boolean): JSComponent;
    addCloseabeTab(title: string, icon: JSIcon, closeable: boolean): JSComponent;
    // overload
    addCloseabeTab(...args: any[]): JSComponent {
        var tabPlacement: string = this.getTabPlacement();
        var tabComponent: JSComponent;
        switch (args.length) {
        case 2:
            // addTab(icon: JSIcon, closeable: boolean): JSComponent;
            // addTab(title: string, closeable: boolean): JSComponent;
            if (typeof args[0] === "string" && typeof args[1] === "boolean") {
                var title: string = args[0];
                var closeable: boolean = args[1];
                tabComponent = new JSTab(tabPlacement, true, title);
            }
            break;
        case 3:
            // addTab(title: string, icon: JSIcon, closeable: boolean): JSComponent;
            if (typeof args[0] === "string" && args[1] instanceof JSIcon && typeof args[2] === "boolean") {
                var title: string = args[0];
                var icon: JSIcon = args[1];
                var closeable: boolean = args[2];
                tabComponent = new JSTab(tabPlacement, true, title, icon);
            }
            break;
        default:
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
        return tabComponent;
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
        var tabComponents: JSComponent[] = this.getTabComponents();
        var index = tabComponents.indexOf(component);
        tabComponents.splice(index, 1);
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
    /*
    getPreferredWidth(): number {
        var _preferredWidth: string = this.getAttribute("data-preferred-width");
        if (_preferredWidth) {
            return +_preferredWidth;
        }
        var preferredWidth: number = 0;
        var tabComponents: JSComponent[] = this.getData("tabComponents");
        for (var i: number = 0; i < tabComponents.length; i++) {
            var tabComponent: JSComponent = tabComponents[i];
            preferredWidth = Math.max(preferredWidth, tabComponent.getPreferredWidth());
        }
        return preferredWidth;
    }
    */
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
        return tabComponent;
    }
    addButton(button: JSComponent): void;
    addButton(button: JSComponent, constraints: { [ key: string]: number | string }): void
    // overload
    addButton(...args: any[]): void {
        switch (args.length) {
        case 1:
            // addButton(button: JSComponent): void;
            if (args[0] instanceof JSComponent) {
                var button: JSComponent = args[0];
                var tabPlacement: string = this.getTabPlacement();
                switch (tabPlacement) {
                case JSTabContainer.RIGHT:
                    constraints = { anchor: JSFlowLayout.EAST };
                    this.add(button, constraints);
                    break;
                case JSTabContainer.LEFT:
                    constraints = { anchor: JSFlowLayout.WEST };
                    this.add(button, constraints);
                    break;
                case JSTabContainer.BOTTOM:
                    button.setStyle("float", "right");
                    this.add(button);
                    break;
                case JSTabContainer.TOP:
                default:
                    button.setStyle("float", "right");
                    this.add(button);
                }
            }
            break;
        case 2:
            // addButton(button: JSComponent, constraints: { [ key: string]: number | string }): void
            if (args[0] instanceof JSComponent && args[1] instanceof Object) {
                var button: JSComponent = args[0];
                var constraints: { [ key: string]: number | string } = args[1];
                this.add(button, constraints);
            }
            break;
        default:
        }
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
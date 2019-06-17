/// <reference path = "../jsuis.ts"/>
/**
 * JSTab
 * 
 * @author Yassuo Toda
 */
class JSTab extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    constructor(tabPlacement: string, closeable: boolean, text: string);
    constructor(tabPlacement: string, closeable: boolean, text: string, icon: JSIcon);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setUI("JSTab");
        
        var index: number = 0;
        
        var graphics: JSTabGraphics = this.getGraphics();
        this.add(graphics, null, index++);
        
        var label: JSLabel = this.getLabel();
        this.add(label, null, index++);
        
        var tabCloseButton: JSButton = this.getCloseButton();
        this.add(tabCloseButton, null, index++);
        
        switch (args.length) {
        case 3:
            // constructor(tabPlacement: string, closeable: boolean, text: string);
            if (typeof args[0] === "string" && typeof args[1] === "boolean" && typeof args[2] === "string") {
                var tabPlacement: string = args[0];
                var closeable: boolean = args[1];
                var text: string = args[2];
                this.setTabPlacement(tabPlacement);
                this.setCloseable(closeable);
                this.setText(text);
            }
            break;
        case 4:
            // constructor(tabPlacement: string, closeable: boolean, text: string, icon: JSIcon);
            if (typeof args[0] === "string" && typeof args[1] === "boolean" && typeof args[2] === "string" && args[3] instanceof JSIcon) {
                var tabPlacement: string = args[0];
                var closeable: boolean = args[1];
                var text: string = args[2];
                var icon: JSIcon = args[3];
                this.setTabPlacement(tabPlacement);
                this.setCloseable(closeable);
                this.setText(text);
                this.setIcon(icon);
            }
            break;
        default:
        }
        /*
        this.addDragSourceListener(new JSDragListener({
            dragStart(mouseEvent: MouseEvent, tab: JSTab) {
                var tabContainer: JSTabContainer = <JSTabContainer> tab.getParent();
                tabContainer.setSelectedIndex(tabContainer.indexOfTab(tab));
                JSDataTransfer.setData("dragSource", tab);
            }
        }));
        this.addDropTargetListener(new JSDropListener({
            dragOver(mouseEvent: MouseEvent, tab: JSTab): boolean {
                tab.setStyle("z-index", "1");
                var boundingClientRect = tab.getBoundingClientRect();
                if (mouseEvent.x >= (boundingClientRect.left + boundingClientRect.width / 2)) {
                    tab.setStyle("box-shadow", "2px 0 #404040, -1px 0 #404040 inset");
                } else {
                    tab.setStyle("box-shadow", "-2px 0 #404040, 1px 0 #404040 inset");
                }
                return true;
            },
            dragLeave(mouseEvent: MouseEvent, tab: JSTab): void {
                tab.setStyle("z-index", "0");
                tab.setStyle("box-shadow", "none");
            },
            drop(mouseEvent: MouseEvent, component: JSComponent): boolean {
                console.log("drop");
                var tab: JSTab = <JSTab> component;
                tab.setStyle("z-index", "0");
                tab.setStyle("box-shadow", "none");
                return true;
            }
        }));
        */
    }
    getGraphics(): JSTabGraphics {
        var graphics: JSTabGraphics = this.getData("graphics");
        if (!graphics) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSTabGraphics");
            if (element) {
                graphics = new JSTabGraphics(element);
            } else {
                graphics = new JSTabGraphics();
            }
            this.setData("graphics", graphics);
        }
        return graphics;
    }
    getLabel(): JSTabLabel {
        var label: JSTabLabel = this.getData("label");
        if (!label) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSTabLabel");
            if (element) {
                label = new JSTabLabel(element);
            } else {
                label = new JSTabLabel();
            }
            this.setData("label", label);
        }
        return label;
    }
    getCloseButton(): JSTabCloseButton {
        var tabCloseButton: JSTabCloseButton = this.getData("tabCloseButton");
        if (!tabCloseButton) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSTabCloseButton");
            if (element) {
                tabCloseButton = new JSTabCloseButton(element);
            } else {
                tabCloseButton = new JSTabCloseButton();
            }
            tabCloseButton.setStyle("display", "none");
            this.setData("tabCloseButton", tabCloseButton);
        }
        return tabCloseButton;
    }
    getTabPlacement(): string {
        return this.getAttribute("data-tab-placement");
    }
    setTabPlacement(tabPlacement: string) {
        this.setAttribute("data-tab-placement", tabPlacement);
        switch (tabPlacement) {
        case JSTabbedPane.RIGHT:
            this.setBorder(new JSMatteBorder(0, 0, 1, 1, "DarkGray"));
            break;
        case JSTabbedPane.LEFT:
            this.setBorder(new JSMatteBorder(0, 1, 1, 0, "DarkGray"));
            break;
        case JSTabbedPane.BOTTOM:
            this.setBorder(new JSMatteBorder(0, 0, 1, 1, "DarkGray"));
            break;
        case JSTabbedPane.TOP:
        default:
            this.setBorder(new JSMatteBorder(1, 0, 0, 1, "DarkGray"));
        }
        var graphics: JSGraphics = this.getGraphics();
        var label: JSLabel = this.getLabel();
        var tabCloseButton: JSButton = this.getCloseButton();
        if (tabPlacement === JSTabbedPane.LEFT || tabPlacement === JSTabbedPane.RIGHT) {
            graphics.setStyle("display", "block");
            graphics.setStyle("margin", "4px auto 0");
            label.setStyle("display", "block");
            label.setStyle("margin", "4px 0");
            label.setStyle("text-align", "center");
            tabCloseButton.setStyle("margin", "0 auto 4px");
        } else {
            graphics.setStyle("margin-left", "4px");
            graphics.setStyle("vertical-align", "middle");
            label.setStyle("margin", "0 4px");
            label.setStyle("vertical-align", "middle");
            tabCloseButton.setStyle("margin-right", "4px");
            tabCloseButton.setStyle("vertical-align", "middle");
        }
    }
    isCloseable() {
        var tabCloseButton: JSButton = this.getCloseButton();
        return tabCloseButton.isDisplayable();
    }
    setCloseable(closeable: boolean) {
        var tabCloseButton: JSButton = this.getCloseButton();
        tabCloseButton.setStyle("display", closeable ? "" : "none");
    }
    getText(): string {
        return this.getData("text");
    }
    setText(text: string) {
        var label: JSLabel = this.getLabel();
        if (text) {
            var tabPlacement = this.getTabPlacement();
            if (tabPlacement === JSTabbedPane.LEFT || tabPlacement === JSTabbedPane.RIGHT) {
                label.setText("<html>" + text.split("").join("<br>") + "</html>");
            } else {
                label.setText(text);
            }
        } else {
            label.setText("");
        }
        this.setData("text", text);
    }
    setSelected(selected: boolean) {
        if (selected) {
            this.addClass("selected");
        } else {
            this.removeClass("selected");
        }
        super.setSelected(selected);
    }
}
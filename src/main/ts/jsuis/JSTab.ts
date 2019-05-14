/// <reference path = "../jsuis.ts"/>
/**
 * JSTab
 * 
 * @author Yassuo Toda
 */
class JSTab extends JSPanel {
    
    static CLOSE_ICON: JSPathIcon = new JSPathIcon("M0,0L8,8M8,0L0,8", 8, 8).withStroke("red");
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(tabPlacement: string, closeable: boolean, text: string);
    constructor(tabPlacement: string, closeable: boolean, text: string, icon: JSIcon);
    // overload
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLDivElement);
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        var graphics: JSGraphics = this.getGraphics();
        this.add(graphics);
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
    init(): void {
        this.addClass("JSTab");
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
        if (tabPlacement === JSTabbedPane.LEFT || tabPlacement === JSTabbedPane.RIGHT) {
            graphics.setStyle("display", "block");
            graphics.setStyle("margin", "4px auto 0");
        } else {
            graphics.setStyle("margin-left", "4px");
            graphics.setStyle("vertical-align", "middle");
        }
    }
    isCloseable() {
        var button: JSButton = this.getCloseButton();
        return !!button;
    }
    setCloseable(closeable: boolean) {
        if (closeable) {
            var button: JSButton = this.getCloseButton();
            if (!button) {
                button = new JSButton(JSTab.CLOSE_ICON);
                var tabPlacement = this.getTabPlacement();
                if (tabPlacement === JSTabbedPane.LEFT || tabPlacement === JSTabbedPane.RIGHT) {
                    button.setStyle("margin", "0 auto 4px");
                } else {
                    button.setStyle("margin-right", "4px");
                    button.setStyle("vertical-align", "middle");
                }
                this.setCloseButton(button);
            }
        } else {
            this.setCloseButton(null);
        }
    }
    getCloseButton(): JSButton {
        return this.getData("closeButton");
    }
    setCloseButton(closeButton: JSButton) {
        var oldCloseButton: JSComponent = this.getData("closeButton");
        if (oldCloseButton) {
            this.remove(oldCloseButton);
        }
        if (closeButton) {
            this.add(closeButton);
        }
        this.setData("closeButton", closeButton);
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
    getLabel(): JSLabel {
        var label: JSLabel = this.getData("label");
        if (!label) {
            label = new JSLabel();
            var tabPlacement = this.getTabPlacement();
            if (tabPlacement === JSTabbedPane.LEFT || tabPlacement === JSTabbedPane.RIGHT) {
                label.setStyle("display", "block");
                label.setStyle("margin", "4px 0");
                label.setStyle("text-align", "center");
            } else {
                label.setStyle("margin", "0 4px");
                label.setStyle("vertical-align", "middle");
            }
            var button = this.getCloseButton();
            if (button) {
                var components: JSComponent[] = this.getComponents();
                var index: number = components.indexOf(button);
                this.add(label, null, index);
            } else {
                this.add(label);
            }
            this.setData("label", label);
        }
        return label;
    }
    /*
    setImage(image: JSComponent) {
        var oldImage: JSComponent = this.getImage();
        if (oldImage) {
            this.remove(oldImage);
        }
        if (image) {
            this.add(image, null, 0);
            var tabPlacement = this.getTabPlacement();
            if (tabPlacement === JSTabbedPane.LEFT || tabPlacement === JSTabbedPane.RIGHT) {
                image.setStyle("display", "block");
                image.setStyle("margin", "4px auto 0");
            } else {
                image.setStyle("margin-left", "4px");
                image.setStyle("vertical-align", "middle");
            }
        }
        super.setImage(image);
    }
    */
    getGraphics(): JSGraphics {
        var graphics: JSGraphics = this.getData("graphics");
        if (!graphics) {
            graphics = new JSGraphics();
            this.setData("graphics", graphics);
        }
        return graphics;
    }
    setSelected(selected: boolean) {
        this.setBackground(selected ? "white" : "#BFBFBF");
        var label: JSLabel = this.getLabel();
        if (label) {
            label.setForeground(selected ? "black" : "#404040");
        }
        super.setSelected(selected);
    }
}
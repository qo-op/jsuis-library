/// <reference path = "../jsuis.ts"/>
/**
 * JSTab
 * 
 * @author Yassuo Toda
 */
class JSTab extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(tabPlacement: string, icon: JSIcon, closeable: boolean);
    constructor(tabPlacement: string, text: string, closeable: boolean);
    constructor(tabPlacement: string, text: string, icon: JSIcon, closeable: boolean);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setClass("JSTab");
        this.setStyle("display", "inline-block");
        this.setStyle("font-size", "0");
        this.setStyle("white-space", "nowrap");
        var container: JSPanel = this.getContainer();
        if (!container) {
            container = new JSPanel();
            this.add(container);
            this.setContainer(container);
        }
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: HTMLDivElement);
            if (args[0] instanceof HTMLDivElement) {
            }
            break;
        case 3:
            // constructor(tabPlacement: string, icon: JSIcon, closeable: boolean);
            // constructor(tabPlacement: string, text: string, closeable: boolean);
            if (typeof args[0] === "string" && args[1] instanceof JSIcon && typeof args[2] === "boolean") {
                var tabPlacement: string = args[0];
                var icon: JSIcon = args[1];
                var closeable: boolean = args[2];
                this.setTabPlacement(tabPlacement);
                this.setIcon(icon);
                this.setCloseable(closeable);
            } else if (typeof args[0] === "string" && typeof args[1] === "string" && typeof args[2] === "boolean") {
                var tabPlacement: string = args[0];
                var text: string = args[1];
                var closeable: boolean = args[2];
                this.setTabPlacement(tabPlacement);
                this.setText(text);
                this.setCloseable(closeable);
            }
            break;
        case 4:
            // constructor(tabPlacement: string, text: string, icon: JSIcon, closeable: boolean);
            if (typeof args[0] === "string" && typeof args[1] === "string" && args[2] instanceof JSIcon && typeof args[3] === "boolean") {
                var tabPlacement: string = args[0];
                var text: string = args[1];
                var icon: JSIcon = args[2];
                var closeable: boolean = args[3];
                this.setTabPlacement(tabPlacement);
                this.setText(text);
                this.setIcon(icon);
                this.setCloseable(closeable);
            }
            break;
        default:
        }
        this.addDragSourceListener(new JSDragListener({
            dragStart(mouseEvent: MouseEvent, tab: JSTab) {
                var tabContainer: JSTabContainer = <JSTabContainer> tab.getParent();
                tabContainer.setSelectedIndex(tabContainer.indexOfTab(tab));
                JSDataTransfer.setData("dragSource", tab);
            }
        }));
        this.addDropTargetListener(new JSDropListener({
            dragOver(mouseEvent: MouseEvent, tab: JSTab): boolean {
                var container: JSPanel = tab.getContainer();
                tab.setStyle("z-index", "1");
                var boundingClientRect = tab.getBoundingClientRect();
                if (mouseEvent.x >= (boundingClientRect.left + boundingClientRect.width / 2)) {
                    container.setStyle("box-shadow", "2px 0 #404040, -1px 0 #404040 inset");
                } else {
                    container.setStyle("box-shadow", "-2px 0 #404040, 1px 0 #404040 inset");
                }
                return true;
            },
            dragLeave(mouseEvent: MouseEvent, tab: JSTab): void {
                var container: JSPanel = tab.getContainer();
                tab.setStyle("z-index", "0");
                container.setStyle("box-shadow", "none");
            },
            drop(mouseEvent: MouseEvent, tab: JSTab): boolean {
                console.log("drop");
                tab.setStyle("z-index", "0");
                container.setStyle("box-shadow", "none");
                return true;
            }
        }));
    }
    getContainer(): JSPanel {
        return this.getData("container"); 
    }
    setContainer(container: JSPanel) {
        this.setData("container", container);
    }
    getTabPlacement(): string {
        return this.getAttribute("data-tab-placement");
    }
    setTabPlacement(tabPlacement: string) {
        this.setAttribute("data-tab-placement", tabPlacement);
        var container: JSPanel = this.getContainer();
        switch (tabPlacement) {
        case JSTabbedPane.RIGHT:
            this.setStyle("padding", "0 0 1px 0");
            container.setStyle("border-right", "1px solid gray");
            break;
        case JSTabbedPane.LEFT:
            this.setStyle("padding", "0 0 1px 0");
            container.setStyle("border-left", "1px solid gray");
            break;
        case JSTabbedPane.BOTTOM:
            this.setStyle("padding", "0 1px 0 0");
            container.setStyle("border-bottom", "1px solid gray");
            break;
        case JSTabbedPane.TOP:
        default:
            this.setStyle("padding", "0 1px 0 0");
            container.setStyle("border-top", "1px solid gray");
        }
    }
    isCloseable() {
        var closeButton = this.getCloseButton();
        return !!closeButton;
    }
    setCloseable(closeable: boolean) {
        if (closeable) {
            var closeButton = this.getCloseButton();
            if (!closeButton) {
                closeButton = new JSButton();
                closeButton.setStyle("background", "none");
                closeButton.setStyle("border", "none");
                closeButton.setStyle("padding", "0 2px");
                var icon = new JSPathIcon("M4,4L12,12M12,4L4,12", 16, 16).withForeground("red");
                closeButton.setIcon(icon);
                // closeButton = new JSPathImage(new JSPathIcon("M4,4L12,12M12,4L4,12", 16, 16));
                // (<JSPathImage> closeButton).getPath().setForeground("red");
                this.setCloseButton(closeButton);
            }
        }
    }
    setIcon(icon: JSIcon) {
        super.setIcon(icon);
        var container: JSPanel = this.getContainer();
        var oldImage: JSComponent = this.getImage();
        if (oldImage) {
            container.remove(oldImage);
        }
        if (icon) {
            var image: JSImage = new JSImage(icon);
            var tabPlacement = this.getTabPlacement();
            if (tabPlacement === JSTabbedPane.LEFT || tabPlacement === JSTabbedPane.RIGHT) {
                image.setStyle("display", "block");
                image.setStyle("margin", "4px auto 0");
            } else {
                image.setStyle("margin-left", "4px");
                image.setStyle("vertical-align", "middle");
            }
            container.add(image, null, 0);
            this.setImage(image);
        }
    }
    getLabel(): JSLabel {
        return this.getData("label");
    }
    setLabel(label: JSLabel) {
        this.setData("label", label);
    }
    getCloseButton(): JSComponent {
        return this.getData("closeButton");
    }
    setCloseButton(closeButton: JSComponent) {
        if (closeButton) {
            var oldCloseButton: JSComponent = this.getCloseButton();
            if (oldCloseButton !== closeButton) {
                var container: JSPanel = this.getContainer();
                if (oldCloseButton) {
                    container.remove(oldCloseButton);
                }
                if (closeButton) {
                    var tabPlacement = this.getTabPlacement();
                    if (tabPlacement === JSTabbedPane.LEFT || tabPlacement === JSTabbedPane.RIGHT) {
                        closeButton.setStyle("margin", "-4px auto 0");
                    } else {
                        closeButton.setStyle("margin-left", "-4px");
                        closeButton.setStyle("vertical-align", "middle");
                    }
                    container.add(closeButton);
                }
            }
        }
        this.setData("closeButton", closeButton);
    }
    getText(): string {
        return this.getData("text");
    }
    setText(text: string) {
        var label: JSLabel = this.getLabel();
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
            var container: JSPanel = this.getContainer();
            var closeButton = this.getCloseButton();
            if (closeButton) {
                var components: JSComponent[] = container.getComponents();
                var index: number = components.indexOf(closeButton);
                container.add(label, null, index);
            } else {
                container.add(label);
            }
            this.setLabel(label);
        }
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
        var container: JSPanel = this.getContainer();
        container.setBackground(selected ? "white" : "#BFBFBF");
        var label: JSLabel = this.getLabel();
        if (label) {
            label.setForeground(selected ? "black" : "#404040");
        }
        super.setSelected(selected);
    }
}
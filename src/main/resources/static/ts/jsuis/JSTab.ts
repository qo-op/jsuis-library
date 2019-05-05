/// <reference path = "../jsuis.ts"/>
/**
 * JSTab
 * 
 * @author Yassuo Toda
 */
class JSTab extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(tabPlacement: string, closeable: boolean, text: string);
    constructor(tabPlacement: string, closeable: boolean, text: string, icon: JSIcon);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setClass("JSTab");
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
        this.addDragSourceListener(new JSDragListener({
            dragStart(mouseEvent: MouseEvent, tab: JSTab) {
                var tabContainer: JSTabContainer = <JSTabContainer> tab.getParent();
                tabContainer.setSelectedIndex(tabContainer.indexOfTab(tab));
                JSDataTransfer.setData("dragSource", tab);
            }
        }));
        this.addDropTargetListener(new JSDropListener({
            dragOver(mouseEvent: MouseEvent, tab: JSTab): boolean {
                var panel: JSPanel = tab.getPanel();
                tab.setStyle("z-index", "1");
                var boundingClientRect = tab.getBoundingClientRect();
                if (mouseEvent.x >= (boundingClientRect.left + boundingClientRect.width / 2)) {
                    panel.setStyle("box-shadow", "2px 0 #404040, -1px 0 #404040 inset");
                } else {
                    panel.setStyle("box-shadow", "-2px 0 #404040, 1px 0 #404040 inset");
                }
                return true;
            },
            dragLeave(mouseEvent: MouseEvent, tab: JSTab): void {
                var panel: JSPanel = tab.getPanel();
                tab.setStyle("z-index", "0");
                panel.setStyle("box-shadow", "none");
            },
            drop(mouseEvent: MouseEvent, component: JSComponent): boolean {
                console.log("drop");
                var tab: JSTab = <JSTab> component;
                var panel: JSPanel = tab.getPanel();
                tab.setStyle("z-index", "0");
                panel.setStyle("box-shadow", "none");
                return true;
            }
        }));
    }
    getTabPlacement(): string {
        return this.getAttribute("data-tab-placement");
    }
    setTabPlacement(tabPlacement: string) {
        this.setAttribute("data-tab-placement", tabPlacement);
        var panel: JSPanel = this.getPanel();
        switch (tabPlacement) {
        case JSTabbedPane.RIGHT:
            this.setStyle("padding", "0 0 1px 0");
            panel.setStyle("border-right", "1px solid gray");
            break;
        case JSTabbedPane.LEFT:
            this.setStyle("padding", "0 0 1px 0");
            panel.setStyle("border-left", "1px solid gray");
            break;
        case JSTabbedPane.BOTTOM:
            this.setStyle("padding", "0 1px 0 0");
            panel.setStyle("border-bottom", "1px solid gray");
            break;
        case JSTabbedPane.TOP:
        default:
            this.setStyle("padding", "0 1px 0 0");
            panel.setStyle("border-top", "1px solid gray");
        }
    }
    isCloseable() {
        var button: JSButton = this.getButton();
        return !!button;
    }
    setCloseable(closeable: boolean) {
        if (closeable) {
            var button: JSButton = this.getButton();
            if (!button) {
                button = new JSButton();
                var icon = new JSPathIcon("M4,4L12,12M12,4L4,12", 16, 16).withForeground("red");
                button.setIcon(icon);
                var tabPlacement = this.getTabPlacement();
                if (tabPlacement === JSTabbedPane.LEFT || tabPlacement === JSTabbedPane.RIGHT) {
                    button.setStyle("margin", "-4px auto 0");
                } else {
                    button.setStyle("margin-left", "-4px");
                    button.setStyle("vertical-align", "middle");
                }
                this.setButton(button);
            }
        }
    }
    getButton(): JSButton {
        return this.getData("button");
    }
    setButton(button: JSButton) {
        var panel: JSPanel = this.getPanel();
        var oldCloseButton: JSComponent = this.getButton();
        if (oldCloseButton) {
            panel.remove(oldCloseButton);
        }
        if (button) {
            panel.add(button);
        }
        this.setData("button", button);
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
            var panel: JSPanel = this.getPanel();
            var button = this.getButton();
            if (button) {
                var components: JSComponent[] = panel.getComponents();
                var index: number = components.indexOf(button);
                panel.add(label, null, index);
            } else {
                panel.add(label);
            }
            this.setData("label", label);
        }
        return label;
    }
    setIcon(icon: JSIcon) {
        super.setIcon(icon);
        var panel: JSPanel = this.getPanel();
        var oldImage: JSComponent = this.getImage();
        if (oldImage) {
            panel.remove(oldImage);
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
            panel.add(image, null, 0);
            this.setImage(image);
        }
    }
    getPanel(): JSPanel {
        var panel: JSPanel = this.getData("panel");
        if (!panel) {
            panel = new JSPanel();
            this.add(panel);
            this.setData("panel", panel);
        }
        return panel;
    }
    setSelected(selected: boolean) {
        var panel: JSPanel = this.getPanel();
        panel.setBackground(selected ? "white" : "#BFBFBF");
        var label: JSLabel = this.getLabel();
        if (label) {
            label.setForeground(selected ? "black" : "#404040");
        }
        super.setSelected(selected);
    }
}
/// <reference path = "../jsuis.ts"/>
class JSTab extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(tabPlacement: string, icon: HTMLImageElement, closeable: boolean);
    constructor(tabPlacement: string, icon: JSComponent, closeable: boolean);
    constructor(tabPlacement: string, text: string, closeable: boolean);
    constructor(tabPlacement: string, text: string, icon: HTMLImageElement, closeable: boolean);
    constructor(tabPlacement: string, text: string, icon: JSComponent, closeable: boolean);
    // overload
    constructor(elementOrTabPlacement?: HTMLDivElement | string,
            iconOrText?: HTMLImageElement | JSComponent | string,
            closeableOrIcon?: boolean | HTMLImageElement | JSComponent,
            closeable?: boolean) {
        // constructor();
        // constructor(element: HTMLDivElement);
        super(elementOrTabPlacement === undefined || !(elementOrTabPlacement instanceof HTMLDivElement) ? document.createElement("div") : elementOrTabPlacement);
        var container: JSPanel = this.getContainer();
        if (!container) {
            container = new JSPanel();
            this.add(container);
            this.setContainer(container);
        }
        if (elementOrTabPlacement !== undefined && !(elementOrTabPlacement instanceof HTMLDivElement)) {
            this.setTabPlacement(elementOrTabPlacement);
            if (iconOrText instanceof HTMLImageElement) {
                // constructor(tabPlacement: string, icon: HTMLImageElement);
                this.setIcon(new JSImageIcon(iconOrText));
                this.setCloseable(<boolean> closeableOrIcon);
            } else if (iconOrText instanceof JSComponent) {
                // constructor(tabPlacement: string, icon: JSComponent);
                this.setIcon(iconOrText);
                this.setCloseable(<boolean> closeableOrIcon);
            } else {
                // constructor(tabPlacement: string, text: string, closeable: boolean);
                // constructor(tabPlacement: string, text: string, icon: HTMLImageElement, closeable: boolean);
                // constructor(tabPlacement: string, text: string, icon: JSComponent, closeable: boolean);
                this.setText(iconOrText);
                if (closeableOrIcon instanceof HTMLImageElement) {
                    this.setIcon(new JSImageIcon(closeableOrIcon));
                    this.setCloseable(closeable);
                } else if (closeableOrIcon instanceof JSComponent) {
                    this.setIcon(closeableOrIcon);
                    this.setCloseable(closeable);
                } else {
                    this.setCloseable(closeableOrIcon);
                }
            }
        }
        this.addMouseListener(new JSMouseListener(this, {
            mouseClicked(mouseEvent: MouseEvent) {
                var tabContainer: JSTabContainer = this.getParent();
                if (tabContainer) {
                    tabContainer.setSelectedIndex(tabContainer.indexOfTab(this));
                }
            }
        }));
        this.addDragListener(new JSDragListener(this, {
            dragStart(dragEvent: DragEvent) {
                if ((<any> dragEvent.dataTransfer).setDragImage) {
                    (<any> dragEvent.dataTransfer).setDragImage(JSDataTransfer.getDragImage(), 0, 0);
                    var tabContainer: JSTabContainer = this.getParent();
                    tabContainer.setSelectedIndex(tabContainer.indexOfTab(this));
                    JSDataTransfer.setData("dragSource", this);
                } else {
                
                    /*
                    var clone: JSTab = this.clone();
                    var tabContainer: JSTabContainer = this.getParent();
                    var components: JSComponent[] = tabContainer.getComponents();
                    var index = components.indexOf(this);
                    tabContainer.remove(this);
                    tabContainer.setTabComponentAt(index, clone);
                    tabContainer.setSelectedIndex(tabContainer.indexOfTab(clone));
                    JSDataTransfer.setData("dragSource", clone);
                    tabContainer.revalidate();
                    
                    // var srcElement = (<HTMLElement> dragEvent.srcElement);
                    // var visibility = srcElement.style.visibility;
                    // srcElement.style.visibility = "hidden";
                    // setTimeout(function() {
                        // srcElement.style.visibility = visibility; 
                    // });
                    */
                }
            }
        }));
        this.addDropListener(new JSDropListener(this, {
            dragOver(dragEvent: DragEvent): boolean {
                var container: JSPanel = this.getContainer();
                this.setStyle("z-index", "1");
                var boundingClientRect = this.getBoundingClientRect();
                if (dragEvent.x >= (boundingClientRect.left + boundingClientRect.width / 2)) {
                    container.setStyle("box-shadow", "2px 0 #404040, -1px 0 #404040 inset");
                } else {
                    container.setStyle("box-shadow", "-2px 0 #404040, 1px 0 #404040 inset");
                }
                return true;
            },
            dragLeave(dragEent: DragEvent): void {
                var container: JSPanel = this.getContainer();
                this.setStyle("z-index", "0");
                container.setStyle("box-shadow", "none");
            },
            drop(dragEvent: DragEvent): boolean {
                console.log("drop");
                this.setStyle("z-index", "0");
                container.setStyle("box-shadow", "none");
                return true;
            }
        }));
        this.setBackground("gray");
        this.setStyle("display", "inline-block");
        this.setStyle("font-size", "0");
        this.setStyle("white-space", "nowrap");
    }
    init(): void {
        this.addClass("JSTab");
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
                closeButton = new JSPathIcon("M4,4L12,12M12,4L4,12", 16, 16);
                closeButton.getPath().setForeground("red");
                closeButton.addMouseListener(new JSMouseListener(this, {
                    mouseClicked(mouseEvent: MouseEvent) {
                        var tabContainer: JSTabContainer = this.getParent();
                        tabContainer.fireTabClosing(new JSTabEvent(this));
                    }
                }));
                this.setCloseButton(closeButton);
            }
        }
    }
    setIcon(icon: JSComponent) {
        var oldIcon: JSComponent = this.getIcon();
        if (oldIcon !== icon) {
            var container: JSPanel = this.getContainer();
            if (oldIcon) {
                container.remove(oldIcon);
            }
            if (icon) {
                var tabPlacement = this.getTabPlacement();
                if (tabPlacement === JSTabbedPane.LEFT || tabPlacement === JSTabbedPane.RIGHT) {
                    icon.setStyle("display", "block");
                    icon.setStyle("margin", "4px auto 0");
                } else {
                    icon.setStyle("margin-left", "4px");
                    icon.setStyle("vertical-align", "middle");
                }
                container.add(icon, null, 0);
            }
        }
        super.setIcon(icon);
    }
    getLabel(): JSLabel {
        return this.getData("label");
    }
    setLabel(label: JSLabel) {
        this.setData("label", label);
    }
    getCloseButton() {
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
    clone(): JSTab {
        var clone = new JSTab();
        clone.setTabPlacement(this.getTabPlacement());
        clone.setCloseable(this.isCloseable());
        clone.setText(this.getText());
        clone.setIcon(this.getIcon().clone());
        return clone;
    }
}
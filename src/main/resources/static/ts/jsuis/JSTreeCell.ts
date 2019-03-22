/// <reference path = "../jsuis.ts"/>
class JSTreeCell extends JSHTMLComponent {
    
    static COLLAPSED_PATH_DEFINITION: string = "M5.17,2.34L10.83,8L5.17,13.66Z";
    static EXPANDED_PATH_DEFINITION: string = "M12,4L12,12L4,12Z";
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(value: any);
    constructor(value: any, icon: HTMLImageElement);
    constructor(value: any, icon: JSComponent);
    // overload
    constructor(elementOrValue?: HTMLDivElement | any, icon?: HTMLImageElement | JSComponent) {
        // constructor();
        // constructor(element: HTMLDivElement);
        super(elementOrValue === undefined || !(elementOrValue instanceof HTMLDivElement) ? document.createElement("div") : elementOrValue);
        var label: JSLabel = this.getLabel();
        if (!label) {
            label = new JSLabel();
            label.setStyle("vertical-align", "middle");
            this.add(label);
            this.setLabel(label);
        }
        if (elementOrValue !== undefined && !(elementOrValue instanceof HTMLDivElement)) {
            // constructor(value: any);
            // constructor(value: any, icon: HTMLImageElement);
            // constructor(value: any, icon: JSComponent);
            this.setValue(elementOrValue);
            if (icon !== undefined) {
                if (icon instanceof HTMLImageElement) {
                    this.setIcon(new JSImageIcon(icon));
                } else {
                    this.setIcon(icon);
                }
            }
        }
        this.addMouseListener(new JSMouseListener(this, {
            mouseEntered(mouseEvent: MouseEvent) {
                this.setBackground("#e6e6e6");
            },
            mouseExited(mouseEvent: MouseEvent) {
                this.setBackground(null);
            }
        }));
    }
    init(): void {
        this.addClass("JSTreeCell");
        this.setStyle("padding", "0 4px");
    }
    getValue(): any {
        return this.getData("value");
    }
    setValue(value: any) {
        this.setData("value", value);
        this.setText("" + value);
        if (value.getAllowsChildren()) {
            var children = value.children();
            if (children.length) {
                var branchIcon: JSPathIcon = this.getBranchIcon();
                if (!branchIcon) {
                    branchIcon = new JSPathIcon(JSTreeCell.COLLAPSED_PATH_DEFINITION, 16, 16);
                    branchIcon.getPath().setBackground("gray");
                    branchIcon.setStyle("margin-right", "4px");
                    branchIcon.setStyle("vertical-align", "middle");
                    this.add(branchIcon, null, 0);
                    branchIcon.addMouseListener(new JSMouseListener(this, {
                        mouseClicked(mouseEvent: MouseEvent) {
                            var container: JSDiv = this.getContainer();
                            if (container.isDisplayable()) {
                                this.getBranchIcon().getPath().setPathDefinition(JSTreeCell.COLLAPSED_PATH_DEFINITION);
                                container.setStyle("display", "none");
                            } else {
                                this.getBranchIcon().getPath().setPathDefinition(JSTreeCell.EXPANDED_PATH_DEFINITION);
                                container.setStyle("display", "");
                            }
                        }
                    }));
                    this.setBranchIcon(branchIcon);
                    this.addMouseListener(new JSMouseListener(this, {
                        mouseClicked(mouseEvent: MouseEvent) {
                            // var clickCount = mouseEvent.detail;
                            // if (clickCount === 2) {
                                var container: JSDiv = this.getContainer();
                                if (container.isDisplayable()) {
                                    this.getBranchIcon().getPath().setPathDefinition(JSTreeCell.COLLAPSED_PATH_DEFINITION);
                                    container.setStyle("display", "none");
                                } else {
                                    this.getBranchIcon().getPath().setPathDefinition(JSTreeCell.EXPANDED_PATH_DEFINITION);
                                    container.setStyle("display", "");
                                }
                            // }
                        }
                    }));
                }
            }
        }
    }
    getBranchIcon(): JSPathIcon {
        return this.getData("branchIcon");
    }
    setBranchIcon(branchIcon: JSPathIcon) {
        this.setData("branchIcon", branchIcon);
    }
    setIcon(icon: JSComponent) {
        var oldIcon: JSComponent = this.getIcon();
        if (oldIcon !== icon) {
            if (oldIcon) {
                this.remove(oldIcon);
            }
            if (icon) {
                icon.setStyle("margin-right", "4px");
                icon.setStyle("vertical-align", "middle");
                var branchIcon: JSPathIcon = this.getBranchIcon();
                this.add(icon, null, branchIcon ? 1 : 0);
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
    setText(text: string) {
        var label: JSLabel = this.getLabel();
        label.setText(text);
    }
    getContainer(): JSDiv {
        return this.getData("container");
    }
    setContainer(container: JSDiv) {
        this.setData("container", container);
    }
}
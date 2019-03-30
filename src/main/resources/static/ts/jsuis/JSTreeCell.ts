/// <reference path = "../jsuis.ts"/>
class JSTreeCell extends JSHTMLComponent {
    
    static COLLAPSED_PATH_DEFINITION: string = "M5.17,2.34L10.83,8L5.17,13.66Z";
    static EXPANDED_PATH_DEFINITION: string = "M12,4L12,12L4,12Z";
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(value: any);
    constructor(value: any, icon: JSIcon);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        var label: JSLabel = this.getLabel();
        if (!label) {
            label = new JSLabel();
            label.setStyle("vertical-align", "middle");
            this.add(label);
            this.setLabel(label);
        }
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: HTMLDivElement);
            // constructor(value: any);
            if (args[0] instanceof HTMLDivElement) {
            } else {
                var value: any= args[0];
                this.setValue(value);
            }
            break;
        case 2:
            // constructor(value: any, icon: JSICon);
            if (args[1] instanceof JSIcon) {
                var value: any= args[0];
                var icon: JSIcon = args[1];
                this.setValue(value);
                this.setIcon(icon);
            }
            break;
        default:
        }
        this.addMouseListener(new JSMouseListener({
            mouseEntered(mouseEvent: MouseEvent, component: JSComponent) {
                component.setBackground("#e6e6e6");
            },
            mouseExited(mouseEvent: MouseEvent, component: JSComponent) {
                component.setBackground(null);
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
                var branchButton: JSButton = this.getBranchButton();
                if (!branchButton) {
                    branchButton = new JSButton();
                    branchButton.setStyle("background", "none");
                    branchButton.setStyle("border", "none");
                    branchButton.setStyle("padding", "0 2px");
                    branchButton.setIcon(new JSPathIcon(JSTreeCell.COLLAPSED_PATH_DEFINITION, "gray", "none", 16, 16));
                    branchButton.setStyle("margin-right", "4px");
                    branchButton.setStyle("vertical-align", "middle");
                    this.add(branchButton, null, 0);
                    branchButton.addMouseListener(new JSMouseListener({
                        mouseClicked(mouseEvent: MouseEvent, component: JSComponent) {
                            var container: JSDiv = (<JSTreeCell> component).getContainer();
                            if (container.isDisplayable()) {
                                (<JSTreeCell> component).getBranchButton().setIcon(new JSPathIcon(JSTreeCell.COLLAPSED_PATH_DEFINITION, "gray", "none", 16, 16));
                                container.setStyle("display", "none");
                            } else {
                                (<JSTreeCell> component).getBranchButton().setIcon(new JSPathIcon(JSTreeCell.EXPANDED_PATH_DEFINITION, "gray", "none", 16, 16));
                                container.setStyle("display", "");
                            }
                        }
                    }));
                    this.setBranchButton(branchButton);
                    this.addMouseListener(new JSMouseListener({
                        mouseClicked(mouseEvent: MouseEvent, component: JSComponent) {
                            // var clickCount = mouseEvent.detail;
                            // if (clickCount === 2) {
                                var container: JSDiv = (<JSTreeCell> component).getContainer();
                                if (container.isDisplayable()) {
                                    (<JSTreeCell> component).getBranchButton().setIcon(new JSPathIcon(JSTreeCell.COLLAPSED_PATH_DEFINITION, "gray", "none", 16, 16));
                                    container.setStyle("display", "none");
                                } else {
                                    (<JSTreeCell> component).getBranchButton().setIcon(new JSPathIcon(JSTreeCell.EXPANDED_PATH_DEFINITION, "gray", "none", 16, 16));
                                    container.setStyle("display", "");
                                }
                            // }
                        }
                    }));
                }
            }
        }
    }
    getBranchButton(): JSButton {
        return this.getData("branchButton");
    }
    setBranchButton(branchButton: JSButton) {
        this.setData("branchButton", branchButton);
    }
    setIcon(icon: JSIcon) {
        super.setIcon(icon);
        var oldImage: JSComponent = this.getImage();
        if (oldImage) {
            this.remove(oldImage);
        }
        if (icon) {
            var image: JSImageIcon = new JSImageIcon(icon);
            image.setStyle("vertical-align", "middle");
            image.setStyle("margin-right", "4px");
            var branchButton: JSButton = this.getBranchButton();
            super.add(image, null, branchButton ? 1 : 0);
            this.setImage(image);
        }
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
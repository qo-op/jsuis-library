/// <reference path = "../jsuis.ts"/>
/**
 * JSTreeCell
 * 
 * @author Yassuo Toda
 */
class JSTreeCell extends JSDiv {
    
    static COLLAPSED_PATH_ICON: JSPathIcon = new JSPathIcon("M4.17,2.34L9.83,8L4.17,13.66Z", 16, 16).withFill("gray");
    static EXPANDED_PATH_ICON: JSPathIcon = new JSPathIcon("M10,4L10,12L2,12Z", 16, 16).withFill("gray");
    
    constructor();
    constructor(element: HTMLElement);
    constructor(value: any);
    constructor(value: any, icon: JSIcon);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSTreeCell");
        
        this.setLayout(new JSBorderLayout());
        
        var graphics: JSGraphics = this.getGraphics();
        super.add(graphics, JSBorderLayout.WEST);
        
        var label: JSLabel = this.getLabel();
        // label.setHorizontalAlignment(JSBorderLayout.LEFT_RIGHT);
        this.add(label);
        
        switch (arguments.length) {
        case 1:
            // constructor(value: any);
            if (!(arguments[0] instanceof HTMLDivElement)) {
                var value: any = arguments[0];
                this.setValue(value);
            }
            break;
        case 2:
            // constructor(value: any, icon: JSICon);
            if (arguments[1] instanceof JSIcon) {
                var value: any= arguments[0];
                var icon: JSIcon = arguments[1];
                this.setValue(value);
                this.setIcon(icon);
            }
            break;
        default:
        }
    }
    getValue(): any {
        return this.getData("value");
    }
    setValue(value: any) {
        this.setData("value", value);
        this.setText("" + value);
        var children = value.children();
        if (children.length) {
            var closedIcon: JSIcon = this.getClosedIcon();
            var openIcon: JSIcon = this.getOpenIcon();
            if (!closedIcon && !openIcon) {
                this.addMouseListener({
                    mouseClicked(mouseEvent: MouseEvent, treeCell: JSTreeCell) {
                        var container: JSComponent = treeCell.getContainer();
                        if (container.isDisplayable()) {
                            // treeCell.getButton().setIcon(JSTreeCell.COLLAPSED_PATH_ICON);
                            var treeNode: JSTreeNode = treeCell.getValue();
                            treeNode.setExpanded(false);
                            treeCell.setClosedIcon(JSTreeCell.COLLAPSED_PATH_ICON);
                            container.setStyle("display", "none");
                        } else {
                            // treeCell.getButton().setIcon(JSTreeCell.EXPANDED_PATH_ICON);
                            var treeNode: JSTreeNode = treeCell.getValue();
                            treeNode.setExpanded(true);
                            treeCell.setOpenIcon(JSTreeCell.EXPANDED_PATH_ICON);
                            container.setStyle("display", "");
                        }
                        treeCell.revalidate();
                        mouseEvent.stopPropagation();
                    }
                }).withParameters(this);
            }
            /*
            var button: JSButton = this.getButton();
            if (!button) {
                button = new JSTreeCellButton(JSTreeCell.COLLAPSED_PATH_ICON);
                this.setButton(button);
                this.addMouseListener({
                    mouseClicked(mouseEvent: MouseEvent, treeCell: JSTreeCell) {
                        var container: JSDiv = treeCell.getContainer();
                        if (container.isDisplayable()) {
                            treeCell.getButton().setIcon(JSTreeCell.COLLAPSED_PATH_ICON);
                            container.setStyle("display", "none");
                        } else {
                            treeCell.getButton().setIcon(JSTreeCell.EXPANDED_PATH_ICON);
                            container.setStyle("display", "");
                        }
                        mouseEvent.stopPropagation();
                    }
                }).withParameters(this);
            }
            */
            this.setClosedIcon(JSTreeCell.COLLAPSED_PATH_ICON);
        }
    }
    getClosedIcon(): JSIcon {
        return this.getData("closedIcon");
    }
    setClosedIcon(icon: JSIcon) {
        this.setData("closedIcon", icon);
        var graphics: JSGraphics = this.getGraphics();
        if (graphics) {
            if (icon) {
                icon.paintIcon(this, graphics);
            } else {
                graphics.removeAll();
            }
            // graphics.setStyle("top", "calc(50% - " + (icon.getIconHeight() / 2) + "px)");
            graphics.setStyle("vertical-align", "middle");
        }
        if (icon) {
            var label: JSTreeCellLabel = this.getLabel();
            // label.setStyle("margin-left", icon.getIconWidth() + "px");
            label.setX(-icon.getIconWidth());
        }
    }
    getOpenIcon(): JSIcon {
        return this.getData("openIcon");
    }
    setOpenIcon(icon: JSIcon) {
        this.setData("openIcon", icon);
        var graphics: JSGraphics = this.getGraphics();
        if (graphics) {
            if (icon) {
                icon.paintIcon(this, graphics);
            } else {
                graphics.removeAll();
            }
            // graphics.setStyle("top", "calc(50% - " + (icon.getIconHeight() / 2) + "px)");
            graphics.setStyle("vertical-align", "middle");
        }
        if (icon) {
            var label: JSTreeCellLabel = this.getLabel();
            // label.setStyle("margin-left", icon.getIconWidth() + "px");
            label.setX(-icon.getIconWidth());
        }
    }
    getGraphics(): JSGraphics {
        var graphics: JSGraphics = this.getData("graphics");
        if (!graphics) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSGraphics");
            if (element) {
                graphics = new JSGraphics(element);
            } else {
                graphics = new JSGraphics();
            }
            this.setData("graphics", graphics);
        }
        return graphics;
    }
    /*
    getPreferredWidth(): number {
        var label: JSTreeCellLabel = this.getLabel();
        var labelPreferredOuterWidth: number = label.getPreferredOuterWidth();
        var closedIcon: JSIcon = this.getClosedIcon();
        var openIcon: JSIcon = this.getOpenIcon();
        if (closedIcon) {
            return labelPreferredOuterWidth + closedIcon.getIconWidth() + this.getPaddingLeft() + this.getPaddingRight();
        } else if (openIcon) {
            return labelPreferredOuterWidth + openIcon.getIconWidth() + this.getPaddingLeft() + this.getPaddingRight();
        } else {
            return labelPreferredOuterWidth + this.getPaddingLeft() + this.getPaddingRight();
        }
    }
    */
    
    
    /*
    getButton(): JSButton {
        return this.getData("button");
    }
    setButton(button: JSButton) {
        var oldButton: JSButton = this.getData("button");
        if (oldButton) {
            this.remove(oldButton);
        }
        if (button) {
            this.add(button, null, 0);
        }
        this.setData("button", button);
    }
    */
    
    
    /*
    getLabel(): JSTreeCellLabel {
        var label: JSTreeCellLabel = this.getData("label");
        if (!label) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSLabel");
            if (element) {
                label = new JSTreeCellLabel(element);
            } else {
                label = new JSTreeCellLabel();
            }
            label.setStyle("position", "relative");
            label.setStyle("vertical-align", "middle");
            this.setData("label", label);
        }
        return label;
    }
    */
    getLabel(): JSLabel {
        var label: JSLabel = this.getData("label");
        if (!label) {
            var element: HTMLElement = <HTMLElement> this.getChild("JSLabel");
            if (element) {
                label = new JSLabel(element);
            } else {
                label = new JSLabel();
            }
            label.setStyle("position", "relative");
            label.setStyle("vertical-align", "middle");
            this.setData("label", label);
        }
        return label;
    }
    getIcon(): JSIcon {
        var label: JSComponent = this.getLabel();
        return label.getIcon();
    }
    setIcon(icon: JSIcon) {
        var label: JSComponent = this.getLabel();
        label.setIcon(icon);
    }
    getText(): string {
        var label: JSComponent = this.getLabel();
        return label.getText(); 
    }
    setText(text: string) {
        var label: JSTreeCellLabel = this.getLabel();
        label.setText(text);
    }
    getContainer(): JSComponent {
        return this.getData("container");
    }
    setContainer(container: JSComponent) {
        this.setData("container", container);
    }
}
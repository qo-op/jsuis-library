/// <reference path = "../jsuis.ts"/>
/**
 * JSTreeCell
 * 
 * @author Yassuo Toda
 */
class JSTreeCell extends JSDiv {
    
    static COLLAPSED_ICON: JSIcon = new JSPathIcon("M4.17,2.34L9.83,8L4.17,13.66Z", 16, 16).withFill("gray");
    static EXPANDED_ICON: JSIcon = new JSPathIcon("M10,4L10,12L2,12Z", 16, 16).withFill("gray");
    
    private span_Handle: JSSpan;
    private span_Icon: JSSpan;
    private span_Text: JSSpan;
    
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
        this.setStyle("white-space", "nowrap");
        this.setIconTextGap(4);
        
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
    getHandleSpan(): JSSpan {
        if (!this.span_Handle) {
            this.span_Handle = new JSSpan();
        }
        return this.span_Handle;
    }
    getIconSpan(): JSSpan {
        if (!this.span_Icon) {
            this.span_Icon = new JSSpan();
        }
        return this.span_Icon;
    }
    getTextSpan(): JSSpan {
        if (!this.span_Text) {
            this.span_Text = new JSSpan();
            this.span_Text.setStyle("vertical-align", "middle");
            this.span_Text.setStyle("white-space", "normal");
        }
        return this.span_Text;
    }
    /*
    setGraphics(graphics: JSComponent) {
        this.setData("graphics", graphics);
    }
    getGraphics(): JSComponent {
        return this.getData("graphics");
    }
    */
    getGraphics(): JSComponent {
        return this.getIconSpan();
    }
    setHandleIcon(icon: JSIcon) {
        var span_Handle: JSSpan = this.getHandleSpan();
        var parent: JSComponent = span_Handle.getParent();
        if (!icon) {
            if (parent === this) {
                this.remove(span_Handle);
            }
        } else {
            if (parent !== this) {
                this.add(span_Handle, null, 0);
            }
            icon.paintIcon(this, span_Handle);
        }
        if (this.isValid()) {
            this.revalidate();
        }
    }
    setIcon(icon: JSIcon) {
        var graphics: JSComponent = this.getGraphics();
        var parent: JSComponent = graphics.getParent();
        if (!icon) {
            if (parent === this) {
                this.remove(graphics);
            }
        } else {
            var text: string = this.getText();
            if (!text) {
                if (parent !== this) {
                    this.add(graphics);
                }
                graphics.setStyle("margin-right", "0");
            } else {
                if (parent !== this) {
                    this.add(graphics, null, this.getComponents().length - 1);
                }
                var iconTextGap: number = this.getIconTextGap();
                graphics.setStyle("margin-right", iconTextGap + "px");
            }
        }
        super.setIcon(icon);
        if (this.isValid()) {
            this.revalidate();
        }
    }
    getText(): string {
        var span_Text: JSSpan = this.getTextSpan();
        return span_Text.getText();
    }
    setText(text: string) {
        var span_Text: JSSpan = this.getTextSpan();
        var parent: JSComponent = span_Text.getParent();
        var icon: JSIcon = this.getIcon();
        var graphics: JSComponent = this.getGraphics();
        if (!text) {
            if (parent === this) {
                this.remove(span_Text);
                if (graphics) {
                    graphics.setStyle("margin-right", "0");
                }
            }
        } else {
            if (!icon) {
                if (parent !== this) {
                    this.add(span_Text);
                }
            } else {
                if (parent !== this) {
                    this.add(span_Text);
                }
                if (graphics) {
                    var iconTextGap: number = this.getIconTextGap();
                    graphics.setStyle("margin-right", iconTextGap + "px");
                }
            }
        }
        span_Text.setText(text);
        if (this.isValid()) {
            this.revalidate();
        }
    }
    getIconTextGap(): number {
        return +this.getAttribute("data-icon-text-gap");
    }
    setIconTextGap(iconTextGap: number) {
        this.setAttribute("data-icon-text-gap", "" + iconTextGap);
        var icon: JSIcon = this.getIcon();
        if (!icon) {
            return;
        }
        var text: string = this.getText();
        if (!text) {
            return;
        }
        var graphics: JSComponent = this.getGraphics();
        graphics.setStyle("margin-right", iconTextGap + "px");
        if (this.isValid()) {
            this.revalidate();
        }
    }
    getValue(): any {
        return this.getData("value");
    }
    setValue(value: any) {
        this.setData("value", value);
        this.setText("" + value);
    }
    getContainer(): JSComponent {
        var container: JSComponent = this.getData("container");
        if (!container) {
            container = new JSDiv();
            container.setStyle("display", "none");
            this.getParent().add(container);
            this.setData("container", container);
            
            this.setHandleIcon(JSTreeCell.COLLAPSED_ICON);
            this.addMouseListener({
                mouseClicked(mouseEvent: MouseEvent, treeCell: JSTreeCell) {
                    var container: JSComponent = treeCell.getContainer();
                    if (container.isDisplayable()) {
                        var treeNode: JSTreeNode = treeCell.getValue();
                        treeNode.setExpanded(false);
                        treeCell.setHandleIcon(JSTreeCell.COLLAPSED_ICON);
                        container.setStyle("display", "none");
                    } else {
                        var treeNode: JSTreeNode = treeCell.getValue();
                        treeNode.setExpanded(true);
                        treeCell.setHandleIcon(JSTreeCell.EXPANDED_ICON);
                        container.setStyle("display", "");
                    }
                    treeCell.revalidate();
                    mouseEvent.stopPropagation();
                }
            }).withParameters(this);
        }
        return container;
    }
    /*
    getPreferredWidth(): number {
        var span_Text: JSSpan = this.getTextSpan();
        var whiteSpace: string = span_Text.getStyle("whiteSpace");
        this.setStyle("white-space", "nowrap");
        var width: number = super.getPreferredWidth();
        if (whiteSpace) {
            span_Text.setStyle("white-space", whiteSpace);
        } else {
            span_Text.removeStyle("white-space");
        }
        return width;
    }
    */
}

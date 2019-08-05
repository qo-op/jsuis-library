/// <reference path = "../jsuis.ts"/>
/**
 * JSText
 * 
 * @author Yassuo Toda
 */
class JSText extends JSHTMLComponent {

    private div_Icon: JSDiv;
    private span_Icon: JSSpan;
    private span_Text: JSSpan;
    private graphics: JSComponent;
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLElement) ? document.createElement("div") : arguments[0]);
    }
    getIconDiv(): JSDiv {
        if (!this.div_Icon) {
            this.div_Icon = new JSDiv();
        }
        return this.div_Icon;
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
        }
        return this.span_Text;
    }
    setGraphics(graphics: JSComponent) {
        this.graphics = graphics;
    }
    getGraphics(): JSComponent {
        return this.graphics;
    }
    setIcon(icon: JSIcon) {
        var graphics: JSComponent = this.getGraphics();
        if (!icon) {
            if (graphics) {
                this.remove(graphics);
            }
        } else {
            var text: string = this.getText();
            if (!text) {
                if (!graphics) {
                    graphics = this.getIconDiv();
                    this.add(graphics);
                    this.setGraphics(graphics);
                }
                graphics.setStyle("margin", "0");
            } else {
                var iconTextGap: number = this.getIconTextGap();
                var verticalTextPosition: string = this.getVerticalTextPosition();
                if (verticalTextPosition === JSLabel.TOP) {
                    if (graphics instanceof JSSpan) {
                        this.remove(graphics);
                    }
                    if (graphics instanceof JSSpan || !graphics) {
                        graphics = this.getIconDiv();
                        this.add(graphics);
                        this.setGraphics(graphics);
                    }
                    graphics.setStyle("margin", iconTextGap + "px 0 0");
                } else if (verticalTextPosition === JSLabel.BOTTOM) {
                    if (graphics instanceof JSSpan) {
                        this.remove(graphics);
                    }
                    if (graphics instanceof JSSpan || !graphics) {
                        graphics = this.getIconDiv();
                        this.add(graphics, null, 0);
                        this.setGraphics(graphics);
                    }
                    graphics.setStyle("margin", "0 0 " + iconTextGap + "px");
                } else {
                    if (graphics instanceof JSDiv) {
                        this.remove(graphics);
                    }
                    var horizontalTextPosition: string = this.getHorizontalTextPosition();
                    if (horizontalTextPosition === JSLabel.LEFT) {
                        if (graphics instanceof JSDiv || !graphics) {
                            graphics = this.getIconSpan();
                            this.add(graphics);
                            this.setGraphics(graphics);
                        }
                        graphics.setStyle("margin", "0 0 0 " + iconTextGap + "px");
                    } else {
                        if (graphics instanceof JSDiv || !graphics) {
                            graphics = this.getIconSpan();
                            this.add(graphics, null, 0);
                            this.setGraphics(graphics);
                        }
                        graphics.setStyle("margin", "0 " + iconTextGap + "px 0 0");
                    }
                }
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
                    graphics.setStyle("margin", "0");
                }
            }
        } else {
            if (!icon) {
                if (parent !== this) {
                    this.add(span_Text);
                }
            } else {
                var iconTextGap: number = this.getIconTextGap();
                var verticalTextPosition: string = this.getVerticalTextPosition();
                if (verticalTextPosition === JSLabel.TOP) {
                    if (parent !== this) {
                        this.add(span_Text, null, 0);
                    }
                    if (graphics) {
                        graphics.setStyle("margin", iconTextGap + "px 0 0");
                    }
                } else if (verticalTextPosition === JSLabel.BOTTOM) {
                    if (parent !== this) {
                        this.add(span_Text);
                    }
                    if (graphics) {
                        graphics.setStyle("margin", "0 0 " + iconTextGap + "px");
                    }
                } else {
                    var horizontalTextPosition: string = this.getHorizontalTextPosition();
                    if (horizontalTextPosition === JSLabel.LEFT) {
                        if (parent !== this) {
                            this.add(span_Text, null, 0);
                        }
                        if (graphics) {
                            graphics.setStyle("margin", "0 0 0 " + iconTextGap + "px");
                        }
                    } else {
                        if (parent !== this) {
                            this.add(span_Text);
                        }
                        if (graphics) {
                            graphics.setStyle("margin", "0 " + iconTextGap + "px 0 0");
                        }
                    }
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
        var verticalTextPosition: string = this.getVerticalTextPosition();
        if (verticalTextPosition === JSLabel.TOP) {
            graphics.setStyle("margin", iconTextGap + "px 0 0");
        } else if (verticalTextPosition === JSLabel.BOTTOM) {
            graphics.setStyle("margin", "0 0 " + iconTextGap + "px");
        } else {
            var horizontalTextPosition: string = this.getHorizontalTextPosition();
            if (horizontalTextPosition === JSLabel.LEFT) {
                graphics.setStyle("margin", "0 0 0 " + iconTextGap + "px");
            } else {
                graphics.setStyle("margin", "0 " + iconTextGap + "px 0 0");
            }
        }
        if (this.isValid()) {
            this.revalidate();
        }
    }
    getHorizontalAlignment(): string {
        return this.getStyle("text-align");
    }
    setHorizontalAlignment(horizontalAlignment: string) {
        this.setStyle("text-align", horizontalAlignment);
    }
    getVerticalTextPosition(): string {
        return this.getAttribute("data-vertical-text-position");
    }
    setVerticalTextPosition(verticalTextPosition: string) {
        var oldVerticalTextPosition: string = this.getVerticalTextPosition();
        if ((oldVerticalTextPosition || JSLabel.CENTER) === (verticalTextPosition || JSLabel.CENTER)) {
            return;
        }
        if (verticalTextPosition !== JSLabel.CENTER) {
            this.setAttribute("data-vertical-text-position", verticalTextPosition);
        } else {
            this.removeAttribute("data-vertical-text-position");
        }
        var graphics: JSComponent = this.getGraphics();
        if (graphics) {
            this.remove(graphics);
        }
        var icon: JSIcon = this.getIcon();
        this.setIcon(icon);
    }
    getHorizontalTextPosition(): string {
        return this.getAttribute("data-horizontal-text-position");
    }
    setHorizontalTextPosition(horizontalTextPosition: string) {
        var oldHorizontalTextPosition: string = this.getHorizontalTextPosition();
        if ((oldHorizontalTextPosition || JSLabel.RIGHT) === (horizontalTextPosition || JSLabel.RIGHT)) {
            return;
        }
        if (horizontalTextPosition !== JSLabel.RIGHT) {
            this.setAttribute("data-horizontal-text-position", horizontalTextPosition);
        } else {
            this.removeAttribute("data-horizontal-text-position");
        }
        var icon: JSIcon = this.getIcon();
        this.setIcon(null);
        this.setIcon(icon);
        if (this.isValid()) {
            this.revalidate();
        }
    }
    /*
    getPreferredWidth(): number {
        var whiteSpace = this.getStyle("whiteSpace");
        this.setStyle("white-space", "nowrap");
        
        var preferredWidth: number = super.getPreferredWidth();
        
        if (whiteSpace) {
            this.setStyle("white-space", whiteSpace);
        } else {
            this.removeStyle("white-space");
        }
        return preferredWidth;
    }
    */
}

/// <reference path = "../jsuis.ts"/>
class JSButton extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLButtonElement);
    constructor(action: JSAction);
    constructor(icon: HTMLImageElement);
    constructor(icon: JSComponent);
    constructor(text: string);
    constructor(text: string, icon: HTMLImageElement);
    constructor(text: string, icon: JSComponent);
    // overload
    constructor(elementOrActionOrIconOrText?: HTMLButtonElement | JSAction | HTMLImageElement | JSComponent | string, icon?: HTMLImageElement | JSComponent) {
        // constructor();
        // constructor(element: HTMLButtonElement);
        super(elementOrActionOrIconOrText === undefined || !(elementOrActionOrIconOrText instanceof HTMLButtonElement) ? document.createElement("button") : elementOrActionOrIconOrText);
        if (elementOrActionOrIconOrText !== undefined && !(elementOrActionOrIconOrText instanceof HTMLButtonElement)) {
            if (elementOrActionOrIconOrText instanceof JSAction) {
                this.setAction(elementOrActionOrIconOrText);
            } else if (elementOrActionOrIconOrText instanceof HTMLImageElement) {
                // constructor(icon: HTMLImageElement);
                this.setIcon(new JSImageIcon(elementOrActionOrIconOrText));
            } else if (elementOrActionOrIconOrText instanceof JSComponent) {
                // constructor(icon: JSComponent);
                this.setIcon(elementOrActionOrIconOrText);
            } else {
                // constructor(text: string);
                // constructor(text: string, icon: HTMLImageElement);
                // constructor(text: string, icon: JSComponent);
                this.setText(elementOrActionOrIconOrText);
                if (icon !== undefined) {
                    if (icon instanceof HTMLImageElement) {
                        this.setIcon(new JSImageIcon(icon));
                    } else {
                        this.setIcon(icon);
                    }
                }
            }
        }
    }
    init(): void {
        this.addClass("JSButton");
        this.setStyle("white-space", "nowrap");
    }
    setIcon(icon: JSComponent) {
        var oldIcon: JSComponent = this.getIcon();
        if (oldIcon !== icon) {
            if (oldIcon) {
                this.remove(oldIcon);
            }
            if (icon) {
                var text = this.getText();
                if (text) {
                    icon.setStyle("margin-right", "4px");
                }
                icon.setStyle("vertical-align", "middle");
                this.add(icon, null, 0);
            }
        }
        super.setIcon(icon);
    }
    getSpan(): JSSpan {
        var span = this.getData("span");
        if (!span) {
            span = new JSSpan();
            span.setStyle("vertical-align", "middle");
            this.add(span);
            this.setSpan(span);
        }
        return span;
    }
    setSpan(span: JSSpan) {
        this.setData("span", span);
    }
    getText(): string {
        var span: JSSpan = this.getSpan();
        return span.getText();
    }
    setText(text: string) {
        var icon = this.getIcon();
        if (icon) {
            icon.setStyle("margin-right", text ? "4px" : "0");
        }
        var span: JSSpan = this.getSpan();
        span.setText(text);
    }
    getPropertyChangeListener(): PropertyChangeListener {
        var propertyChangeListener = this.getData("propertyChangeListener");
        if (!propertyChangeListener) {
            propertyChangeListener = new JSPropertyChangeListener(this, {
                propertyChange(propertyChangeEvent: JSPropertyChangeEvent) {
                    var propertyName: string = propertyChangeEvent.getPropertyName();
                    if (propertyName === "enabled") {
                        var newValue = propertyChangeEvent.getNewValue();
                        this.setEnabled(newValue);
                    }
                }
            });
            this.setData("propertyChangeListener", propertyChangeListener);
        }
        return propertyChangeListener;
    }
}
/// <reference path = "../jsuis.ts"/>
/**
 * JSPopup
 * 
 * @author Yassuo Toda
 */
class JSPopup extends JSPanel {
    
    invoker: JSComponent;
    closing: boolean;
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSPopup");
        this.setLayer(JSComponent.POPUP_LAYER);
        this.setVisible(false);
        
        JSBody.getInstance().addMouseListener(new JSPopupBodyMouseListener(this), true);
        this.addMouseListener(new JSPopupMouseListener(this), true);
    }
    getInvoker(): JSComponent {
        return this.invoker;
    }
    setInvoker(invoker: JSComponent) {
        this.invoker = invoker;
    }
    isClosing(): boolean {
        return this.closing;
    }
    setClosing(closing: boolean) {
        this.closing = closing;
    }
    show(invoker: JSComponent, x: number, y: number): void {
        this.setInvoker(invoker);
        this.setX(x);
        this.setY(y);
        this.setVisible(true);
        this.setClosing(false);
    }
}
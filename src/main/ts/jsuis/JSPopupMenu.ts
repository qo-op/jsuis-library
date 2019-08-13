/// <reference path = "../jsuis.ts"/>
/**
 * JSPopupMenu
 * 
 * @author Yassuo Toda
 */
class JSPopupMenu extends JSPanel {
    
    invoker: JSComponent;
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSPopupMenu");
        this.setVisible(false);
        JSBody.getInstance().addMouseListener({
            mousePressed(mouseEvent: MouseEvent, popupMenu: JSPopupMenu) {
                var invoker: JSComponent = popupMenu.getInvoker();
                if (!(invoker instanceof JSMenu)) {
                    popupMenu.setData("close", true);
                    var timer: JSTimer = popupMenu.getTimer();
                    timer.schedule({
                        run() {
                            var close = popupMenu.getData("close");
                            if (close) {
                                popupMenu.setSelected(false);
                            }
                        }
                    }, 0);
                }
            }
        }, true).withParameters(this);
        this.addMouseListener({
            mousePressed(mouseEvent: MouseEvent, popupMenu: JSPopupMenu) {
                popupMenu.setData("close", false);
            }
        }, true).withParameters(this);
        this.setLayer(JSComponent.POPUP_LAYER);
    }
    add(component: JSComponent): void {
        var selection: JSSelection = this.getSelection();
        if (!selection) {
            selection = new JSSelection();
            this.setSelection(selection);
        }
        selection.add(component);
        super.add(component);
    }
    addSeparator(): void {
        this.add(new JSSeparator());
    }
    getInvoker(): JSComponent {
        return this.invoker;
    }
    setInvoker(invoker: JSComponent) {
        this.invoker = invoker;
    }
    show(invoker: JSComponent, x: number, y: number): void {
        if (!(invoker instanceof JSMenu)) {
            var body: JSBody = JSBody.getInstance();
            body.setPopupMenu(this);
        }
        this.setInvoker(invoker);
        this.setX(x);
        this.setY(y);
        this.setSelected(true);
        this.setData("close", false);
    }
    setSelected(selected: boolean) {
        this.setVisible(selected);
        if (!selected) {
            var selection: JSSelection = this.getSelection();
            if (selection) {
                selection.setSelected(null);
            }
        }
        super.setSelected(selected);
    }
    getTimer(): JSTimer {
        var timer: JSTimer = this.getData("timer");
        if (!timer) {
            timer = new JSTimer();
            this.setData("timer", timer); 
        }
        return timer;
    }
}
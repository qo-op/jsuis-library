/// <reference path = "../jsuis.ts"/>
/**
 * JSPopupMenu
 * 
 * @author Yassuo Toda
 */
class JSPopupMenu extends JSHTMLComponent {
    
    invoker: JSComponent;
    
    constructor();
    constructor(element: HTMLDivElement);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        this.setStyle("border", "1px solid gray");
        this.setStyle("padding", "4px 0");
        this.setStyle("position", "absolute");
        // this.setLayout(new JSPopupMenuLayout());
        JSBody.getInstance().addMouseListener({
            mousePressed(mouseEvent: MouseEvent, popupMenu: JSPopupMenu) {
                var invoker: JSComponent = popupMenu.getInvoker();
                if (!(invoker instanceof JSMenu)) {
                    popupMenu.setData("close", true);
                    JSBody.getInstance().setTimeout(popupMenu, function() {
                        var close = popupMenu.getData("close");
                        if (close) {
                            popupMenu.setSelected(false);
                        }
                    });
                }
            }
        }, true).withArgs(this);
        this.addMouseListener({
            mousePressed(mouseEvent: MouseEvent, popupMenu: JSPopupMenu) {
                popupMenu.setData("close", false);
            }
        }, true).withArgs(this);
        this.setVisible(false);
        this.setZIndex(JSLayeredPane.POPUP_LAYER);
    }
    init(): void {
        this.addClass("JSPopupMenu");
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
        this.add(new JSMenuSeparator());
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
}
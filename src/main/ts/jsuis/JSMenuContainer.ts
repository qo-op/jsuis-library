/// <reference path = "../jsuis.ts"/>
/**
 * JSMenuContainer
 * 
 * @author Yassuo Toda
 */
class JSMenuContainer extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        JSBody.getInstance().addMouseListener({
            mousePressed(mouseEvent: MouseEvent, menuContainer: JSMenuContainer) {
                menuContainer.setData("pressed", false);
                var timer: JSTimer = menuContainer.getTimer();
                timer.schedule({
                    run() {
                        var pressed = menuContainer.getData("pressed");
                        if (!pressed) {
                            menuContainer.setSelected(false);
                        }
                    }
                }, 0);
            }
        }, true).withParameters(this);
        this.addMouseListener({
            mousePressed(mouseEvent: MouseEvent, menuContainer: JSMenuContainer) {
                menuContainer.setData("pressed", true);
            }
        }, true).withParameters(this);
    }
    init(): void {
        this.addClass("JSMenuContainer");
    }
    add(menu: JSMenu): void {
        var selection: JSSelection = this.getSelection();
        if (!selection) {
            selection = new JSSelection();
            this.setSelection(selection);
        }
        selection.add(menu);
        menu.setStyle("display", "inline-block");
        super.add(menu);
    }
    setSelected(selected: boolean) {
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
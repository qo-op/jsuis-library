/// <reference path = "../jsuis.ts"/>
/**
 * JSMenuContainer
 * 
 * @author Yassuo Toda
 */
class JSMenuContainer extends JSPanel {
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLDivElement) ? document.createElement("div") : arguments[0]);
        this.setUI("JSMenuContainer");
        
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
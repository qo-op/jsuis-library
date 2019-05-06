/// <reference path = "../jsuis.ts"/>
/**
 * JSMenuBar
 * 
 * @author Yassuo Toda
 */
class JSMenuBar extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        JSBody.getInstance().addMouseListener({
            mousePressed(mouseEvent: MouseEvent, menuBar: JSMenuBar) {
                menuBar.setData("pressed", false);
                JSBody.getInstance().setTimeout(menuBar, function() {
                    var pressed = menuBar.getData("pressed");
                    if (!pressed) {
                        menuBar.setSelected(false);
                    }
                });
            }
        }, true).withArgs(this);
        this.addMouseListener({
            mousePressed(mouseEvent: MouseEvent, menuBar: JSMenuBar) {
                menuBar.setData("pressed", true);
            }
        }, true).withArgs(this);
    }
    init(): void {
        this.addClass("JSMenuBar");
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
}
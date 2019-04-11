/// <reference path = "../jsuis.ts"/>
/**
 * JSMenuBarContainer
 * 
 * @author Yassuo Toda
 */
class JSMenuBarContainer extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        var menuBarContainer: JSMenuBarContainer = this;
        var body: JSBody = JSBody.getInstance();
        body.addMouseListener({
            mousePressed(mouseEvent: MouseEvent) {
                menuBarContainer.setData("pressed", false);
                body.setTimeout(menuBarContainer, function() {
                    var pressed = menuBarContainer.getData("pressed");
                    if (!pressed) {
                        menuBarContainer.setSelected(false);
                    }
                });
            }
        }, true);
        this.addMouseListener({
            mousePressed() {
                menuBarContainer.setData("pressed", true);
            }
        }, true);
        this.setClass("JSMenuBarContainer");
        this.setStyle("display", "inline-block");
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
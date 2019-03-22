/// <reference path = "../jsuis.ts"/>
class JSMenuBarContainer extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    // overload
    constructor(element?: HTMLDivElement) {
        // constructor();
        // constructor(element: HTMLDivElement);
        super(element === undefined ? document.createElement("div") : element);
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
    }
    init(): void {
        this.addClass("JSMenuBarContainer");
        this.setStyle("display", "inline-block");
    }
    add(menu: JSMenu): void {
        var selection: JSSelection = this.getSelection();
        if (!selection) {
            selection = new JSSelection();
            this.setSelection(selection);
        }
        selection.add(menu);
        menu.getLabel().setStyle("margin", "0 8px");
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
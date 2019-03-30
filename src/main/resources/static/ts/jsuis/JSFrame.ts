/// <reference path = "../jsuis.ts"/>
class JSFrame extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    // overload
    constructor(element?: HTMLDivElement) {
        // constructor();
        // constructor(element: HTMLDivElement);
        super(element === undefined ? document.createElement("div") : element);
        var body: JSBody = JSBody.getInstance();
        body.setContentPane(this);
        this.setLayout(new JSBorderLayout());
    }
    init(): void {
        this.addClass("JSFrame");
        this.setStyle("height", "100%");
        this.setVisible(false);
    }
    getMenuBar(): JSMenuBar {
        return this.getData("menuBar");
    }
    setMenuBar(menuBar: JSMenuBar) {
        this.add(menuBar, JSBorderLayout.NORTH, 0);
        this.setData("menuBar", menuBar);
    }
    setVisible(visible: boolean) {
        if (visible) {
            var body: JSBody = JSBody.getInstance();
            body.validate();
        }
        super.setVisible(visible);
    }
}
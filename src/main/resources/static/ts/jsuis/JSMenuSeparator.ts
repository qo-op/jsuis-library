/// <reference path = "../jsuis.ts"/>
/**
 * JSMenuSeparator
 * 
 * @author Yassuo Toda
 */
class JSMenuSeparator extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        var line = this.getData("line");
        if (!line) {
            line = new JSDiv();
            this.add(line);
            this.setData("line", line);
        }
        this.addMouseListener({
            mousePressed(mouseEvent: MouseEvent) {
                mouseEvent.stopPropagation();
            },
            mouseReleased(mouseEvent: MouseEvent) {
                mouseEvent.stopPropagation();
            }
        });
    }
    init(): void {
        this.addClass("JSMenuSeparator");
    }
}
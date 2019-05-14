/// <reference path = "../jsuis.ts"/>
/**
 * JSHorizontalSeparator
 * 
 * @author Yassuo Toda
 */
class JSHorizontalSeparator extends JSHTMLComponent {
    
    constructor();
    constructor(element: HTMLDivElement);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        
        var line: JSDiv = this.getLine();
        this.add(line);
        
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
        this.addClass("JSHorizontalSeparator");
    }
    getLine(): JSDiv {
        var line = this.getData("line");
        if (!line) {
            line = new JSDiv();
            this.setData("line", line);
        }
        return line;
    }
}
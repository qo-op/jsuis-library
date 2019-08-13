/// <reference path = "../jsuis.ts"/>
/**
 * JSIFrame
 * 
 * @author Yassuo Toda
 */
class JSIFrame extends JSHTMLComponent {

    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLIFrameElement) ? document.createElement("iframe") : arguments[0]);
        this.setUI("JSIFrame");
    }
    getSource(): string {
        return this.getAttribute("src");
    }
    setSource(source: string) {
        this.setAttribute("src", source);
    }
    open(): void {
        (<HTMLIFrameElement> this.element).contentWindow.document.open();
    }
    write(content: string): void {
        (<HTMLIFrameElement> this.element).contentWindow.document.write(content);
    }
    close(): void {
        (<HTMLIFrameElement> this.element).contentWindow.document.close();
    }
}
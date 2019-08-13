/// <reference path = "../jsuis.ts"/>
/**
 * JSTextArea
 * 
 * @author Yassuo Toda
 */
class JSTextArea extends JSHTMLComponent {

    constructor();
    constructor(element: HTMLElement);
    constructor(text: string);
    constructor(rows: number, columns: number);
    constructor(text: string, rows: number, columns: number);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLTextAreaElement) ? document.createElement("textarea") : arguments[0]);
        this.setUI("JSTextArea");
        switch (arguments.length) {
        case 0:
            break;
        case 1:
            // constructor(text: string);
            if (typeof arguments[0] === "string") {
                var text: string = arguments[0];
                this.setText(text);
            }
            break;
        case 2:
            // constructor(rows: number, columns: number);
            if (typeof arguments[0] === "number" && typeof arguments[1] === "number") {
                var rows: number = arguments[0];
                var columns: number = arguments[1];
                this.setRows(rows);
                this.setColumns(columns);
            }
            break;
        case 3:
            // constructor(text: string, rows: number, columns: number);
            if (typeof arguments[0] === "string" && typeof arguments[1] === "number" && typeof arguments[2] === "number") {
                var text: string = arguments[0];
                var rows: number = arguments[1];
                var columns: number = arguments[2];
                this.setText(text);
                this.setRows(rows);
                this.setColumns(columns);
            }
            break;
        default:
        }
    }
    getRows(): number {
        return +this.getAttribute("rows");
    }
    setRows(rows: number) {
        this.setAttribute("rows", "" + rows);
    }
    getColumns(): number {
        return +this.getAttribute("columns");
    }
    setColumns(columns: number) {
        this.setAttribute("columns", "" + columns);
    }
    getText(): string {
        return (<HTMLTextAreaElement> this.element).value; 
    }
    setText(text: string) {
        (<HTMLTextAreaElement> this.element).value = text;
    }
    append(text: string): void {
        this.setText(this.getText() + text);
    }
}
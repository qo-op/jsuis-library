/// <reference path = "../jsuis.ts"/>
/**
 * JSTextArea
 * 
 * @author Yassuo Toda
 */
class JSTextArea extends JSHTMLComponent {

    constructor();
    constructor(element: HTMLTextAreaElement);
    constructor(text: string);
    constructor(rows: number, columns: number);
    constructor(text: string, rows: number, columns: number);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLTextAreaElement) ? document.createElement("textarea") : args[0]);
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: HTMLTextAreaElement);
            // constructor(text: string);
            if (args[0] instanceof HTMLDivElement) {
            } else if (typeof args[0] === "string") {
                var text: string = args[0];
                this.setText(text);
            }
            break;
        case 2:
            // constructor(rows: number, columns: number);
            if (typeof args[0] === "number" && typeof args[1] === "number") {
                var rows: number = args[0];
                var columns: number = args[1];
                this.setRows(rows);
                this.setColumns(columns);
            }
            break;
        case 3:
            // constructor(text: string, rows: number, columns: number);
            if (typeof args[0] === "string" && typeof args[1] === "number" && typeof args[2] === "number") {
                var text: string = args[0];
                var rows: number = args[1];
                var columns: number = args[2];
                this.setText(text);
                this.setRows(rows);
                this.setColumns(columns);
            }
            break;
        default:
        }
        this.setStyle("border", "0");
        this.setStyle("margin", "0");
        this.setStyle("padding", "0");
        this.setClass("JSTextArea");
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
}
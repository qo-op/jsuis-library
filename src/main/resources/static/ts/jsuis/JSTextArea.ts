/// <reference path = "../jsuis.ts"/>
class JSTextArea extends JSHTMLComponent {

    constructor();
    constructor(element: HTMLTextAreaElement);
    constructor(rows: number, columns: number);
    constructor(text: string);
    constructor(text: string, rows: number, columns: number);
    // overload
    constructor(elementOrRowsOrText?: HTMLTextAreaElement | number | string, columnsOrRows?: number, columns?: number) {
        // constructor();
        // constructor(element: HTMLTextAreaElement);
        super(elementOrRowsOrText === undefined || !(elementOrRowsOrText instanceof HTMLTextAreaElement) ? document.createElement("textarea") : elementOrRowsOrText);
        if (elementOrRowsOrText !== undefined && !(elementOrRowsOrText instanceof HTMLTextAreaElement)) {
            if (typeof elementOrRowsOrText === "number") {
                // constructor(rows: number, columns: number);
                this.setRows(elementOrRowsOrText);
                this.setColumns(columnsOrRows);
            } else {
                // constructor(text: string);
                // constructor(text: string, rows: number, columns: number);
                this.setText(elementOrRowsOrText);
                if (columnsOrRows !== undefined) {
                    this.setRows(columnsOrRows);
                    this.setColumns(columns);
                }
            }
        }
    }
    init(): void {
        this.addClass("JSTextArea");
        this.setStyle("border", "0");
        this.setStyle("margin", "0");
        this.setStyle("padding", "0");
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
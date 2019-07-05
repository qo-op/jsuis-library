/// <reference path = "../jsuis.ts"/>
/**
 * JSFileChooser
 * 
 * @author Yassuo Toda
 */
class JSFileChooser extends JSHTMLComponent {
    
    selectedFiles: FileList;
    
    constructor();
    constructor(element: HTMLElement);
    // overload
    constructor() {
        // constructor();
        // constructor(element: HTMLElement);
        super(arguments.length === 0 || !(arguments[0] instanceof HTMLInputElement) ? document.createElement("input") : arguments[0]);
        this.setAttribute("type", "file");
        this.setUI("JSFileChooser");
        this.setStyle("display", "none");
        JSBody.getInstance().setFileChooser(this);
        
        this.addChangeListener({
            stateChanged(event: Event, source: JSComponent) {
                var fileChooser: JSFileChooser = <JSFileChooser> source;
                fileChooser.setSelectedFiles((<HTMLInputElement> fileChooser.element).files);
            }
        });
    }
    getFileFilter(): string {
        return this.getAttribute("accept");
    }
    setFileFilter(fileFilter: string) {
        this.setAttribute("accept", fileFilter);
    }
    showOpenDialog(): void {
        (<any> this.element).click();
    }
    getSelectedFiles(): FileList {
        return this.selectedFiles;
    }
    setSelectedFiles(selectedFiles: FileList) {
        this.selectedFiles = selectedFiles;
    }
}
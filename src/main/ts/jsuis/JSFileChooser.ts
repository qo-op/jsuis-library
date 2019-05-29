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
    constructor(...args: any[]) {
        // constructor();
        // constructor(element: HTMLElement);
        super(args.length === 0 || !(args[0] instanceof HTMLInputElement) ? document.createElement("input") : args[0]);
        this.setAttribute("type", "file");
        this.setStyle("display", "none");
        JSBody.getInstance().setFileChooser(this);
        
        this.addChangeListener({
            stateChanged(event: Event, source: JSComponent) {
                var fileChooser: JSFileChooser = <JSFileChooser> source;
                fileChooser.setSelectedFiles((<HTMLInputElement> fileChooser.element).files);
            }
        });
    }
    init(): void {
        this.addClass("JSFileChooser");
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
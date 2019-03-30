/// <reference path = "../jsuis.ts"/>
class JSFileChooser extends JSHTMLComponent {
    
    selectedFiles: FileList;
    
    constructor();
    constructor(element: HTMLInputElement);
    // overload
    constructor(element?: HTMLInputElement) {
        // constructor();
        // constructor(element: HTMLInputElement);
        super(element === undefined ? document.createElement("input") : element);
        this.setAttribute("type", "file");
        this.setStyle("display", "none");
        JSBody.getInstance().setFileChooser(this);
        
        this.addChangeListener(new JSChangeListener({
            stateChanged(event: Event, component: JSFileChooser) {
                component.setSelectedFiles((<HTMLInputElement> component.element).files);
            }
        }));
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
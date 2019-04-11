/// <reference path = "../jsuis.ts"/>
/**
 * JSFileChooser
 * 
 * @author Yassuo Toda
 */
class JSFileChooser extends JSHTMLComponent {
    
    selectedFiles: FileList;
    
    constructor();
    constructor(element: HTMLInputElement);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLInputElement) ? document.createElement("input") : args[0]);
        this.setAttribute("type", "file");
        this.setStyle("display", "none");
        JSBody.getInstance().setFileChooser(this);
        
        this.addChangeListener(new JSChangeListener({
            stateChanged(event: Event, component: JSFileChooser) {
                component.setSelectedFiles((<HTMLInputElement> component.element).files);
            }
        }));
        this.setClass("JSFileChooser");
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
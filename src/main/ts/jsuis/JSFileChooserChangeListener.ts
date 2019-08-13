/// <reference path = "../jsuis.ts"/>
/**
 * JSFileChooser
 * 
 * @author Yassuo Toda
 */
class JSFileChooserChangeListener implements JSChangeListener {
    
    private fileChooser: JSFileChooser;
    
    constructor(fileChooser: JSFileChooser) {
        this.setFileChooser(fileChooser);
    }
    getFileChooser(): JSFileChooser {
        return this.fileChooser;
    }
    setFileChooser(fileChooser: JSFileChooser) {
        this.fileChooser = fileChooser;
    }
    stateChanged(event: Event) {
        var fileChooser: JSFileChooser = this.getFileChooser();
        fileChooser.setSelectedFiles((<HTMLInputElement> fileChooser.element).files);
    }
}
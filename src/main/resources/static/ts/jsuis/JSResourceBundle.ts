/// <reference path = "../jsuis.ts"/>
/**
 * JSResourceBundle
 * 
 * @author Yassuo Toda
 */
class JSResourceBundle {

    contents: { [ key: string ]: string };
    
    constructor() {
        this.setContents({});
    }
    
    getContents() {
        return this.contents;
    }
    setContents(contents: { [ key: string ]: string }) {
        this.contents = contents;
    }
}
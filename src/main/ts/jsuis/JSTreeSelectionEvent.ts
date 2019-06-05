/// <reference path = "../jsuis.ts"/>
/**
 * JSTreeSelectionEvent
 * 
 * @author Yassuo Toda
 */
class JSTreeSelectionEvent {
    
    source: any;
    treePath: string;
    addedPath: boolean;
    
    constructor(source: any, treePath: string, addedPath: boolean) {
        this.setSource(source);
        this.setTreePath(treePath);
        this.setAddedPath(addedPath);
    }
    
    getSource(): any {
        return this.source;
    }
    setSource(source: any) {
        this.source = source;
    }
    getTreePath(): string {
        return this.treePath;
    }
    setTreePath(treePath: string) {
        this.treePath = treePath;
    }
    isAddedPath(): boolean {
        return this.addedPath;
    }
    setAddedPath(addedPath: boolean) {
        this.addedPath = addedPath;
    }
}
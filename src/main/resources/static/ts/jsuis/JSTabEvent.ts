/// <reference path = "../jsuis.ts"/>
class JSTabEvent {
    
    source: any;
    
    constructor(source: any) {
        this.setSource(source);
    }
    
    getSource(): any {
        return this.source;
    }
    setSource(source: any) {
        this.source = source;
    }
}
/// <reference path = "../jsuis.ts"/>
/**
 * JSDataTransfer
 * 
 * @author Yassuo Toda
 */
class JSDataTransfer {
    
    static instance: JSDataTransfer;
    static getInstance(): JSDataTransfer {
        if (JSDataTransfer.instance === undefined) {
            JSDataTransfer.instance = new JSDataTransfer();
        }
        return JSDataTransfer.instance;
    }
    static getData(key: string): any {
        return JSDataTransfer.getInstance().getData(key);
    }
    static setData(key: string, value: any) {
        JSDataTransfer.getInstance().setData(key, value);
    }
    static getDragImage(): Element {
        return JSDataTransfer.getInstance().getDragImage();
    }
    static setDragImage(dragImage: Element) {
        JSDataTransfer.getInstance().setDragImage(dragImage);
    }
    
    data: { [ key: string ]: any } = {};
    
    getData(key: string): any {
        var data = this.data;
        return data[key];
    }
    setData(key: string, value: any) {
        var data = this.data;
        data[key] = value;
    }
    getDragImage(): Element {
        return JSBody.getInstance().getDragImage();
    }
    setDragImage(dragImage: Element) {
        JSBody.getInstance().setDragImage(dragImage);
    }
}
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
    static getDragImage(): JSComponent {
        return JSDataTransfer.getInstance().getDragImage();
    }
    static setDragImage(dragImage: JSComponent) {
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
    getDragImage(): JSComponent {
        return JSBody.getInstance().getDragImage();
    }
    setDragImage(dragImage: JSComponent) {
        JSBody.getInstance().setDragImage(dragImage);
    }
}
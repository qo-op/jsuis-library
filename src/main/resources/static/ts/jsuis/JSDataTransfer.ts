/// <reference path = "../jsuis.ts"/>
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
        var dragImage = this.getData("dragImage");
        if (!dragImage) {
            dragImage = new Image(1, 1);
            dragImage.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAANSURBVBhXY/j///9/AAn7A/0FQ0XKAAAAAElFTkSuQmCC";
            this.setDragImage(dragImage);
        }
        return dragImage;
    }
    setDragImage(dragImage: Element) {
        JSBody.getInstance().setDragImage(dragImage);
        this.setData("dragImage", dragImage);
    }
}
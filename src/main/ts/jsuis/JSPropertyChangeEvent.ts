/// <reference path = "../jsuis.ts"/>
/**
 * JSPropertyChangeEvent
 * 
 * @author Yassuo Toda
 */
class JSPropertyChangeEvent {
    
    source: any;
    propertyName: string;
    oldValue: any;
    newValue: any;
    
    constructor(source: any, propertyName: string, oldValue: any, newValue: any) {
        this.setSource(source);
        this.setPropertyName(propertyName);
        this.setOldValue(oldValue);
        this.setNewValue(newValue);
    }
    
    getSource(): any {
        return this.source;
    }
    setSource(source: any) {
        this.source = source;
    }
    getPropertyName(): string {
        return this.propertyName;
    }
    setPropertyName(propertyName: string) {
        this.propertyName = propertyName;
    }
    getOldValue(): any {
        return this.oldValue;
    }
    setOldValue(oldValue: any) {
        this.oldValue = oldValue;
    }
    getNewValue(): any {
        return this.newValue;
    }
    setNewValue(newValue: any) {
        this.newValue = newValue;
    }
}
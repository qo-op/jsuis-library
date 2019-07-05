/// <reference path = "../jsuis.ts"/>
/**
 * JSProperties
 * 
 * @author Yassuo Toda
 */
class JSProperties {

    properties: { [ key: string ]: string };
    
    constructor() {
        this.setProperties({});
    }
    
    getProperties() {
        return this.properties;
    }
    setProperties(properties: { [ key: string ]: string }) {
        this.properties = properties;
    }
    getProperty(key: string): string;
    getProperty(key: string, defaultValue: string): string;
    // overload
    getProperty(): string {
        var value: string;
        var properties = this.getProperties();
        switch (arguments.length) {
        case 1:
            // getProperty(key: string): string;
            if (typeof arguments[0] === "string") {
                var key: string = arguments[0];
                value = properties[key];
            }
        case 2:
            // getProperty(key: string, defaultValue: string): string;
            if (typeof arguments[0] === "string" && typeof arguments[1] === "string") {
                var key: string = arguments[0];
                var defaultValue: string = arguments[1];
                value = properties[key];
                if (value === undefined) {
                    value = defaultValue;
                }
            }
            break;
        default:
        }
        return value;
    }
    setProperty(key: string, value: string) {
        var properties = this.getProperties();
        properties[key] = value;
    }
    load() {
    }
}
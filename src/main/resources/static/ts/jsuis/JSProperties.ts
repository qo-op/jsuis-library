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
    getProperty(...args: any[]): string {
        var value: string;
        var properties = this.getProperties();
        switch (args.length) {
        case 1:
            // getProperty(key: string): string;
            if (typeof args[0] === "string") {
                var key: string = args[0];
                value = properties[key];
            }
        case 2:
            // getProperty(key: string, defaultValue: string): string;
            if (typeof args[0] === "string" && typeof args[1] === "string") {
                var key: string = args[0];
                var defaultValue: string = args[1];
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
}
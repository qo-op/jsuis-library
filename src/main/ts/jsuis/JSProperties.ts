/// <reference path = "../jsuis.ts"/>
/**
 * JSProperties
 * 
 * @author Yassuo Toda
 */
class JSProperties {

    keyValuePairs: { [ key: string ]: string };
    
    constructor() {
        this.setKeyValuePairs({});
    }
    
    getKeyValuePairs() {
        return this.keyValuePairs;
    }
    setKeyValuePairs(keyValuePairs: { [ key: string ]: string }) {
        this.keyValuePairs = keyValuePairs;
    }
    getProperty(key: string): string;
    getProperty(key: string, defaultValue: string): string;
    // overload
    getProperty(): string {
        var value: string = null;
        var properties = this.getKeyValuePairs();
        switch (arguments.length) {
        case 1:
            // getProperty(key: string): string;
            if (typeof arguments[0] === "string") {
                var key: string = arguments[0];
                value = properties[key];
                if (value === undefined) {
                    value = null;
                }
            }
            break;
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
        var properties = this.getKeyValuePairs();
        properties[key] = value;
    }
    remove(key: string) {
        var properties = this.getKeyValuePairs();
        delete properties[key];
    }
    load(properties: JSProperties) {
        var keyValuePairs: { [ key: string ]: string } = properties.getKeyValuePairs();
        for (var key in keyValuePairs) {
            this.setProperty(key, keyValuePairs[key]);
        }
    }
}
/// <reference path = "../jsuis.ts"/>
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
    getProperty(key: string, defaultValue?: string): string {
        var properties = this.getProperties();
        if (defaultValue === undefined) {
            return properties[key];
        } else {
            var value = properties[key];
            if (value !== undefined) {
                return value;
            } else {
                return defaultValue;
            }
        }
    }
    setProperty(key: string, value: string) {
        var properties = this.getProperties();
        properties[key] = value;
    }
}
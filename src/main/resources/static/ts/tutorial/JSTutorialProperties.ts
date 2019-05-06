/// <reference path = "../tutorial.ts"/>
/**
 * JSUIS tutorial
 */
class JSTutorialProperties extends JSProperties {

    static instance: JSTutorialProperties;
    static getInstance(): JSTutorialProperties {
        if (JSTutorialProperties.instance === undefined) {
            JSTutorialProperties.instance = new JSTutorialProperties();
        }
        return JSTutorialProperties.instance;
    }
    
    static getProperty(key: string): string {
        return JSTutorialProperties.getInstance().getProperty(key);
    }
    static setProperty(key: string, value: string) {
        JSTutorialProperties.getInstance().setProperty(key, value);
    }
    
    constructor() {
        super();
    }
}

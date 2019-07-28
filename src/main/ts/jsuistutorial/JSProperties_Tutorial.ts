/// <reference path = "../jsuistutorial.ts"/>
/**
 * JSProperties_JSTutorial
 */
namespace jsuistutorial {
    export class JSProperties_Tutorial extends JSProperties {
        
        setProperty(key: string, value: string): void {
            switch (key) {
            case "args":
                if (value) {
                    var args: any = JSON.parse(value);
                    for (key in args) {
                        this.setProperty(key, args[key]);
                    }
                }
                break;
            default:
                super.setProperty(key, value);    
            }
        }
    }
}

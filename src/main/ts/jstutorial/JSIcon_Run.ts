/// <reference path = "../jstutorial.ts"/>
/**
 * JSIcon_Run
 */
namespace jstutorial {
    export class JSIcon_Run extends JSImageIcon {
        
        static instance: JSIcon_Run;
        static getInstance(): JSIcon_Run {
            if (JSIcon_Run.instance === undefined) {
                JSIcon_Run.instance = new JSIcon_Run();
            }
            return JSIcon_Run.instance;
        }
        constructor() {
            super("/img/baseline-play_arrow-24px-Green.svg", 16, 16);
        }
    }
}

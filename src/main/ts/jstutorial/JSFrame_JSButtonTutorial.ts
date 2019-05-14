/// <reference path = "../jstutorial.ts"/>
/**
 * JSFrame_JSButtonTutorial
 */
namespace jstutorial {
    export class JSFrame_JSButtonTutorial extends JSFrame_JSTutorial {
        
        init(): void {
            this.addClass("JSFrame");
            this.addClass("JSFrame_JSButtonTutorial");
            
            var jsSplitPane_JSTutorial: JSSplitPane_JSTutorial = JSSplitPane_JSTutorial.getInstance();
            
            var jsDiv_JSButtonTutorial: JSDiv_JSButtonTutorial = JSDiv_JSButtonTutorial.getInstance();
            jsSplitPane_JSTutorial.setRightComponent(new JSScrollPane(jsDiv_JSButtonTutorial));
        }
    }
}

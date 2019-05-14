/// <reference path = "../jstutorial.ts"/>
/**
 * JSPanel_Title
 */
namespace jstutorial {
    export class JSPanel_Title extends JSPanel {
        
        static instance: JSPanel_Title;
        static getInstance(): JSPanel_Title {
            if (JSPanel_Title.instance === undefined) {
                JSPanel_Title.instance = new JSPanel_Title();
            }
            return JSPanel_Title.instance;
        }
        constructor() {
            super(new JSGridBagLayout());
            this.addClass("JSPanel_Title");
            var label: JSLabel = this.getLabel();
            this.add(label);
        }
        getLabel(): JSLabel {
            var titleLabel: JSLabel = this.getData("titleLabel");
            if (!titleLabel) {
                titleLabel = new JSLabel("JSUIS - JavaScript User Interface");
                this.setData("titleLabel", titleLabel);
            }
            return titleLabel;
        }
    }
}

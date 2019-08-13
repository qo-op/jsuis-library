/// <reference path = "../jsuis.ts"/>
/**
 * JSButtonGroup
 * 
 * @author Yassuo Toda
 */
class JSButtonGroup {
    
    name: string;
    components: JSComponent[];
    
    constructor(name?: string) {
        this.setName(name || ("" + new Date().getTime()));
    }
    getName(): string {
        return this.name;
    }
    setName(name: string) {
        this.name = name;
        var components: JSComponent[] = this.getComponents();
        for (var i: number = 0; i < components.length; i++) {
            var component: JSComponent = components[i];
            component.setName(name);
        }
    }
    getComponents(): JSComponent[] {
        if (!this.components) {
            this.components = [];
        }
        return this.components;
    }
    add(component: JSComponent) {
        var name: string = this.getName();
        if (component instanceof JSRadioButtonMenuItem) {
            component.getInput().setName(name);
        }
        var components: JSComponent[] = this.getComponents();
        components.push(component);
    }
}

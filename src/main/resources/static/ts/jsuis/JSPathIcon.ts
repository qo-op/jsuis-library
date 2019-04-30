/// <reference path = "../jsuis.ts"/>
/**
 * JSPathIcon
 * 
 * @author Yassuo Toda
 */
class JSPathIcon extends JSIcon {
    
    background: string;
    foreground: string;
    
    getBackground(): string {
        return this.background;
    }
    setBackground(background: string) {
        this.background = background;
    }
    withBackground(background: string) {
        this.setBackground(background);
        return this;
    }
    getForeground(): string {
        return this.foreground;
    }
    setForeground(foreground: string) {
        this.foreground = foreground;
    }
    withForeground(foreground: string) {
        this.setForeground(foreground);
        return this;
    }
}
/// <reference path = "../jsuis.ts"/>
interface ActionListener {
    actionPerformed(actionEvent: JSActionEvent, component?: JSComponent): void;
}
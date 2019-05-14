/// <reference path = "../jsuis.ts"/>
/**
 * JSTreeNode
 * 
 * @author Yassuo Toda
 */
class JSTreeNode {
    
    userObject: any = null;
    nodes: JSTreeNode[] = [];
    parent: JSTreeNode = null;
    expanded: boolean = false;
    
    constructor();
    constructor(userObject: any);
    // overload
    constructor(...args: any[]) {
        // constructor();
        switch (args.length) {
        case 1:
            // constructor(userObject: any);
            var userObject: any = args[0];
            this.setUserObject(userObject);
            break;
        default:
        }
    }
    add(node: JSTreeNode): void {
        this.nodes.push(node);
        node.parent = this;
    }
    remove(node: JSTreeNode): void {
        var index: number = this.nodes.indexOf(node);
        if (index === -1) {
            return;
        }
        this.nodes.splice(index, 1);
        node.parent = null;
    }
    children(): JSTreeNode[] {
        return this.nodes;
    }
    getParent(): JSTreeNode {
        return this.parent;
    }
    getUserObject() {
        return this.userObject;
    }
    setUserObject(userObject: any) {
        this.userObject = userObject;
    }
    getTreePath(): string {
        var treePath: string = this.toString();
        var parent: JSTreeNode = this.getParent();
        while (parent) {
            treePath = parent.toString() + "/" + treePath;
            parent = parent.getParent();
        }
        return treePath;
    }
    isLeaf(): boolean {
        return this.children().length === 0;
    }
    isExpanded(): boolean {
        return this.expanded;
    }
    setExpanded(expanded: boolean) {
        this.expanded = expanded;
    }
    toString(): string {
        return "" + (this.userObject || "");
    }
}
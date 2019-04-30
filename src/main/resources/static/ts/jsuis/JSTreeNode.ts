/// <reference path = "../jsuis.ts"/>
/**
 * JSTreeNode
 * 
 * @author Yassuo Toda
 */
class JSTreeNode {
    
    userObject: any = null;
    allowsChildren: boolean = true;
    nodes: JSTreeNode[] = [];
    parent: JSTreeNode = null;
    expanded: boolean = false;
    
    constructor();
    constructor(userObject: any);
    constructor(userObject: any, allowsChildren: boolean);
    // overload
    constructor(...args: any[]) {
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(userObject: any);
            var userObject: any = args[0];
            this.setUserObject(userObject);
            break;
        case 2:
            // constructor(userObject: any, allowsChildren: boolean);
            if (typeof args[1] === "boolean") {
                var userObject: any = args[0];
                var allowsChildren: boolean = args[1];
                this.setUserObject(userObject);
                this.setAllowsChildren(allowsChildren);
            }
            break;
        default:
        }
    }
    getAllowsChildren(): boolean {
        return this.allowsChildren;
    }
    setAllowsChildren(allowsChildren: boolean) {
        this.allowsChildren = allowsChildren;
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
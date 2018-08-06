/// <reference path = "../jsuis.ts"/>
class JSTreeNode {
    
    userObject: any = null;
    allowsChildren: boolean = true;
    nodes: JSTreeNode[] = [];
    parent: JSTreeNode = null;
    
    constructor();
    constructor(userObject: any);
    constructor(userObject: any, allowsChildren: boolean);
    // overload
    constructor(userObject?: any, allowsChildren?: boolean) {
        // constructor();
        if (userObject !== undefined) {
            // constructor(userObject: any);
            // constructor(userObject: any, allowsChildren: boolean);
            this.setUserObject(userObject);
            if (allowsChildren !== undefined) {
                this.setAllowsChildren(allowsChildren);
            }
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
    toString(): string {
        return "" + (this.userObject || "");
    }
}
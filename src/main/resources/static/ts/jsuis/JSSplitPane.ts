/// <reference path = "../jsuis.ts"/>
/**
 * JSSplitPane
 * 
 * @author Yassuo Toda
 */
class JSSplitPane extends JSHTMLComponent {
    
    dividerLocation: number = -1;
    dividerProportionalLocation: number = -1;
    lastDividerLocation: number = -1;
    
    constructor();
    constructor(element: HTMLDivElement);
    constructor(orientation: string);
    // overload
    constructor(...args: any[]) {
        super(args.length === 0 || !(args[0] instanceof HTMLDivElement) ? document.createElement("div") : args[0]);
        switch (args.length) {
        case 0:
            // constructor();
            break;
        case 1:
            // constructor(element: HTMLDivElement);
            // constructor(selected: boolean);
            if (args[0] instanceof HTMLDivElement) {
            } else if (typeof args[0] === "string") {
                var orientation: string = args[0];
                this.setOrientation(orientation);
            }
            break;
        default:
        }
        this.setLayout(new JSSplitPaneLayout());
        this.setDividerSize(4);
    }
    init(): void {
        this.addClass("JSSplitPane");
    }
    getOrientation(): string {
        return this.getAttribute("data-orientation");
    }
    setOrientation(orientation: string) {
        this.setAttribute("data-orientation", orientation);
    }
    getLeftContainer(): JSPanel {
        var leftContainer: JSPanel = this.getData("leftContainer");
        if (!leftContainer) {
            leftContainer = new JSPanel();
            leftContainer.setLayout(new JSBorderLayout());
            this.add(leftContainer);
            this.setData("leftContainer", leftContainer);
        }
        return leftContainer;
    }
    getRightContainer(): JSPanel {
        var rightContainer: JSPanel = this.getData("rightContainer");
        if (!rightContainer) {
            rightContainer = new JSPanel();
            rightContainer.setLayout(new JSBorderLayout());
            this.add(rightContainer);
            this.setData("rightContainer", rightContainer);
        }
        return rightContainer;
    }
    getLeftComponent(): JSComponent {
        var leftContainer: JSPanel = this.getLeftContainer();
        var components: JSComponent[] = leftContainer.getComponents();
        if (components.length === 1) {
            return components[0];
        }
        return null;
    }
    setLeftComponent(leftComponent: JSComponent) {
        var leftContainer: JSPanel = this.getLeftContainer();
        leftContainer.removeAll();
        leftContainer.add(leftComponent);
    }
    getRightComponent(): JSComponent {
        var rightContainer: JSPanel = this.getRightContainer();
        var components: JSComponent[] = rightContainer.getComponents();
        if (components.length === 1) {
            return components[0];
        }
        return null;
    }
    setRightComponent(rightComponent: JSComponent) {
        var rightContainer: JSPanel = this.getRightContainer();
        rightContainer.removeAll();
        rightContainer.add(rightComponent);
    }
    getTopComponent(): JSComponent {
        return this.getLeftComponent();
    }
    setTopComponent(component: JSComponent) {
        this.setLeftComponent(component);
    }
    getBottomComponent(): JSComponent {
        return this.getRightComponent();
    }
    setBottomComponent(component: JSComponent) {
        this.setRightComponent(component);
    }
    getDivider(): JSPanel {
        var divider: JSPanel = this.getData("divider");
        if (!divider) {
            divider = new JSPanel();
            divider.setLayout(new JSBorderLayout());
            var orientation: string = this.getOrientation();
            divider.setCursor(orientation === JSSplitPane.VERTICAL_SPLIT ? "ns-resize" : "ew-resize");
            this.add(divider);
            divider.addMouseListener({
                mousePressed(mouseEvent: MouseEvent, divider: JSPanel) {
                    var splitPane = <JSSplitPane> divider.getParent();
                    var orientation = splitPane.getOrientation();
                    if (orientation === JSSplitPane.VERTICAL_SPLIT) {
                        splitPane.setData("dy", mouseEvent.y - splitPane.getDividerLocation());
                    } else {
                        splitPane.setData("dx", mouseEvent.x - splitPane.getDividerLocation());
                    }
                    mouseEvent.stopPropagation();
                },
                mouseDragged(mouseEvent: MouseEvent, divider: JSPanel) {
                    var splitPane = <JSSplitPane> divider.getParent();
                    var orientation = splitPane.getOrientation();
                    if (orientation === JSSplitPane.VERTICAL_SPLIT) {
                        var y = mouseEvent.y;
                        if (y) {
                            (<JSSplitPane> splitPane).setDividerLocation(y - splitPane.getData("dy"));
                        }
                    } else {
                        var x = mouseEvent.x;
                        if (x) {
                            (<JSSplitPane> splitPane).setDividerLocation(x - splitPane.getData("dx"));
                        }
                    }
                    mouseEvent.stopPropagation();
                }
            }).withArgs(divider);
            this.setData("divider", divider);
        }
        return divider;
    }
    getDividerSize() {
        return +this.getAttribute("data-divider-size");
    }
    setDividerSize(dividerSize: number) {
        this.setAttribute("data-divider-size", "" + dividerSize);
    }
    getDividerLocation(): number {
        return this.dividerLocation;
    }
    getDividerProportionalLocation(): number {
        return this.dividerProportionalLocation;
    }
    setDividerProportionalLocation(dividerProportionalLocation: number) {
        this.dividerProportionalLocation = dividerProportionalLocation;
    }
    setDividerLocation(dividerLocation: number) {
        this.setLastDividerLocation(this.getDividerLocation());
        this._setDividerLocation(dividerLocation);
        this.validateChildren();
    }
    getLastDividerLocation(): number {
        return this.lastDividerLocation;
    }
    setLastDividerLocation(lastDividerLocation: number) {
        this.lastDividerLocation = lastDividerLocation;
    }
    _setDividerLocation(dividerLocation: number) {
        dividerLocation = Math.min(Math.max(dividerLocation, this.getMinimumDividerLocation()), this.getMaximumDividerLocation());
        this.dividerLocation = dividerLocation;
        var orientation: string = this.getOrientation();
        var leftContainer: JSPanel = this.getLeftContainer();
        var rightContainer: JSPanel = this.getRightContainer();
        var divider: JSPanel = this.getDivider();
        var dividerSize: number = this.getDividerSize();
        if (orientation === JSSplitPane.VERTICAL_SPLIT) {
            var height: number = this.getHeight();
            var height100: number = height + this.getPaddingTop() + this.getPaddingBottom();
            divider.setY(dividerLocation);
            rightContainer.setY(dividerLocation + dividerSize);
            leftContainer.setOuterHeight(dividerLocation);
            rightContainer.setOuterHeight(height - height100 - dividerLocation - dividerSize, 100);
        } else {
            var width: number = this.getWidth();
            var width100: number = width + this.getPaddingLeft() + this.getPaddingRight();
            divider.setX(dividerLocation);
            rightContainer.setX(dividerLocation + dividerSize);
            leftContainer.setOuterWidth(dividerLocation);
            rightContainer.setOuterWidth(width - width100 - dividerLocation - dividerSize, 100);
        }
    }
    getMinimumDividerLocation(): number {
        return 0;
    }
    getMaximumDividerLocation(): number {
        var dividerSize = this.getDividerSize();
        var orientation: string = this.getOrientation();
        if (orientation === JSSplitPane.VERTICAL_SPLIT) {
            return this.getHeight() - dividerSize;
        } else {
            return this.getWidth() - dividerSize;
        }
    }
}
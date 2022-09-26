document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("action", function (ev) {
        const action = ev.detail.action;
        const actionListener = window[action];
        if (actionListener !== undefined) {
            actionListener(ev);
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("click", function (ev) {
        const target = ev.target;
        const button = document.evaluate("ancestor-or-self::button[position() = 1]", target, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (button === null) {
            return;
        }
        const action = button.dataset.action;
        if (action !== undefined && action.trim() !== "") {
            document.dispatchEvent(new CustomEvent("action", {
                detail: {
                    button: button,
                    action: action
                }
            }));
        }
    });
});
class MenuUtils {
    static get instance() {
        if (MenuUtils._instance == null) {
            MenuUtils._instance = new MenuUtils();
        }
        return MenuUtils._instance;
    }
    open(menuBar) {
        menuBar.classList.add("open");
    }
    close(menuBar) {
        menuBar.classList.add("closed");
        menuBar.classList.remove("open");
        MenuUtils.instance.select(menuBar, menuBar, null);
    }
    select(menuBar, ul, li) {
        this.clearTimeout(menuBar);
        if (ul === menuBar) {
            if (li !== null && li.classList.contains("selected")) {
                return;
            }
            menuBar.querySelectorAll(":scope li.selected").forEach(function (selected) {
                selected.classList.remove("selected");
            });
            if (li !== null) {
                li.classList.add("selected");
            }
        }
        else {
            if (li === null) {
                this.setTimeout(menuBar, function () {
                    for (let i = 0; i < ul.children.length; i++) {
                        ul.children[i].classList.remove("selected");
                    }
                }, 250);
            }
            else {
                this.setTimeout(menuBar, function () {
                    for (let i = 0; i < ul.children.length; i++) {
                        const child = ul.children[i];
                        if (child === li) {
                            child.classList.add("selected");
                        }
                        else {
                            child.classList.remove("selected");
                        }
                    }
                }, 250);
            }
        }
    }
    clearTimeout(menuBar) {
        if (menuBar.dataset.timeoutId !== undefined) {
            clearTimeout(+menuBar.dataset.timeoutId);
        }
    }
    setTimeout(menuBar, handler, timeout) {
        menuBar.dataset.timeoutId = "" + setTimeout(handler, timeout);
    }
}
MenuUtils._instance = null;
class MenuEventListener {
    constructor() {
        this.shortcuts = new Map();
    }
    static get instance() {
        if (MenuEventListener._instance == null) {
            MenuEventListener._instance = new MenuEventListener();
        }
        return MenuEventListener._instance;
    }
    mousedown(ev) {
        const target = ev.target;
        if (ev.currentTarget === document) {
            document.querySelectorAll(`
					.menu-bar.menu-event-listener
			`).forEach(function (menuBar) {
                MenuUtils.instance.close(menuBar);
            });
            return;
        }
        const menuBar = ev.currentTarget;
        if (menuBar.classList.contains("open")) {
            if (target === menuBar) {
                MenuUtils.instance.close(menuBar);
            }
            ev.stopPropagation();
            return;
        }
        const li = document.evaluate("ancestor-or-self::li[position() = 1]", target, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (li === null) {
            return;
        }
        li.classList.add("selected");
        MenuUtils.instance.open(menuBar);
        ev.stopPropagation();
    }
    mouseup(ev) {
        const target = ev.target;
        const li = document.evaluate("ancestor-or-self::li[position() = 1]", target, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (li === null) {
            return;
        }
        const input = li.querySelector(":scope>input, :scope>:not(ul) input");
        if (input !== null) {
            if (input.type === "radio") {
                if (!input.checked) {
                    input.checked = true;
                }
            }
            else if (input.type === "checkbox") {
                input.checked = !input.checked;
            }
        }
        const menuBar = ev.currentTarget;
        const action = li.dataset.action;
        if (action !== undefined && action.trim() !== "") {
            document.dispatchEvent(new CustomEvent("action", {
                detail: {
                    menuBar: menuBar,
                    menuItem: li,
                    action: action
                }
            }));
        }
        if (menuBar.classList.contains("closed")) {
            menuBar.classList.remove("closed");
            return;
        }
        const ul = li.querySelector(":scope>ul");
        if (ul !== null && li.parentElement !== menuBar) {
            return;
        }
        MenuUtils.instance.close(menuBar);
    }
    mouseover(ev) {
        const menuBar = ev.currentTarget;
        if (!menuBar.classList.contains("open")) {
            return;
        }
        const target = ev.target;
        const li = document.evaluate("ancestor-or-self::li[position() = 1]", target, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (li === null) {
            return;
        }
        MenuUtils.instance.select(menuBar, li.parentElement, li);
    }
    mouseleave(ev) {
        const menuBar = ev.currentTarget;
        MenuUtils.instance.clearTimeout(menuBar);
        menuBar.querySelectorAll(":scope li.selected").forEach(function (selected) {
            const ul = selected.querySelector(":scope>ul");
            if (ul === null) {
                selected.classList.remove("selected");
            }
        });
    }
    keydown(ev) {
        let key = "";
        if (ev.ctrlKey) {
            key += "ctrl ";
        }
        if (ev.shiftKey) {
            key += "shift ";
        }
        if (ev.altKey) {
            key += "alt ";
        }
        if (ev.metaKey) {
            key += "meta ";
        }
        key += ev.key.toLowerCase();
        key = key.trim();
        const action = MenuEventListener.instance.shortcuts.get(key);
        if (action !== undefined && action.trim() !== "") {
            document.dispatchEvent(new CustomEvent("action", {
                detail: {
                    action: action
                }
            }));
        }
        ev.preventDefault();
    }
}
MenuEventListener._instance = null;
document.addEventListener("DOMContentLoaded", function () {
    const menus = document.querySelectorAll(`
			.menu-bar.menu-event-listener
	`);
    menus.forEach(function (element) {
        const menuBar = element;
        menuBar.addEventListener("mousedown", MenuEventListener.instance.mousedown);
        menuBar.addEventListener("mouseup", MenuEventListener.instance.mouseup);
        menuBar.addEventListener("mouseover", MenuEventListener.instance.mouseover);
        menuBar.addEventListener("mouseleave", MenuEventListener.instance.mouseleave);
        MenuUtils.instance.close(menuBar);
        menuBar.querySelectorAll(`
				:scope [data-shortcut]
		`).forEach(function (element) {
            const accelerator = element;
            const shortcut = accelerator.dataset.shortcut;
            if (shortcut === undefined || shortcut.trim() === "") {
                return;
            }
            let s = " " + shortcut.toLowerCase() + " ";
            let key = "";
            if (s.includes(" ctrl ")) {
                key += "ctrl ";
                s = s.replace(" ctrl ", " ");
            }
            if (s.includes(" control ")) {
                key += "ctrl ";
                s = s.replace(" control ", " ");
            }
            if (s.includes(" shift ")) {
                key += "shift ";
                s = s.replace(" shift ", " ");
            }
            if (s.includes(" alt ")) {
                key += "alt ";
                s = s.replace(" alt ", " ");
            }
            if (s.includes(" meta ")) {
                key += "meta ";
                s = s.replace(" meta ", " ");
            }
            key += s.trim();
            key = key.trim();
            const span = document.createElement("span");
            span.textContent = shortcut.trim().replace(/ +/, "+");
            accelerator.appendChild(span);
            const li = document.evaluate("ancestor::li[position() = 1]", accelerator, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (li === null) {
                return;
            }
            const action = li.dataset.action;
            if (action !== undefined && action.trim() !== "") {
                MenuEventListener.instance.shortcuts.set(key, action);
            }
        });
    });
    if (menus.length > 0) {
        document.addEventListener("mousedown", MenuEventListener.instance.mousedown);
        document.addEventListener("keydown", MenuEventListener.instance.keydown);
    }
});
class SplitPaneUtils {
    static get instance() {
        if (SplitPaneUtils._instance == null) {
            SplitPaneUtils._instance = new SplitPaneUtils();
        }
        return SplitPaneUtils._instance;
    }
    setDividerProportionalLocation(splitPane, proportionalLocation, verticalSplit) {
        if (verticalSplit === undefined) {
            verticalSplit = splitPane.classList.contains("vertical-split-pane");
        }
        const leftComponent = splitPane.children[0];
        const rightComponent = splitPane.children[2];
        const leftComponentRect = leftComponent.getBoundingClientRect();
        const rightComponentRect = rightComponent.getBoundingClientRect();
        const leftComponentComputedStyle = getComputedStyle(leftComponent);
        const rightComponentComputedStyle = getComputedStyle(rightComponent);
        let maximumDividerLocation = 0;
        if (verticalSplit) {
            maximumDividerLocation = leftComponentRect.height - +leftComponentComputedStyle.borderTopWidth.replace("px", "") - +leftComponentComputedStyle.borderBottomWidth.replace("px", "");
            maximumDividerLocation += rightComponentRect.height - +rightComponentComputedStyle.borderTopWidth.replace("px", "") - +rightComponentComputedStyle.borderBottomWidth.replace("px", "");
            const dividerLocation = proportionalLocation * maximumDividerLocation;
            leftComponent.style.height = dividerLocation + "px";
        }
        else {
            maximumDividerLocation = leftComponentRect.width - +leftComponentComputedStyle.borderLeftWidth.replace("px", "") - +leftComponentComputedStyle.borderRightWidth.replace("px", "");
            maximumDividerLocation += rightComponentRect.width - +rightComponentComputedStyle.borderLeftWidth.replace("px", "") - +rightComponentComputedStyle.borderRightWidth.replace("px", "");
            const dividerLocation = proportionalLocation * maximumDividerLocation;
            leftComponent.style.width = dividerLocation + "px";
        }
    }
    setDividerLocation(splitPane, location, verticalSplit) {
        if (verticalSplit === undefined) {
            verticalSplit = splitPane.classList.contains("vertical-split-pane");
        }
        const leftComponent = splitPane.children[0];
        if (verticalSplit) {
            leftComponent.style.height = location + "px";
        }
        else {
            leftComponent.style.width = location + "px";
        }
    }
}
SplitPaneUtils._instance = null;
class SplitPaneEventListener {
    static get instance() {
        if (SplitPaneEventListener._instance == null) {
            SplitPaneEventListener._instance = new SplitPaneEventListener();
        }
        return SplitPaneEventListener._instance;
    }
    mousedown(ev) {
        const divider = ev.target;
        const splitPane = divider.parentElement;
        const leftComponent = divider.previousElementSibling;
        const rightComponent = divider.nextElementSibling;
        const leftComponentRect = leftComponent.getBoundingClientRect();
        const rightComponentRect = rightComponent.getBoundingClientRect();
        const leftComponentComputedStyle = getComputedStyle(leftComponent);
        const rightComponentComputedStyle = getComputedStyle(rightComponent);
        const verticalSplit = splitPane.classList.contains("vertical-split-pane");
        let offset = 0;
        let maximumDividerLocation = 0;
        if (verticalSplit) {
            offset = ev.y - leftComponentRect.height;
            maximumDividerLocation = leftComponentRect.height - +leftComponentComputedStyle.borderTopWidth.replace("px", "") - +leftComponentComputedStyle.borderBottomWidth.replace("px", "");
            maximumDividerLocation += rightComponentRect.height - +rightComponentComputedStyle.borderTopWidth.replace("px", "") - +rightComponentComputedStyle.borderBottomWidth.replace("px", "");
        }
        else {
            offset = ev.x - leftComponentRect.width;
            maximumDividerLocation = leftComponentRect.width - +leftComponentComputedStyle.borderLeftWidth.replace("px", "") - +leftComponentComputedStyle.borderRightWidth.replace("px", "");
            maximumDividerLocation += rightComponentRect.width - +rightComponentComputedStyle.borderLeftWidth.replace("px", "") - +rightComponentComputedStyle.borderRightWidth.replace("px", "");
        }
        const glassPane = document.createElement("div");
        glassPane.classList.add("glass-pane");
        document.body.appendChild(glassPane);
        const glassPaneEventListener = {
            mousemove(ev) {
                if (verticalSplit) {
                    const location = Math.min(Math.max(ev.y - offset, 0), maximumDividerLocation);
                    leftComponent.style.height = location + "px";
                }
                else {
                    const location = Math.min(Math.max(ev.x - offset, 0), maximumDividerLocation);
                    leftComponent.style.width = location + "px";
                }
            },
            mouseup(ev) {
                glassPane.remove();
            }
        };
        glassPane.addEventListener("mousemove", glassPaneEventListener.mousemove);
        glassPane.addEventListener("mouseup", glassPaneEventListener.mouseup);
    }
}
SplitPaneEventListener._instance = null;
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(`
			.split-pane.split-pane-event-listener,
			.horizontal-split-pane.split-pane-event-listener,
			.vertical-split-pane.split-pane-event-listener
	`).forEach(function (splitPane) {
        if (splitPane.children.length != 3) {
            return;
        }
        const divider = splitPane.children[1];
        divider.addEventListener("mousedown", SplitPaneEventListener.instance.mousedown);
    });
});
class CardContainerUtils {
    static get instance() {
        if (CardContainerUtils._instance == null) {
            CardContainerUtils._instance = new CardContainerUtils();
        }
        return CardContainerUtils._instance;
    }
    first(cardContainer) {
        if (cardContainer.children.length === 0) {
            return;
        }
        this.setSelectedIndex(cardContainer, 0);
    }
    next(cardContainer) {
        if (cardContainer.children.length === 0) {
            return;
        }
        let selectedIndex = this.getSelectedIndex(cardContainer);
        if (selectedIndex === -1) {
            selectedIndex = 0;
        }
        else {
            selectedIndex = (selectedIndex + 1) % cardContainer.children.length;
        }
        this.setSelectedIndex(cardContainer, selectedIndex);
    }
    previous(cardContainer) {
        if (cardContainer.children.length === 0) {
            return;
        }
        let selectedIndex = this.getSelectedIndex(cardContainer);
        if (selectedIndex === -1) {
            selectedIndex = cardContainer.children.length - 1;
        }
        else {
            selectedIndex = (selectedIndex + cardContainer.children.length - 1) % cardContainer.children.length;
        }
        this.setSelectedIndex(cardContainer, selectedIndex);
    }
    last(cardContainer) {
        if (cardContainer.children.length === 0) {
            return;
        }
        this.setSelectedIndex(cardContainer, cardContainer.children.length - 1);
    }
    show(cardContainer, name) {
        for (let i = 0; i < cardContainer.children.length; i++) {
            const cardComponent = cardContainer.children[i];
            if (cardComponent.getAttribute("name") === name) {
                this.setSelectedIndex(cardContainer, i);
                break;
            }
        }
    }
    getSelectedIndex(cardContainer) {
        for (let i = 0; i < cardContainer.children.length; i++) {
            const cardComponent = cardContainer.children[i];
            if (cardComponent.classList.contains("visible")) {
                return i;
            }
        }
        return -1;
    }
    setSelectedIndex(cardContainer, selectedIndex) {
        for (let i = 0; i < cardContainer.children.length; i++) {
            const cardComponent = cardContainer.children[i];
            if (i === selectedIndex) {
                cardComponent.classList.add("visible");
            }
            else {
                cardComponent.classList.remove("visible");
            }
        }
    }
}
CardContainerUtils._instance = null;
class TabbedPaneUtils {
    static get instance() {
        if (TabbedPaneUtils._instance == null) {
            TabbedPaneUtils._instance = new TabbedPaneUtils();
        }
        return TabbedPaneUtils._instance;
    }
    first(tabContainer, cardContainer) {
        if (tabContainer.children.length === 0) {
            return;
        }
        this.setSelectedTabIndex(tabContainer, cardContainer, 0);
    }
    next(tabContainer, cardContainer) {
        if (tabContainer.children.length === 0) {
            return;
        }
        let selectedTabIndex = this.getSelectedTabIndex(tabContainer);
        if (selectedTabIndex === -1) {
            selectedTabIndex = 0;
        }
        else {
            selectedTabIndex = (selectedTabIndex + 1) % tabContainer.children.length;
        }
        this.setSelectedTabIndex(tabContainer, cardContainer, selectedTabIndex);
    }
    previous(tabContainer, cardContainer) {
        if (tabContainer.children.length === 0) {
            return;
        }
        let selectedTabIndex = this.getSelectedTabIndex(tabContainer);
        if (selectedTabIndex === -1) {
            selectedTabIndex = tabContainer.children.length - 1;
        }
        else {
            selectedTabIndex = (selectedTabIndex + tabContainer.children.length - 1) % tabContainer.children.length;
        }
        this.setSelectedTabIndex(tabContainer, cardContainer, selectedTabIndex);
    }
    last(tabContainer, cardContainer) {
        if (tabContainer.children.length === 0) {
            return;
        }
        this.setSelectedTabIndex(tabContainer, cardContainer, tabContainer.children.length - 1);
    }
    show(tabContainer, cardContainer, name) {
        for (let i = 0; i < tabContainer.children.length; i++) {
            const tabComponent = tabContainer.children[i];
            if (tabComponent.getAttribute("name") === name) {
                this.setSelectedTabIndex(tabContainer, cardContainer, i);
                break;
            }
        }
    }
    getSelectedTabIndex(tabContainer) {
        for (let i = 0; i < tabContainer.children.length; i++) {
            const tabComponent = tabContainer.children[i];
            if (tabComponent.classList.contains("selected")) {
                return i;
            }
        }
        return -1;
    }
    setSelectedTabIndex(tabContainer, cardContainer, selectedTabIndex) {
        for (let i = 0; i < tabContainer.children.length; i++) {
            const tabComponent = tabContainer.children[i];
            if (i === selectedTabIndex) {
                tabComponent.classList.add("selected");
                const name = tabComponent.getAttribute("name");
                CardContainerUtils.instance.show(cardContainer, name);
            }
            else {
                tabComponent.classList.remove("selected");
            }
        }
    }
    getSelectedTabComponent(tabContainer) {
        for (let i = 0; i < tabContainer.children.length; i++) {
            const tabComponent = tabContainer.children[i];
            if (tabComponent.classList.contains("selected")) {
                return tabComponent;
            }
        }
        return null;
    }
    setSelectedTabComponent(tabContainer, cardContainer, selectedTabComponent) {
        for (let i = 0; i < tabContainer.children.length; i++) {
            const tabComponent = tabContainer.children[i];
            if (tabComponent === selectedTabComponent) {
                tabComponent.classList.add("selected");
                const name = tabComponent.getAttribute("name");
                CardContainerUtils.instance.show(cardContainer, name);
            }
            else {
                tabComponent.classList.remove("selected");
            }
        }
    }
}
TabbedPaneUtils._instance = null;
class TabbedPaneEventListener {
    static get instance() {
        if (TabbedPaneEventListener._instance == null) {
            TabbedPaneEventListener._instance = new TabbedPaneEventListener();
        }
        return TabbedPaneEventListener._instance;
    }
    click(ev) {
        const target = ev.target;
        const tabComponent = document.evaluate("ancestor-or-self::*[contains(concat(' ', @class, ' '), ' tab-component ')]", target, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (tabComponent === null) {
            return;
        }
        const tabbedPane = ev.currentTarget;
        const tabContainer = tabComponent.parentElement;
        const cardContainer = tabbedPane.querySelector(":scope>.card-container");
        if (target.classList.contains("tab-close")) {
            document.dispatchEvent(new CustomEvent("close", {
                detail: {
                    tabbedPane: tabbedPane,
                    tabContainer: tabContainer,
                    cardContainer: cardContainer,
                    tabComponent: tabComponent
                }
            }));
            return;
        }
        TabbedPaneUtils.instance.setSelectedTabComponent(tabContainer, cardContainer, tabComponent);
    }
}
TabbedPaneEventListener._instance = null;
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(`
			.tabbed-pane.tabbed-pane-event-listener,
			.wrap-tabbed-pane.tabbed-pane-event-listener,
			.scroll-tabbed-pane.tabbed-pane-event-listener,
			.page-start-tabbed-pane.tabbed-pane-event-listener,
			.page-start-wrap-tabbed-pane.tabbed-pane-event-listener,
			.page-start-scroll-tabbed-pane.tabbed-pane-event-listener,
			.page-end-tabbed-pane.tabbed-pane-event-listener,
			.page-end-wrap-tabbed-pane.tabbed-pane-event-listener,
			.page-end-scroll-tabbed-pane.tabbed-pane-event-listener,
			.line-start-tabbed-pane.tabbed-pane-event-listener,
			.line-start-wrap-tabbed-pane.tabbed-pane-event-listener,
			.line-start-scroll-tabbed-pane.tabbed-pane-event-listener,
			.line-end-tabbed-pane.tabbed-pane-event-listener,
			.line-end-wrap-tabbed-pane.tabbed-pane-event-listener,
			.line-end-scroll-tabbed-pane.tabbed-pane-event-listener
	`).forEach(function (tabbedPane) {
        const tabContainer = tabbedPane.querySelector(":scope>.tab-container");
        const cardContainer = tabbedPane.querySelector(":scope>.card-container");
        if (tabContainer === null || cardContainer === null) {
            return;
        }
        tabbedPane.addEventListener("click", TabbedPaneEventListener.instance.click);
    });
});
class TreeUtils {
    static get instance() {
        if (TreeUtils._instance == null) {
            TreeUtils._instance = new TreeUtils();
        }
        return TreeUtils._instance;
    }
    pad(ul, paddingInlineStart, padding) {
        ul.querySelectorAll(`
				:scope>li
		`).forEach(function (li) {
            if (li.children.length === 0) {
                return;
            }
            const firstChild = li.children[0];
            firstChild.style.paddingInlineStart = paddingInlineStart + "px";
            const _ul = li.querySelector(":scope>ul");
            if (_ul !== null) {
                TreeUtils.instance.pad(_ul, paddingInlineStart + padding, padding);
            }
        });
    }
    select(li, ctrlKey) {
        if (ctrlKey) {
            if (li.classList.contains("selected")) {
                li.classList.remove("selected");
            }
            else {
                li.classList.add("selected");
            }
        }
        else {
            li.classList.add("selected");
        }
    }
    clearSelection(ul) {
        ul.querySelectorAll(`
				:scope li.selected
		`).forEach(function (selected) {
            selected.classList.remove("selected");
        });
    }
}
TreeUtils._instance = null;
class TreeEventListener {
    static get instance() {
        if (TreeEventListener._instance == null) {
            TreeEventListener._instance = new TreeEventListener();
        }
        return TreeEventListener._instance;
    }
    click(ev) {
        const target = ev.target;
        const li = document.evaluate("ancestor-or-self::li[position() = 1]", target, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (li === null) {
            return;
        }
        const tree = ev.currentTarget;
        const singleTreeSelection = tree.classList.contains("single-tree-selection");
        if (singleTreeSelection) {
            TreeUtils.instance.clearSelection(tree);
            TreeUtils.instance.select(li, false);
        }
        else {
            if (!ev.ctrlKey) {
                TreeUtils.instance.clearSelection(tree);
            }
            if (ev.shiftKey) {
                const leadSelection = tree.querySelector(":scope li.lead-selection");
                const lis = tree.querySelectorAll(`
						:scope li
				`);
                let start = null;
                for (let i = 0; i < lis.length; i++) {
                    const selected = lis[i];
                    if (start === null) {
                        if (selected === li) {
                            break;
                        }
                        else if (selected === leadSelection) {
                            start = selected;
                            if (!ev.ctrlKey) {
                                TreeUtils.instance.select(selected, ev.ctrlKey);
                            }
                        }
                        continue;
                    }
                    TreeUtils.instance.select(selected, ev.ctrlKey);
                    if (selected === li || selected === leadSelection) {
                        break;
                    }
                }
                if (start === null) {
                    for (let i = lis.length - 1; i >= 0; i--) {
                        const selected = lis[i];
                        if (start === null) {
                            if (selected === leadSelection) {
                                start = selected;
                                if (!ev.ctrlKey) {
                                    TreeUtils.instance.select(selected, ev.ctrlKey);
                                }
                            }
                            continue;
                        }
                        TreeUtils.instance.select(selected, ev.ctrlKey);
                        if (selected === li) {
                            break;
                        }
                    }
                }
            }
            else {
                TreeUtils.instance.select(li, ev.ctrlKey);
                tree.querySelectorAll(`
						:scope li.lead-selection
				`).forEach(function (selected) {
                    selected.classList.remove("lead-selection");
                });
                li.classList.add("lead-selection");
            }
        }
        if (!ev.ctrlKey) {
            const ul = li.querySelector(":scope>ul");
            if (ul !== null) {
                if (li.classList.contains("open")) {
                    li.classList.remove("open");
                    li.classList.add("closed");
                }
                else {
                    li.classList.add("open");
                    li.classList.remove("closed");
                }
            }
            document.dispatchEvent(new CustomEvent("selection", {
                detail: {
                    tree: tree,
                    treeNode: li,
                    userObject: li.dataset.userObject
                }
            }));
        }
    }
    dblclick(ev) {
        if (ev.ctrlKey) {
            const target = ev.target;
            const li = document.evaluate("ancestor-or-self::li[position() = 1]", target, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (li === null) {
                return;
            }
            const ul = li.querySelector(":scope>ul");
            if (ul !== null) {
                if (li.classList.contains("open")) {
                    li.classList.remove("open");
                    li.classList.add("closed");
                    TreeUtils.instance.clearSelection(ul);
                }
                else {
                    li.classList.add("open");
                    li.classList.remove("closed");
                }
            }
        }
    }
}
TreeEventListener._instance = null;
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(`
			.tree.tree-event-listener
	`).forEach(function (element) {
        const tree = element;
        tree.addEventListener("click", TreeEventListener.instance.click);
        tree.addEventListener("dblclick", TreeEventListener.instance.dblclick);
        tree.querySelectorAll(`
				:scope li>ul
		`).forEach(function (ul) {
            const li = ul.parentElement;
            if (li.classList.contains("open")) {
                li.classList.remove("closed");
            }
            else {
                li.classList.add("closed");
            }
        });
        tree.querySelectorAll(`
				:scope li.selected
		`).forEach(function (li) {
            li.classList.remove("selected");
        });
        tree.querySelectorAll(`
				:scope li.lead-selection
		`).forEach(function (li) {
            li.classList.remove("lead-selection");
        });
        tree.querySelector(":scope li").classList.add("lead-selection");
        const treeIcon = tree.querySelector(":scope .tree-icon");
        const treeIconComputedStyle = getComputedStyle(treeIcon);
        const padding = +treeIconComputedStyle.width.replace("px", "") + +treeIconComputedStyle.marginInlineEnd.replace("px", "");
        TreeUtils.instance.pad(tree, 0, padding);
    });
});
//# sourceMappingURL=simpa.js.map
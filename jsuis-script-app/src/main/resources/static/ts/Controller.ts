document.addEventListener("i18n-en-us-action", function(ev: CustomEvent) {
    _removeClass(/^i18n-/);
    document.body.classList.add("i18n-en");
});

document.addEventListener("i18n-pt-br-action", function(ev: CustomEvent) {
    _removeClass(/^i18n-/);
    document.body.classList.add("i18n-pt");
});

document.addEventListener("new-action", function(ev: CustomEvent) {
    const pageStartTabbedPaneTabContainer: HTMLElement = document.getElementById("page-start-tabbed-pane-tab-container");
    const newId: number = +_nvl(pageStartTabbedPaneTabContainer.dataset.newId, "0") + 1;
    pageStartTabbedPaneTabContainer.dataset.newId = "" + newId;
    let name: string = `New ${newId}`;
    if (document.body.classList.contains("i18n-pt")) {
        name = `Novo ${newId}`;
    }
    const tabComponent: HTMLElement = _createTabComponent("/images/Script.svg", name, name);
    pageStartTabbedPaneTabContainer.appendChild(tabComponent);
    const pageStartTabbedPaneCardContainer: HTMLElement = document.getElementById("page-start-tabbed-pane-card-container");
    const cardComponent: HTMLElement = _createCardComponent(name);
    pageStartTabbedPaneCardContainer.appendChild(cardComponent);
    tabComponent.click();
});

function _createTabComponent(icon: string, title: string, name: string) {
    const tabComponent: HTMLElement = document.createElement("div");
    tabComponent.classList.add("tab-component");
    tabComponent.classList.add("box-container");
    tabComponent.style.gap = "5px";
    tabComponent.style.padding = "5px";
    tabComponent.setAttribute("name", name);
    const tabIcon: HTMLElement = document.createElement("img");
    tabIcon.setAttribute("src", icon);
    tabComponent.appendChild(tabIcon);
    const tabTitle: HTMLElement = document.createElement("span");
    tabTitle.classList.add("tab-title");
    tabTitle.textContent = title;
    tabComponent.appendChild(tabTitle);
    const tabClose: HTMLElement = document.createElement("span");
    tabClose.classList.add("tab-close");
    tabClose.classList.add("material-icons");
    tabComponent.appendChild(tabClose);
    return tabComponent;
}

function _createCardComponent(name: string) {
    const cardComponent: HTMLElement = document.createElement("div");
    cardComponent.classList.add("border-container");
    cardComponent.style.backgroundColor = "white";
    cardComponent.setAttribute("name", name);
    const scrollPane: HTMLElement = document.createElement("div");
    scrollPane.classList.add("scroll-pane");
    scrollPane.classList.add("grid");
    cardComponent.appendChild(scrollPane);
    return cardComponent;
}

function _removeClass(regex: RegExp): void {
    const classes: string[] = [];
    document.body.classList.forEach(function (value: string) {
        value.match(regex)
        if (value.match(regex)) {
            classes.push(value);
        }
    });
    for (const c of classes) {
        document.body.classList.remove(c);
    }
}

function _nvl(value: any, defaultValue: any) {
    return (value !== undefined && value !== null) ? value : defaultValue;
}

document.addEventListener("DOMContentLoaded", function () {
    const splitPane = document.getElementById("split-pane");
});
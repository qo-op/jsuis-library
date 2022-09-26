document.addEventListener("i18n-en-us-action", function (ev) {
    _removeClass(/^i18n-/);
    document.body.classList.add("i18n-en");
});
document.addEventListener("i18n-pt-br-action", function (ev) {
    _removeClass(/^i18n-/);
    document.body.classList.add("i18n-pt");
});
document.addEventListener("new-action", function (ev) {
    const pageStartTabbedPaneTabContainer = document.getElementById("page-start-tabbed-pane-tab-container");
    const newId = +_nvl(pageStartTabbedPaneTabContainer.dataset.newId, "0") + 1;
    pageStartTabbedPaneTabContainer.dataset.newId = "" + newId;
    let name = `New ${newId}`;
    if (document.body.classList.contains("i18n-pt")) {
        name = `Novo ${newId}`;
    }
    const tabComponent = _createTabComponent("/images/Script.svg", name, name);
    pageStartTabbedPaneTabContainer.appendChild(tabComponent);
    const pageStartTabbedPaneCardContainer = document.getElementById("page-start-tabbed-pane-card-container");
    const cardComponent = _createCardComponent(name);
    pageStartTabbedPaneCardContainer.appendChild(cardComponent);
    tabComponent.click();
});
function _createTabComponent(icon, title, name) {
    const tabComponent = document.createElement("div");
    tabComponent.classList.add("tab-component");
    tabComponent.classList.add("box-container");
    tabComponent.style.gap = "5px";
    tabComponent.style.padding = "5px";
    tabComponent.setAttribute("name", name);
    const tabIcon = document.createElement("img");
    tabIcon.setAttribute("src", icon);
    tabComponent.appendChild(tabIcon);
    const tabTitle = document.createElement("span");
    tabTitle.classList.add("tab-title");
    tabTitle.textContent = title;
    tabComponent.appendChild(tabTitle);
    const tabClose = document.createElement("span");
    tabClose.classList.add("tab-close");
    tabClose.classList.add("material-icons");
    tabComponent.appendChild(tabClose);
    return tabComponent;
}
function _createCardComponent(name) {
    const cardComponent = document.createElement("div");
    cardComponent.classList.add("border-container");
    cardComponent.style.backgroundColor = "white";
    cardComponent.setAttribute("name", name);
    const scrollPane = document.createElement("div");
    scrollPane.classList.add("scroll-pane");
    scrollPane.classList.add("grid");
    cardComponent.appendChild(scrollPane);
    return cardComponent;
}
function _removeClass(regex) {
    const classes = [];
    document.body.classList.forEach(function (value) {
        value.match(regex);
        if (value.match(regex)) {
            classes.push(value);
        }
    });
    for (const c of classes) {
        document.body.classList.remove(c);
    }
}
function _nvl(value, defaultValue) {
    return (value !== undefined && value !== null) ? value : defaultValue;
}
document.addEventListener("DOMContentLoaded", function () {
    const splitPane = document.getElementById("split-pane");
});
//# sourceMappingURL=script-app.js.map
function i18nEnglish() {
    _i18nReset();
    document.body.classList.add("i18n-en");
}
function i18nPortuguese() {
    _i18nReset();
    document.body.classList.add("i18n-pt");
}
function _i18nReset() {
    const i18nClasses = [];
    document.body.classList.forEach(function (value) {
        if (value.startsWith("i18n-")) {
            i18nClasses.push(value);
        }
    });
    for (const i18nClass of i18nClasses) {
        document.body.classList.remove(i18nClass);
    }
}
//# sourceMappingURL=script-app.js.map
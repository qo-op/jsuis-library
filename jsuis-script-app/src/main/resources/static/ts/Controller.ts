function i18nEnglish(): void {
    _i18nReset();
    document.body.classList.add("i18n-en");
}

function i18nPortuguese(): void {
    _i18nReset();
    document.body.classList.add("i18n-pt");
}

function _i18nReset(): void {
    const i18nClasses: string[] = [];
    document.body.classList.forEach(function (value: string) {
        if (value.startsWith("i18n-")) {
            i18nClasses.push(value);
        }
    });
    for (const i18nClass of i18nClasses) {
        document.body.classList.remove(i18nClass);
    }
}

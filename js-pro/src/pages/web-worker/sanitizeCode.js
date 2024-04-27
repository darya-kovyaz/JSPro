function sanitizeCode(code) {
    const forbiddenPatterns = [
        /document\.[\w]+/g,
        /window\.[\w]+/g,

        /localStorage/g,
        /sessionStorage/g,

        /cookie/g,

        /eval\(/g,
        /Function\(/g,

        /new\s+HTMLElement/g,
        /document.createElement/g,

        /window\[['"]?\w+['"]?\]/g,

        /alert\(/g,
        /confirm\(/g,
        /prompt\(/g,

        /fetch\(/g,
        /XMLHttpRequest/g,
    ];

    forbiddenPatterns.forEach((pattern) => {
        code = code.replace(pattern, "");
    });

    // Проверка на недопустимые слова (потенциально опасные функции и свойства)
    const keywords = [
        "window",
        "document",
        "localStorage",
        "sessionStorage",
        "cookie",
        "eval",
        "Function",
        "XMLHttpRequest",
        "fetch",
    ];
    keywords.forEach((keyword) => {
        const keywordPattern = new RegExp(`\\b${keyword}\\b`, "g");
        code = code.replace(keywordPattern, "");
    });

    return code;
}

module.exports = sanitizeCode;

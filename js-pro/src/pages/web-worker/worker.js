const sanitizeCode = require("./sanitizeCode");

onmessage = function (e) {
    const { code, tests } = e.data;
    try {
        const startTime = performance.now();
        const sanitizedCode = sanitizeCode(code);
        const testResults = runTests(sanitizedCode, tests);
        const endTime = performance.now();
        const executionTime = (endTime - startTime).toFixed(2);
        //console.log(executionTime);

        //const anyTestPassed = testResults.some(test => test.passed);
        postMessage({ success: true, testResults, executionTime: executionTime });
    } catch (error) {
        postMessage({ success: false, error: error.message });
    }
};

function runTests(code, tests) {
    const processedCode = preprocessCode(code);

    // eslint-disable-next-line
    const userFunction = new Function(processedCode);
    const result = userFunction();

    return tests.map((test) => {
        if (Array.isArray(test.expectedOutput)) {
            return {
                test: test,
                passed: test.expectedOutput.includes(result),
            };
        } else {
            return {
                test: test,
                passed: test.expectedOutput === result,
            };
        }
    });
}

function preprocessCode(code) {
    let lines = code.split("\n");
    if (!lines[lines.length - 1].startsWith("return")) {
        lines[lines.length - 1] = "return " + lines[lines.length - 1];
    }
    return lines.join("\n");
}

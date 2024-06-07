const sizeof = require("object-sizeof");

const sanitizeCode = require("./sanitizeCode");

onmessage = function (e) {
    const { code, tests } = e.data;

    console.log(e.data);
    try {
        const sanitizedCode = sanitizeCode(code);
        const testsResults = runTests(sanitizedCode, tests);

        const sizeInBytes = sizeof(testsResults);
        const sizeFormatted = sizeInBytes / (1024 * 1024);

        let maxExecutionTime = 0;
        testsResults.forEach((testResult) => {
            if (testResult.executionTime > maxExecutionTime) {
                maxExecutionTime = testResult.executionTime;
            }
        });

        const allTestsPassed = testsResults.every((test) => test.passed);

        console.log(testsResults);
        postMessage({ success: true, testsResults, executionTime: maxExecutionTime, sizeFormatted, allTestsPassed });
    } catch (error) {
        postMessage({ success: false, error: error.message });
    }
};

function runTests(userCode, tests) {
    return tests.map((test) => {
        try {
            const firstLineEnd = userCode.indexOf(";");
            const firstLine = userCode.substring(0, firstLineEnd + 1);
            const restOfCode = userCode.substring(firstLineEnd + 1);

            const isString = /^(const|let)\s+\w+\s*=\s*".*";$/.test(firstLine);
            const isArray = /^(const|let)\s+\w+\s*=\s*\[.*\];$/.test(firstLine);
            const isObject = /^(const|let)\s+\w+\s*=\s*{.*};$/.test(firstLine);
            const isNumber = /^(const|let)\s+\w+\s*=\s*.*;$/.test(firstLine);


            let modifiedFirstLine;

            if (isString) {
                modifiedFirstLine = firstLine.replace(/=.*;/, `= "${test.input}";`);
            } else if (isArray) {
                modifiedFirstLine = firstLine.replace(/=.*;/, `= ${JSON.stringify(test.input)};`);
            } else if (isObject) {
                modifiedFirstLine = firstLine.replace(/=.*;/, `= ${JSON.stringify(test.input)};`);
            } else if(isNumber){
                modifiedFirstLine = firstLine.replace(/=.*;/, `= ${test.input};`);
            }


            const fullCode = modifiedFirstLine + restOfCode;


            const startTime = performance.now();
            // eslint-disable-next-line
            const result = new Function(fullCode)();
            const endTime = performance.now();

            const executionTime = (endTime - startTime).toFixed(3);
            return {
                test: test,
                passed: JSON.stringify(result) === JSON.stringify(test.expectedOutput),
                executionTime: executionTime,
            };
        } catch (error) {
            return {
                test: test,
                passed: false,
                error: error.message,
            };
        }
    });
}

// function runTests(code, tests) {
//     const processedCode = preprocessCode(code);

//     // eslint-disable-next-line
//     const userFunction = new Function(processedCode);
//     //const result = userFunction();

//     // return tests.map((test) => {
//     //     if (Array.isArray(test.expectedOutput)) {
//     //         return {
//     //             test: test,
//     //             passed: test.expectedOutput.includes(result),
//     //         };
//     //     } else {
//     //         return {
//     //             test: test,
//     //             passed: test.expectedOutput === result,
//     //         };
//     //     }

// }

// function preprocessCode(code) {
//     let lines = code.split("\n");
//     if (!lines[lines.length - 1].startsWith("return")) {
//         lines[lines.length - 1] = "return " + lines[lines.length - 1];
//     }
//     return lines.join("\n");
// }

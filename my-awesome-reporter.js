
// const fs = require('fs');
// const path = require('path');
// class MyReporter {

//     constructor() {
//         this.logFilePath = path.join(__dirname, 'test-log.txt');
//         this.logFileStream = fs.createWriteStream(this.logFilePath);
//     }

//     onBegin(config, suite) {
//         this.logToFile(`Starting the run with ${suite.allTests().length} tests`);
//     }

//     onBegin(config, suite) {
//         console.log(`Starting the run with ${suite.allTests().length} tests`);
//     }

//     onTestBegin(test, result) {
//         this.logToFile(`Starting test ${test.title}`);
//     }

//     onTestEnd(test, result) {
//         this.logToFile(`Finished test ${test.title}: ${result.status}`);
//     }

//     onEnd(result) {
//         this.logToFile(`Finished the run: ${result.status}`);
//     }

//     onStdOut(chunk, test) {
//         this.logToFile(`${chunk}`)
//     }

//     onStdErr(chunk, test) {
//         console.error(`[StdErr] Test: ${test.title}, Error Output: ${chunk}`);
//     }

//     logToFile(message) {
//         const logMessage = `${new Date().toISOString()}: ${message}\n`;
//         fs.appendFile('test-log.txt', logMessage, (err) => {
//             if (err) {
//                 console.error('Error writing to custom.log:', err);
//             }
//         });
//     }
// }

// module.exports = MyReporter;

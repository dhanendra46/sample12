const { test, expect } = require("@playwright/test")
const path = require('path')
const fs = require('fs')

class LogGenerator {

    async customLogger(message) {
        const logMessage = `${new Date().toISOString()}: ${message}\n`;
        fs.appendFile('automation-logs.log', logMessage, (err) => {
            if (err) {
                console.error('Error writing to custom.log:', err);
            }
        });
    }

}

module.exports = { LogGenerator }
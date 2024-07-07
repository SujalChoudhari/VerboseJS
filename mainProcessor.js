const { RelpaceVariableNameInLine } = require('./variableValidator');
const Processors = require('./keywordProcessors');

//////////////////////////////////////
// MAIN PROCESSOR
//////////////////////////////////////

const processSourceCode = (sourceCode) => {
    const lines = sourceCode.split("\n");
    const transpiledLines = lines.map(line => {
        line = RelpaceVariableNameInLine(line);
        if (line.startsWith("//") || line.trim() === "") {
            return line;
        }
        else if (line.startsWith("Mutable")) {
            return Processors.Mutable(line);
        }
        else if (line.startsWith("Immutable")) {
            return Processors.Immutable(line);
        }
        else {
            return `${line}`;
        }
    });

    return transpiledLines.join("\n");
}

module.exports = processSourceCode;

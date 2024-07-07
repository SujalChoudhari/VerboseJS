const { RelpaceVariableNameInLine, HandleFStrings } = require('./variableValidator');
const Processors = require('./keywordProcessors');

//////////////////////////////////////
// MAIN PROCESSOR
//////////////////////////////////////

const processSourceCode = (sourceCode) => {
    const lines = sourceCode.split("\n");
    const transpiledLines = lines.map(line => {
        line = HandleFStrings(line);
        line = RelpaceVariableNameInLine(line);
        if (line.startsWith("//") || line.trim() === "") {
            return line;
        }
        else if (line.includes("Mutable")) {
            return Processors.Mutable(line);
        }
        else if (line.includes("Immutable")) {
            return Processors.Immutable(line);
        }
        else if (line.includes("Convolution")) {
            return Processors.Convolution(line)
        }
        else {
            return `${line}`;
        }
    });

    return transpiledLines.join("\n");
}

module.exports = processSourceCode;

const { RelpaceVariableNameInLine, HandleFStrings } = require('./variableValidator');
const Processors = require('./keywordProcessors');

//////////////////////////////////////
// MAIN PROCESSOR
//////////////////////////////////////

const processSourceCode = (sourceCode) => {
    const lines = sourceCode.split("\n");

    // Function to handle semicolons within a line
    const splitSemicolons = (line) => {
        return line.split(";").map(part => part.trim()).filter(part => part.length > 0);
    };

    const transpiledLines = lines.flatMap(line => {
        // Split the line into multiple lines if it contains semicolons
        const splitLines = splitSemicolons(line);

        // Process each split line
        return splitLines.map(part => {
            part = HandleFStrings(part);
            part = RelpaceVariableNameInLine(part);

            if (part.startsWith("//") || part.trim() === "") {
                return part;
            }

            let newLine = part;
            for (const keyword in Processors) {
                if (part.includes(keyword)) {
                    newLine =  Processors[keyword](newLine);
                }
            }

            // for (const keyword in Processors) {
            //     if (newLine.includes(keyword)) {
            //         newLine =  Processors[keyword](newLine);
            //     }
            // }

            return newLine;
        });
    });

    return transpiledLines.join("\n");
};


module.exports = processSourceCode;

const {
    VariableNameValidator,

} = require('./variableValidator');
const TranspilationMaker = require('./transpilationMaker');
const DATA_TYPES = require('./dataTypes');

//////////////////////////////////////
// SHARED LOGIC
//////////////////////////////////////

const handleVariableDeclaration = (keyword, line) => {
    const tokens = line.split(" ").filter(token => token.trim() !== "");
    const datatype_or_varname = tokens[1];
    let datatype, varname, value;

    if (line.includes("=")) { // Handle lines with an assignment
        const assignmentParts = line.split("=");
        value = assignmentParts[1].trim().replace(/;$/, "");

        if (!Object.keys(DATA_TYPES).includes(datatype_or_varname)) { // Data type not found
            datatype = "Infer";
            varname = datatype_or_varname;
        } else { // Data type found
            datatype = tokens[1];
            varname = tokens[2];
        }

        if (!VariableNameValidator(varname)) {
            return TranspilationMaker(`${keyword} ${varname} = ${value}`, `Invalid varname ${varname}`);
        }
        if (!DATA_TYPES[datatype](value)) {
            return TranspilationMaker(`${keyword} ${varname} = ${value}`, `Invalid value for datatype ${datatype}: ${value}`);
        }
        return TranspilationMaker(`${keyword} ${varname} = ${value}`, "");

    } else { // Handle lines without an assignment
        varname = datatype_or_varname;
        datatype = "Infer";
        value = "";

        if (!VariableNameValidator(varname)) {
            return TranspilationMaker(`${keyword} ${varname};`, `Invalid varname ${varname}`);
        }
        return TranspilationMaker(`${keyword} ${varname};`, "");
    }
}


const handleLoops = (line) => {
    if (line.includes("When")) {
        // Convolution i Untill 100
        const loopVarname = line.split(" ")[1];
        const condition = line.split("When")[1].trim().replace("{", "");
        const resultLine = line.replace(`Convolution ${loopVarname} When`, `let ${loopVarname} = 0; while (`).replace("{", "){")
        return TranspilationMaker(resultLine, "");

    } else {
        const parenthesisContent = line.split("(")[1].split(")")[0].split(",");
        const loopVarName = parenthesisContent[0].trim();
        const loopStart = parenthesisContent[1].trim().split("..")[0];
        const loopEnd = parenthesisContent[1].trim().split("..")[1];

        return TranspilationMaker(`for (let ${loopVarName} = ${loopStart}; ${loopVarName} < ${loopEnd}; ${loopVarName}++) {`, "");
    }
}

const handleImports = (line) => {
    const importName = line.split(" ")[1];
    return TranspilationMaker(`const ${line.split("as")[1].trim().replace(";", "")} = require(${importName})`, "");
}

const handleIf = (line) => {
    line = line.replace("Granted", "if (");
    line = line.replace("{", ") {");
    return TranspilationMaker(line, "");
}

const handleArrowFunctions = (line) => {
    // Find the start and end indices of the parentheses
    const startIndex = line.indexOf('(');
    const endIndex = line.indexOf(')');

    if (startIndex === -1 || endIndex === -1) {
        throw new Error('Invalid line format');
    }

    // Extract the part of the line inside the parentheses
    let paramsPart = line.slice(startIndex + 1, endIndex);

    // Split the part to get only the parameters, ignoring types
    let params = paramsPart.split(':')[0]; // Get only the parameters part

    // If params is empty, just use empty parentheses
    if (params.trim() === '') {
        params = '';
    }

    // Construct the arrow function string
    const arrowFunction = `(${params}) => `;

    let resultLine = line.slice(0, startIndex) + arrowFunction + line.slice(endIndex + 1);
    // Replace the Subroutine definition with the arrow function, keep the rest of the line intact
    return resultLine.replace("Subroutine", "")
};

const handleFuntion = (line) => {
    // Find the start and end indices of the parentheses
    const startIndex = line.indexOf('(');
    const endIndex = line.indexOf(')');

    if (startIndex === -1 || endIndex === -1) {
        throw new Error('Invalid line format');
    }

    // Extract the part of the line inside the parentheses
    let paramsPart = line.slice(startIndex + 1, endIndex);

    // Split the part to get only the parameters, ignoring types
    let params = paramsPart.split(':')[0]; // Get only the parameters part

    // If params is empty, just use empty parentheses
    if (params.trim() === '') {
        params = '';
    }

    // Construct the arrow function string
    const paramsInParen = `(${params}) `;

    let resultLine = line.slice(0, startIndex) + paramsInParen + line.slice(endIndex + 1);
    // Replace the Subroutine definition with the arrow function, keep the rest of the line intact
    return resultLine.replace("Procedure", "function")

}


//////////////////////////////////////
// KEYWORD PROCESSORS
//////////////////////////////////////

const Processors = {
    "Mutable": (line) => handleVariableDeclaration("let", line),
    "Immutable": (line) => handleVariableDeclaration("const", line),
    "Convolution": (line) => handleLoops(line),
    "Obligate": (line) => handleImports(line),
    "Granted": (line) => handleIf(line),
    "Subroutine": (line) => handleArrowFunctions(line),
    "Procedure": (line) => handleFuntion(line)

}

module.exports = Processors;

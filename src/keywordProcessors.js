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

    if (!Object.keys(DATA_TYPES).includes(datatype_or_varname)) { // Data type not found
        datatype = "Infer";
        varname = datatype_or_varname;
        value = line.split("=")[1].trim().replace(/;$/, "");
    } else { // Data type found
        datatype = tokens[1];
        varname = tokens[2];
        value = line.split("=")[1].trim().replace(/;$/, "");
    }

    const prefix = keyword === "let" ? "Mutable" : "Immutable";


    if (!VariableNameValidator(varname)) {
        return TranspilationMaker(`${keyword} ${varname} = ${value}`, `Invalid varname ${varname}`);
    }
    if (!DATA_TYPES[datatype](value)) {
        return TranspilationMaker(`${keyword} ${varname} = ${value}`, `Invalid value for datatype ${datatype}: ${value}`);
    }
    return TranspilationMaker(`${keyword} ${varname} = ${value}`, "");
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
    return resultLine.replace("Subroutine","")
};


//////////////////////////////////////
// KEYWORD PROCESSORS
//////////////////////////////////////

const Processors = {
    "Mutable": (line) => handleVariableDeclaration("let", line),
    "Immutable": (line) => handleVariableDeclaration("const", line),
    "Convolution": (line) => handleLoops(line),
    "Obligate": (line) => handleImports(line),
    "Granted": (line) => handleIf(line),
    "Subroutine": (line) => handleArrowFunctions(line)

}

module.exports = Processors;

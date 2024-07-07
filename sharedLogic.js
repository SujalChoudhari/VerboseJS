const {
    VariableNameValidator,
    VariableStorage,
    GetNewVarName
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
        value = tokens[3].replace(";", "");
    } else { // Data type found
        datatype = tokens[1];
        varname = tokens[2];
        value = tokens[4].replace(";", "");
    }

    const prefix = keyword === "let" ? "Mutable" : "Immutable";

    VariableStorage[varname] = `${GetNewVarName(varname, datatype, prefix)}`

    if (!VariableNameValidator(varname)) {
        return TranspilationMaker(`${keyword} ${GetNewVarName(varname, datatype, prefix)} = ${value};`, `Invalid varname ${varname}`);
    }
    if (!DATA_TYPES[datatype](value)) {
        return TranspilationMaker(`${keyword} ${GetNewVarName(varname, datatype, prefix)} = ${value};`, `Invalid value for datatype ${datatype}: ${value}`);
    }
    return TranspilationMaker(`${keyword} ${GetNewVarName(varname, datatype, prefix)} = ${value};`, "");
}

module.exports = handleVariableDeclaration;
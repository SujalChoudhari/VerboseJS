//////////////////////////////////////
// VARIABLES
//////////////////////////////////////

const VariableNameValidator = (potential_varname) => {
    let varname = potential_varname.trim();
    if (varname === "" || varname.length < 3) return false;
    if (!varname.match(/^[A-Z][a-zA-Z0-9]*$/)) return false;
    return true;
}

const VariableStorage = {
    "Yes": "true",
    "No": "false",
    "True": "true",
    "False": "false",
    "Ambiguous": "undefined",
    "Void": "null"
}; // varname: renamedVarname

const GetNewVarName = (name, datatype, mutabletype) => {
    return `${name}_${mutabletype}_${datatype}`
}

const RelpaceVariableNameInLine = (line) => {
    let modifiedLine = line;
    for (const [originalVarname, renamedVarname] of Object.entries(VariableStorage)) {
        const regex = new RegExp(`\\b${originalVarname}\\b`, 'g');
        modifiedLine = modifiedLine.replace(regex, renamedVarname);
    }
    return modifiedLine;
}

module.exports = {
    VariableNameValidator,
    VariableStorage,
    GetNewVarName,
    RelpaceVariableNameInLine
};

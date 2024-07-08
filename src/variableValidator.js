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
    "Void": "null",
    "Conversely": "else",
    "Correlate": "switch",
    "Condition": "case",
    "Layoff": "break",
    "Delinquent": "default",
    "Asynchronous": "async",
    "Anticipate": "await",
    "Endeavor": "try",
    "Expose": "catch",
    "Recapitulate": "continue",
    "New": "new",
    "Blueprint": "class",
    "Fabricator": "constructor",
    "Inherits": "extends",
    "Ancestor": "super",
    "Aforementioned": "this",
    "Rejoinder": "return",
    "And": "&&",
    "Or": "||",
    "Not": "!",
    "Equal": "==",
    "Matches": "===",
    "NotEqual": "!=",
    "NotMatches": "!==",
    "Greater": ">",
    "Less": "<",
    "GreaterEqual": ">=",
    "LessEqual": "<=",
    "Share": "module.exports = ",
};

const RelpaceVariableNameInLine = (line) => {
    for (const [key, value] of Object.entries(VariableStorage)) {
        const regex = new RegExp(`\\b${key}\\b`, 'g');
        line = line.replace(regex, value);
    }
    return line;
};

const HandleFStrings = (line) => {
    const regex = /f"([^"]*)"/g;
    let match;

    while ((match = regex.exec(line)) !== null) {
        const strContent = match[1];
        const converted = "`" + strContent.replace(/{/g, "${") + "`";
        line = line.replace(match[0], converted);
    }
    return line;
}

module.exports = {
    VariableNameValidator,
    VariableStorage,
    RelpaceVariableNameInLine,
    HandleFStrings
};

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
    return `${name}_${mutabletype.substring(0,3)}_${datatype.substring(0,3)}`
}

const RelpaceVariableNameInLine = (line) => {
    let modifiedLine = line;

    // Regex to match double-quoted strings
    const stringRegex = /"[^"]*"/g;

    // Track current position in the line
    let lastIndex = 0;

    // Temporary array to hold parts of the line
    let parts = [];

    // Extract strings and split the line into parts
    line.replace(stringRegex, (match, offset) => {
        // Add text before the string literal
        if (offset > lastIndex) {
            parts.push({ text: line.slice(lastIndex, offset), type: 'text' });
        }
        // Add the string literal itself
        parts.push({ text: match, type: 'string' });
        lastIndex = offset + match.length;
        return match;
    });

    // Add remaining text after the last string literal
    if (lastIndex < line.length) {
        parts.push({ text: line.slice(lastIndex), type: 'text' });
    }

    // Replace variables only in text parts
    parts = parts.map(part => {
        if (part.type === 'text') {
            let newText = part.text;
            for (const [originalVarname, renamedVarname] of Object.entries(VariableStorage)) {
                const regex = new RegExp(`\\b${originalVarname}\\b`, 'g');
                newText = newText.replace(regex, renamedVarname);
            }
            return { text: newText, type: 'text' };
        }
        return part; // No change for string literals
    });

    // Combine parts back into a single line
    modifiedLine = parts.map(part => part.text).join('');

    return modifiedLine;
}


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
    GetNewVarName,
    RelpaceVariableNameInLine,
    HandleFStrings
};

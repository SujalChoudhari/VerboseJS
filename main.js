const SOURCE_CODE = `
Mutable Ordinal SomeonesAge = 10;
Mutable String BStringVar = 10;
Mutable CVar = 20;
Immutable String DVar = "Hello";
Mutable Proposition Xyz = No;
CVar ++;
if (Xyz == True)
    console.log(CVar)
else
    console.log(SomeonesAge)
`;

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

//////////////////////////////////////
// TRANSPILATION MAKER
//////////////////////////////////////

const TranspilationMaker = (transpiledCode, warnings) => {
    if (warnings === "") {
        return transpiledCode;
    } else {
        return `${transpiledCode} // WARN: ${warnings}`;
    }
}

//////////////////////////////////////
// DATA TYPES
//////////////////////////////////////

const DATA_TYPES = {
    "Ordinal": (potential_number) => {
        const res = potential_number.match(/^-?\d+(\.\d+)?$/);
        return res !== null;
    },
    "String": (potential_string) => {
        const res = potential_string.match(/^"([^"\\]|\\.)*"$/) || potential_string.match(/^'([^'\\]|\\.)*'$/);
        return res !== null;
    },
    "Proposition": (potential_boolean) => {
        const res = potential_boolean.match(/^(True|False|Yes|No)$/i);
        return res !== null;
    },
    "Disposition": (potential_array) => {
        try {
            const parsed = JSON.parse(potential_array);
            return Array.isArray(parsed);
        } catch {
            return false;
        }
    },
    "Ambiguous": (potential_undefined) => {
        return potential_undefined.trim() === "Ambiguous" || potential_undefined.trim() === "undefined";
    },
    "Void": (potential_null) => {
        return potential_null.trim() === "Void" || potential_null.trim() === "null";
    },
    "Infer": (_) => {
        return true;
    }
};

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

//////////////////////////////////////
// KEYWORD PROCESSORS
//////////////////////////////////////

const Processors = {
    "Mutable": (line) => handleVariableDeclaration("let", line),
    "Immutable": (line) => handleVariableDeclaration("const", line)
}

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

const processedCode = processSourceCode(SOURCE_CODE);
console.log("CODE:\n", processedCode, "\nRESULT:");
eval(processedCode);

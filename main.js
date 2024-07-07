const processSourceCode = require('./mainProcessor.js');

const SOURCE_CODE = `

Mutable Ordinal VarName = 10;
Mutable String StrName = "Strings";
Immutable String FormattedStrings = f"These are {StrName}"
Mutable Infer AVariableName = Ambiguous;
StrName += " Stringsssss";

Mutable Infer Objects = {
    name: "John",
    age: 30
}
`;

const processedCode = processSourceCode(SOURCE_CODE);
console.log("CODE:\n", processedCode, "\nRESULT:");

eval(processedCode);

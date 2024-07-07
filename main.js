const processSourceCode = require('./mainProcessor.js');

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

const processedCode = processSourceCode(SOURCE_CODE);
console.log("CODE:\n", processedCode, "\nRESULT:");
eval(processedCode);

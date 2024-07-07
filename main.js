const processSourceCode = require('./mainProcessor.js');

const SOURCE_CODE = `
Immutable Ordinal SomeonesAge = 10;
Mutable String SomeLine = f"Hello! {SomeonesAge}";
console.log(SomeLine);
`;

const processedCode = processSourceCode(SOURCE_CODE);
console.log("CODE:\n", processedCode, "\nRESULT:");
eval(processedCode);

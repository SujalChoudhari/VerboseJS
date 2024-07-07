const processSourceCode = require('./mainProcessor.js');

const SOURCE_CODE = `
Convolution j When j <= 5 {
    Convolution (i,0..2) {
        console.log("Hello Shakespeare",i);
    } 
    console.log("\\nWorld Hello",j);
    j++;
}
`;

const processedCode = processSourceCode(SOURCE_CODE);
console.log("CODE:\n", processedCode, "\nRESULT:");

eval(processedCode);

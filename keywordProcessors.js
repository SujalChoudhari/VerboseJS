const handleVariableDeclaration = require('./sharedLogic');

//////////////////////////////////////
// KEYWORD PROCESSORS
//////////////////////////////////////

const Processors = {
    "Mutable": (line) => handleVariableDeclaration("let", line),
    "Immutable": (line) => handleVariableDeclaration("const", line)
}

module.exports = Processors;

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

module.exports = TranspilationMaker;

const fs = require('fs-extra');
const path = require('path');
const processSourceCode = require('./mainProcessor');

async function compileFile(inputPath, outputPath) {
    const sourceCode = await fs.readFile(inputPath, 'utf-8');
    const processedCode = processSourceCode(sourceCode);
    await fs.outputFile(outputPath, processedCode);
    console.log(`Compiled ${inputPath} to ${outputPath}`);
}

async function compileDirectory(inputDir, outputDir) {
    const files = await fs.readdir(inputDir);
    await Promise.all(files.map(async (file) => {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, file);
        const stats = await fs.stat(inputPath);
        if (stats.isDirectory()) {
            await compileDirectory(inputPath, outputPath);
        } else if (stats.isFile() && path.extname(file) === '.src') {
            const outputFilePath = outputPath.replace(/\.src$/, '.js');
            await compileFile(inputPath, outputFilePath);
        }
    }));
}

module.exports = { compileFile, compileDirectory };

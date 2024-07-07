const { program } = require('commander');
const path = require('path');
const { compileFile, compileDirectory } = require('./compile');

program
    .command('compile <input> [output]')
    .description('Compile a single source file')
    .action(async (input, output = path.join('dist', path.basename(input, path.extname(input)) + '.js')) => {
        try {
            await compileFile(input, output);
        } catch (error) {
            console.error(`Error compiling file: ${error.message}`);
        }
    });

program
    .command('compile-dir [inputDir] [outputDir]')
    .description('Compile all source files in a directory recursively')
    .action(async (inputDir = 'src', outputDir = 'dist') => {
        try {
            await compileDirectory(inputDir, outputDir);
        } catch (error) {
            console.error(`Error compiling directory: ${error.message}`);
        }
    });


program.parse(process.argv);

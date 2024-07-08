# VerboseJS

**VerboseJS** is a superset of JavaScript designed to provide a more expressive, verbose, and human-readable syntax. It extends JavaScript with new keywords and constructs to enhance code readability and writing, while still being compatible with standard JavaScript.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Usage](#usage)
  - [Variable Declaration](#variable-declaration)
  - [F Strings](#f-strings)
  - [Loops](#loops)
  - [Imports](#imports)
  - [IF Statements](#if-statements)
  - [Match Case](#match-case)
  - [Classes and Constructors](#classes-and-constructors)
  - [Logical Operators](#logical-operators)
  - [Valid Variable Names](#valid-variable-names)
- [Running the Project](#running-the-project)

## Overview

VerboseJS introduces a more expressive syntax for JavaScript. With new keywords and constructs, VerboseJS aims to make your code more readable and closer to natural language, while preserving JavaScript's functionality and compatibility.

## Features

- **Human-Readable Syntax:** New keywords and constructs to make code more expressive and easier to understand.
- **Extended Variable Declarations:** Supports `Mutable`, `Immutable`, `Ordinal`, `String`, `Proposition`, `Disposition`, `Ambiguous`, and `Void` data types.
- **Enhanced String Interpolation:** Adds support for formatted strings with `f-strings`.
- **Readable Loops:** Provides `Convolution` for `while` loops and a more descriptive `for` loop syntax.
- **Simple Imports:** Uses `Obligate` for module imports.
- **Improved Conditional Statements:** Uses `Granted` and `Conversely Granted` for `if-else` statements.
- **Pattern Matching:** Introduces `Correlate` for pattern matching with `Condition` and `Delinquent` cases.
- **Classes and Constructors:** Supports `Blueprint`, `Fabricator`, `Inherits`, and `Ancestor` for class definitions and inheritance.
- **Logical Operators:** Uses `And`, `Or`, `Not`, `Equal`, `Matches`, `NotEqual`, `NotMatches`, `Greater`, `Less`, `GreaterEqual`, and `LessEqual` for logical and comparison operations.

## Usage

### Variable Declaration

Define variables with specific types and initial values:

```plaintext
Mutable Ordinal MyAge = 10;

Immutable String MyName = "Log";

Immutable Proposition IsAdmin = Yes; // true

Mutable Infer ThisObject = {
    name: "Log",
    age: 10
}

Mutable Proposition Gender = Ambiguous; // undefined

Immutable Disposition MyMarks = [10, 20, No, True];

Mutable String MySoul = Void; // null
```

### F Strings

Use `f-strings` for formatted string literals:

```plaintext
Immutable String He = "I";
console.log(f"This world is not as good as {He} Imagined")
```

### Loops

Create loops with `Convolution` for `while` loops and `for` loops:

```plaintext
Convolution j When j <= 5 { // while
    Convolution (i, 0..2) { // for
        console.log("Hello Shakespeare", i);
    } 
    console.log("\nWorld Hello", j);
    j++;
}
```

### Imports

Import modules using `Obligate`:

```plaintext
Obligate "fs" as fs;
fs.readFile("test.txt", (err, data) => {
    // ...
})
```

### IF Statements

Write conditional statements with `Granted` and `Conversely Granted`:

```plaintext
Mutable Ordinal Number = 10;
Granted Number > 5 {
    console.log("10");
} Conversely Granted Number > 5 {
    console.log("5");
}
```

### Match Case

Use `Correlate` for pattern matching:

```plaintext
Mutable Ordinal Number = 10;

Correlate (Number) {
    Condition 1:
        console.log(1);
        Layoff;
    Condition 2:
        console.log(2);
        Layoff;
    Delinquent:
        console.log(10);
        Layoff;
}
```

### Classes and Constructors

Define classes and constructors:

```plaintext
Blueprint Animal {
    Fabricator (name: String) {
        Aforementioned.name = name;
    }

    Mutable String name;

    Blueprint Speak() {
        console.log(`I am a ${Aforementioned.name}`);
    }
}

Blueprint Dog Inherits Animal {
    Fabricator (name: String, breed: String) {
        Ancestor(name);
        Aforementioned.breed = breed;
    }

    Mutable String breed;

    Blueprint Speak() {
        console.log(`I am a ${Aforementioned.breed} dog named ${Aforementioned.name}`);
    }
}

Mutable Dog myDog = new Dog("Rover", "Labrador");
myDog.Speak();
```

### Logical Operators

Use logical operators:

```plaintext
if (x Greater 10 And y LessEqual 5) {
    console.log("x is greater than 10 and y is less than or equal to 5");
}

if (a Matches b) {
    console.log("a is equal to b");
}

if (c NotMatches d) {
    console.log("c is not equal to d");
}
```

### Valid Variable Names

Variable names must adhere to these rules:
- Must start with an uppercase letter.
- Can contain letters and digits.
- Must be at least 3 characters long.

## Running the Project

To work with VerboseJS, use the following npm scripts:

- **Build:** Compiles the `.vjs` files to JavaScript.
  ```bash
  npm run build
  ```

- **Start:** Runs the compiled JavaScript code.
  ```bash
  npm run start
  ```

- **Dev:** Runs both the `build` and `start` scripts sequentially.
  ```bash
  npm run dev
  ```

### Compile a Single Source File

```bash
node src/main.js compile <input> [output]
```

Compile a `.vjs` source file to JavaScript. By default, the output file will be saved in the `dist` directory with the same name as the input file but with a `.js` extension.

### Compile All Source Files in a Directory

```bash
node src/main.js compile-dir [inputDir] [outputDir]
```

Recursively compile all `.vjs` source files in the specified input directory to the specified output directory. Defaults are `src` for the input directory and `dist` for the output directory.


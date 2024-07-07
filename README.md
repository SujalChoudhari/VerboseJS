
## Improved Syntax for JS

### Variable Declaration 

Mutable Ordinal MyAge = 10;

Immutable String MyName = "Log";

Immutable Proposition IsAdmin = Yes; // true

Mutable Infer ThisObject = {
    name: "Log",
    age: 10
}

Mutable Proposition Gender = Ambiguous; // undefined

Immutable Disposition MyMarks = [10,20,No,True];

Mutable String MySoul = Void;

###  F strings
Immutable String He = "I";
console.log(f"This world is not as good as {He} Imagined")

### Loops
Convolution j When j <= 5 { // while
    Convolution (i,0..2) { // for
        console.log("Hello Shakespeare",i);
    } 
    console.log("\nWorld Hello",j);
    j++;
}

### Imports
Obligate "fs" as fs;
fs.readFile("test.txt", (err, data) => {
    // ...
})

### IF statements
Mutable Ordinal Number = 10;
Granted Number > 5 {
    console.log("10");
} Conversely Granted Number > 5 {
    console.log("5");
}

### Match Case

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

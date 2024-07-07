
## Syntax

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

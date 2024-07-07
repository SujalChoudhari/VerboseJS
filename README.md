
## Syntax


Mutable Ordinal VarName = 10;
Mutable String StrName = "Strings";
Immutable String FormattedStrings = f"These are {StrName}"

Mutable Infer Objects = {
    name: "John",
    age: 30
}

Mutable Infer AVariableName = Ambiguous;


StrName += " Stringsssss"

Convolution (j,0..10) {
    console.log(StrName,j)
}

Convolution k When k <= 2 {
    console.log(k)
    k++;
}


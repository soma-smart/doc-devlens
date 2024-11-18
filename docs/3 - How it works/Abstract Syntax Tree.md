# Abstract Syntax Tree

## The heart of DEVLENS

Thanks to ANTLR4 parsers, we create **AST**s that give enough informations to find which nods hold informations we want. The main purpose of this logic is to modulate **DEVLENS** to accept any language as input. Annotators are not created on reference of file but directly on syntax trees.



## Abstract Syntax Tree (AST)

An Abstract Syntax Tree (**AST**) is a tree representation of the syntactic structure of source code. Each node represents a construct occurring in the code, such as expressions or statements, allowing for structured analysis and manipulation of the code.

For example, this block represent the tree of a Python import."Import_Stmt" is the first node that interest us to filter every import in code. Then value of the import is located under the "Dotted_name" node :

![AST1](/../static/img/howitwork/ast.png?raw=true "AST1")


### Generate an AST

To generate an **AST** through our interactive terminal you can directly choose the correct option, and specify the folder you want to analyze :

![AST-generate](/../static/img/howitwork/ast-generate.png?raw=true "AST-generate")

**DEVLENS** will analyze every file you have in the folder, create an **AST** and store it in a file at the root of where you executed the binary :

![ast-file](/../static/img/howitwork/file.png?raw=true "ast-file")

Accessing this file will give you a general view of every node of your project, sorted by file.

![AST2](/../static/img/howitwork/ast2.png?raw=true "AST2")


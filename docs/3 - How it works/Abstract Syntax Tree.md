# Abstract Syntax Tree

## The heart of DEVLENS

Thanks to ANTLR4 parsers, we create **AST**s that provide enough information to find which nodes hold the information we want. The main purpose of this logic is to modulate **DEVLENS** to accept any language as input. Annotators are not created based on the reference of a file but directly on syntax trees.

## Abstract Syntax Tree (AST)

An Abstract Syntax Tree (**AST**) is a tree representation of the syntactic structure of source code. Each node represents a construct occurring in the code, such as expressions or statements, allowing for structured analysis and manipulation of the code.

For example, this block represents the tree of a Python import. "Import_Stmt" is the first node that interests us to filter every import in the code. Then the value of the import is located under the "Dotted_name" node:

For an original code that look like this:
```python
//...
import dataiku

from pyspark import SparkContext
from pyspark.sql import SQLContext

sc = SparkContext.getOrCreate()
sqlContext = SQLContext(sc)
//...
```
We can see how the *AST* display import 

```bash
#ast_local.txt
File_input
    └── Statements
        └── Statement
            └── Simple_stmts
                └── Simple_stmt
                    └── Import_stmt
                        └── Import_name
                            └── 'import'
                            └── Dotted_as_names
                                └── Dotted_as_name
                                    └── Dotted_name
                                        └── 'dataiku'
                └── '
```

## interactive mode

To generate an **AST** through our interactive terminal, you can directly choose the correct option and specify the folder you want to analyze:

![AST-generate](/../static/img/howitwork/ast-generate.png?raw=true "AST-generate")

**DEVLENS** will analyze every file you have in the folder, create an **AST**, and store it in a file at the root of where you executed the binary:

![ast-file](/../static/img/howitwork/file.png?raw=true "ast-file")

Accessing this file will give you a general view of every node of your project, sorted by file.

```txt
//...
downloads/soma/DEVLENS/recipes/compute_toto.py
File_input
    └── Statements
        └── Statement
            └── Simple_stmts
                └── Simple_stmt
                    └── Import_stmt
                        └── Import_name
                            └── 'import'
                            └── Dotted_as_names
                                └── Dotted_as_name
                                    └── Dotted_name
                                        └── 'dataiku'
                └── '
        └── Statement
            └── Simple_stmts
                └── Simple_stmt
                    └── Import_stmt
                        └── Import_from
                            └── 'from'
                            └── Dotted_name
                                └── 'pyspark'
                            └── 'import'
                            └── Import_from_targets
                                └── Import_from_as_names
                                    └── Import_from_as_name
                                        └── 'SparkContext'
                └── '
//...
```


## command mode

You can also generate an **AST** in command mode:

```bash
./devlens check /downloads --only-ast
```

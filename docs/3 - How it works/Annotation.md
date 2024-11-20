
## Annotation

The next step is to "catch" the node you want. Binaries in the release comes with an 'annotators/' folder already filled with some example.

Here is an example of the Annotator that will store every import of your project :
```python 
class PythonImportAnnotator(AbstractAnnotator):
    """
    PythonImportAnnotator is an annotator class that identifies import statements in Python code.
    """
    def parse(self, ast: ParserRuleContext):
    """
       Methods:
    --------
    parse(ast: ParserRuleContext):
        Parses the provided AST to find and yield annotations for Python import statements.
        It searches for import statements, import names, and dotted names within the AST.

        Parameters:
        -----------
        ast : ParserRuleContext
            The abstract syntax tree to be parsed for import statements.

        Yields:
        -------
        Annotation
            An annotation object containing the name "Import", the value of the import statement,
            and the context in which the import statement was found.
    """
        importStmts = findAll(ast, "Import_stmt")
        importNames = findAll(importStmts, "Import_name")
        names = findAll(importNames, "Dotted_name")

        for match in names:
            yield Annotation(name="Import", value=self.getText(match), context=match)
```

What interest us in this example is mostly the use of `findAll()` method. This method will create a list of every node you want in the AST.

You just have to use the `findAll()` on each node you want to filter until you get the value of the node.

The last part is to create an Annotation for each match you have. You can choose to not store a value in the Annotation by passing `None` to the annotation.

Executing a `check` will result on the creation of Annotations and the filling of the database.

![SQLite Annotation](/../static/img/howitwork/db.png?raw=true "SQLite Annotation")
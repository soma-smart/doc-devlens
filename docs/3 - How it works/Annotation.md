
## Annotation

The next step is to "catch" the node you want. Binaries in the release come with an 'annotators/' folder already filled with some examples.

Here is an example of the Annotator that will store every import of your project:
```python
class PythonImportAnnotator(AbstractAnnotator):
    """
    PythonImportAnnotator is an annotator class that identifies import statements in Python code.
    """
    def parse(self, ast: ParserRuleContext):
        importStmts = findAll(ast, "Import_stmt")
        importNames = findAll(importStmts, "Import_name")
        names = findAll(importNames, "Dotted_name")

        for match in names:
            yield Annotation(name="Import", value=self.getText(match), context=match)
```

What interests us in this example is mostly the use of the `findAll()` method. This method will create a list of every node you want in the AST.

You just have to use the `findAll()` on each node you want to filter until you get the value of the node.

Here is the *AST* that represent an import:
```txt
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
In the annotator we get every `Dotted_name` nested in every `Import_name` nested in every `Import_stmt`. Filtering this way make the annotator as much precise as possible, so it will not get another unrelated node.

The last part is to create an Annotation for each match you have. You can choose to not store a value in the Annotation by passing `None` to the annotation.

Executing a `check` will result in the creation of Annotations and the filling of the database.

![SQLite Annotation](/../static/img/howitwork/db.png?raw=true "SQLite Annotation")

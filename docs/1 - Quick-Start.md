---
slug: /
---

![DEVLENS](/../static/img/intro/devlens.png?raw=true "DEVLENS")

# Quick-start 

## Introduction

The search engine that helps you find code patterns.

**Devlens** is a tool that scans your code to retrieve patterns and stores their value and location in a database. 

**Devlens** can help you write queries like the following ones:

- List the most used datasets in all your projects regardless of the technology used
- Assess the quality of your code (code coverage, code smells, duplication, dead code, bad practices, complexity, etc.)
- Search for specific code patterns (for example, search for all the code that uses a deprecated function)

It can be used manually via the terminal interface to get interactive feedback or as a service (for example, to be integrated in a CI/CD pipeline).

**Devlens** is capable of retrieving your project's variables directly in your Dataiku Lake as well as in your Kubernetes secret.

Want to change values you found in your project? **Devlens** makes it possible with the replace functionality. Query what you want to change, give the new value, and our CLI will take care of the modification in each file.

For more examples, see [Examples page](/docs/2-%20Example.md).

## 4 easy steps to search what you want

**Devlens** will do all the work for you. You just have to tell it what to look for and it will get every occurrence of the pattern. 

**- Step 1:** Tell it what you want ([If you want to know how to write Annotator](/docs/3%20-%20How%20it%20works/Annotation.md))
```python
from annotators.common.abstract_annotator import AbstractAnnotator
from annotators.common.search import findAll
from annotators.common.annotation import Annotation

from antlr4 import ParserRuleContext

class PythonImportAnnotator(AbstractAnnotator):
    def parse(self, ast: ParserRuleContext):
        importStmts = findAll(ast, "Import_stmt")
        importNames = findAll(importStmts, "Import_name")
        names = findAll(importNames, "Dotted_name")

        for match in names:
            yield Annotation(name="import", value=self.getText(match), context=match)
```

**- Step 2:** Launch the analysis ([Locally](/docs/5%20-%20Where%20is%20my%20project/1%20-%20Local.md) or on [Dataiku](/docs/5%20-%20Where%20is%20my%20project/2%20-%20Dataiku.md)).

![analyze](/../static/img/intro/analyze.png?raw=true "analyze")

**- Step 3:** Query the result from the database.

![query](/../static/img/intro/query.png?raw=true "query")

**- Step 4:** Enjoy the result.

## Binaries

Binaries come with our initial annotators:

https://github.com/soma-smart/doc-devlens/releases

## SOMA 

**Devlens** is a [SOMA](https://www.linkedin.com/company/soma-smart/) project.

Feel free to ask us for any support needed on our [LinkedIn](https://www.linkedin.com/company/soma-smart/) or on [GitHub](https://github.com/soma-smart)

---
slug: /
---


![DEVLENS](/../static/img/intro/devlens.png?raw=true "DEVLENS")


# Introduction


The search engine that help you find code pattern.

Devlens is a tool that scan your code to retreive pattern, and store their value and location in a SQLite Database. 
To find what you want in your code you simply have to create a Annotator based on the AST.

Imagine you are doing a full upgrade of your application and need to be sure you swapped every old version of a function;
Devlens can analyze your whole project and tell you exactly in which file and which lines are your old code.

Maybe you want to be sure you are using only one DB environnement in your project: You can query every DB env import with devlens, it will give you a clear output of every DB env of your project.


## 4 easy steps

Devlens only needs 4 steps to show you what you want to know about your code.

**- Step 1:** Analyze your project with a single command , and output the analyze on a file.

![ast-generate](/../static/img/intro/ast-generate.png?raw=true "ast-generate")

**- Step 2:** Look at the AST tree, and find the nodes corresponding to the values you want to retreive, and create an Annotator in the annotation folder with nodes you previously found.

![ast-file](/../static/img/intro/ast-file.png?raw=true "ast-file")

![import-annotator](/../static/img/intro/import-annotator.png?raw=true "import-annotator")

**- Step 3:** Launch the analyze.

![analyze](/../static/img/intro/analyze.png?raw=true "analyze")

**- Step 4:** Query the result from the database.

![query](/../static/img/intro/query.png?raw=true "query")


## Binaries


Binaries comes with our initials annotators:


https://github.com/soma-smart/devlens_cli/releases



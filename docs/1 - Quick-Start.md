---
slug: /
---



![DEVLENS](/../static/img/intro/devlens.png?raw=true "DEVLENS")



# Quick-start 


## Introduction


The search engine that help you find code pattern.

Devlens is a tool that scan your code to retreive pattern, and store their value and location in a Database. 



## 4 steps of the "I'm not going to search my whole code manually"

**Devlens** will do all the work for you. You just have to tell it what to look for and it will get every occurence of the pattern. 


**-Step 1:** Tell him what you want ([If you want to know how to write Annotator](/docs/3%20-%20How%20it%20works/Annotation.md))

![analyze](/../static/img/intro/import-annotator.png?raw=true "analyze")

**- Step 2:** Launch the analyze([Locally](/docs/5%20-%20Where%20is%20my%20project/1%20-%20Local.md) or on [Dataiku](/docs/5%20-%20Where%20is%20my%20project/2%20-%20Dataiku.md)).

![analyze](/../static/img/intro/analyze.png?raw=true "analyze")

**- Step 3:** Query the result from the database.

![query](/../static/img/intro/query.png?raw=true "query")

**-Step 4:** Enjoy the result.

Imagine you are doing a full upgrade of your application and need to be sure you swapped every old version of a function;

**Devlens** can analyze your whole project and tell you exactly in which file and which lines are your old code.

Maybe you want to be sure you are using only one DB environnement in your project: You can query every DB env import with **Devlens**, it will give you a clear output of every DB env of your project.

You found something you want to change globally in your project ? use the **Replace** to modify you whole projet with values you want.

**Devlens** can be integrated seamless in your developpement process since it also work directly  in your **CI**! 

It also integrate a Dataiku connection to retreive easily your project from any dataiku instance !


## Binaries


Binaries comes with our initials annotators:


https://github.com/soma-smart/devlens_cli/releases



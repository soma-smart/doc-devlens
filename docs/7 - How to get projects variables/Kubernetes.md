# Kubernetes


## Kubernetes secrets 

**Devlens** can retreive your kubernetes secrets on a aimed namespace by giving your `values.yaml` and your kubeconfig path in your bash command.


The `values.yaml` file (or any other config Helm file you specifies) need to have two key so Devlens can find your secrets : `namespace` and `secret`.

![valuesyaml](/../static/img/kube/values.png?raw=true "valuesyaml")

The purpose of that functionnality is to substitut your local project environnement variables by their value stocked in kube secret.

For example if you need to be sure that a file only use one specific env for Database:

```python 
import os 
import spark

test1=spark.table("PRD_DB_MET_BBBB.SC_PARAM_MET.TABLE1")
test2=spark.table(os.getenv("DATABASE") + "_DB_MET_BBBB.SC_PARAM_MET.TABLE2")
```
A basic Annotator could retreive the `PRD` from the first DB name but would not get the value of `DATABASE`.

That why we created a system that substitut `os.getenv` statement with their value holded in a kube secret.

That mean that Annotation will get the swapped values for you.

During the steps you will need to provide your `project folder` path, your `deployement file` path (*usually your helm values.yaml file*) and your `kubeconfig` path (*usually located  under `~/.kube/config`*) :

![analyze](/../static/img/kube/analyze.png?raw=true "analyze")

Now we can can query the DB to check swapped Values !

![query](/../static/img/kube/query.png?raw=true "query")


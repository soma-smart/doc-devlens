## Kubernetes secrets 

Devlens can retreive your kubernetes secrets on a aimed namespace by giving your `values.yaml` and your kubeconfig path in your bash command.

```bash
./devlens checkf yourfolder/ --deployment-file values.yaml --kubeconfig ~/.kube/config
```
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


## Dataiku Project 

Devlens can retreive a full dataiku project by giving : 

- Your instance url
- Your API key 
- Your organisation
- Your project name

Start by exporting your access keys into your terminal:

```bash
export DATAIKU_URL_soma=https://dataiku.soma-smart.cloud
export DATAIKU_API_KEY_soma=yourkey
```

> [!TIP]
> You also can generate a `.env` file to store login informations easier by using the `.devlens init` command.


Then you can execute the `./devlens checkd` command to analyze the project. The `--project-file-download` flag is available to download the full Dataiku project after the analyze.

```bash
./devlens checkd --dataiku-instance yourinstancename --dataiku-project-key Yourproject
```

We created a variable retreive system similar to Kubernetes with Dataiku: each time you analyze a project , another request is done in parallel to get Project variable, then we swap their values in code. 
# Kubernetes

## Kubernetes secrets 

**Devlens** can retrieve your Kubernetes secrets in a specified namespace by providing your `values.yaml` and your kubeconfig path in your bash command.

The `values.yaml` file (or any other config Helm file you specify) needs to have two keys so Devlens can find your secrets: `namespace` and `secret`.

*You will need a [kubeconfig file](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) and a helm [deployment file](https://helm.sh/docs/chart_template_guide/values_files/)*.

```yaml
# values.yaml

namespace: devlens-cli

secret:
  enabled: true
  ref:
    - secretRef:
        name: database
```

The purpose of this functionality is to substitute your local project environment variables with their values stored in Kubernetes secrets.

For example, if you need to ensure that a file only uses one specific environment variable for the Database:

```python
import os 
import spark

test1 = spark.table("PRD_DB_MET_BBBB.SC_PARAM_MET.TABLE1")
test2 = spark.table(os.getenv("DATABASE") + "_DB_MET_BBBB.SC_PARAM_MET.TABLE2")
```

A basic annotator could retrieve the `PRD` from the first DB name but would not get the value of `DATABASE`.

That's why we created a system that substitutes `os.getenv` statements with their values held in a Kubernetes secret.

This means that the annotation will get the swapped values for you.

During the steps, you will need to provide your `project folder` path, your `deployment file` path (*usually your Helm values.yaml file*), and your `kubeconfig` path (*usually located under `~/.kube/config`*):

![analyze](/../static/img/kube/analyze.png?raw=true "analyze")

Now we can query the DB to check swapped values!

![query](/../static/img/kube/query.png?raw=true "query")

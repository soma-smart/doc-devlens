# Usage


### Cli Help


```bash
./devlens --help
```


### Local Analyze

Do an analyze of a project locally:

```bash
./devlens checkf yourfolder/
```
&nbsp;
&nbsp;


### Local Analyze using Kubernetes secrets and Helm

Do an analyze of a project locally with kubernetes secrets:

```bash
./devlens checkf yourfolder/ --deployment-file values.yaml --kubeconfig ~/.kube/config
```
&nbsp;
&nbsp;

### Dataiku Analyze

Do an analyze of a project located on Dataiku:

```bash
./devlens checkd --dataiku-instance yourinstancename --dataiku-project-key Yourproject
```

&nbsp;
&nbsp;

### Dataiku Analyze and download files locally

Download a Dataiku project locally:

```bash
./devlens checkd --dataiku-instance yourinstancename --dataiku-project-key Yourproject --project-file-download
```

&nbsp;
&nbsp;
### Query the local Database

Query your Database after an analyze:

```bash
./devlens query "SELECT * FROM annotation WHERE ..."
```

&nbsp;
&nbsp;
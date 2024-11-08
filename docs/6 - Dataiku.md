
## Dataiku Project 

**DEVLENS** provide an easy way to analyze a Dataiku project, it connect itself to your dataiku instance using the `Dataiku Client`.

Start by exporting your access keys of Dataiku into your terminal:

```bash
export DATAIKU_URL_soma=https://dataiku.soma-smart.cloud
export DATAIKU_API_KEY_soma=yourkey
```


During the steps you will need to provide your  your `Dataiku Instance` name (*usually your organisation name*) and your `dataiku project key` path (*usually your project name*) :



![analyze](/../static/img/dataiku/analyze.png?raw=true "analyze")


We created a variable retreive system similar to Kubernetes with Dataiku: each time you analyze a project , another request is done in parallel to get Project variable, then we swap their values in code. 


![query](/../static/img/dataiku/query.png?raw=true "query")
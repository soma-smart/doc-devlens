


**DEVLENS** provide an easy way to analyze a Dataiku project, it connect itself to your dataiku instance using the `Dataiku Client`.

Start by exporting your access keys of Dataiku into your terminal:

```bash
export DATAIKU_URL=https://yourdataikuurl.cloud
export DATAIKU_API_KEY=yourkey
```



## interactive mode
During the steps you will need to provide your  your `Dataiku Instance` name (*usually your organisation name*) and your `dataiku project key` path (*usually your project name*) :



![analyze](/../static/img/dataiku/analyze.png?raw=true "analyze")

## classic mode

```bash
./devlens --dataiku-instance yourdataikuinstancename --dataiku-project-key yourdataikuprojectkey
```

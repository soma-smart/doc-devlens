
**DEVLENS** provides an easy way to analyze a Dataiku project. It connects to your Dataiku instance using the `Dataiku Client`.

Start by exporting your Dataiku access keys into your terminal:

```bash
export DATAIKU_URL=https://yourdataikuurl.cloud
export DATAIKU_API_KEY=yourkey
```

## Interactive mode

During the steps, you will need to provide your `Dataiku Instance` name (*usually your organization name*) and your `Dataiku project key` path (*usually your project name*):

![analyze](/../static/img/dataiku/analyze.png?raw=true "analyze")

## Command mode

```bash
./devlens --dataiku-instance yourdataikuinstancename \
--dataiku-project-key yourdataikuprojectkey
```


# Usage Command


## Download DEVLENS 

**DEVLENS** is available in release section of the documentation repository :

https://github.com/soma-smart/devlens-docs/releases

**When you extract DEVLENS, be sure to get also the ANNOTATORS FOLDER unless you have your owns.**


![download](/../static/img/usage/download.png?raw=true "download")

## Interactive mode

**DEVLENS** provide an easy and accessible Interactive mode that will give you a cool step-by-step UI in terminal to do everything you need.

To launch the interactive mode, use the `--interactive` flag :
```bash
./devlens --interactive
```

![interactive](/../static/img/usage/interactive.png?raw=true "interactive")

## Classic mode

**DEVLENS** also come in "classic" mode where you can use flag to lauch various command:

To see the classic mode you can simply execute :
```bash
./devlens
```
![basic](/../static/img/usage/basic.png?raw=true "basic")

### Local Check
```bash
./devlens check yourfolder/
```
### Local Check + Kubernetes secrets 
```bash
./devlens check youfolder/ --deployment-file yourdeploymentfilepath --kubeconfig yourkubeconfigpath
```
### Dataiku Check
```bash
./devlens --dataiku-instance yourdataikuinstancename --dataiku-project-key yourdataikuprojectkey
```
### Dataiku download locally your project
```bash
./devlens --dataiku-instance yourdataikuinstancename --dataiku-project-key yourdataikuprojectkey --project-file-download
```

### Query
```bash
./devlens query "SELECT ...."
```
## Make DEVLENS globally available

If you want to use devlens anywhere on your machine, you might want to make it available globally :

```bash
sudo mv ./devlens /usr/local/bin/
sudo chmod +x /usr/local/bin/devlens
```





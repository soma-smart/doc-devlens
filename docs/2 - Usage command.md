# Usage Command

## Download DEVLENS

**DEVLENS** is available in the release section of the documentation repository:

https://github.com/soma-smart/doc-devlens/releases

**When you extract DEVLENS, be sure to get the ANNOTATORS FOLDER unless you have your own.**

![download](/../static/img/usage/download.png?raw=true "download")

## Interactive mode

**DEVLENS** provides an easy and accessible Interactive mode that will give you a cool step-by-step UI in the terminal to do everything you need.

To launch the interactive mode, use the `--interactive` flag:
```bash
./devlens --interactive
```

![interactive](/../static/img/usage/interactive.png?raw=true "interactive")

## Command mode

**DEVLENS** also comes in "command" mode where you can use flags to launch various commands:

To see the command mode you can simply execute:
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
./devlens check yourfolder/ \
--deployment-file yourdeploymentfilepath \
--kubeconfig yourkubeconfigpath
```
### Dataiku Check
```bash
./devlens --dataiku-instance yourdataikuinstancename \
--dataiku-project-key yourdataikuprojectkey
```
### Dataiku download locally your project
```bash
./devlens --dataiku-instance yourdataikuinstancename \
--dataiku-project-key yourdataikuprojectkey \
--project-file-download
```

### Query
```bash
./devlens query "SELECT ...."
```
### Replace
```bash
python main.py replace downloads/ \
"SELECT * FROM annotation WHERE name='Table_Env'" \
--replace "value || 'replacement' || logic"
```
## Make DEVLENS globally available

If you want to use devlens anywhere on your machine, you might want to make it available globally:

```bash
sudo mv ./devlens /usr/local/bin/
sudo chmod +x /usr/local/bin/devlens
```

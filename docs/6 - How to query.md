# How to query

**DEVLENS** provides an easy and nice way to query and check results directly through your terminal.

## Interactive mode
After the analysis, you can query your annotations directly from your terminal:

![query](/../static/img/query/query.png?raw=true "query")

## Command mode

If you prefer to use the `command mode`, you can execute the `query` command directly:

```bash
./devlens query "SELECT value FROM annotation WHERE name='Import'"
```
This command will result in an output directly on the terminal.

![command](/../static/img/query/classic.png?raw=true "command")

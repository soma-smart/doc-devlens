# Devlens in CI

One of the use of **DEVLENS** is to be a part of your project CI. **DEVLENS** can provide you quick checks really useful if you want
to be sure your team is following code rules.


Here is an example of how to use **DEVLENS** directly from our release. You can also download devlens and use it from your project root.

## Example CI

```yaml
name: Use Devlens

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  use_devlens:
    runs-on: ubuntu-latest

    steps:
        - name: Checkout code
        uses: actions/checkout@v4
        # Make sure to specify the right version and dist of the release you want and also the right.
        - name: Download Devlens release
        run: |
            version="0.3.0"
            curl -s https://api.github.com/repos/soma-smart/dev-devlens-cli/releases/latest \
            | jq -r '.assets[] | select(.name | contains("ubuntu-latest-3.12.tar.gz")) | .browser_download_url' \
            | xargs -n 1 curl -L -o devlens.tar.gz

        - name: Extract Devlens
        run: tar -xzvf devlens.tar.gz

        - name: Make Devlens executable
        run: chmod +x devlens

        - name: Run Devlens
        run: ./devlens check .
        # This the query check if DEVLENS has annoted your project well.
        - name: Query DB and check results
        run: |
            result_count=$(./devlens query "SELECT COUNT(*) FROM your_table WHERE your_conditions;" | tail -n 1)
            if [ "$result_count" -eq 0 ]; then
                echo "Problem detected: No results found."
                exit 1
            else
                echo "No problems detected: $result_count results found."
            fi
        # This is the query you want to change to check you results.
        - name: Set SQL query variables
        run: |
            export SQL_QUERY="SELECT COUNT(*) FROM another_table WHERE other_conditions;"

        - name: Query DB and check results
        run: |
            result_count=$(./devlens query "$SQL_QUERY" | tail -n 1)
            if [ "$result_count" -gt 0 ]; then
                echo "Problem detected: $result_count results found."
                exit 1
            else
                echo "No problems detected."
            fi
```

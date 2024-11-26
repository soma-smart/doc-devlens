# Dataiku

# Dataiku Project Variables

**Devlens** can retrieve your [project variables](https://doc.dataiku.com/dss/latest/variables/index.html) directly from your cloud easily:

- Each time you initiate a Dataiku analysis, **Devlens** will check if there are any project variables available.
- Then an annotator can use the values to perform any process you want.

For example, the `ENV VAR IN TABLE NAME` annotator is able to annotate any portion of an SQL clause where there is an environment variable in the table name. It will give you the value of that variable directly in the annotation.

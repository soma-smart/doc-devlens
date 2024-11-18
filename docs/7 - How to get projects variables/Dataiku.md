# Dataiku

# Dataiku project variables


**Devlens** can retreive your projects variables directly from your cloud easily:

- Each time you initiate a dataiku analyze , **Devlens** will check if there is any Project variables availables.
- Then an annotator can use the values to do any process you want.

For example, the `ENV VAR IN TABLE NAME` annotators is able to annotate any portion of SQL clause where there is a Environnement variables in the table name. It will give you the value of that variables directly in the annotation
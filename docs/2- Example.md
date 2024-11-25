# Example 

## Don't use SELECT * 

If you want to be sure there isn't any `SELECT *` in your whole project , an annotator can find every occurence of Wildcard in your code:


```python
from annotators.common.abstract_annotator import AbstractAnnotator
from annotators.common.search import findAll
from annotators.common.annotation import Annotation

from antlr4 import ParserRuleContext


class SparkSQLSelectWildcard(AbstractAnnotator):
    def parse(self, ast: ParserRuleContext):
        selectClause = findAll(ast, "SelectClause")
        namedExpressionSeq = findAll(selectClause, "NamedExpressionSeq")
        star = findAll(namedExpressionSeq, "Star")

        for match in star:
            yield Annotation(
                name="Select_Wildcard",
                context=match,
            )
```

You can then query your database to check if this annotator found any `SELECT *`:
```SQL
SELECT path FROM annotation WHERE name= "Select_Wildcard"
```
\
![select-wildcard-query](/../static/img/example/select-wildcard-query.png?raw=true "select-wildcard-query")






## Don't use different DB environnement in the same file




If you want to be sure the same environnement is used in each file you can create a annotator that will get every db env of your project:
```python 
from annotators.common.abstract_annotator import AbstractAnnotator
from annotators.common.search import findAll
from annotators.common.annotation import Annotation

from antlr4 import ParserRuleContext

ENV_LIST = ["DEV", "INT", "REC", "PRD"]


class SparkSQLTableEnv(AbstractAnnotator):
    def parse(self, ast: ParserRuleContext):
        fromClause = findAll(ast, "FromClause")
        tableNames = findAll(fromClause, "TableName")
        multipartIdentifier1 = findAll(tableNames, "MultipartIdentifier")

        insertInto = findAll(ast, "InsertIntoTable")
        multipartIdentifier2 = findAll(insertInto, "MultipartIdentifier")

        all_names = multipartIdentifier1 + multipartIdentifier2

        for match in all_names:
            starting_str = self.getText(match).split("_")[0].upper()
            if starting_str in ENV_LIST:
                yield Annotation(name="Table_Env", value=starting_str, context=match)
```

Then you can query the **Devlens** DB:
```SQL
SELECT path FROM annotation WHERE name = 'Table_Env' AND name IN (SELECT name FROM annotation WHERE name = 'Table_Env' GROUP BY name HAVING COUNT(DISTINCT value) > 1)ORDER BY path;
```
\`
![env-diff-query](/../static/img/example/env-diff-query.png?raw=true "env-diff-query")



## Use right dependencies

An annotator can retreive every dependencies importation in a project:

```python
from annotators.common.abstract_annotator import AbstractAnnotator
from annotators.common.search import findAll
from annotators.common.annotation import Annotation

from antlr4 import ParserRuleContext


class PythonFromImportAnnotator(AbstractAnnotator):
    def parse(self, ast: ParserRuleContext):
        importStmts = findAll(ast, "Import_stmt")
        importFroms = findAll(importStmts, "Import_from")

        for importFrom in importFroms:
            names = findAll(importFrom, "Dotted_name")
            importFromAsNames = findAll(importFrom, "Import_from_as_name")

            module = names[0].getText()
            for submodule in importFromAsNames:
                yield Annotation(
                    name="From_Import",
                    value=module + "." + submodule.getText(),
                    context=submodule,
                )
```

You can then query the **Devlens** DB :
```sql
SELECT value FROM annotation WHERE name = "From_Import";
```
\
![from-import-query](/../static/img/example/from-import-query.png?raw=true "from-import-query")


## Retrieve your Environnement variable directly from your Kubernetes secrets

**Devlens** is able to retreive your environnement variable automatically just by giving your config file path:

![kube-analyze](/../static/img/example/kube-analyze.png?raw=true "kube-analyze")


Then you can query the **Devlens** DB:

```sql
SELECT path,value FROM annotation WHERE name='os.getenv';
```

![kube-query](/../static/img/example/kube-query.png?raw=true "kube-query")


Imagine you are doing a full upgrade of your application and need to be sure you swapped every old version of a function;

**Devlens** can analyze your whole project and tell you exactly in which file and which lines are your old code.


You found something you want to change globally in your project ? use the **Replace** to modify you whole projet with values you want.

**Devlens** can be integrated seamless in your developpement process since it also work directly  in your **CI**! 

It also integrate a Dataiku connection to retreive easily your project from any dataiku instance !


## Replace 'HDFS' to 'S3'


Imagine you want to migrate from HDFS to S3 in your project by changing every occurence of 'hdfs://' by 's3a://':

```python

from pyspark.sql import SparkSession
from pyspark.sql import functions as F

spark = SparkSession.builder.getOrCreate()

expected_df = (
    spark.read.parquet("hdfs://HDFS_SERVER:3543/finance/pib/expected/")
    .withColumn("year", F.year("date"))
    .withColumnRenamed("pib", "expected_pib")
)
actual_df = (
    spark.read.csv("hdfs://HDFS_SERVER:3543/finance/pib/actual/")
    .withColumn("year", F.year("date"))
)
///....

spark.stop()
```
An annotator can find every spark.read you have:

```python 
from annotators.common.abstract_annotator import AbstractAnnotator
from annotators.common.annotation import Annotation
from annotators.common.search import findAll

from antlr4 import ParserRuleContext


class SparkReadParquetAnnotator(AbstractAnnotator):

    def parse(self, ast: ParserRuleContext):
        spark_read = findAll(
            ast, "Primary", filters={"primary": "spark.read.parquet"}
        )
        spark_read += findAll(
            ast, "Primary", filters={"primary": "spark.read.csv"}
        )
        arguments = findAll(spark_read, "Arguments")
        strings = findAll(arguments, "Strings")

        for expr in strings:
            yield Annotation(
                name="spark_read", value=self.getText(expr), context=expr
            )
```


Then with the **Devlens** replace command, you can change every occurence directly in your terminal 


![replace](/../static/img/example/replace.png?raw=true "replace")


Then you can check on your code:

```python

from pyspark.sql import SparkSession
from pyspark.sql import functions as F

spark = SparkSession.builder.getOrCreate()


expected_df = (
    spark.read.parquet("s3a://finance/pib/expected/")
    .withColumn("year", F.year("date"))
    .withColumnRenamed("pib", "expected_pib")
)
actual_df = (
    spark.read.parquet("s3a://finance/pib/actual/")
    .withColumn("year", F.year("date"))
)
```





# Examples

## Don't use SELECT *

```sql
#example.sql
insert into DEV_DB_AAAA.SC_PARAM_AAAA.TABLE_AAAA 
(SELECT * FROM REC_DB_BBBB.SC_PARAM_AAAA.TABLE_AAAA)
```

To be sure there isn't any `SELECT *` in your whole project, an annotator can find every occurrence of Wildcard in your code:
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
```sql
SELECT path 
FROM annotation 
WHERE name= "Select_Wildcard"
```
\
![select-wildcard-query](/../static/img/example/select-wildcard-query.png?raw=true "select-wildcard-query")

## Don't use different DB environments in the same file

Be sure the same environment is used in each file. You can create an annotator that will get every DB environment of your project:
```python
#example.py
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

```sql
SELECT path 
FROM annotation 
WHERE name = 'Table_Env' 
AND name IN (
    SELECT name 
    FROM annotation 
    WHERE name = 'Table_Env' 
    GROUP BY name 
    HAVING COUNT(DISTINCT value) > 1)
ORDER BY path;
```
*This query will display every file where there is more than one environment used.*

\
![env-diff-query](/../static/img/example/env-diff-query.png?raw=true "env-diff-query")

## Use right dependencies

It's hard to list every dependency used in a project:
```python
#example.py
import dataiku

from pyspark import SparkContext
from pyspark.sql import SQLContext

from snowflake.snowpark import Session
from snowflake.snowpark.functions import *
from snowflake.snowpark.exceptions import SnowparkSQLException
import snowflake_package
from snowflake.snowpark.types import *

sc = SparkContext.getOrCreate()
sqlContext = SQLContext(sc)

USER = str(Path.home()).split("/")[-1]
try:
    connection = snowflake_package.get_connection(
        key_path=f"{Path.home()}/.secure/{USER}_snowflake.pem", warehouse="WH_TEST")
except:
    connection = snowflake_package.get_connection(
        key_path=f"{Path.home()}/.secure/snowflake.p8", warehouse="WH_TEST")
```

An annotator can retrieve every dependency importation in a project:

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

You can then query the **Devlens** DB:
```sql
SELECT value 
FROM annotation 
WHERE name = "From_Import";
```
\
![from-import-query](/../static/img/example/from-import-query.png?raw=true "from-import-query")

## Retrieve your Environment variable directly from your Kubernetes secrets

**Devlens** is able to retrieve your environment variable automatically just by giving your config file path:

*You will need a [kubeconfig file](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) and a helm [deployment file](https://helm.sh/docs/chart_template_guide/values_files/)*.

![kube-analyze](/../static/img/example/kube-analyze.png?raw=true "kube-analyze")

An annotator finding every os.getenv will help you display your Kubernetes secrets:
```python
from annotators.common.abstract_annotator import AbstractAnnotator
from annotators.common.search import findAll
from annotators.common.annotation import Annotation

from antlr4 import ParserRuleContext


class PythonGetenvAnnotator(AbstractAnnotator):
    def parse(self, ast: ParserRuleContext):

        getenv_calls = findAll(ast, "Primary", filters={"primary": "os.getenv"})
        arguments = findAll(getenv_calls, "Arguments")
        strings = findAll(arguments, "Strings")

        for match in strings:
            yield Annotation(name="os_getenv", value=self.getText(match), context=match)
```

Then you can query the **Devlens** DB:

```sql
SELECT path, value 
FROM annotation 
WHERE name='os.getenv';
```

![kube-query](/../static/img/example/kube-query.png?raw=true "kube-query")

For example, when you are doing a full upgrade of your application and need to be sure you swapped every old version of a function;

**Devlens** can analyze your whole project and tell you exactly in which file and which lines are your old code.

You found something you want to change globally in your project? Use the **Replace** to modify your whole project with values you want.

**Devlens** can be integrated seamlessly into your development process since it also works directly in your **CI**!

It also integrates a Dataiku connection to retrieve easily your project from any Dataiku instance!

## Replace 'HDFS' to 'S3'

To migrate from HDFS to S3 in your project by changing every occurrence of 'hdfs://' to 's3a://':
```python
#example.py
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

Then with the **Devlens** replace command, you can change every occurrence directly in your terminal:

![replace](/../static/img/example/replace.png?raw=true "replace")

Then you can check on your code:

```python
#example.py
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

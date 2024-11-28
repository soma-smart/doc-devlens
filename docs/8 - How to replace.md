

The `replace` command in our tool allows you to perform replacements in your codebase based on specified patterns or logic. This command is flexible and supports both simple string replacements and more complex logic-based replacements using SQL.

## Simple Replacement

A simple replacement involves directly replacing a specified pattern with a new value. This is useful for straightforward text substitutions.

**Before:**

```sql
insert into DEV
(SELECT * FROM DEV)
```
**After:**

```sql
insert into PROD
(SELECT * FROM PROD)
```

### Interactive Mode

In interactive mode, you can visually select the text you want to replace and specify the new value.

![simple-interactive-1](/../static/img/replace/simple-interactive-1.png?raw=true "simple-interactive-1")

![simple-interactive-2](/../static/img/replace/simple-interactive-2.png?raw=true "simple-interactive-2")


### Command Mode

In command mode, you can use the following command to perform the replacement:

```bash
python main.py replace downloads/ \
 --query "SELECT * FROM annotation WHERE name='table_env'" \
 --replace-type simple \
 --replace-pattern "DEV" \
 --replace-value "PROD"
```


## Logic Replacement

A logic-based replacement uses SQL logic to perform more complex substitutions. This is useful when the replacement depends on the content or structure of the text.

This is why **Devlens** provides a more precise way to change what you want in code.

The logic replacement takes three flags:

- **`--query`**: The query to filter your result by annotation.
- **`--replace-type`**: Set with the value `logic`.
- **`--replace-logic`**: Your custom SQL logic.

For example, a logic replacement to change every `hdfs://HDFS_SERVER:3543` to `s3a://` can be done as follows:

**Before:**

```python
expected_df = (
    spark.read.parquet("hdfs://HDFS_SERVER:3543/finance/pib/expected/")
    .withColumn("year", F.year("date"))
    .withColumnRenamed("pib", "expected_pib")
)
actual_df = (
    spark.read.csv("hdfs://HDFS_SERVER:3543/finance/pib/expected/")
    .withColumn("year", F.year("date"))
)
```

**After:**

```python
expected_df = (
    spark.read.parquet("s3a://finance/pib/expected/")
    .withColumn("year", F.year("date"))
    .withColumnRenamed("pib", "expected_pib")
)
actual_df = (
    spark.read.csv("s3a://finance/pib/expected/")
    .withColumn("year", F.year("date"))
)
```

![annotation-db](/../static/img/replace/annotation-db.png?raw=true "annotation-db")

*The annotation made on `spark.read` expression holds the complete value of the parameter, so a simple replacement cannot work.*

We need to provide **Devlens** with a SQL replacement logic.

![logic-interactive](/../static/img/replace/logic-interactive.png?raw=true "logic-interactive")

By using the `logic` way, we are able to modify code without replacing a whole value.



### Command Mode

If you want to use the command mode:

```bash
python main.py replace downloads/ \
--query "SELECT * FROM annotation WHERE name='spark_read'" \
--replace-type logic \
--replace-logic "REPLACE(value, 'hdfs://HDFS_SERVER:3543/', 's3a://')"
```



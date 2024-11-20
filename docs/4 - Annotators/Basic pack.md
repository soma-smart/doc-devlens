
## List of annotators available in basic pack

### Python 
1. `FROM IMPORT`: Identifies 'from ... import ...' statements in Python code.
2. `IMPORT`: Identifies 'import ...' statements in Python code.
3. `GET ENV`: Identifies 'os.getenv' calls in Python code.
4. `PYTHON HADOOP TABLE`: Identifies Hadoop table references in Python code.
5. `SPARK TABLE ENV`: Identifies 'spark.table()' reference in Python code.

### SparkSQL 

1. `ENV VAR IN TABLE NAME`: Identifies environment variables in table names within a Spark SQL queries.
2. `GET TABLE`: Identifies environment-specific table names in Spark SQL queries.
3. `SELECT NO WHERE`: Identifies SQL SELECT statements that do not contain a WHERE clause.
4. `SELECT WILDCARD`: identifies instances where a wildcard (*) is used in the SELECT clause.




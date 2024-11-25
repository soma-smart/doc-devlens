

One of the most powerful thing **Devlens** can do is to replace every values you want in a whole project just by using a single command.


## interactive mode


Imagine you want to add `_MAIN` to all your db environnement in your project: 
![before](/../static/img/replace/before.png?raw=true "before")

Just by using the `interactive mode` you can specify which annotations are relevant and give your replacement logic in SQL :


![replace](/../static/img/replace/replace.png?raw=true "replace")



You can instantly see the change right after:

![after](/../static/img/replace/after.png?raw=true "after")


You will also have a new table create in database to identifies every change done on your project:

![db](/../static/img/replace/db.png?raw=true "db")



### replacement statement

The replacement Statement take 3 parameter separated by `||`.

- The first parameter is the sql column you are looking to change
- The second parameter is the new value
- The third parameter is the replacement logic


## classic mode

If you  want to use the classic mod, you can use the `--replace` flag, followed by the full instruction of replacement: 

```bash
python main.py query "SELECT * FROM annotation WHERE name='Table_Env'" --replace "value || '_MAIN' || SUBSTR(original, 4)"
```
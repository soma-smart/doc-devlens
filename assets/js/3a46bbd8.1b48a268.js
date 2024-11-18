"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[365],{4630:(t,n,e)=>{e.r(n),e.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>i,metadata:()=>o,toc:()=>l});const o=JSON.parse('{"id":"How it works/Annotation","title":"Annotation","description":"Annotation","source":"@site/docs/3 - How it works/Annotation.md","sourceDirName":"3 - How it works","slug":"/How it works/Annotation","permalink":"/devlens-docs/How it works/Annotation","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Abstract Syntax Tree","permalink":"/devlens-docs/How it works/Abstract Syntax Tree"},"next":{"title":"Basic pack","permalink":"/devlens-docs/Annotators/Basic pack"}}');var a=e(4848),s=e(8453);const i={},r=void 0,c={},l=[{value:"Annotation",id:"annotation",level:2}];function d(t){const n={code:"code",h2:"h2",img:"img",p:"p",pre:"pre",...(0,s.R)(),...t.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h2,{id:"annotation",children:"Annotation"}),"\n",(0,a.jsx)(n.p,{children:"The next step is to \"catch\" the node you want. Binaries in the release comes with an 'annotators/' folder already filled with some example."}),"\n",(0,a.jsx)(n.p,{children:"Here is an example of the Annotator that will store every import of your project :"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-python",children:'class PythonImportAnnotator(AbstractAnnotator):\n    """\n    PythonImportAnnotator is an annotator class that identifies import statements in Python code.\n    """\n    def parse(self, ast: ParserRuleContext):\n    """\n       Methods:\n    --------\n    parse(ast: ParserRuleContext):\n        Parses the provided AST to find and yield annotations for Python import statements.\n        It searches for import statements, import names, and dotted names within the AST.\n\n        Parameters:\n        -----------\n        ast : ParserRuleContext\n            The abstract syntax tree to be parsed for import statements.\n\n        Yields:\n        -------\n        Annotation\n            An annotation object containing the name "Import", the value of the import statement,\n            and the context in which the import statement was found.\n    """\n        importStmts = findAll(ast, "Import_stmt")\n        importNames = findAll(importStmts, "Import_name")\n        names = findAll(importNames, "Dotted_name")\n\n        for match in names:\n            yield Annotation(name="Import", value=self.getText(match), context=match)\n'})}),"\n",(0,a.jsxs)(n.p,{children:["What interest us in this example is mostly the use of ",(0,a.jsx)(n.code,{children:"findAll()"})," method. This method will create a list of every node you want in the AST."]}),"\n",(0,a.jsxs)(n.p,{children:["You just have to use the ",(0,a.jsx)(n.code,{children:"findAll()"})," on each node you want to filter until you get the value of the node."]}),"\n",(0,a.jsxs)(n.p,{children:["The last part is to create an Annotation for each match you have. You can choose to not store a value in the Annotation by passing ",(0,a.jsx)(n.code,{children:"None"})," to the annotation."]}),"\n",(0,a.jsxs)(n.p,{children:["Executing a ",(0,a.jsx)(n.code,{children:"checkf"})," or a ",(0,a.jsx)(n.code,{children:"checkd"})," will result on the creation of Annotations and the filling of the database."]}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"SQLite Annotation",src:e(5619).A+"",title:"SQLite Annotation",width:"1268",height:"683"})})]})}function h(t={}){const{wrapper:n}={...(0,s.R)(),...t.components};return n?(0,a.jsx)(n,{...t,children:(0,a.jsx)(d,{...t})}):d(t)}},5619:(t,n,e)=>{e.d(n,{A:()=>o});const o=e.p+"assets/images/db-912e315177e009b939fd4ff00debc149.png"},8453:(t,n,e)=>{e.d(n,{R:()=>i,x:()=>r});var o=e(6540);const a={},s=o.createContext(a);function i(t){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof t?t(n):{...n,...t}}),[n,t])}function r(t){let n;return n=t.disableParentContext?"function"==typeof t.components?t.components(a):t.components||a:i(t.components),o.createElement(s.Provider,{value:n},t.children)}}}]);
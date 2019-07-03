call jsuis.bat

REM npm install -g typescript
REM npm install -g uglify-js
set /p version=<src\main\resources\static\version.txt
set /p minor_version=<src\main\resources\static\minor_version.txt
set outFile=src\main\resources\static\js\jstutorial-%version%.js
call tsc -skipLibCheck --removeComments --noImplicitAny --noImplicitReturns -outFile "%outFile%" src/main/resources/static/js/jsuis-%version%.d.ts src/main/ts/jstutorial.ts
del src\main\resources\static\js\jstutorial-%version%.*.js
copy %outFile% src\main\resources\static\js\jstutorial-%version%.%minor_version%.js
copy src\main\css\jstutorial.css src\main\resources\static\css\jstutorial-%version%.css
del src\main\resources\static\css\jstutorial-%version%.*.css
copy src\main\css\jstutorial.css src\main\resources\static\css\jstutorial-%version%.%minor_version%.css

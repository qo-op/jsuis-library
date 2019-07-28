call jsuis.bat

REM npm install -g typescript
REM npm install -g uglify-js
set /p version=<src\main\resources\static\version.txt
set /p minor_version=<src\main\resources\static\minor_version.txt
set outFile=src\main\resources\static\js\jsuistutorial-%version%.js
call tsc -skipLibCheck --removeComments --noImplicitAny --noImplicitReturns -outFile "%outFile%" src/main/resources/static/js/jsuis-%version%.d.ts src/main/ts/jsuistutorial.ts
del src\main\resources\static\js\jsuistutorial-%version%.*.js
copy %outFile% src\main\resources\static\js\jsuistutorial-%version%.%minor_version%.js
copy src\main\css\jsuistutorial.css src\main\resources\static\css\jsuistutorial-%version%.css
del src\main\resources\static\css\jsuistutorial-%version%.*.css
copy src\main\css\jsuistutorial.css src\main\resources\static\css\jsuistutorial-%version%.%minor_version%.css

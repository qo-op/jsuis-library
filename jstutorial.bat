call jsuis.bat

REM npm install -g typescript
REM npm install -g uglify-js
set /p version=<src\main\resources\static\version.txt
set outFile=src/main/resources/static/js/jstutorial-%version%.js
call tsc -skipLibCheck --removeComments --noImplicitAny --noImplicitReturns -outFile "%outFile%" src/main/resources/static/js/jsuis-%version%.d.ts src/main/ts/jstutorial.ts

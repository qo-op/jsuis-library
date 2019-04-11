REM npm install -g typescript
REM npm install -g uglify-js
set outFile=src/main/resources/static/js/lib/jsuis.js
call tsc -d -skipLibCheck --removeComments --noImplicitAny --noImplicitReturns -outFile "%outFile%" src/main/resources/static/ts/jsuis.ts

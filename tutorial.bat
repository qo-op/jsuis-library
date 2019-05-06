REM npm install -g typescript
REM npm install -g uglify-js
set outFile=src/main/resources/static/js/tutorial.js
call tsc -skipLibCheck --removeComments --noImplicitAny --noImplicitReturns -outFile "%outFile%" src/main/resources/static/js/lib/jsuis.d.ts src/main/resources/static/ts/tutorial.ts

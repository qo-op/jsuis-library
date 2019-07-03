REM npm install -g typescript
REM npm install -g uglify-js
set /p version=<src\main\resources\static\version.txt
set outFile=src\main\resources\static\js\jsuis-%version%.js
call tsc -d -skipLibCheck --removeComments --noImplicitAny --noImplicitReturns -outFile "%outFile%" src/main/ts/jsuis.ts
copy %outFile% src\main\resources\static\js\jsuis-%version%.%minor_version%.js
copy src\main\css\jsuis.css src\main\resources\static\css\jsuis-%version%.css
del src\main\resources\static\css\jsuis-%version%.*.css
copy src\main\css\jsuis.css src\main\resources\static\css\jsuis-%version%.%minor_version%.css

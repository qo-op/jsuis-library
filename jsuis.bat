REM npm install -g typescript
REM npm install -g uglify-js
set /p version=<src\main\resources\static\version.txt
set outFile=src/main/resources/static/js/jsuis-%version%.js
call tsc -d -skipLibCheck --removeComments --noImplicitAny --noImplicitReturns -outFile "%outFile%" src/main/ts/jsuis.ts
copy src\main\css\jsuis.css src\main\resources\static\css\jsuis-%version%.css
set /p previous_version=<src\main\resources\static\previous_version.txt
copy src\main\resources\static\js\jsuis-%previous_version%.js src\main\resources\static
copy src\main\resources\static\css\jsuis-%previous_version%.css src\main\resources\static

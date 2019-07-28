call jsuistutorial.bat
set /p version=<src\main\resources\static\version.txt
del ..\e-Trabalho\src\main\resources\static\js\jsuis-*.js
del ..\e-Trabalho\src\main\resources\static\css\jsuis-*.css
copy src\main\resources\static\js\jsuis-%version%.js ..\e-Trabalho\src\main\resources\static\js
copy src\main\resources\static\js\jsuis-%version%.d.ts ..\e-Trabalho\src\main\ts\jsuis.d.ts
copy src\main\resources\static\css\jsuis-%version%.css ..\e-Trabalho\src\main\resources\static\css
copy src\main\resources\static\version.txt ..\e-Trabalho\src\main\resources\static\jsuis-version.txt
del ..\labinwebsuite\src\main\resources\static\js\jsuis-*.js
del ..\labinwebsuite\src\main\resources\static\css\jsuis-*.css
copy src\main\resources\static\js\jsuis-%version%.js ..\labinwebsuite\src\main\resources\static\js
copy src\main\resources\static\js\jsuis-%version%.d.ts ..\labinwebsuite\src\main\ts\jsuis.d.ts
copy src\main\resources\static\css\jsuis-%version%.css ..\labinwebsuite\src\main\resources\static\css
copy src\main\resources\static\version.txt ..\labinwebsuite\src\main\resources\static\jsuis-version.txt

cd ../e-Trabalho
REM npm install -g typescript
REM npm install -g uglify-js
set /p version=<src\main\resources\static\version.txt
set outFile=src/main/resources/static/js/jsuis-flow-%version%.js
call tsc -skipLibCheck --removeComments --noImplicitAny --noImplicitReturns -outFile "%outFile%" src/main/ts/jsuis-flow.ts

cd ../labinwebsuite
REM npm install -g typescript
REM npm install -g uglify-js
set /p version=<src\main\resources\static\version.txt
set outFile=src/main/resources/static/js/labinwebsuite-%version%.js
call tsc -skipLibCheck --removeComments --noImplicitAny --noImplicitReturns -outFile "%outFile%" src/main/ts/labinwebsuite.ts
copy src\main\css\labinwebsuite.css src\main\resources\static\css\labinwebsuite-%version%.css

cd ../jsuis-library

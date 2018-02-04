call "C:\Program Files\nodejs"\nodevars.bat
set /p version=<version.txt
uglifyjs -c -m -o versions\jsuis-%version%.min.js versions\jsuis-%version%.js

call "C:\Program Files\nodejs"\nodevars.bat
for /F "tokens=*" %%i in (versions.txt) do uglifyjs -c -m -o versions\jsuis-%%i.min.js versions\jsuis-%%i.js

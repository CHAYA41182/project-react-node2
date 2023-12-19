@echo off
set /p port="Enter port number: "
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ^:^%port%^') do (
    set pid=%%a
)
if "%pid%" == "" (
    echo No process found
    pause
    exit    
)
echo Process found with PID: %pid%

taskkill /PID %pid% /F
if %errorlevel% == 0 (
    echo Process closed successfully
) else (
    echo Process not closed
)
pause
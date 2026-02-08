@echo off
echo Renaming folder from mindcraft-develop to minecraft-llm-agent...
cd ..
ren "mindcraft-develop" "minecraft-llm-agent"
if %errorlevel% equ 0 (
    echo Success! Folder renamed to minecraft-llm-agent
    echo You can now open the folder in VS Code.
) else (
    echo Error: Make sure VS Code and all terminals are closed first.
)
pause

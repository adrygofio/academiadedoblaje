@echo off
setlocal enabledelayedexpansion

REM Cambia al directorio donde está el script
cd /d "%~dp0"

echo ======================================
echo Conversión de PNG a WebP con FFmpeg
echo ======================================
echo.

for %%F in (*.png) do (
    echo Convirtiendo "%%F"...
    ffmpeg -hide_banner -loglevel error -y -i "%%F" -c:v libwebp -quality 80 "%%~nF.webp"

    if !errorlevel! equ 0 (
        echo   Listo
    ) else (
        echo   Error al convertir %%F
    )
)

echo.
echo Conversión finalizada.
pause
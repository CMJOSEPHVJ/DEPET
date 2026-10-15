BUNNY ASSISTANT — WINDOWS 7 64-BIT

Offline command assistant. Not a cloud AI model. Commands are limited to approved apps and websites.

Type commands:
  open chrome
  open notepad
  open calculator
  open paint
  open files
  open youtube
  open google
  open gmail
  help

HOW TO BUILD ON GITHUB:
1. In your GitHub repo, replace index.html, renderer.js, preload.js, main.js, package.json with the files from this ZIP.
2. Upload .github/workflows/build.yml into its exact FOLDER PATH (not the root directory).
   GitHub web UI alternative: Add file > Create new file > .github/workflows/build.yml > paste YAML text > Commit changes.
3. Actions > Build Bunny AI Assistant Win7 EXE > Run workflow.
4. Download the Bunny-AI-Assistant-Win7-x64 artifact ZIP from the successful workflow run.
5. Extract the .exe and open it on Windows 7 64-bit.

WARNING: Electron 22 is end-of-life and should not be used for browsing untrusted content. This app only loads local HTML and opens approved websites in the system browser.

Chrome must be installed to use the 'open chrome' command.
This project was not compiled or tested on a physical Windows 7 computer.

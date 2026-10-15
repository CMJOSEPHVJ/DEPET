BUNNY DESKTOP PET - WINDOWS 7 64 BIT
===================================
This is source code, not a prebuilt EXE. The app is fully offline when running.

EASIEST WAY TO GET AN EXE (BUILD ONLINE USING GITHUB):
1. Create a new public or private GitHub repository.
2. Upload ALL files and the .github/workflows/build.yml folder (retain folder structure).
   Tip: unpack the ZIP and upload the files through GitHub or git.
3. On GitHub open Actions > Build Windows 7 Pet EXE > Run workflow.
4. Once the build succeeds, download the Bunny-Desktop-Pet-Win7-x64 artifact.
5. Unzip the artifact and run Bunny-Desktop-Pet-Win7-x64.exe on Windows 7 x64.

BUILD ON A WINDOWS PC:
Install a compatible Node.js version (Node.js 18 is used in the GitHub build).
Open the project folder and run BUILD-WIN7.bat (requires internet to download build dependencies).
The finished EXE is in the dist folder. Building on newer Windows using GitHub
is recommended because modern toolchains often no longer run on Windows 7.

CONTROLS:
- Left-click bunny = jump/talk
- Hold left mouse button and drag bunny = move desktop pet
- Right-click pet window = menu > Quit Desktop Pet
- Pet stays on top of other windows

NOTE: Windows 7 and Electron 22 are both unsupported and receive no security patches.
Use this simple app offline and avoid adding untrusted web content.
Electron 22 is the last major release compatible with Windows 7.

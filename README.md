# 360-Media-Player
Stream 360 photos and MP4 files to view in virtual reality!

------------------------------------------------------------
# Overview:

The 360 Media Player maps photos and videos streamed from your computer onto a 360 degree sphere that is visible by devices on your local network. 
The primary intended use case for this is to view these files within Virtual Reality (VR) and Augmented Reality (AR) headsets. 

------------------------------------------------------------
# How it works:

The 360 Media Player hosts a website on your local network. This means every device connected to your wifi or router should have access to this site. 
During startup, a folder should be selected. Users who access this site should then have access to view all JPEG, PNG, and MP4 files in that folder, and any subfolders within.

------------------------------------------------------------
# Privacy:

This project requires access to folders on your file system that are then accessed and streamed over your local network. It is important to be mindful of the network you are on and who has access to it.
If you are on a private home network and trust the security of the people and devices with access to it you may be okay. If you are on a public network like that of a library or coffee shop you may risk exposing your device to unintended people or malicious actors. 
While this software is intended to be used in safe environments, it is not provided with any guarantee of security. 

------------------------------------------------------------
# Installation

An installation script is provided for Windows and for MacOS devices. 

To install 360 Media Player:
  1. Open the folder that corresponds with your operating system
      For Windows - for Microsoft Windows devices
      For MacOS - for Apple MacOS devices
  2. Run the Installer file
  3. Click Install and follow the prompts on screen.

These scripts are intended to perform the following tasks for you:
- Install Node Version Manager (NVM)
- Install Node.JS
- Install dependencies with Node Package Manager (NPM)
- Generate keys for HTTPS connections

------------------------------------------------------------
# Startup

The 360 Media Player needs to be started any time you would like to use it. 

To start 360 Media Player:
  1. Open the folder that corresponds with your operating system
      For Windows - for Microsoft Windows devices
      For MacOS - for Apple MacOS devices
  2. Run the file named '360 Media Player'
  3. Click 'Select a directory' and browse to the folder with the photos and videos you want to view in 360
  4. Click Start

------------------------------------------------------------
# Manually Closing The Application

There may be times where the application does not close properly and may remain running in the background. To manually confirm closure of the application on windows the following script may be run in a powershell window.

    Get-Process -Id (Get-NetTCPConnection -LocalPort 3000, 3001).OwningProcess | Stop-Process -Force
This will kill any processes on port 3000 or 3001, the default ports for the 360 Media Player. If your ports are different, you may update this script before running.

------------------------------------------------------------
# Credits

The Coconut-XR libray is used and assists with some of the VR interactions

The default 360 image was downloaded from Poly Haven: https://polyhaven.com/a/kloofendal_48d_partly_cloudy_puresky

Other images and icons were downloaded from Pixabay: https://pixabay.com/

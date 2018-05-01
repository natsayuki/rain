const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 1000, height: 800, "node-integration": false});
  // and load the index.html of the app.
  win.loadURL('http://localhost/rain');
}

app.on('ready', createWindow)

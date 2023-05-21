const fs = require( "fs" );
require( 'dotenv' ).config();
const path = require("path");
const { exec } = require("child_process");

if (!fs.existsSync(path.join(__dirname, "src"))) {
  fs.mkdirSync(path.join(__dirname, "src"));
  fs.mkdirSync(path.join(__dirname, "src", "controllers"));
  fs.mkdirSync(path.join(__dirname, "src", "middleware"));
  fs.mkdirSync(path.join(__dirname, "src", "routers"));
    fs.appendFileSync( path.join( __dirname, "src", "index.js" ), `const express = require('express');
const app= express();

app.get('/', (req, res)=>{
    res.status(200).send('ok')
})
app.listen(8000, ()=>{
    console.log('server running on port 8000')
})
    `);
  if (!fs.existsSync(path.join(__dirname, "package.json"))) {
    exec("npm init -y", (error, stdout, stderr) => {
      if (error) {
        return console.log(`error: ${error.message}`);
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      if (stdout) {
        exec("npm i express dotenv ", (error, stdout, stderr) => {
          if (error || stderr) {
            console.log("paketlarni o`rnatishda xatolik yuz berdi");
            return;
          }
          if (stdout) {
            console.log("Generated successfully");
            return;
          }
        });
      }
    });
  }
    if ( !fs.existsSync( path.join( __dirname, 'package.json' ) ) ) { 
          exec("npm i nodemon -D", (error, stdout, stderr) => {
            if (error || stderr) {
              console.log("paketlarni o`rnatishda xatolik yuz berdi");
              return;
            }
            if (stdout) {
              console.log("Generated successfully");
            }
          });
    }

    if (!fs.existsSync(path.join(__dirname, "package.json"))) {
      const packages = JSON.parse(
        fs.readFileSync(path.join(__dirname, "package.json"))
      );
      packages.scripts.start = "node src/index.js";
      packages.scripts.dev = "nodemon src/index.js";
      fs.writeFileSync(
        path.join(__dirname, "package.json"),
        JSON.stringify(packages, null, 4)
      );
      console.log("Your template successfully created");
    } else {
      console.log("template already exists");
    }
     }


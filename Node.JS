const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
 
const app = express();
app.use(cors());
app.use(bodyParser.json());
 
// API to execute code
app.post("/execute", (req, res) => {
  const { code, language } = req.body;
 
  // Save code to a temporary file based on the language
  const fileName = language === "python" ? "temp.py" : "temp.js";
  fs.writeFileSync(fileName, code);
 
  // Command to execute the code
  const command = language === "python" ? `python ${fileName}` : `node ${fileName}`;
 
  exec(command, (error, stdout, stderr) => {
    if (error) {
      res.status(400).json({ error: stderr error.message });
    } else {
      res.json({ output: stdout });
    }
 
    // Clean up the temporary file
    fs.unlinkSync(fileName);
  });
});
 
// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import React, { useState } from "react";
import axios from "axios";
 
const App = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
 
  const handleExecute = async () => {
    try {
      const response = await axios.post("http://localhost:5000/execute", {
        code,
        language,
      });
      setOutput(response.data.output);
    } catch (error) {
      setOutput(error.response?.data?.error "An error occurred");
    }
  };
 
  return (
<div style={{ padding: "20px", fontFamily: "Arial" }}>
<h1>Student Coding Platform</h1>
<div>
<label>
          Select Language:
<select value={language} onChange={(e) => setLanguage(e.target.value)}>
<option value="javascript">JavaScript</option>
<option value="python">Python</option>
</select>
</label>
</div>
<textarea
        rows="10"
        cols="50"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your code here..."
        style={{ marginTop: "10px", width: "100%" }}
></textarea>
<div>
<button onClick={handleExecute} style={{ marginTop: "10px" }}>
          Execute Code
</button>
</div>
<div>
<h3>Output:</h3>
<pre>{output}</pre>
</div>
</div>
  );
};
 
export default App;

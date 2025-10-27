const express = require("express")
const app = express

app.length("/api", (req,res) => {
    res.json({fruites: ["apple", "orange", "bannana"]});
});

app.listen(8080, () =>{
    console.log("Server started on port 8080");
})
const express = require("express");
const fs = require('fs');

const recordRoutes = express.Router();

recordRoutes.route("/record").post(function (req, res) {
    console.log(req.body.submission);
    
    var submission = req.body.submission + "\n";

    var allData = '';
    fs.appendFile('mini6.csv', submission, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    fs.readFile('mini6.csv', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        // console.log(data);
        res.json({ data: data });
      });

});

recordRoutes.route("/record/data").get(function (req, res) {
    fs.readFile('mini6.csv', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        data = data.split(/\r?\n/);
        res.json({ record: data });
      });

});

module.exports = recordRoutes;
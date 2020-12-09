var config = require("./db-config.js");
var mysql = require("mysql");

config.connectionLimit = 10;
var connection = mysql.createPool(config);

function getJobs(req, res) {
  var jobTitle = req.query.jobTitle;
  var query = `
    SELECT *
    FROM Monster m
    WHERE JOB_TITLE = '${jobTitle}';
  `;
  connection.query(query, function(err, jobTitle, fields){
    if (err) console.log(err);
    else{
      console.log(jobTitle);
      res.json(jobTitle);
    }
  });
};
  
//   var location = req.query.location;
//   var jobType = req.query.jobType;
//   var salaryMin = req.query.salaryMin;
//   var salaryMax = req.query.salaryMax;
//   //console.log(jobTitle);
//   console.log(location);
//   console.log(jobType);
//   console.log(salaryMin);
//   console.log(salaryMax);
//   res.send("get");
// }
// The exported functions, which can be accessed in index.js.
module.exports = {
  getJobs: getJobs,
};

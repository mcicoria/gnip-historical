#Gnip Historical PowerTrack API Wrapper

This is a wrapper for the Gnip Historical PowerTrack API (http://support.gnip.com/customer/portal/articles/745587-historical-powertrack-api-methods)

##API and Usage

Most API functions take two parameters, the first being what you need to send to Gnip based on their API documentation and the second being a callback function which takes and error as the first parameter and the raw json result from Gnip as the second parameter.

###Initialization

```javascript
var 
    GnipHistorical = require("gnip-historical"),
    gnip = new GnipHistorical('accountName', "username", "password");
```

###createJob

This 'opens' a new job. 

See Create a new Historical Job / Estimate: http://support.gnip.com/customer/portal/articles/745587-historical-powertrack-api-methods

```javascript
//Create a new job
gnip.createJob({
    "publisher":"twitter",
    "streamType":"track",
    "dataFormat":"activity-streams",
    "fromDate":"201201010000",
    "toDate":"201201010001",       
    "title":"my_job",
    "serviceUsername":"username",
    "rules":
    [
        {
            "value":"cat"
        }
    ]
}, function(err, results){
    //do something...
});
```

###getJobs

This returns all current jobs, regardless of status.

See Monitor status of an Estimated Historical Job: http://support.gnip.com/customer/portal/articles/745587-historical-powertrack-api-methods

```javascript
gnip.getJobs(function(err, result){
    ///do something with the result 
});
```

###getJob

This gets a job's details and takes a job object or any object that contains a `jobUrl` parameter.

See Monitor status of an Estimated Historical Job: http://support.gnip.com/customer/portal/articles/745587-historical-powertrack-api-methods

```javascript
gnip.getJobs(function(err, result){
    var job = result.jobs[0]; //get the first job
    gnip.getJob(job, function(err, job){
        //do something crazy...
    });
});
```

###acceptJob

Accept a job and begin processing and takes a job object or any object that contains a `jobUrl` parameter.

See Accept/Reject a Historical Job: http://support.gnip.com/customer/portal/articles/745587-historical-powertrack-api-methods

```javascript
gnip.getJobs(function(err, result){
    var job = result.jobs[0]; //get the first job
    gnip.acceptJob(job, function(err, result){ //accept it!
        //yay accepted
    });
});
```

###rejectJob

Reject a job. This takes a job object or any object that contains a `jobUrl` parameter.

See Accept/Reject a Historical Job: http://support.gnip.com/customer/portal/articles/745587-historical-powertrack-api-methods

```javascript
gnip.getJobs(function(err, result){
    var job = result.jobs[0]; //get the first job
    gnip.rejectJob(job, function(err, result){ //accept it!
        //rejected... again :(
    });
});
```

###getJobData

Gets the json with a list of urls for a completed job. It's up to the user to download the data from the urls that are provided in the resulting object. 

See: http://support.gnip.com/customer/portal/articles/745678-retrieving-data-for-a-delivered-job

```javascript
gnip.getJobs(function(err, result){
    var job = result.jobs[0]; //get the first job, assuming it's complete
    gnip.getJobData(job, function(err, result){ 
        //this is where you need to download the things
    });
});
```

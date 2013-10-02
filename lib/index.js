var GnipHistorical = function (accountName, username, password) {

    var 
        request = require("request"),
        _config = {
            creds: {
                un: username,
                pwd: password,
                accountName: accountName
            },
            endpoint: "https://historical.gnip.com/accounts/"+accountName+"/"
        };

    /*
        Docs: http://support.gnip.com/customer/portal/articles/745587-historical-powertrack-api-methods
        URL: https://historical.gnip.com/accounts/<account_name>/jobs.json
        Method: POST
        Rules: Max 1000
        Example: 
            {
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
            }
     */
    var _createJob = function(json, done){
        return _historicalRequest({
            resource: "jobs.json", 
            method: "POST", 
            json: json
        }, done);
    };

    var _getJobs = function(done){
        return _historicalRequest({
            resource: "jobs.json", 
            method: "GET"
        }, done);
    };

    var _getJob = function(job, done){
        return _historicalRequest({
            endpoint: job.jobURL,
            method: "GET"
        }, done);
    };

    var _getJobData = function(job, done){
        if(!job.results.dataURL) return done("Job incomplete, or no dataURL provided.");

        return _historicalRequest({
            endpoint: job.results.dataURL,
            method: "GET"
        }, done);
    };

    var _respondToJob = function(job, status, done){
        return _historicalRequest({
            endpoint: job.jobURL,
            method: "PUT",
            json: {
                status: status
            }
        }, done)
    };

    var _acceptJob = function(job, done){
        return _respondToJob(job, "accept", done);
    };

    var _rejectJob = function(job, done){
        return _respondToJob(job, "reject", done);
    };

    var _historicalRequest = function(opts, done){
        var 
            data = {
                url: opts.endpoint || (_config.endpoint + opts.resource),
                headers: {
                    "Authorization": "Basic " + new Buffer(_config.creds.un + ":" + _config.creds.pwd).toString('base64'),
                    "Content-type": "application/json"
                },
                method: opts.method,
                json: opts.json || true
            };

        return request(data, function(err, res, data){

            //Check the result for an error and make it explicit 
            if(data && data.status && data.status === "error") return done(data);    

            return done(err, data);
        });

    };

   
    return {
        config: _config,
        createJob: _createJob,
        getJobs: _getJobs,
        getJob: _getJob,
        acceptJob: _acceptJob,
        rejectJob: _rejectJob,
        respondToJob: _respondToJob,
        getJobData: _getJobData
    };

};

module.exports = GnipHistorical;
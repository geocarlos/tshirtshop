const memcached = duration => {
    
    const Memcached = require('memcached');
    const memcached = new Memcached("127.0.0.1:11211");

    return (req, res, next) => {
        let key = "__express__" + req.originalUrl || req.url;
        memcached.get(key,  (err, data) => {
            if (data) {
                res.send(data);
                return;
            } else {
                res.sendResponse = res.send;
                res.send = (body) => {
                    memcached.set(key, body, (duration * 60), (err) => {
                        if(err) console.log(err);
                    });
                    res.sendResponse(body);
                }
                next();
            }
        });
    }
}

module.exports = {
    memcached
}
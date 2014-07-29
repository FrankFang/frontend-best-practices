
var debug = require('debug')('frontend-best-practices')
var app = require('./server-app')


app.set('port', process.env.PORT || 3000)

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port)
})

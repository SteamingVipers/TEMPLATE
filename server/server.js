const createError = require('http-errors');
const express = require('express');
const app = express();
const cors = require("cors");
const morgan = require('morgan');

//Kolby socket.io
const http = require("http");
const socketIO = require("socket.io"); 

const server = http.createServer(app);

const io = socketIO(server, {
  cors: true,
  origins:["localhost:3000"]
});

app.use(cors())

let currentEvent = {
    ongoing : false,
    timeRemaining : 0,
    eventId : null
}

const startEvent = (time) => {
    setTimeout(() => {
        return true;
    }, time * 1000)
}

io.on('connection', (socket) => {
    //we can handle what happens on connection here
    console.log('Socket Connected')

    socket.emit('id', socket.id);

    socket.on('newShoutout', (message, user) => {
        socket.broadcast.emit('newShoutout', message, user)
    })

    socket.on('startEvent', (time) => {
        if(!currentEvent.ongoing){
            currentEvent.timeRemaining = time;
            currentEvent.ongoing = true;
            let countdown = setInterval(() => {
            currentEvent.timeRemaining --;
            if(currentEvent.timeRemaining <= 0){
                clearInterval(countdown)
                currentEvent.ongoing = false
            }
            io.emit('countDown', currentEvent) 
            }, 1000)
            if(startEvent(time)){
                io.emit('endEvent')
            }
        }
    })
})

server.listen(3000)
//end of socket.io


// open up CORS 
app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json())
app.use(morgan('dev'));

// You can place your routes here, feel free to refactor:

app.use('/api/', require('./routes/example'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    //wesley removed res.render and replaced it with res.json
    res.json({
        message: err.message,
        error: err
        });
});

module.exports = app;
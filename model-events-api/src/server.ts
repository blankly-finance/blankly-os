import app from './app';

app.init().then(function () {
    app.server.listen(80);
})

import app from './app';
app.init().then(function () {
    app.server.listen(parseInt(process.env.PORT || '80'));
})

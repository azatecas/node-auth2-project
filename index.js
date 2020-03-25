const server = require('./api/router.js');

const PORT = process.env.PORT || 5005;

server.listen(PORT, () => {
    console.log(`\n ***SERVER RUNNING ON PORT ${PORT}*** \n`);
})
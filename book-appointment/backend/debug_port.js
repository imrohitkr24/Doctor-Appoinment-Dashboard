const app = require('express')();
const fs = require('fs');

const PORT = 5000;

const server = app.listen(PORT, () => {
    fs.writeFileSync('port_test_result.txt', `Success: Server listening on port ${PORT}`);
    console.log(`Server listening on port ${PORT}`);
    server.close();
    process.exit(0);
});

server.on('error', (err) => {
    fs.writeFileSync('port_test_result.txt', `Error: ${err.message}`);
    console.error(err);
    process.exit(1);
});

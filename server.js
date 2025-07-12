const http = require('http');
const crypto = require('crypto');

const CAMERA_USERNAME = process.env.CAMERA_USERNAME || 'test';
const CAMERA_PASSWORD = process.env.CAMERA_PASSWORD || 'test';
const server = http.createServer(async (req, res) => {
    if (req.method !== 'POST') {
        res.statusCode = 405;
        res.end('Not allowed');
        return;
    }

    const chunks = await Array.fromAsync(req);
    const body = JSON.parse(Buffer.concat(chunks).toString());
    console.log(body);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        username: CAMERA_USERNAME,
        digest: digestAuth(CAMERA_USERNAME, CAMERA_PASSWORD, body.Uri, body.Realm, body.Nonce, body.Method)
    }));
});

const PORT = 12345;
server.listen(PORT, () => {
    console.log(`camera auth server is listening on port ${PORT}`);
});

const md5 = (value) => crypto.createHash('md5').update(value).digest('hex');

function digestAuth(user, password, uri, realm, nonce, method) {
    var g = null,
      h = null,
      i = null;
    return (
      (g = md5(user + ":" + realm + ":" + password).toLowerCase()),
      (h = md5(method + ":" + uri).toLowerCase()),
      (i = md5(g + ":" + nonce + ":" + h).toLowerCase())
    );
  }

const crypto = require("crypto");

function base64Endcode(str) {
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "-").replace(/=+$/, "");
}

const jwt = {
  sign(payload, secret) {
    const header = base64Endcode(
      JSON.stringify({
        alg: "HS256",
        typ: "JWT",
      }),
    );
    const encodePayload = base64Endcode(JSON.stringify(payload));
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(`${header}.${encodePayload}`);

    const signature = hmac.digest("base64url");
    const token = `${header}.${encodePayload}.${signature}`;
    return token;
  },
};

module.exports = jwt;

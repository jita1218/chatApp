import { createCipheriv } from "crypto";

export const __esModule = true;

const ErrorCode = {
  success: 0,
  appIDInvalid: 1,
  userIDInvalid: 3,
  secretInvalid: 5,
  effectiveTimeInSecondsInvalid: 6,
};

function RndNum(a, b) {
  return Math.ceil((a + (b - a)) * Math.random());
}

function makeNonce() {
  return RndNum(-2147483648, 2147483647);
}

function makeRandomIv() {
  const str = "0123456789abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < 16; i++) {
    const r = Math.floor(Math.random() * str.length);
    result += str.charAt(r);
  }
  return result;
}

function getAlgorithm(keyBase64) {
  const key = Buffer.from(keyBase64);
  switch (key.length) {
    case 16:
      return "aes-128-cbc";
    case 24:
      return "aes-192-cbc";
    case 32:
      return "aes-256-cbc";
    default:
      throw new Error("Invalid key length: " + key.length);
  }
}

function aesEncrypt(plainText, key, iv) {
  const cipher = createCipheriv(getAlgorithm(key), key, iv);
  cipher.setAutoPadding(true);
  const encrypted = cipher.update(plainText);
  const final = cipher.final();
  const out = Buffer.concat([encrypted, final]);
  return Uint8Array.from(out).buffer;
}

function generateToken04(appID, userID, serverSecret, effectiveTimeInSeconds, payload) {
  if (!appID || typeof appID !== "number") {
    throw {
      errorCode: ErrorCode.appIDInvalid,
      errorMessage: "appID invalid",
    };
  }
  if (!userID || typeof userID !== "string") {
    throw {
      errorCode: ErrorCode.userIDInvalid,
      errorMessage: "userID invalid",
    };
  }
  if (!serverSecret || typeof serverSecret !== "string" || serverSecret.length !== 32) {
    throw {
      errorCode: ErrorCode.secretInvalid,
      errorMessage: "secret must be a 32 byte string",
    };
  }
  if (!effectiveTimeInSeconds || typeof effectiveTimeInSeconds !== "number") {
    throw {
      errorCode: ErrorCode.effectiveTimeInSecondsInvalid,
      errorMessage: "effectiveTimeInSeconds invalid",
    };
  }

  const createTime = Math.floor(new Date().getTime() / 1000);
  const tokenInfo = {
    app_id: appID,
    user_id: userID,
    nonce: makeNonce(),
    ctime: createTime,
    expire: createTime + effectiveTimeInSeconds,
    payload: payload || "",
  };

  const plainText = JSON.stringify(tokenInfo);
  const iv = makeRandomIv();
  const encryptBuf = aesEncrypt(plainText, serverSecret, iv);

  const b1 = new Uint8Array(8);
  const b2 = new Uint8Array(2);
  const b3 = new Uint8Array(2);
  new DataView(b1.buffer).setBigInt64(0, BigInt(tokenInfo.expire), false);
  new DataView(b2.buffer).setUint16(0, iv.length, false);
  new DataView(b3.buffer).setUint16(0, encryptBuf.byteLength, false);

  const buf = Buffer.concat([
    Buffer.from(b1),
    Buffer.from(b2),
    Buffer.from(iv),
    Buffer.from(b3),
    Buffer.from(encryptBuf),
  ]);

  const dv = new DataView(Uint8Array.from(buf).buffer);
  return "04" + Buffer.from(dv.buffer).toString("base64");
}

export default generateToken04;

import crypto from "crypto";

const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET || "default_secret";

export function encryptPassword(password: string) {
  const cipher = crypto.createCipheriv(
    "aes-256-ctr",
    ENCRYPTION_SECRET,
    Buffer.alloc(16, 0)
  );
  const encrypted = Buffer.concat([cipher.update(password), cipher.final()]);
  return encrypted.toString("hex");
}

export function decryptPassword(encryptedData: {
  iv: string;
  content: string;
}): string {
  const { iv, content } = encryptedData;
  const decipher = crypto.createDecipheriv(
    "aes-256-ctr",
    Buffer.from(ENCRYPTION_SECRET),
    Buffer.from(iv, "hex")
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(content, "hex")),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
}

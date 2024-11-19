const crypto = require("crypto");
/*** Passowrd Hasing  */
const hashPassword = async (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = await crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
  return `${salt}:${hash}`;
};

// Function to verify a password against a hash
const verifyPassword = async (password, storedHash) => {
  const [salt, originalHash] = storedHash.split(":");
  const hash = await crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
  return hash === originalHash;
};

module.exports = {
  hashPassword: hashPassword,
  verifyPassword: verifyPassword,
};

// // Usage example
// const password = "mySecurePassword";
// const hashedPassword = hashPassword(password);
// console.log("Hashed Password:", hashedPassword);

// const isPasswordCorrect = verifyPassword(password, hashedPassword);
// console.log("Password Match:", isPasswordCorrect); // Should print true

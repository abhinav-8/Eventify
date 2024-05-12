import bcrypt from "bcrypt";
const SALT_ROUNDS = 10 ;

function hashPassword(plainPassword) {
  const salt = bcrypt.genSaltSync(Number(SALT_ROUNDS));
  return bcrypt.hashSync(plainPassword.toString(), salt);
}

function verifyPassword(plainPassword, hashedPassword) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}

export {
  hashPassword,
  verifyPassword,
};

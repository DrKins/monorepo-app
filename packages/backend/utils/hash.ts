import bcrypt from "bcrypt";
export async function hashPassword(password: string) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Comparing password
export async function comparePassword(
  plainPassword: string,
  hashedPassword: string,
) {
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  return match;
}

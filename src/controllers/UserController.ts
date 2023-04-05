import { Request, Response } from 'express';
import argon2 from 'argon2';
import { addUser, getUserByEmail, getUserById, updateEmailAddress } from '../models/UserModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';

async function registerUser(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as AuthRequest;

  // IMPORTANT: Hash the password
  const passwordHash = await argon2.hash(password);

  try {
    // IMPORTANT: Store the `passwordHash` and NOT the plaintext password
    const newUser = await addUser(email, passwordHash);
    console.log(newUser);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function logIn(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as AuthRequest;

  const user = await getUserByEmail(email);

  // Check if the user account exists for that email
  if (!user) {
    res.sendStatus(404); // 404 Not Found (403 Forbidden would also make a lot of sense here)
    return;
  }

  // The account exists so now we can check their password
  const { passwordHash } = user;

  // If the password does not match
  if (!(await argon2.verify(passwordHash, password))) {
    res.sendStatus(404); // 404 Not Found (403 Forbidden would also make a lot of sense here)
    return;
  }

  // The user has successfully logged in
  // NOTES: We will update this once we implement session management
  res.sendStatus(200); // 200 OK
}

async function updateUserEmail(req: Request, res: Response): Promise<void> {
  const { email } = req.body as NewEmailBody;
  const { userId } = req.params as UserIdParam;

  const user = await getUserById(userId);
  // Check if the user account exists for that email
  if (!user) {
    res.sendStatus(404); // 404 Not Found (403 Forbidden would also make a lot of sense here)
    return;
  }

  try {
    await updateEmailAddress(userId, email);
    user.email = email;
    res.json(user);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

export { registerUser, logIn, updateUserEmail };

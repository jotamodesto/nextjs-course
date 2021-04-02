import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { hashPassword, verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "Not authenticaded!" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();

  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    client.close();
    res.status(404).json({ message: "User no found!" });
    return;
  }

  const currentPassword = user.password;

  const isValid = await verifyPassword(oldPassword, currentPassword);

  if (!isValid) {
    client.close();
    res.status(403).json({ message: "Invalid password!" });
    return;
  }

  const hashedNewPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedNewPassword } }
  );

  client.close();
  res.status(200).json({ message: "Password updated" });
}

export default handler;

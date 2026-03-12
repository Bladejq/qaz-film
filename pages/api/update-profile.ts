import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    const { name, image, password } = req.body;

    let hashedPassword = currentUser.hashedPassword;

    if (password && password.length > 0) {
      hashedPassword = await bcrypt.hash(password, 12);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        name,
        image,
        hashedPassword
      }
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
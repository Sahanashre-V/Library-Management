import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken"
const JWT_SECRET = process.env.JWT_SECRET;


export const login = async function (req, res) {
  try {
    const { mem_name, mem_email } = req.body;
    
    const member = await prisma.member.findUnique({
      where: { mem_email: mem_email }
    });

    if (member && member.mem_name === mem_name) {
        // JWT Token
        const token = jwt.sign(
            { id: member.mem_id, email: member.mem_email },
            JWT_SECRET,
            { expiresIn: "1h" }
          );
          res.json({ member, token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Login failed", details: error.message });
  }
};

import jwt from "jsonwebtoken";
import { headers } from "next/headers";

const user = { username: "admin", password: "admin123" };

export async function POST(request: Request) {
  console.log("Request", request);

  try {
    const headersList = headers();

    const username = headersList.get("username");
    const password = headersList.get("password");

    if (username !== user.username || password !== user.password) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ username }, "secret123", { expiresIn: "1h" });

    return Response.json(
      { token },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error: any) {
    // check if this is json parse error
    if (error instanceof SyntaxError) {
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }
  }
}

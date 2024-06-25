export async function POST(request: Request) {
  console.log("Request: ", request);

  try {
    const { from, feeling } = await request.json();

    console.log("New feelings from", from, feeling);

    return Response.json({ success: true });
  } catch (error: any) {
    // check if this is json parse error
    if (error instanceof SyntaxError) {
      return Response.json({ error: "Invalid input" }, { status: 400 });
    } else {
      return Response.json({ error: "Server error" }, { status: 500 });
    }
  }
}

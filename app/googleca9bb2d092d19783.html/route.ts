import { NextResponse } from "next/server"

export async function GET() {
  return new NextResponse("google-site-verification: googleca9bb2d092d19783.html", {
    headers: {
      "Content-Type": "text/html",
    },
  })
}

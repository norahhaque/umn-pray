import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Get the secret from the request header
  // Sanity sends this as "sanity-webhook-secret" header
  const secret = request.headers.get("sanity-webhook-secret");

  // Verify the secret matches what we expect
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json(
      { message: "Invalid secret" },
      { status: 401 }
    );
  }

  // Revalidate the entire site
  // "/" with "layout" revalidates all pages
  revalidatePath("/", "layout");

  return NextResponse.json({
    revalidated: true,
    message: "Cache cleared successfully",
  });
}

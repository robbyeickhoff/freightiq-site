import { getFoundingDriverContext } from "@/lib/founding-drivers/auth";

const PRIVATE_IMAGE_HEADERS = {
  "Cache-Control": "private, no-store",
  "X-Content-Type-Options": "nosniff",
};

export async function GET(request: Request) {
  const context = await getFoundingDriverContext();
  if (!context) {
    return new Response(null, { status: 404, headers: PRIVATE_IMAGE_HEADERS });
  }

  const username = new URL(request.url).searchParams.get("username")?.trim();
  if (!username || username.length > 200) {
    return new Response(null, { status: 404, headers: PRIVATE_IMAGE_HEADERS });
  }

  const { data: profile, error: profileError } = await context.supabase
    .from("profiles")
    .select("profile_image_path")
    .eq("username", username)
    .maybeSingle();

  if (profileError || !profile?.profile_image_path) {
    return new Response(null, { status: 404, headers: PRIVATE_IMAGE_HEADERS });
  }

  const { data: image, error: imageError } = await context.supabase.storage
    .from("profile-images")
    .download(profile.profile_image_path);

  if (imageError || !image) {
    return new Response(null, { status: 404, headers: PRIVATE_IMAGE_HEADERS });
  }

  return new Response(image, {
    headers: {
      ...PRIVATE_IMAGE_HEADERS,
      "Content-Type": image.type || "application/octet-stream",
    },
  });
}

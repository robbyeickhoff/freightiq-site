"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { confirmProfileImageUpload, removeProfileImage } from "./actions";

const MAX_PROFILE_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_PROFILE_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export default function ProfileImageForm({
  userId,
  hasProfileImage,
}: {
  userId: string;
  hasProfileImage: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  function finish(ok: boolean, nextMessage: string) {
    setIsError(!ok);
    setMessage(nextMessage);
    if (ok) router.refresh();
  }

  async function uploadPhoto(formData: FormData) {
    const candidate = formData.get("profile_image");
    if (!(candidate instanceof File) || candidate.size === 0) {
      finish(false, "Choose a photo first.");
      return;
    }
    if (!ALLOWED_PROFILE_IMAGE_TYPES.has(candidate.type)) {
      finish(false, "Choose a JPEG, PNG, or WebP image.");
      return;
    }
    if (candidate.size > MAX_PROFILE_IMAGE_BYTES) {
      finish(false, "Choose an image smaller than 5 MB.");
      return;
    }

    setMessage("");
    const supabase = createClient();
    const { error } = await supabase.storage
      .from("profile-images")
      .upload(`${userId}/profile`, candidate, {
        cacheControl: "0",
        contentType: candidate.type,
        upsert: true,
      });

    if (error) {
      finish(false, "Your photo could not be uploaded. Please try again.");
      return;
    }

    const result = await confirmProfileImageUpload();
    finish(result.ok, result.message);
    if (result.ok && inputRef.current) inputRef.current.value = "";
  }

  function handleUpload(formData: FormData) {
    startTransition(() => {
      void uploadPhoto(formData);
    });
  }

  function handleRemove() {
    startTransition(async () => {
      const result = await removeProfileImage();
      finish(result.ok, result.message);
      if (result.ok && inputRef.current) inputRef.current.value = "";
    });
  }

  return (
    <div className="mt-5">
      <form action={handleUpload} className="grid gap-3">
        <label className="grid gap-2 text-sm font-semibold text-stone-200">
          Choose a photo
          <input
            ref={inputRef}
            name="profile_image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="min-h-12 rounded-xl border border-white/15 bg-black/25 px-3 py-2 text-sm text-stone-300 file:mr-3 file:rounded-full file:border-0 file:bg-amber-400/10 file:px-3 file:py-2 file:font-semibold file:text-amber-200"
          />
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={pending}
            className="sunrise-button min-h-11 rounded-full px-5 text-sm font-semibold text-[#120b06] disabled:cursor-wait disabled:opacity-60"
          >
            {pending ? "Saving…" : hasProfileImage ? "Replace photo" : "Save photo"}
          </button>
          {hasProfileImage ? (
            <button
              type="button"
              disabled={pending}
              onClick={handleRemove}
              className="min-h-11 rounded-full border border-white/15 px-5 text-sm font-semibold text-stone-300 hover:border-white/30 hover:text-white disabled:cursor-wait disabled:opacity-60"
            >
              Remove photo
            </button>
          ) : null}
        </div>
      </form>
      <p
        className={`mt-3 min-h-5 text-sm ${isError ? "text-rose-300" : "text-emerald-200"}`}
        aria-live="polite"
      >
        {message}
      </p>
      <p className="mt-1 text-xs leading-5 text-stone-500">
        Optional. Use a photo of yourself or your truck. JPEG, PNG, or WebP up to 5 MB.
      </p>
    </div>
  );
}

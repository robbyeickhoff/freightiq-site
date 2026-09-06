"use client";

import { useState } from "react";

type YouTubeEmbedProps = {
  title: string;
  videoId: string;
};

export function YouTubeEmbed({ title, videoId }: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <iframe
        className="h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      className="group relative flex h-full w-full items-center justify-center bg-cover bg-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-amber-300"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.18), rgba(0,0,0,0.42)), url(https://i.ytimg.com/vi/${videoId}/hqdefault.jpg)`,
      }}
      onClick={() => setIsPlaying(true)}
      aria-label={`Play video: ${title}`}
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg transition group-hover:scale-105 group-hover:bg-orange-400">
        <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}

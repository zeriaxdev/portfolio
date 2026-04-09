"use client";

import { JSX, useEffect, useState } from "react";
import { siSpotify } from "simple-icons";

type Status = "online" | "offline" | "idle" | "dnd";

interface Spotify {
  song: string;
  artist: string;
  track_id: string;
}

interface Activity {
  name: string;
  details?: string;
  type: number; // 0=Playing, 1=Streaming, 2=Listening, 3=Watching
}

interface LanyardData {
  discord_status: Status;
  listening_to_spotify: boolean;
  spotify: Spotify | null;
  activities: Activity[];
}

const STATUS_ICONS: Record<Status, (size: number) => JSX.Element> = {
  online: (size) => (
    <svg viewBox="0 0 24 24" width={size} height={size} className="shrink-0">
      <path
        d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0"
        fill="#45a367"
      />
    </svg>
  ),
  offline: (size) => (
    <svg viewBox="0 0 24 24" width={size} height={size} className="shrink-0">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0m0 6.02a5.98 5.98 0 1 0 0 11.96 5.98 5.98 0 0 0 0-11.96"
        fill="#84858d"
      />
    </svg>
  ),
  idle: (size) => (
    <svg viewBox="0 0 24 24" width={size} height={size} className="shrink-0">
      <path
        d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12c0-.88.095-1.738.275-2.564A7.428 7.428 0 1 0 9.436.275C10.262.095 11.12 0 12 0"
        fill="#ffc04e"
      />
    </svg>
  ),
  dnd: (size) => (
    <svg viewBox="0 0 24 24" width={size} height={size} className="shrink-0">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0M6.239 8.984a3.013 3.013 0 0 0-3.015 3.012 3.013 3.013 0 0 0 3.015 3.012h11.53a3.013 3.013 0 0 0 3.015-3.012 3.013 3.013 0 0 0-3.015-3.012z"
        fill="#ed273d"
      />
    </svg>
  ),
};

function SpotifyIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="#1DB954"
      className="shrink-0"
    >
      <path d={siSpotify.path} />
    </svg>
  );
}

export default function DiscordStatus({
  size = 10,
  id,
  showActivity = false,
}: {
  size?: number;
  id: string;
  showActivity?: boolean;
}) {
  const [data, setData] = useState<LanyardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://api.lanyard.rest/v1/users/" + id);
        const json = await res.json();
        setData(json.data);
      } catch {
        setData({
          discord_status: "offline",
          listening_to_spotify: false,
          spotify: null,
          activities: [],
        });
      }
    };
    fetchData();
  }, [id]);

  if (!data) return null;

  const statusIcon =
    STATUS_ICONS[data.discord_status]?.(size) ?? STATUS_ICONS.offline(size);

  if (!showActivity) return statusIcon;

  // Determine activity to show
  const spotify =
    data.listening_to_spotify && data.spotify ? data.spotify : null;
  const nonSpotifyActivity = data.activities.find(
    (a) => a.type === 0 && a.name !== "Spotify",
  );

  return (
    <span className="inline-flex items-center gap-1.5">
      {statusIcon}
      {spotify && (
        <a
          href={`https://open.spotify.com/track/${spotify.track_id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 truncate max-w-32 md:max-w-none"
          title={`${spotify.song} · ${spotify.artist}`}
        >
          <SpotifyIcon size={11} />
          <span className="truncate font-mono">
            {spotify.song} · {spotify.artist}
          </span>
        </a>
      )}
      {!spotify && nonSpotifyActivity && (
        <span className="inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 font-mono truncate">
          <span className="opacity-50">playing</span>
          <span className="truncate">{nonSpotifyActivity.name}</span>
        </span>
      )}
    </span>
  );
}

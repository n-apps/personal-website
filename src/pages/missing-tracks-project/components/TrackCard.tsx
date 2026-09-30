import { forwardRef, memo, useEffect, useRef } from 'react';
import {
  RiSpotifyFill,
  RiYoutubeFill,
  RiMore2Fill,
  RiEditLine,
  RiDeleteBinLine,
  RiTimeLine,
  RiExternalLinkLine,
} from '@remixicon/react';
import { m, useAnimationControls } from 'motion/react';
import { Button } from './ui/Button';
import { IconButton } from './ui/IconButton';
import { Popover, PopoverItem } from './ui/Popover';
import { formatAddedAt, formatChecked } from '../lib/date';
import { openSpotifyOrSearch, openYoutubeOrSearch } from '../lib/searchLinks';
import type { MissingTrack } from '../types/track';
import cdImg from '../assets/cd.png';

const CHECK_EASE = [0.16, 1, 0.3, 1] as const;

export interface TrackCardProps {
  track: MissingTrack;
  onMarkChecked: (id: string) => void;
  onEdit: (track: MissingTrack) => void;
  onDelete: (track: MissingTrack) => void;
}

// Memoized: markChecked/updateTrack replace the whole tracks array, but the
// per-row callbacks are referentially stable (useCallback in useTracks, and the
// setEditing/setConfirming setters), so unchanged rows skip re-rendering.
export const TrackCard = memo(forwardRef<HTMLElement, TrackCardProps>(function TrackCard(
  { track, onMarkChecked, onEdit, onDelete },
  ref,
) {
  const spotifyHref = openSpotifyOrSearch(track);
  const youtubeHref = openYoutubeOrSearch(track);

  // Acknowledge the core loop: opening Spotify or "Mark checked now" updates
  // lastCheckedAt with no visible feedback. Pulse a green ring on the card and
  // pop the time icon so the eye lands on the freshly-updated timestamp. Under
  // reduced motion (MotionConfig), the transform pop is suppressed and only the
  // opacity flash remains.
  const ringControls = useAnimationControls();
  const iconControls = useAnimationControls();
  const prevCheckedAt = useRef(track.lastCheckedAt);

  useEffect(() => {
    if (prevCheckedAt.current === track.lastCheckedAt) return;
    prevCheckedAt.current = track.lastCheckedAt;
    if (track.lastCheckedAt === null) return; // cleared, nothing to confirm
    ringControls.set({ opacity: 0.85 });
    ringControls.start({
      opacity: 0,
      transition: { duration: 0.9, ease: CHECK_EASE },
    });
    iconControls.start({
      scale: [1, 1.35, 1],
      transition: { duration: 0.5, ease: CHECK_EASE, times: [0, 0.35, 1] },
    });
  }, [track.lastCheckedAt, ringControls, iconControls]);

  return (
    <m.article
      ref={ref}
      role="listitem"
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -8 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="group relative flex flex-col gap-4 rounded-mt-card border border-mt-border/40 bg-mt-surface p-4 transition-colors duration-200 hover:border-mt-border/70 hover:bg-mt-interactive/30 md:flex-row md:items-center md:gap-5"
    >
      <m.span
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={ringControls}
        className="pointer-events-none absolute inset-0 rounded-mt-card ring-2 ring-inset ring-mt-green"
      />
      <div className="flex min-w-0 flex-1 items-start gap-3 md:items-center">
        <img
          src={cdImg}
          alt=""
          aria-hidden="true"
          className="h-12 w-12 shrink-0 rounded-mt-circle border border-mt-border/40 object-cover group-hover:animate-spin group-hover:[animation-duration:2.5s]"
        />

        <div className="flex min-w-0 flex-col gap-0.5">
          <h3
            className="truncate text-base font-bold leading-tight text-mt-text"
            title={track.title}
          >
            {track.title}
          </h3>
          <p className="truncate text-sm text-mt-text-secondary" title={track.artist}>
            {track.artist}
          </p>
          {track.notes ? (
            <p className="truncate text-xs leading-relaxed text-mt-text-secondary">
              {track.notes}
            </p>
          ) : null}
          <p className="mt-0.5 flex items-center gap-1.5 text-[11px] uppercase tracking-mt-label text-mt-text-secondary/80">
            <m.span
              animate={iconControls}
              className="inline-flex shrink-0 origin-center"
            >
              <RiTimeLine className="size-3.5" aria-hidden="true" />
            </m.span>
            <span className="min-w-0 truncate">
              Added {formatAddedAt(track.addedAt)}
              <span aria-hidden="true"> · </span>
              {formatChecked(track.lastCheckedAt)}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 md:shrink-0 md:flex-nowrap md:justify-end">
        <Button
          size="sm"
          variant="primary"
          leadingIcon={<RiSpotifyFill className="size-4" />}
          trailingIcon={<RiExternalLinkLine className="size-3.5" />}
          onClick={() => {
            window.open(spotifyHref, '_blank', 'noopener,noreferrer');
            onMarkChecked(track.id);
          }}
        >
          Spotify
        </Button>
        <Button
          size="sm"
          variant="secondary"
          leadingIcon={<RiYoutubeFill className="size-4 text-mt-red" />}
          trailingIcon={<RiExternalLinkLine className="size-3.5" />}
          onClick={() => {
            window.open(youtubeHref, '_blank', 'noopener,noreferrer');
          }}
        >
          YouTube
        </Button>
        <Popover
          align="end"
          trigger={
            <IconButton
              label="More actions"
              icon={<RiMore2Fill />}
              variant="ghost"
              size="sm"
            />
          }
        >
          {({ close }) => (
            <div className="flex flex-col">
              <PopoverItem
                leadingIcon={<RiTimeLine />}
                onClick={() => {
                  onMarkChecked(track.id);
                  close();
                }}
              >
                Mark checked now
              </PopoverItem>
              <PopoverItem
                leadingIcon={<RiEditLine />}
                onClick={() => {
                  onEdit(track);
                  close();
                }}
              >
                Edit
              </PopoverItem>
              <PopoverItem
                destructive
                leadingIcon={<RiDeleteBinLine />}
                onClick={() => {
                  onDelete(track);
                  close();
                }}
              >
                Delete
              </PopoverItem>
            </div>
          )}
        </Popover>
      </div>
    </m.article>
  );
}));

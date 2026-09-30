import { useState } from 'react';
import { m } from 'motion/react';
import { TrackFormFields } from './TrackFormFields';
import type { TrackDraft } from '../types/track';

export interface AddTrackFormProps {
  onAdd: (draft: TrackDraft) => void;
}

const SAMPLE_TRACK: TrackDraft = {
  artist: 'Rick Astley',
  title: 'Never Gonna Give You Up',
  youtubeUrl: 'https://youtu.be/dQw4w9WgXcQ',
  notes:
    "Swears it went missing from my library. Click the YouTube link to confirm it's really gone. I'm sure it'll never let you down.",
};

export function AddTrackForm({ onAdd }: AddTrackFormProps) {
  const [resetKey, setResetKey] = useState(0);

  const handleSubmit = (draft: TrackDraft) => {
    onAdd(draft);
    setResetKey((k) => k + 1);
  };

  return (
    <m.section
      id='add-track'
      aria-labelledby='add-track-heading'
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.42, ease: 'easeOut' }}
      className='form-inverted rounded-mt-card border border-mt-border/60 bg-mt-surface p-6 shadow-mt-card md:p-8'>
      <header className='mb-6 flex items-center gap-3'>
        <div>
          <h2
            id='add-track-heading'
            className='text-xl font-bold tracking-tight text-mt-text'>
            Add a missing track
          </h2>
          <p className='text-sm text-mt-text-secondary'>
            Save it now, check back later.
          </p>
        </div>
      </header>
      <TrackFormFields
        key={resetKey}
        submitLabel='Add to watchlist'
        onSubmit={handleSubmit}
        layout='page'
        sample={SAMPLE_TRACK}
      />
    </m.section>
  );
}

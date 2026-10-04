// The two sides of Bali Monster. The brand comes first and the activity follows, so a snorkeler
// who lands on the charters side never has to read past a speargun to find their trip.
export type TrackId = 'spearfishing' | 'charters';

export type Track = {
  id: TrackId;
  path: string;
  activity: string;
  name: string;
  tagline: string;
  summary: string;
  list: string[];
  interest: string;
  action: string;
  photo: string;
};

export const tracks: Record<TrackId, Track> = {
  spearfishing: {
    id: 'spearfishing',
    path: '/spearfishing',
    activity: 'Spearfishing',
    name: 'Bali Monster Spearfishing',
    tagline: 'For the hunt.',
    summary: 'Dogtooth tuna, blue water, and one breath at a time. Guided spearfishing and freediving trips in Bali.',
    list: ['Spearfishing', 'Freediving', 'Dogtooth tuna'],
    interest: 'spearfishing for dogtooth tuna',
    action: 'Plan a spearfishing trip',
    photo: 'below-the-surface',
  },
  charters: {
    id: 'charters',
    path: '/',
    activity: 'Charters',
    name: 'Bali Monster Charters',
    tagline: 'For the day out.',
    summary: 'A boat and crew for your day on the water around Bali. Snorkeling, sunset cruises, island camping, sportfishing, and island transfers.',
    list: ['Snorkeling', 'Sunset cruises', 'Island camping', 'Sportfishing', 'Island transfers'],
    interest: 'a boat charter',
    action: 'Plan a boat day',
    photo: 'coastal-run',
  },
};

export const trackList = [tracks.spearfishing, tracks.charters];

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
    path: '/charters',
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

// Key used in localStorage to remember which side a visitor picked.
export const trackStorageKey = 'bm-track';

// Script fragments rendered inline so the choice works on the static export without a client bundle.
// `?choose` (or #choose) on the landing page skips the redirect so a visitor can change their pick.
export const rememberTrackScript = (id: TrackId) => `try{localStorage.setItem(${JSON.stringify(trackStorageKey)},${JSON.stringify(id)})}catch(e){}`;
export const redirectToTrackScript = () => `try{var t=localStorage.getItem(${JSON.stringify(trackStorageKey)});if(!/choose/.test(location.search+location.hash)){if(t==='charters')location.replace(${JSON.stringify(tracks.charters.path)});else if(t==='spearfishing')location.replace(${JSON.stringify(tracks.spearfishing.path)})}}catch(e){}`;

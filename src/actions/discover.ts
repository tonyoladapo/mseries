import { DiscoverShow } from '../types/show';

export const setDiscoverShows = (discoverShows: DiscoverShow[]) => ({
  type: 'SET_DISCOVER_SHOWS',
  payload: discoverShows,
});

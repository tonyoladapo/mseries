import {
  markEpisodeWatched,
  markEpisodeUnwatched,
} from '../helpers/episodeHelpers';
import {
  markSeasonWatched,
  markSeasonUnwatched,
} from '../helpers/seasonHelpers';

const initial_state = {
  genres: [],
  userGenres: [],
  userShows: [],
  unwatched: [],
  unwatchedCollection: {},
};

interface ActionTypes {
  type: string;
  payload?: any;
}

const showReducer = (state = initial_state, { type, payload }: ActionTypes) => {
  switch (type) {
    case 'SET_GENRES':
      return { ...state, genres: payload };

    case 'SET_USER_GENRES':
      return { ...state, userGenres: payload };

    case 'SET_USER_SHOWS':
      return { ...state, userShows: payload };

    case 'SET_UNWATCHED':
      return { ...state, unwatched: payload };

    case 'REMOVE_FROM_UNWATCHED':
      const shows: any = state.unwatched;
      return { ...state, unwatched: delete shows[payload] };

    case 'SET_UNWATCHED_COLLECTION':
      return { ...state, unwatchedCollection: payload };

    case 'MARK_EPISODE_WATCHED':
      return {
        ...state,
        unwatchedCollection: markEpisodeWatched(state, payload),
      };

    case 'MARK_EPISODE_UNWATCHED':
      return {
        ...state,
        unwatchedCollection: markEpisodeUnwatched(state, payload),
      };

    case 'MARK_SEASON_WATCHED':
      return {
        ...state,
        unwatchedCollection: markSeasonWatched(state, payload),
      };

    case 'MARK_SEASON_UNWATCHED':
      return {
        ...state,
        unwatchedCollection: markSeasonUnwatched(state, payload),
      };

    default:
      return state;
  }
};

export default showReducer;

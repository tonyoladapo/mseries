import moment from 'moment';

export const markEpisodeWatched = (
  state,
  { id, seasonNumber, episodeNumber },
) => {
  const showId = id.toString();
  let show = state.unwatchedCollection[showId];

  let _seasons = show.seasons;
  const key = `season ${seasonNumber}`;

  let allEpisodesWatched = true;

  _seasons[key].episodes.map(({ episode_number, air_date }, index) => {
    if (episodeNumber == episode_number) {
      _seasons[key].episodes[index].watched = true;
    }

    if (
      !_seasons[key].episodes[index].watched &&
      moment(air_date).isBefore(moment())
    )
      allEpisodesWatched = false;
  });

  _seasons[key].numberOfWatchedEpisodes =
    _seasons[key].numberOfWatchedEpisodes + 1;

  _seasons[key].completed = allEpisodesWatched;

  const totalWatched = show.numOfWatchedEpisodes + 1;

  const obj = {
    ...show,
    numOfWatchedEpisodes: totalWatched,
    seasons: { ...show.seasons, ..._seasons },
  };

  return { ...state.unwatchedCollection, [showId]: obj };
};

export const markEpisodeUnwatched = (
  state,
  { id, seasonNumber, episodeNumber },
) => {
  const showId = id.toString();
  let show = state.unwatchedCollection[showId];

  let _seasons = show.seasons;
  const key = `season ${seasonNumber}`;

  _seasons[key].episodes.map(({ episode_number }, index) => {
    if (episodeNumber == episode_number) {
      _seasons[key].episodes[index].watched = false;
    }
  });

  _seasons[key].completed = false;

  _seasons[key].numberOfWatchedEpisodes =
    _seasons[key].numberOfWatchedEpisodes - 1;

  const totalWatched = show.numOfWatchedEpisodes - 1;

  const obj = {
    ...show,
    numOfWatchedEpisodes: totalWatched,
    seasons: { ...show.seasons, ..._seasons },
  };

  return { ...state.unwatchedCollection, [showId]: obj };
};

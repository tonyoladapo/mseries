import moment from 'moment';

export const markSeasonWatched = (state, { id, seasonNumber }) => {
  const showId = id.toString();

  let show = state.unwatchedCollection[showId];

  let { seasons } = show;
  let _seasons = seasons;

  const key = `season ${seasonNumber}`;

  _seasons[key].completed = true;

  let alreadyWatched = 0;

  _seasons[key].episodes.map(episode => {
    if (moment(episode.air_date).isBefore(moment())) {
      if (episode.watched) alreadyWatched += 1;
      episode.watched = true;
    }
  });

  _seasons[key].numberOfWatchedEpisodes = _seasons[key].numberOfAiredEpisodes;

  const totalWatched =
    show.numOfWatchedEpisodes +
    _seasons[key].numberOfAiredEpisodes -
    alreadyWatched;

  const obj = {
    ...show,
    numOfWatchedEpisodes: totalWatched,
    seasons: { ...show.seasons, ..._seasons },
  };

  return { ...state.unwatchedCollection, [showId]: obj };
};

export const markSeasonUnwatched = (state, { id, seasonNumber }) => {
  const showId = id.toString();

  let show = state.unwatchedCollection[showId];

  let { seasons } = show;
  let _seasons = seasons;

  const key = `season ${seasonNumber}`;

  _seasons[key].completed = false;

  let alreadyWatched = 0;

  _seasons[key].episodes.map(episode => {
    if (moment(episode.air_date).isBefore(moment())) {
      if (episode.watched) alreadyWatched += 1;
      episode.watched = false;
    }
  });

  _seasons[key].numberOfWatchedEpisodes = 0;

  const totalWatched =
    show.numOfWatchedEpisodes - _seasons[key].numberOfAiredEpisodes;

  const obj = {
    ...show,
    numOfWatchedEpisodes: totalWatched,
    seasons: { ...show.seasons, ..._seasons },
  };

  return { ...state.unwatchedCollection, [showId]: obj };
};

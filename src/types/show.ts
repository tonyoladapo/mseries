interface CreatedBy {
  credit_id: string;
  gender: number;
  id: number;
  name: string;
  profile_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Episode {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

interface Network {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ProductionCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ProductionCountries {
  iso_3166_1: string;
  name: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface ExtendedEpisode extends Episode {}

export interface Unwatched {
  [key: string]: {
    _id: string;
    air_date: string;
    episodes: ExtendedEpisode[];
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
  };
}

export interface DiscoverShow {
  id: number;
  name: string;
  backdrop_path: string;
  genre_ids: number[];
  vote_count: number;
  original_language: string;
  vote_average: number;
  poster_path: string;
  overview: string;
  original_name: string;
  origin_country: string[];
  first_air_date: string;
  popularity: number;
}

export interface Show extends DiscoverShow {
  // adult: boolean;
  // backdrop_path: string;
  // created_by: CreatedBy[];
  // episode_run_time: number[];
  // first_air_date: string;
  // genres: Genre[];
  // homepage: string;
  // id: number;
  // in_production: boolean;
  // languages: string[];
  // last_air_date: string;
  // last_episode_to_air: Episode;
  // name: string;
  // networks: Network[];
  // next_episode_to_air: Episode;
  // number_of_episodes: number;
  // number_of_seasons: number;
  // origin_country: string[];
  // original_language: string;
  // original_name: string;
  // overview: string;
  // popularity: number;
  // poster_path: string;
  // production_companies: ProductionCompanies[];
  // production_countries: ProductionCountries[];
  // seasons: Season[];
  // spoken_languages: SpokenLanguage[];
  // status:
  //   | 'Returning Series'
  //   | 'Ended'
  //   | 'Canceled'
  //   | 'In Production'
  //   | 'Planned';
  // tagline: string;
  // type:
  //   | 'Scripted'
  //   | 'Reality'
  //   | 'Talk Show'
  //   | 'Game Show'
  //   | 'Variety'
  //   | 'Animation'
  //   | 'Live Action';
  // unwatched: Unwatched[];
  // vote_average: number;
  // vote_count: number;
}

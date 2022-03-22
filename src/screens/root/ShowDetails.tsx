import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../../types/reducerTypes';
import useShowDetails from '../../hooks/useShowDetails';
import useShow from '../../hooks/useShow';
import Header from '../../components/ShowDetails/Header';
import moment from 'moment';
import Info from '../../components/ShowDetails/Info';
import Overview from '../../components/ShowDetails/Overview';
import Seasons from '../../components/ShowDetails/Seasons';
import SimilarShows from '../../components/ShowDetails/SimilarShows';

const ShowDetails = ({ route }) => {
  const { showId } = route.params;
  const { showDetails, added } = useShowDetails(showId);
  // showDetails !== null && console.log(Object.keys(showDetails));

  // showDetails !== null && console.log(showDetails.similar);

  return (
    <>
      {showDetails !== null ? (
        <ScrollView style={styles.container}>
          <Header
            showId={showId}
            title={showDetails.name}
            year={moment(showDetails.first_air_date).format('YYYY')}
            posterPath={showDetails.poster_path}
            status={showDetails.status}
            added={added}
            show={showDetails}
          />
          <Info
            rating={showDetails.vote_average}
            genre={showDetails.genres[0].name}
            network={showDetails.networks[0].name}
            runtime={showDetails.episode_run_time[0]}
          />
          <Overview overview={showDetails.overview} />
          <Seasons
            added={added}
            showId={showId}
            seasonDetails={showDetails.seasons}
          />
          <SimilarShows similar={showDetails.similar} />
        </ScrollView>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShowDetails;

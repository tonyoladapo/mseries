import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
  Animated,
} from 'react-native';
import moment from 'moment';
import useShowDetails from '../../hooks/useShowDetails';
import Header from '../../components/ShowDetails/Header';
import Info from '../../components/ShowDetails/Info';
import Overview from '../../components/ShowDetails/Overview';
import SimilarShows from '../../components/ShowDetails/SimilarShows';
import Seasons from '../../components/ShowDetails/Seasons';

const AnimatedView = Animated.createAnimatedComponent(View);

const ShowDetails = ({ route }) => {
  const { showId } = route.params;
  const { added, loading, showDetails, progress } = useShowDetails(showId);

  const [showingSeasons, setShowingSeasons] = useState(added);
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (progress != null && !!Object.keys(progress).length) {
      setShowingSeasons(true);

      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        setShowingSeasons(false);
      });
    }
  }, [progress]);

  return (
    <>
      {showDetails !== null && !loading ? (
        <ScrollView>
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
          <AnimatedView style={{ opacity }}>
            {showingSeasons && (
              <Seasons showId={showId} progress={progress} added={added} />
            )}
          </AnimatedView>
          <SimilarShows similar={showDetails.similar.results} />
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

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../../types/reducerTypes';
import useShow from '../../hooks/useShow';

const ShowDetails = (props: any) => {
  // const { loading, added, seasons } = useSelector(
  //   ({ showDetails }: ReducerTypes) => showDetails,
  // );

  // const controller = new AbortController();

  // const show = props.route.params.show;
  // const { id, name, poster_path } = show;

  // const showId = id.toString();

  // const { addShow, removeShow, checkAdded, resetState } = useShow(controller);

  // useEffect(() => {
  //   checkAdded(showId);
  //   return () => resetState();
  // }, []);

  return (
    <></>
    // <ScrollView style={styles.container}>
    //   <Text>{name}</Text>
    //   {loading ? (
    //     <ActivityIndicator style={{ padding: 16 }} />
    //   ) : (
    //     <TouchableOpacity
    //       style={{ padding: 16 }}
    //       onPress={() => (added ? removeShow(showId) : addShow(show))}>
    //       <Text>{added ? 'Remove show' : 'Add show'}</Text>
    //     </TouchableOpacity>
    //   )}

    //   {seasons.length > 0 &&
    //     seasons.map(
    //       season =>
    //         season.season_number > 0 && (
    //           <View key={season.id}>
    //             <Text>{`Season ${season.season_number}`}</Text>
    //           </View>
    //         ),
    //     )}
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ShowDetails;

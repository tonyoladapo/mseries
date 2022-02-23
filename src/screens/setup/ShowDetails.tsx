import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import useShow from '../../hooks/useShow';

const ShowDetails = (props: any) => {
  const show = props.route.params.show;
  const showId = show.id.toString();
  const { addShow, loading, fullShow, added, checkAdded, removeShow } =
    useShow();

  useEffect(() => {
    checkAdded(showId);
  }, []);

  return (
    <View style={styles.container}>
      <Text>{show.name}</Text>
      <TouchableOpacity
        disabled={loading}
        style={{ padding: 16 }}
        onPress={() => (added ? removeShow(showId) : addShow(showId))}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text>{added ? 'Remove show' : 'Add show'}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShowDetails;

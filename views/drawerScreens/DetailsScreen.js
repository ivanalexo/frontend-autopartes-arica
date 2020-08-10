import React from 'react';

//Import all required component
import { View, Text } from 'react-native';

const DetailsScreen = ({route, navigation}) => {
    console.log(navigation);
  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 100 }}>
      <Text style={{ fontSize: 23, marginTop: 10 }}>Detail Screen</Text>
      <Text style={{ fontSize: 18, marginTop: 10 }}>
        Detalles de producto
      </Text>
      <Text style={{ fontSize: 18, marginTop: 10 }}>https://aboutreact</Text>
    </View>
  );
};
export default DetailsScreen;
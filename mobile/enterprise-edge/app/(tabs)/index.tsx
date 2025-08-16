import {  ScrollView, StyleSheet, Text} from 'react-native';
import BaseScreen from '../shared/components/base-screen';
import DashBoard from '../dashboard/dashboard';


export default function HomeScreen() {
  return (
    <BaseScreen>
   <DashBoard/>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  
});

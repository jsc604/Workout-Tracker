import { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

// custom components
import { Container } from "../components/shared";
import RegularButton from "../components/buttons/RegularButton";
import { colors } from "../components/colors";

// navigation
import { RootStackParamList } from "../navigators/RootStack"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeContainer = styled(Container)`
`;

const Home: FunctionComponent<Props> = ({navigation}) => {
  return (
    <HomeContainer>
      <StatusBar style="light" />
      <RegularButton
        onPress={() => { navigation.navigate("SelectWorkout") }}
        textStyles={{ fontSize: 20 }}
        btnStyles={{ width: '70%', marginTop: 20 }}
      >
        <strong>Start A New Workout</strong>
      </RegularButton>
      <RegularButton
        onPress={() => { }}
        textStyles={{ fontSize: 20 }}
        btnStyles={{ width: '70%', marginTop: 20, backgroundColor: colors.orange }}
      >
        <strong>Your Progress</strong>
      </RegularButton>
    </HomeContainer>
  )
};

export default Home;
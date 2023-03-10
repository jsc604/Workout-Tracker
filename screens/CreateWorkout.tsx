import { FunctionComponent, useState } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { TextInput, ScrollView, View, Text } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

// custom components
import { Container } from "../components/shared";
import RegularButton from "../components/buttons/RegularButton";
import { colors } from "../components/colors";
import { sampleExercises } from "../assets/workouts/exercises";
import BigText from "../components/texts/BIgText";
import RegularText from "../components/texts/RegularText";

// firebase
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
const { firestore, auth } = firebase;

// navigation
import { RootStackParamList } from "../navigators/RootStack"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "CreateWorkout">;

// helpers
import { addNewWorkoutDoc } from "../helpers/databaseHelpers";

// types
import { ExerciseBlock } from "../helpers/workoutTypes";

const CreateWorkoutContainer = styled(Container)``;

const WorkoutInputs = styled(Container)`
  margin: 20px auto;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: fit;
  flex: 0.1;
  z-index: 2;
`;

const ExerciseInput = styled(TextInput)`
  height: 40px;
  border: 1px solid ${colors.black};
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
`;

const CreateWorkout: FunctionComponent<Props> = ({ navigation }) => {
  const [workoutName, setWorkoutName] = useState('');
  const [open, setOpen] = useState(false);
  const [exercise, setExercise] = useState<string[]>([]);
  const [workoutData, setWorkoutData] = useState<ExerciseBlock[]>([]);

  const listsRef = firestore()
    .collection('users')
    .doc(auth()
      .currentUser?.uid)
    .collection('workouts');

  const addWorkout = (name: string, exercises: ExerciseBlock[]) => {
    addNewWorkoutDoc(listsRef, name, { exercises })
  };

  const handleAddExercises = () => {
    const newWorkoutData = exercise.map(exercise => ({ exercise, sets: 0, reps: 0 }));
    setWorkoutData(newWorkoutData);
  };

  const handleSetChange = (index: number, value: number) => {
    const newWorkoutData = [...workoutData];
    newWorkoutData[index].sets = value;
    setWorkoutData(newWorkoutData);
  };

  const handleRepChange = (index: number, value: number) => {
    const newWorkoutData = [...workoutData];
    newWorkoutData[index].reps = value;
    setWorkoutData(newWorkoutData);
  };

  const workoutDataRow = workoutData.map((item, i) => {
    return (
      <View key={i + 200} style={{ flexDirection: 'row', width: '100%', marginTop: 10, alignItems: 'center' }}>
        <RegularText textStyles={{ width: '50%' }}>{item.exercise}</RegularText>
        <ExerciseInput style={{ width: '20%', margin: 'auto' }} onChangeText={(value) => handleSetChange(i, parseInt(value))} placeholder='0' keyboardType='numeric' />
        <ExerciseInput style={{ width: '20%', margin: 'auto' }} onChangeText={(value) => handleRepChange(i, parseInt(value))} placeholder='0' keyboardType='numeric' />
      </View>
    )
  });

  return (
    <CreateWorkoutContainer>
      <StatusBar style="light" />
      <TextInput
        onChangeText={setWorkoutName}
        placeholder="Enter workout name"
        style={{ marginTop: 20, fontSize: 20, borderColor: 'black', borderWidth: 1, borderRadius: 6 }}
      />
      <WorkoutInputs>
        <DropDownPicker
          items={sampleExercises.map(exercise => ({
            label: exercise.label,
            value: exercise.label
          }))}
          multiple={true}
          placeholder="Select exercises"
          labelStyle={{
            textAlign: 'left',
            fontSize: 20
          }}
          setValue={setExercise}
          searchable={true}
          value={exercise}
          open={open}
          setOpen={setOpen}
          mode={"BADGE"}
        />
        <RegularButton
          onPress={handleAddExercises}
          btnStyles={{ width: '30%', marginLeft: 20, backgroundColor: colors.orange }}
        >
          +
        </RegularButton>
      </WorkoutInputs>

      {workoutName && <BigText>{workoutName}</BigText>}

      {workoutData.length > 0 &&
        (<ScrollView style={{ width: "90%", flex: 1, marginBottom: 20 }}>
          <View style={{ alignItems: "center" }}>
            <View style={{ flexDirection: 'row', width: '100%', borderBottomWidth: 1, marginTop: 10 }}>
              <RegularText textStyles={{ width: '50%' }}>Exercise</RegularText>
              <RegularText textStyles={{ width: '25%', textAlign: 'center' }}>Sets</RegularText>
              <RegularText textStyles={{ width: '25%', textAlign: 'center' }}>Reps</RegularText>
            </View>
            {workoutDataRow}
          </View>
        </ScrollView>)}

      <RegularButton
        onPress={() => {
          addWorkout(workoutName, workoutData);
          navigation.navigate('SelectWorkout');
        }}
        btnStyles={{ marginTop: 'auto', marginBottom: 30, width: '70%' }}
        textStyles={{ fontWeight: 'bold' }}
      >
        Create Workout
      </RegularButton>

    </CreateWorkoutContainer>
  )
};

export default CreateWorkout;
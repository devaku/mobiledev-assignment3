import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import '../global.css';

export default function App() {
	return (
		<View className="">
			<Text className="bg-sky-800 text-white w-fit p-1">
				Open up App.tsx to start working on your app!
			</Text>
			<StatusBar style="auto" />
		</View>
	);
}

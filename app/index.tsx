import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';

// https://www.npmjs.com/package/react-native-element-dropdown

const data = [
	{ label: 'January', value: '1' },
	{ label: 'February', value: '2' },
	{ label: 'March', value: '3' },
	{ label: 'April', value: '4' },
	{ label: 'May', value: '5' },
	{ label: 'June', value: '6' },
	{ label: 'July', value: '7' },
	{ label: 'August', value: '8' },
	{ label: 'September', value: '9' },
	{ label: 'October', value: '10' },
	{ label: 'November', value: '11' },
	{ label: 'December', value: '12' },
];
import '../global.css';

export default function App() {
	const [isFocus, setIsFocus] = useState(false);
	const [month, setMonth] = useState('');
	const [date, setDate] = useState('1');

	async function fetchDateFact(givenMonth: String, givenDate: String) {
		// If either is blank or null
		if (!givenMonth || !givenDate) {
			return;
		}

		console.log('Current Month: ', givenMonth);
		console.log('Current Date: ', givenDate);
	}

	return (
		<SafeAreaProvider>
			<SafeAreaView>
				<View className="flex flex-col items-center justify-center">
					<Text className="bg-sky-800 text-white w-full p-1">
						OUTPUT FROM API HERE
					</Text>
					<View className="mt-5 w-full">
						{/* MONTH */}
						<View className="flex flex-row items-center justify-around w-full">
							<Text className="w-12">Month:</Text>
							<Dropdown
								style={[styles.dropdown]}
								placeholderStyle={styles.placeholderStyle}
								selectedTextStyle={styles.selectedTextStyle}
								data={data}
								maxHeight={300}
								labelField="label"
								valueField="value"
								placeholder={!isFocus ? 'Select item' : '...'}
								value={month}
								onFocus={() => setIsFocus(true)}
								onBlur={() => setIsFocus(false)}
								onChange={(item) => {
									setMonth(item.value);
									setIsFocus(false);

									fetchDateFact(item.value, date);
								}}
							/>
						</View>
						{/* DAY */}
						<View className="flex flex-row items-center justify-around w-full">
							<Text className="w-12">Day:</Text>

							<TextInput
								className="w-[120px]"
								onChangeText={(item) => {
									setDate(item);
									fetchDateFact(month, item);
								}}
								value={date}
							/>
						</View>
					</View>
				</View>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	dropdown: {
		height: 50,
	},

	placeholderStyle: {
		width: 100,
		fontSize: 16,
	},
	selectedTextStyle: {
		width: 100,
		fontSize: 16,
	},
});

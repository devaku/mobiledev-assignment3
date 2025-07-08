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
	const [fact, setFact] = useState('None');

	async function fetchDateFact(givenMonth: String, givenDate: String) {
		// If either is blank or null
		if (!givenMonth || !givenDate) {
			setFact('None')
			return;
		}

		try {
			const response = await fetch(`https://numbersapi.p.rapidapi.com/${givenMonth}/${givenDate}/date`, {
				method: "GET",
				headers: {
					'x-rapidapi-key': '47d37a0261mshe7167cf158cddd3p1afc43jsn1754f29ec4cd',
					'x-rapidapi-host': 'numbersapi.p.rapidapi.com'
				},
			});
			const data = await response.text();
			setFact(data)
			console.log(data);
		} catch (error) {
			console.error("Error:", error);
		}
	}

	return (
		<SafeAreaProvider>
			<SafeAreaView>
				<View className="flex flex-col items-center justify-center bg-slate-200  mt-[25%] p-5 mx-5 rounded-lg">

					<View className="mt-5 w-full">
						{/* MONTH */}
						<View className="flex flex-row items-center justify-around w-full">
							<Text className="w-12">Month</Text>
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
						<View className="flex flex-row items-center justify-around w-full mt-10">
							<Text className="w-12">Day:</Text>

							<TextInput
								className="w-[120px] bg-white p-2 rounded"
								onChangeText={(item) => {
									setDate(item);
									fetchDateFact(month, item);
								}}
								value={date}
							/>
						</View>
					</View>
					<Text className="w-full text-left mt-5 font-bold text-xl">Fact:</Text>
					<Text className="flex flex-col items-center justify-center p-1">
						{fact}
					</Text>
				</View>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({ 
	dropdown: {
		height: 50,
		width: 140,
		borderRadius: 8,
		padding: 5,
		backgroundColor: 'white',
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

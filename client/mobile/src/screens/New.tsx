import { useState } from 'react'
import {
    TextInput,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Alert
} from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { api } from '../lib/axios';


const avaliableWeekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
]

export function New() {
    const [weekDays, setWeekDays] = useState<number[]>([])
    const [title, setTitle] = useState('')

    function handleTodayWeekDay(weekDayIndex: number) {
        if (weekDays.includes(weekDayIndex)) {
            setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
        } else {
            setWeekDays(prevState => [...prevState, weekDayIndex])
        }
    }

    async function handleCreateHabit() {
        try {
           if(!title.trim() || weekDays.length === 0){
            Alert.alert("Novo hábito", "Informe o nome do hábito e escolha a periodicidade.")
           } 

           await api.post('/habits', {
            title, weekDays
           })
           setTitle('')
           setWeekDays([])

           Alert.alert("Novo hábito", "Hábito criado com sucesso!")
        } catch (error) {
            console.error(error);
            Alert.alert("Ops", "Não foi possível criar o novo hábito.")
        }
    }

    return (
        <View className='flex-1 bg-background px-8 pt-16'>
            <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100}}
            >

                <BackButton />

                <Text className='mt-6 text-white font-extrabold text-3xl'>
                    Criar hábito
                </Text>

                <Text className='mt-6 text-white font-semibold text-base'>
                    Qual seu compromentimento?
                </Text>

                <TextInput
                    className='h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600'
                    placeholder='Exercícios, dormir bem, etc...'
                    placeholderTextColor={colors.zinc['400']}
                    onChangeText={setTitle}
                />

                <Text className="font-semibold mt-4 mb-3 text-white">
                    Qual a recorrência?
                </Text>

                {
                    avaliableWeekDays.map((weekDay, index) => (
                        <Checkbox
                            key={weekDay}
                            title={weekDay}
                            checked={weekDays.includes(index)}
                            onPress={() => handleTodayWeekDay(index)}
                        />
                    ))
                }

                <TouchableOpacity
                    className='w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6'
                    activeOpacity={0.7}
                    onPress={handleCreateHabit}
                >
                    <Feather
                        name='check'
                        size={20}
                        color={colors.white}
                    />
                    <Text
                        className='font-semibold text-base text-white ml-2'
                    >
                        Confirmar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function App() {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Configurações da API (NÃO ESQUECER DO ENV FILE!)
  const API_KEY = process.env.EXPO_PUBLIC_KEY; 
  const BASE_URL = process.env.EXPO_PUBLIC_URL; 

const fetchWeather = async () => {
    if (!city.trim()) return;

    Keyboard.dismiss();
    setLoading(true);
    setErrorMsg('');
    setForecast([]);

    try {

      const cityClean = city.replace(/,\s+/g, ','); 
      const url = `${BASE_URL}?city=${encodeURIComponent(cityClean)}&days=7&APPID=${API_KEY}`; //Endpoint utilizado
      
      console.log("URL Gerada:", url); 

      const response = await fetch(url);
      const responseText = await response.text(); 
      console.log("Status Code:", response.status); 
      console.log("Corpo da Resposta:", responseText);

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${responseText}`);
      }

      const json = JSON.parse(responseText);

      if (!json.days) {
        throw new Error('Formato de resposta inválido');
      }

      setForecast(json.days);

    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.icon}>{item.icon}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{item.date}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
      
      <View style={styles.cardFooter}>
        <Text style={styles.tempText}>Min: {Math.round(item.minTempC)}°C</Text> 
        <Text style={styles.tempText}>Max: {Math.round(item.maxTempC)}°C</Text>
        <Text style={styles.humidityText}>Hum: {Math.round(item.humidity * 100)}%</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#448AFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>WeatherViewer</Text>
      </View>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Cidade (ex: Passos, MG, BR)"
          value={city}
          onChangeText={setCity}
          placeholderTextColor="#999"
        />
        {/* Simulação do FloatingActionButton ao lado do input*/}
        <TouchableOpacity style={styles.fab} onPress={fetchWeather}>
           <Text style={styles.fabIcon}>✓</Text>
        </TouchableOpacity>
      </View>

      {/* Área de Conteúdo */}
      <View style={styles.content}>
        {loading && <ActivityIndicator size="large" color="#448AFF" />}
        
        {errorMsg ? (
          <Text style={styles.errorText}>{errorMsg}</Text>
        ) : null}

        <FlatList
          data={forecast}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
}

//CSS baseado no layout do aplicativo do livro
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    backgroundColor: '#448AFF', 
    padding: 16,
    elevation: 4,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    padding: 16,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#448AFF',
    marginRight: 10,
  },
  fab: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#448AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabIcon: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 16,
    marginBottom: 10,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 40, 
    marginRight: 15,
  },
  dateContainer: {
    flex: 1,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 8,
  },
  tempText: {
    fontSize: 14,
    color: '#333',
  },
  humidityText: {
    fontSize: 14,
    color: '#448AFF',
  },
});

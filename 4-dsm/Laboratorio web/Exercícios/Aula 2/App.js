import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Keyboard } from 'react-native';

export default function App() {
  // 1. Gerenciamento de Estados (Hooks)
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState('');
  const [cor, setCor] = useState('');
  const [erro, setErro] = useState('');

  // 2. Função de Lógica de Classificação e Cores
  const definirClassificacao = (valorImc) => {
    if (valorImc < 18.5) {
      setClassificacao('Abaixo do Peso');
      setCor('#F39C12'); // Laranja Claro / Amarelo
    } else if (valorImc >= 18.5 && valorImc <= 24.9) {
      setClassificacao('Peso Normal (Eutrofia)');
      setCor('#2ECC71'); // Verde
    } else if (valorImc >= 25.0 && valorImc <= 29.9) {
      setClassificacao('Sobrepeso');
      setCor('#D4AC0D'); // Amarelo Escuro
    } else if (valorImc >= 30.0 && valorImc <= 34.9) {
      setClassificacao('Obesidade Grau I');
      setCor('#E67E22'); // Laranja / Vermelho Claro
    } else if (valorImc >= 35.0 && valorImc <= 39.9) {
      setClassificacao('Obesidade Grau II (Severa)');
      setCor('#E74C3C'); // Vermelho
    } else {
      setClassificacao('Obesidade Grau III (Mórbida)');
      setCor('#900C3F'); // Vermelho Escuro
    }
  };

  // 3. Função Principal de Cálculo e Validação
  const calcularIMC = () => {
    Keyboard.dismiss(); // Oculta o teclado ao calcular
    setErro('');
    setImc(null);
    setClassificacao('');

    // Substitui vírgula por ponto caso o usuário digite com vírgula
    const pesoNum = parseFloat(peso.replace(',', '.'));
    const alturaNum = parseFloat(altura.replace(',', '.'));

    // Validação de campos vazios ou inválidos (ex: altura zero)
    if (!peso || !altura) {
      setErro('Por favor, preencha o peso e a altura.');
      return;
    }
    if (isNaN(pesoNum) || isNaN(alturaNum) || alturaNum <= 0 || pesoNum <= 0) {
      setErro('Valores inválidos. A altura não pode ser zero.');
      return;
    }

    // Cálculo do IMC: Peso / (Altura)²
    const imcCalculado = pesoNum / (alturaNum * alturaNum);
    
    // Arredonda para duas casas decimais
    setImc(imcCalculado.toFixed(2));
    
    // Chama a função para definir o texto e a cor
    definirClassificacao(imcCalculado);
  };

  // 4. Função para Limpar os dados (Requisito Opcional Recomendado)
  const limpar = () => {
    setPeso('');
    setAltura('');
    setImc(null);
    setClassificacao('');
    setCor('');
    setErro('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora de IMC</Text>

      {/* Mensagem de Erro */}
      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Peso (kg) - ex: 70.5"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />

      <TextInput
        style={styles.input}
        placeholder="Altura (m) - ex: 1.75"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />

      <View style={styles.botoesContainer}>
        <View style={styles.botao}>
          <Button title="Calcular IMC" onPress={calcularIMC} color="#3498DB" />
        </View>
        <View style={styles.botao}>
          <Button title="Limpar" onPress={limpar} color="#95A5A6" />
        </View>
      </View>

      {/* Exibição Condicional do Resultado */}
      {imc && (
        <View style={styles.resultadoContainer}>
          <Text style={styles.textoResultado}>Seu IMC: {imc}</Text>
          <Text style={[styles.textoClassificacao, { color: cor }]}>
            {classificacao}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#2C3E50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#BDC3C7',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#F8F9F9',
  },
  botoesContainer: {
    flexDirection: 'column',
    gap: 10,
    marginTop: 10,
  },
  botao: {
    marginBottom: 10,
  },
  erro: {
    color: '#E74C3C',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultadoContainer: {
    marginTop: 30,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ECF0F1',
    borderRadius: 10,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  textoResultado: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34495E',
  },
  textoClassificacao: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
});
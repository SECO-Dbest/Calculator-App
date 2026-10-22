import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState<string | null>(null);
  const [firstValue, setFirstValue] = useState<number | null>(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondValue) {
      setDisplayValue(digit);
      setWaitingForSecondValue(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondValue) {
      setDisplayValue('0.');
      setWaitingForSecondValue(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clearAll = () => {
    setDisplayValue('0');
    setOperator(null);
    setFirstValue(null);
    setWaitingForSecondValue(false);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (firstValue === null) {
      setFirstValue(inputValue);
    } else if (operator) {
      const currentValue = firstValue || 0;
      const result = calculate(currentValue, inputValue, operator);

      setFirstValue(result);
      setDisplayValue(String(result));
    }

    setWaitingForSecondValue(true);
    setOperator(nextOperator);
  };

  const calculate = (first: number, second: number, op: string) => {
    switch (op) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '×':
        return first * second;
      case '÷':
        return second === 0 ? 0 : first / second;
      default:
        return second;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(displayValue);

    if (operator && firstValue !== null) {
      const result = calculate(firstValue, inputValue, operator);
      setDisplayValue(String(result));
      setFirstValue(null);
      setOperator(null);
      setWaitingForSecondValue(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#17181a" />
      
      {/* Display Screen */}
      <View style={styles.displayContainer}>
        <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
          {displayValue}
        </Text>
      </View>

      {/* Keypad */}
      <View style={styles.keypad}>
        {/* Row 1 */}
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.functionButton]} onPress={clearAll}>
            <Text style={[styles.buttonText, styles.functionButtonText]}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.functionButton]} onPress={() => setDisplayValue(String(parseFloat(displayValue) * -1))}>
            <Text style={[styles.buttonText, styles.functionButtonText]}>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.functionButton]} onPress={() => setDisplayValue(String(parseFloat(displayValue) / 100))}>
            <Text style={[styles.buttonText, styles.functionButtonText]}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => performOperation('÷')}>
            <Text style={[styles.buttonText, styles.operatorButtonText]}>÷</Text>
          </TouchableOpacity>
        </View>

        {/* Row 2 */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => inputDigit('7')}><Text style={styles.buttonText}>7</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => inputDigit('8')}><Text style={styles.buttonText}>8</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => inputDigit('9')}><Text style={styles.buttonText}>9</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => performOperation('×')}>
            <Text style={[styles.buttonText, styles.operatorButtonText]}>×</Text>
          </TouchableOpacity>
        </View>

        {/* Row 3 */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => inputDigit('4')}><Text style={styles.buttonText}>4</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => inputDigit('5')}><Text style={styles.buttonText}>5</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => inputDigit('6')}><Text style={styles.buttonText}>6</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => performOperation('-')}>
            <Text style={[styles.buttonText, styles.operatorButtonText]}>-</Text>
          </TouchableOpacity>
        </View>

        {/* Row 4 */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => inputDigit('1')}><Text style={styles.buttonText}>1</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => inputDigit('2')}><Text style={styles.buttonText}>2</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => inputDigit('3')}><Text style={styles.buttonText}>3</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => performOperation('+')}>
            <Text style={[styles.buttonText, styles.operatorButtonText]}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Row 5 */}
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.zeroButton]} onPress={() => inputDigit('0')}>
            <Text style={[styles.buttonText, styles.zeroButtonText]}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={inputDecimal}><Text style={styles.buttonText}>.</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={handleEquals}>
            <Text style={[styles.buttonText, styles.operatorButtonText]}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17181a',
    justifyContent: 'flex-end',
  },
  displayContainer: {
    padding: 24,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    minHeight: 160,
  },
  displayText: {
    color: '#ffffff',
    fontSize: 72,
    fontWeight: '300',
    textAlign: 'right',
  },
  keypad: {
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: '#26282c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '400',
  },
  functionButton: {
    backgroundColor: '#4e505f',
  },
  functionButtonText: {
    color: '#ffffff',
  },
  operatorButton: {
    backgroundColor: '#ff9f0a',
  },
  operatorButtonText: {
    color: '#ffffff',
    fontSize: 32,
  },
  zeroButton: {
    width: 162,
    alignItems: 'flex-start',
    paddingLeft: 30,
  },
  zeroButtonText: {
    marginLeft: 0,
  },
});
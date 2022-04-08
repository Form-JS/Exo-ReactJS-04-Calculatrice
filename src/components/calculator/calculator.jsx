import { useRef, useState } from 'react';
import style from './calculator.module.css';
import operationEnum from '../../enums/operator';

const regexNumber = /^[0-9]+(\.[0-9]*)?$/;

const Calculator = () => {
    // Variable de State
    const [operator, setOperator] = useState('+');
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [result, setResult] = useState('');

    // Utilisation des references → Exemple : Manipulation du focus
    const inputNb1 = useRef();

    // Méthode pour modifier le state des input numbers
    const handleInuputNumber = (event, setState) => {
        let value = event.target.value.replace(',', '.');
        if (value.startsWith('.')) {
            value = '0' + value;
        }

        if (value === '' || regexNumber.test(value)) {
            setState(value);
        }
    };

    // Méthode pour gérer le submit du formulaire
    const handleSubmit = (event) => {
        event.preventDefault();

        setResult(() => {
            // Conversion en nombre
            const val1 = parseFloat(number1);
            const val2 = parseFloat(number2);

            // Traitement du resultat
            switch (operator) {
                case operationEnum.ADD:
                    return val1 + val2;

                case operationEnum.SUB:
                    return val1 - val2;

                case operationEnum.DIV:
                    if (val2 !== 0) {
                        return val1 / val2;
                    }
                    return 'Division par zero :o';

                case operationEnum.MULTI:
                    return val1 * val2;

                default:
                    return 'Operation non supporté';
            }
        });

        // Demande de focus (Méthode imperative)
        console.log(inputNb1.current);
        inputNb1.current.focus();
    };

    // Rendu
    return (
        <form className={style.container} onSubmit={handleSubmit}>
            <div className={style.operation}>
                <label htmlFor='calc-nb1'>Nb1</label>
                <input id='calc-nb1' type='text' ref={inputNb1}
                    value={number1} onChange={(e) => handleInuputNumber(e, setNumber1)} />
                <label htmlFor="calc-op">Operateur</label>
                <select id='calc-op' value={operator} onChange={(e) => setOperator(e.target.value)}>
                    {Object.entries(operationEnum).map(([key, val]) => (
                        <option key={key} value={val}>{val}</option>
                    ))}
                </select>
                <label htmlFor='calc-nb2'>Nb2</label>
                <input id='calc-nb2' type='text'
                    value={number2} onChange={(e) => handleInuputNumber(e, setNumber2)} />
            </div>
            <div className={style.result}>
                <button type="submit">Calculer</button>
                <input type="text" readOnly value={result} />
            </div>
        </form>
    );
};

export default Calculator;
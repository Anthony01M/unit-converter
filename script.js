document.addEventListener('DOMContentLoaded', () => {
    const unitTypeSelect = document.getElementById('unit-type');
    const fromUnitSelect = document.getElementById('from-unit');
    const toUnitSelect = document.getElementById('to-unit');

    const units = {
        length: ['Meters', 'Kilometers', 'Miles', 'Yards'],
        weight: ['Grams', 'Kilograms', 'Pounds', 'Ounces'],
        temperature: ['Celsius', 'Fahrenheit', 'Kelvin']
    };

    function populateUnits() {
        const unitType = unitTypeSelect.value;
        fromUnitSelect.innerHTML = '';
        toUnitSelect.innerHTML = '';
        units[unitType].forEach(unit => {
            const option1 = document.createElement('option');
            option1.value = unit;
            option1.textContent = unit;
            fromUnitSelect.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = unit;
            option2.textContent = unit;
            toUnitSelect.appendChild(option2);
        });
    }

    unitTypeSelect.addEventListener('change', populateUnits);
    populateUnits();

    window.convert = function() {
        const unitType = unitTypeSelect.value;
        const inputValue = parseFloat(document.getElementById('input-value').value);
        const fromUnit = fromUnitSelect.value;
        const toUnit = toUnitSelect.value;
        let result;

        if (unitType === 'length') {
            result = convertLength(inputValue, fromUnit, toUnit);
        } else if (unitType === 'weight') {
            result = convertWeight(inputValue, fromUnit, toUnit);
        } else if (unitType === 'temperature') {
            result = convertTemperature(inputValue, fromUnit, toUnit);
        }

        document.getElementById('result').textContent = `Result: ${result}`;
    };

    function convertLength(value, from, to) {
        const conversions = {
            Meters: 1,
            Kilometers: 0.001,
            Miles: 0.000621371,
            Yards: 1.09361
        };
        return (value / conversions[from]) * conversions[to];
    }

    function convertWeight(value, from, to) {
        const conversions = {
            Grams: 1,
            Kilograms: 0.001,
            Pounds: 0.00220462,
            Ounces: 0.035274
        };
        return (value / conversions[from]) * conversions[to];
    }

    function convertTemperature(value, from, to) {
        if (from === 'Celsius') {
            if (to === 'Fahrenheit') return (value * 9/5) + 32;
            if (to === 'Kelvin') return value + 273.15;
        } else if (from === 'Fahrenheit') {
            if (to === 'Celsius') return (value - 32) * 5/9;
            if (to === 'Kelvin') return ((value - 32) * 5/9) + 273.15;
        } else if (from === 'Kelvin') {
            if (to === 'Celsius') return value - 273.15;
            if (to === 'Fahrenheit') return ((value - 273.15) * 9/5) + 32;
        }
        return value;
    }

    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#000000', '#FF5733', '#FF8C00', '#FFD700', '#ADFF2F', '#00FF7F', '#00CED1', '#1E90FF', '#9370DB', '#FF1493', '#000000'];
    let colorIndex = 0;

    setInterval(() => {
        document.body.style.backgroundColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 5000);
});
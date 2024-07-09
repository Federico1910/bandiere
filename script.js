document.addEventListener('DOMContentLoaded', () => {
    const flagContainer = document.getElementById('flag-container');
    const flagImg = document.getElementById('flag');
    const optionsContainer = document.getElementById('options-container');
    const nextBtn = document.getElementById('next-btn');
    const resultText = document.getElementById('result');

    //cambio il colore del tema cliccando sul tasto invia
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange','pink', 'darkyellow', 'black',
         '#4ddbff', '#ff0066', '#664400'];
    let currentIndex = 0;

    document.getElementById('cambiotema').addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % colors.length;
        document.body.style.backgroundColor = colors[currentIndex];
    });

    




    let countries = [];
    let currentCountry = {};

    async function fetchCountries() {
        const response = await fetch('https://restcountries.com/v3.1/all');
        countries = await response.json();
        newQuestion();
    }

    function newQuestion() {
        resultText.textContent = '';
        nextBtn.style.display = 'none';
        optionsContainer.innerHTML = '';

        const randomCountries = getRandomCountries(4);
        currentCountry = randomCountries[Math.floor(Math.random() * randomCountries.length)];

        flagImg.src = currentCountry.flags.png;

        randomCountries.forEach(country => {
            const button = document.createElement('button');
            button.textContent = country.name.common;
            button.addEventListener('click', () => checkAnswer(country));
            optionsContainer.appendChild(button);
        });
    }

    function getRandomCountries(count) {
        const shuffled = countries.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    function checkAnswer(selectedCountry) {
        if (selectedCountry.name.common === currentCountry.name.common) {
            resultText.textContent = 'Corretto!';
            resultText.style.color = 'green';
        } else {
            resultText.textContent = `Sbagliato! La risposta corretta era ${currentCountry.name.common}.`;
            resultText.style.color = 'red';
        }
        nextBtn.style.display = 'block';
    }

    nextBtn.addEventListener('click', newQuestion);

    fetchCountries();

});

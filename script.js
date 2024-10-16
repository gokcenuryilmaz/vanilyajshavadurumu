const apiKey = '7b5d394d03bdcf47d765d89bee273a11'; 
const getWeatherButton = document.getElementById('getWeather');
const cityInput = document.getElementById('city');
const cityNameDisplay = document.getElementById('cityName');

getWeatherButton.addEventListener('click', async () => {
    const cityDisplay = cityInput.value;
    const weatherResultDisplay = document.getElementById('weatherResult');

    if (!cityDisplay) {
        weatherResultDisplay.innerHTML = "Lütfen bir şehir adı girin.";
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityDisplay}&units=metric&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Şehir bulunamadı');
        }
        const data = await response.json();

        // Hava durumu bilgisini gösterir
        weatherResultDisplay.innerHTML = `
            <h2>${data.name}</h2>
            <p>Hava Durumu: ${data.weather[0].description}</p>
            <p>Sıcaklık: ${data.main.temp} °C</p>
            <p>Hava Basıncı: ${data.main.pressure} hPa</p>
            <p>Nem: ${data.main.humidity} %</p>
        `;
    } catch (error) {
        weatherResultDisplay.innerHTML = error.message;
    }
});

// Input alanındaki değişiklikleri izleyerek iki yönlü veri bağlanır
cityInput.addEventListener('input', () => {
    cityNameDisplay.innerText = cityInput.value; // Her input değiştiğinde günceller
});
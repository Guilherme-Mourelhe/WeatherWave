const searchInput = document.getElementById('searchInput');
const resultsList = document.getElementById('results');

const items = [
    'Cataguases',
    'Leopoldina',
    'Sereno',
    'Laranjal',
    'Miraí',
    'Juiz de Fora'
];

searchInput.addEventListener('input', function() {
    const searchText = searchInput.value.toLowerCase();
    const filteredItems = items.filter(item => item.toLowerCase().includes(searchText));

    if (searchText === '') {
        resultsList.innerHTML = ''; // Limpa os resultados se o campo de pesquisa estiver vazio
        return;
    }
    
    resultsList.innerHTML = '';
    
    filteredItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        resultsList.appendChild(li);
    });
});

/*
const cities = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte']; // Lista de cidades

const weatherContainer = document.querySelector('.weather-container');

cities.forEach(city => {
    const card = document.createElement('div');
    card.className = 'weather-card';
    
    const weatherInfo = document.createElement('div');
    weatherInfo.className = 'weather-info';
    
    card.appendChild(weatherInfo);
    weatherContainer.appendChild(card);
    
    // Aqui você pode utilizar a API para obter os dados da previsão do tempo para cada cidade
    // e preencher as informações no card
    // Exemplo:
    hgWeatherWidget({
        // Parâmetros da API aqui
        city_name: city,
        ... // Outros parâmetros
    }, function(weather) {
        const cityName = document.createElement('h1');
        cityName.className = 'city-name';
        cityName.textContent = city;
        
        const currentTemp = document.createElement('p');
        currentTemp.className = 'current-temp';
        currentTemp.textContent = `${weather.temp}°C`;
        
        const weatherIcon = document.createElement('img');
        weatherIcon.className = 'weather-icon';
        weatherIcon.src = weather.img_id;
        weatherIcon.alt = 'Ícone do Tempo';
        
        const tempRange = document.createElement('p');
        tempRange.className = 'temp-range';
        tempRange.textContent = `Min: ${weather.forecast[0].min}°C / Max: ${weather.forecast[0].max}°C`;
        
        weatherInfo.appendChild(cityName);
        weatherInfo.appendChild(currentTemp);
        weatherInfo.appendChild(weatherIcon);
        weatherInfo.appendChild(tempRange);
    });
});
*/

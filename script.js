const cityInput = document.getElementById("city-input");
const searchbtn = document.getElementById("search-btn");
const weatherCard = document.getElementById('weather-result');
const errorMessage = document.getElementById('error-message');
const nomeCity = document.getElementById('city-name');
const horaLocal = document.getElementById('local-time');
const icon = document.getElementById('weather-icon');
const temperatura = document.getElementById('temperature');
const condicao = document.getElementById('condition');
const sensacao = document.getElementById('feels-like');
const humidade = document.getElementById('humidity');
const vento = document.getElementById('wind-speed');
const pressao = document.getElementById('pressure');
const visibilidade = document.getElementById('visibility');
const indiceUv = document.getElementById('uv-index');
const apiKey = '11e5c96bd1f74dc58cc200504253007';
async function fetchPrevisao(cidade) {
    try {
        const city = cidade.trim();
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no&lang=pt`);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Cidade ${cidade} não encontrada.`);
        }
        const data = await response.json();
        renderWeatherCard(data);
    } catch (erro) {
        mensagemError(erro.message);
    }
}
function renderWeatherCard(data) {
    const location = data.location;
    const current = data.current;
    nomeCity.innerText = `${location.name} - ${location.country}`;
    const localTime = new Date(location.localtime);
    horaLocal.innerText = `Horário: ${localTime.toLocaleString('pt-BR', { timeZone: location.tz_id })}`;
    icon.src = current.condition.icon;
    icon.alt = current.condition.text;
    temperatura.innerText = `${current.temp_c}°C`;
    condicao.innerText = current.condition.text;
    sensacao.innerText = `${current.feelslike_c}°C`;
    humidade.innerText = `${current.humidity}%`;
    vento.innerText = `${current.wind_kph} km/h`;
    pressao.innerText = `${current.pressure_mb} hPa`;
    visibilidade.innerText = `${current.vis_km} km`;
    indiceUv.innerText = current.uv;
    weatherCard.classList.remove('hidden');
    errorMessage.classList.add('hidden');
}
function mensagemError(message) {
    errorMessage.querySelector('p').innerText = message;
    errorMessage.classList.remove('hidden');
    weatherCard.classList.add('hidden');
}
searchbtn.addEventListener('click', () => {
    const cidade = cityInput.value.trim();
    if (cidade) {
        fetchPrevisao(cidade);
    } else {
        mensagemError('Digite o nome de uma cidade');
    }
});
cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchbtn.click();
    }
});
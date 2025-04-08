// 配置
const CONFIG = {
    API_KEY: '6bed2d0a1e19437699391433252903', // 替换为您的WeatherAPI密钥
    ICON_MAP: {
        'Sunny': '☀️',
        'Clear': '☀️',
        'Partly cloudy': '⛅',
        'Cloudy': '☁️',
        'Overcast': '☁️',
        'Mist': '🌫️',
        'Rain': '🌧️',
        'Snow': '❄️',
        'Thunder': '⛈️'
    }
};

// 获取DOM元素
const elements = {
    cityInput: document.getElementById('cityInput'),
    searchBtn: document.getElementById('searchBtn'),
    locationText: document.getElementById('locationText'),
    countryFlag: document.getElementById('countryFlag'),
    weatherIcon: document.getElementById('weatherIcon'),
    temperature: document.getElementById('temperature'),
    weatherDesc: document.getElementById('weatherDesc'),
    humidity: document.getElementById('humidity'),
    wind: document.getElementById('wind')
};

// 初始化
function init() {
    elements.searchBtn.addEventListener('click', fetchWeather);
    elements.cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') fetchWeather();
    });
}

// 获取天气数据
async function fetchWeather() {
    const cityName = elements.cityInput.value.trim();
    if (!cityName) return;

    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${CONFIG.API_KEY}&q=${encodeURIComponent(cityName)}&lang=zh`
        );
        
        if (!response.ok) throw new Error('城市不存在或服务不可用');
        
        const data = await response.json();
        updateUI(data);
        
    } catch (error) {
        console.error('获取天气失败:', error);
        elements.weatherDesc.textContent = error.message || '获取天气失败';
        elements.weatherIcon.textContent = '❌';
    }
}

// 更新UI
function updateUI(data) {
    // 位置信息
    elements.locationText.textContent = `${data.location.name}, ${data.location.country}`;
    elements.countryFlag.textContent = getCountryFlag(data.location.country);
    
    // 天气信息
    const weather = data.current.condition.text;
    elements.weatherIcon.textContent = CONFIG.ICON_MAP[weather] || '🌍';
    elements.temperature.textContent = `${data.current.temp_c}°C`;
    elements.weatherDesc.textContent = weather;
    elements.humidity.textContent = `${data.current.humidity}%`;
    elements.wind.textContent = `${data.current.wind_kph} km/h`;
}

// 获取国家国旗emoji
function getCountryFlag(countryCode) {
    // 仅支持部分国家示例，完整列表需要emoji库
    const flags = {
        'CN': '🇨🇳', 'US': '🇺🇸', 'JP': '🇯🇵', 
        'GB': '🇬🇧', 'FR': '🇫🇷', 'DE': '🇩🇪',
        'RU': '🇷🇺', 'IN': '🇮🇳', 'BR': '🇧🇷'
    };
    return flags[countryCode] || '🌐';
}

// 启动应用
document.addEventListener('DOMContentLoaded', init);
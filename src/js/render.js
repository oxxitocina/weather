import { format, compareAsc } from 'date-fns'
import { tabs, BUTTONS, UI_ELEMENTS } from "./views.js";
import { cities, sendForm } from "./index.js";


function renderNowTab(temperature, city)     {
    UI_ELEMENTS.now_tab_temperature.firstElementChild.innerHTML = Math.round(temperature);
    UI_ELEMENTS.now_tab_city.innerHTML = city;
        if(cities.includes(city))    {
            BUTTONS.btn_heart.classList.add('fill');
            BUTTONS.btn_heart.value = 'ON';
        }else{
            BUTTONS.btn_heart.classList.remove('fill');
            BUTTONS.btn_heart.value = 'OFF';
        };
};

function renderDetailsTab(information)     {
    console.log(information);
    UI_ELEMENTS.details_city.textContent = information.name;
    UI_ELEMENTS.details_temperature.textContent = 'Temperature: '+Math.round(information.main.temp);
    UI_ELEMENTS.details_feels_like.textContent = 'Feels like: '+Math.round(information.main.feels_like);
    UI_ELEMENTS.details_weather.textContent = 'Weather: '+information.weather[0].main;
    UI_ELEMENTS.details_sunrise.textContent = 'Sunrise: '+ format(new Date(1000*information.sys.sunrise), 'm/H');
    UI_ELEMENTS.details_sunset.textContent = 'Sunset: '+ format(new Date(1000*information.sys.sunset), 'm/H');
};

function renderCitiesFromStorage()  {

    for(let i = 0; i<cities.length; i++)   {
        let location = document.createElement('li');
        location.innerHTML = cities[i];
        location.addEventListener('click', function()   {sendForm(this.textContent)});
        UI_ELEMENTS.added_locations.prepend(location);
    }

}

export { renderNowTab, renderDetailsTab, renderCitiesFromStorage} 
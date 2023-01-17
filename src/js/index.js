import { format, compareAsc } from 'date-fns'
import { BUTTONS,tabs, UI_ELEMENTS } from './views.js'; 
import { openNewTab, getCookie } from './helpers.js';
import { renderDetailsTab, renderNowTab, renderCitiesFromStorage } from './render.js';

BUTTONS.btn_now.addEventListener('click', function(){openNewTab(this)});
BUTTONS.btn_details.addEventListener('click', function(){openNewTab(this)});
BUTTONS.btn_forecast.addEventListener('click', function(){openNewTab(this)});
BUTTONS.btn_heart.addEventListener('click', function() {
    addToFavorites(this);
});
UI_ELEMENTS.form.addEventListener('submit', function(event)   {
    event.preventDefault();
    sendForm();
});

const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
let cityGlobal = 'Kokshetau';
let set_cities = new Set();
let cities = [];

function getDataFromStorage()   {
    try{
        cities = JSON.parse(localStorage.set_cities);
    }catch{
        cities = [];
    }

function addToCitiesSet(number)   {
    if(number === cities.length)    {
        return 0;
    }else{
        set_cities.add(cities[number]); 
        number = number + 1;
        return addToCitiesSet(number);
    }
}

addToCitiesSet(0);//recursion practice

localStorage.setItem('set_cities', JSON.stringify(Array.from(set_cities)));
localStorage.setItem('currentCity', cityGlobal);

let currentCity;

    try{
        currentCity = (JSON.parse(getCookie('currentCity')) ?? 'Kokshetau');
    }catch(err){
    console.log(err)
    currentCity = 'Kokshetau'
    }

document.getElementById('city-name').value = currentCity;

sendForm();

}

async function sendForm(city_added_locations) {

    let cityName = document.getElementById('city-name').value;

        if(cities.includes(city_added_locations))    {
            cityName = city_added_locations;
        };

    let url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

    try{
        let response = await fetch(url)
        let information = await response.json();    

        let temperature = information?.main?.temp ?? 'Unknown temperature';
        let cityNameAPI = information?.name ?? 'Unknown city';

        cityGlobal = information.name;
        localStorage.setItem('currentCity', JSON.stringify(cityGlobal));
        document.cookie = encodeURIComponent('currentCity') + '=' + encodeURIComponent(JSON.stringify(cityGlobal));

        renderNowTab(temperature, cityNameAPI);
        renderDetailsTab(information);

    }catch(err){
        alert(err);
    }

};

function addToFavorites(button)   {
    if (button.value == "OFF") {

        button.value = "ON";
        button.classList.toggle('fill');

        cities.push(cityGlobal);
        let location = document.createElement('li');
        location.innerHTML = cityGlobal;
        location.addEventListener('click', function()   {sendForm(this.textContent)});
        UI_ELEMENTS.added_locations.prepend(location);

        set_cities.clear();
        cities.forEach(element => {
            set_cities.add(element);  
        });
        localStorage.setItem('set_cities', JSON.stringify(Array.from(set_cities)));

      } else {

            button.value = "OFF";
            button.classList.toggle('fill');
            console.log(cityGlobal);

            function deleteCityGlobal() {
                for(let i = 0; i<cities.length; i++)   {
                    if(cityGlobal == UI_ELEMENTS.added_locations.children[i].textContent)    {
                        UI_ELEMENTS.added_locations.children[i].remove();
                        break;
                    };
                    
                }; 
            }
        
            deleteCityGlobal();

            let index = cities.indexOf(cityGlobal);
            cities.splice(index, 1);
            set_cities.clear();

            cities.forEach(element => {
                set_cities.add(element);  
            });

            localStorage.setItem('set_cities', JSON.stringify(Array.from(set_cities)));

      }
   
};

getDataFromStorage();
renderCitiesFromStorage();

export { cities, sendForm }





import { format, compareAsc } from 'date-fns'




const BUTTONS = {
    btn_now: document.querySelector("#now"),
    btn_details: document.querySelector("#details"),
    btn_forecast: document.querySelector("#forecast"),
    btn_heart: document.querySelector('#heart'),
};

const tabs = [
    tab_now = document.querySelector('.now-tab'),
    tab_details = document.querySelector('.details-tab'),
    tab_forecast = document.querySelector('.forecast-tab'),
];

BUTTONS.btn_now.addEventListener('click', function(){openNewTab(this)});
BUTTONS.btn_details.addEventListener('click', function(){openNewTab(this)});
BUTTONS.btn_forecast.addEventListener('click', function(){openNewTab(this)});

const UI_ELEMENTS = {
    now_tab_temperature: document.querySelector('.temperature'),
    now_tab_city: document.querySelector('.city'),
    added_locations: document.querySelector('.locations-list'),
    details_city: document.querySelector('.details'),
    details_temperature: document.querySelector('.details_temperature'),
    details_feels_like: document.querySelector('.details_feels_like'),
    details_weather: document.querySelector('.details_weather'),
    details_sunrise: document.querySelector('.details_sunrise'),
    details_sunset: document.querySelector('.details_sunset'),
};



function hideTabs() {
    for (let element of tabs)  {
        element.classList.add('hider');
    };
};

function openNewTab(a)   {
    switch(a.id)    {
        case 'now':
            hideTabs();
            tabs[0].classList.remove('hider');
            break;
        case 'details':
            hideTabs();
            tabs[1].classList.remove('hider');
            break;
        case 'forecast':
            hideTabs();
            tabs[2].classList.remove('hider');
            break;
    }
};


const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
let cityGlobal = 'Kokshetau';
// let cities = ['Nur-Sultan', 'Kilo', 'Dane', 'Bali', 'Samara Oblast', 'Amur Oblast'];
// localStorage.setItem('cities', JSON.stringify(cities));

// let set_cities = new Set(["Astana", "Bali", "Tbilisi", "Moscow", "Rome"]);
// localStorage.setItem('set_cities', JSON.stringify(Array.from(set_cities)));

//мы сохраняем через сет, чтобы не было дубликатов. потом достаем из массива(json parse). заново сохраняем через сет

let set_cities = new Set();
let cities = [];


cities = JSON.parse(localStorage.set_cities);

// cities.forEach(element => {
//     set_cities.add(element);  
// });


// cities.forEach(element => {
//     set_cities.add(element);  
// });

function addToCitiesSet(number)   {
    if(number === cities.length)    {
        return 0;
    }else{
        set_cities.add(cities[number]); 
        number = number + 1;
        return addToCitiesSet(number);
    }
}

addToCitiesSet(0);

localStorage.setItem('set_cities', JSON.stringify(Array.from(set_cities)));

localStorage.setItem('currentCity', cityGlobal);
let currentCity;
// currentCity = JSON.parse(localStorage.currentCity);
currentCity = (JSON.parse(getCookie('currentCity')) ?? 'Kokshetau');
document.getElementById('city-name').value = currentCity;
sendForm();

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }



const form = document.querySelector('.search');
form.addEventListener('submit', function(event)   {
    event.preventDefault();
    sendForm();
});

// function sendForm(city_added_locations) {
//     let cityName = document.getElementById('city-name').value;
//         if(cities.includes(city_added_locations))    {
//             cityName = city_added_locations;
//         };
//     let url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
//     fetch(url)
//         .then(function(response)    {
//             return response.json();
//         })
//         .then(function(information)    {
//             let temperature = information.main.temp;
//             let cityNameAPI = information.name;
//             cityGlobal = information.name;
//             localStorage.setItem('currentCity', JSON.stringify(cityGlobal));
//             renderNowTab(temperature, cityNameAPI);
//             renderDetailsTab(information);
//         })
//         .catch(error => alert('Error!'))
// };

async function sendForm(city_added_locations) {
    let cityName = document.getElementById('city-name').value;
        if(cities.includes(city_added_locations))    {
            cityName = city_added_locations;
        };
    let url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
    try{
    let response = await fetch(url)
        // .then(function(response)    {
        //     return response.json();
        // })
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

        // .catch(error => alert('Error!'))
};

function renderNowTab(temperature, city)     {
    UI_ELEMENTS.now_tab_temperature.firstElementChild.innerHTML = temperature;
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
    UI_ELEMENTS.details_temperature.textContent = 'Temperature: '+information.main.temp;
    UI_ELEMENTS.details_feels_like.textContent = 'Feels like: '+information.main.feels_like;
    UI_ELEMENTS.details_weather.textContent = 'Weather: '+information.weather[0].main;
    // UI_ELEMENTS.details_sunrise.textContent = 'Sunrise: '+ new Date(1000*information.sys.sunrise);
    // UI_ELEMENTS.details_sunset.textContent = 'Sunset: '+ new Date(1000*information.sys.sunset);
    UI_ELEMENTS.details_sunrise.textContent = 'Sunrise: '+ format(new Date(1000*information.sys.sunrise), 'm/H/dd/MM/yyyy');
    UI_ELEMENTS.details_sunset.textContent = 'Sunset: '+ format(new Date(1000*information.sys.sunset), 'm/H/dd/MM/yyyy');
    // UI_ELEMENTS.details_sunrise.textContent = 'Sunrise: '+ information.sys.sunrise;
    // UI_ELEMENTS.details_sunset.textContent = 'Sunset: '+ information.sys.sunset;
};


BUTTONS.btn_heart.addEventListener('click', function() {
    addToFavorites(this);
});

// function addToFavorites(button)   {
//     if (button.value == "OFF") {
//         button.value = "ON";
//         button.classList.toggle('fill');
//         cities.push(cityGlobal);
//         let location = document.createElement('li');
//         location.innerHTML = cityGlobal;
//         location.addEventListener('click', function()   {sendForm(this.textContent)});
//         UI_ELEMENTS.added_locations.prepend(location);
//         // localStorage.setItem('cities', JSON.stringify(cities));
//         set_cities.clear();
//         cities.forEach(element => {
//             set_cities.add(element);  
//         });
//         localStorage.setItem('set_cities', JSON.stringify(Array.from(set_cities)));
//       } else {
//         button.value = "OFF";
//         button.classList.toggle('fill');
//         console.log(cityGlobal);
//         for(let i = 0; i<cities.length; i++)   {
//             if(cityGlobal == UI_ELEMENTS.added_locations.children[i].textContent)    {
//                 UI_ELEMENTS.added_locations.children[i].remove();
//                 break;
//             };
            
//         };

//         let index = cities.indexOf(cityGlobal);
//         console.log(cities);
//         cities.splice(index, 1);
//         console.log(cities);
//         console.log(set_cities);
//         // localStorage.setItem('cities', JSON.stringify(cities));
//         set_cities.clear();
//         cities.forEach(element => {
//             set_cities.add(element);  
//         });
//         localStorage.setItem('set_cities', JSON.stringify(Array.from(set_cities)));
//       }
   
// };




function addToFavorites(button)   {
    if (button.value == "OFF") {
        button.value = "ON";
        button.classList.toggle('fill');
        cities.push(cityGlobal);
        let location = document.createElement('li');
        location.innerHTML = cityGlobal;
        location.addEventListener('click', function()   {sendForm(this.textContent)});
        UI_ELEMENTS.added_locations.prepend(location);
        // localStorage.setItem('cities', JSON.stringify(cities));
        set_cities.clear();
        cities.forEach(element => {
            set_cities.add(element);  
        });
        localStorage.setItem('set_cities', JSON.stringify(Array.from(set_cities)));
      } else {
        button.value = "OFF";
        button.classList.toggle('fill');
        console.log(cityGlobal);


        // for(let i = 0; i<cities.length; i++)   {
        //     if(cityGlobal == UI_ELEMENTS.added_locations.children[i].textContent)    {
        //         UI_ELEMENTS.added_locations.children[i].remove();
        //         break;
        //     };
            
        // };

        function deleteCityGlobal(number) {
            if(cityGlobal === UI_ELEMENTS.added_locations.children[number].textContent)    {
                UI_ELEMENTS.added_locations.children[number].remove();
                return 0;
            }else{
                number++;
                console.log(number);
                return deleteCityGlobal(number);
            }
        }

        deleteCityGlobal(0);


        let index = cities.indexOf(cityGlobal);
        console.log(cities);
        cities.splice(index, 1);
        console.log(cities);
        console.log(set_cities);
        // localStorage.setItem('cities', JSON.stringify(cities));
        set_cities.clear();
        cities.forEach(element => {
            set_cities.add(element);  
        });
        localStorage.setItem('set_cities', JSON.stringify(Array.from(set_cities)));
      }
   
};




// for(let i = 0; i<cities.length; i++)   {
//         let location = document.createElement('li');
//         location.innerHTML = cities[i];
//         location.addEventListener('click', function()   {sendForm(this.textContent)});
//         UI_ELEMENTS.added_locations.prepend(location);
// }

// for(let i = 0; i<cities.length; i++)   {
//     let location = document.createElement('li');
//     location.innerHTML = cities[i];
//     location.addEventListener('click', function()   {sendForm(this.textContent)});
//     UI_ELEMENTS.added_locations.prepend(location);
// }


function render(number)   {
    if( number === cities.length )  {
        return 0;
    }else{
        let location = document.createElement('li');
        location.innerHTML = cities[number];
        location.addEventListener('click', function()   {sendForm(this.textContent)});
        UI_ELEMENTS.added_locations.prepend(location);
        number = number + 1;
        return render(number);
    }
}

render(0);


let date = new Date();
console.log(date);






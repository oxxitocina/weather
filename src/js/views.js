const BUTTONS = {
    btn_now: document.querySelector("#now"),
    btn_details: document.querySelector("#details"),
    btn_forecast: document.querySelector("#forecast"),
    btn_heart: document.querySelector('#heart'),
};

const tabs = [
    document.querySelector(".now-tab"),
    document.querySelector('.details-tab'),
    document.querySelector('.forecast-tab'),
];

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
    form: document.querySelector('.search'),
};

export { BUTTONS, tabs, UI_ELEMENTS }
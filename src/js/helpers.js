import { tabs, BUTTONS, UI_ELEMENTS } from "./views.js";

function openNewTab(a)   {

    function hideTabs() {
        for (let element of tabs)  {
            element.classList.add('hider');
        };
    };

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

function getCookie(name) {

    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;

  }


export { openNewTab, getCookie }
function hideTABS() {
    for (let element of TABS)  {
        element.classList.add('hider');
    };
};

function openNewTab(a)   {
    switch(a.id)    {
        case 'now':
            hideTABS();
            TABS[0].classList.remove('hider');
            break;
        case 'details':
            hideTABS();
            TABS[1].classList.remove('hider');
            break;
        case 'forecast':
            hideTABS();
            TABS[2].classList.remove('hider');
            break;
    }
};

export { hideTABS, openNewTab }
'use strict';

window.addEventListener('WebComponentsReady', function() {
    var app = document.querySelector("#app");

    app.login = function(key) {
        Cookies.set('api-key', key);
    }

    app.isLogged = function() {
        return (Cookies.get('api-key') !== undefined);
    }

    app.logout = function() {
        Cookies.remove('api-key');
    }
});

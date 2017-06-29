---
---


/**
 * https://stackoverflow.com/a/38687125
 */

function sendForm(formName){

    var values = encodeForm(document.forms[formName]);

    if(values.username.length < 3) {
        return error('Nutzername muss mindestens drei Zeichen umfassen.');
    }

    if(values.password.length < 5) {
        return error('Passwort muss mindestens fünf Zeichen umfassen.');
    }

    var http = new XMLHttpRequest();
    http.open("POST","{{ site.data.signup.target }}");

    http.setRequestHeader('Content-Type', 'application/json');

    http.onreadystatechange = function(){

        if(http.readyState === 4) {
            debugger;
        }

        if(http.readyState === 4 && http.status === 201){
           return success();
        }
        if(http.readyState === 4 && http.status > 201) {
            return error(http.responseText);
        }
    };

    http.send(JSON.stringify(values));
}

function checkForm() {

}

function encodeForm (form){
    var array = {};
    for (var key in form) {
        var item=form[key];
        if(form.hasOwnProperty(key) && item.nodeName === 'INPUT'){
            array[item.name]=item.value;
        }
    }
    return array;
}

function success() {
    displayMessage('Benutzerkonto wurde erfolgreich angelegt.')
}

function error(msg) {
    displayMessage('Fehler: ' + msg);
}

function displayMessage(msg) {
    document.getElementById('signup-result').innerHTML = msg;
}
"use strict";

/* JavaScript to deal with location/date/type embedding */

function getTimeString() 
{
    var current_date = new Date();
    return current_date.getHours() + ":" + current_date.getMinutes();
}

function getDateString() 
{
    var current_date = new Date();
    return current_date.getMonth() + 1 + "/" + current_date.getDate() + "/" + current_date.getFullYear();
}

function getLocation(callback) 
{
    function success(position) {
        callback && callback(null, position.coords);
    }

    function failure() {
        callback && callback("Failed to get position; user canceled?", null);
    }

    navigator.geolocation.getCurrentPosition(success, failure);
}

function getLocationString(callback) 
{
    getLocation(function(error, location) {
        if (error) {
            callback && callback(error, null);
            return;
        }
        callback && callback(null, location.latitude + "|" + location.longitude);
    });
}


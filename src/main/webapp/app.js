'use strict';

var app = angular.module('myApp', []);

app.factory('PersonFactory', function ()
{

    var persons = [
        {firstname: 'John', lastnamne: 'Arne'},
        {firstname: 'Long', lastname: 'Johnson'}
    ];

    var getPersons = function () {
        return persons;
    };


    var toTitleCase = function (input) {
        return input.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
    
    var toDashCase = function (input) {
        return input.replace(/\s+/g, '-').toLowerCase();
        
    };

    var toCamelCase = function (input) {
       var attributeParts = input.split(' ');
        var output = '';
        for (var i = 0; i < attributeParts.length; i++) {
            var string = '';
            string = attributeParts[i];
            string = string.charAt(0).toUpperCase() + string.slice(1);
            output += string;
        }
        return output;
    };

    return {
        getPersons: getPersons,
        toCamelCase: toCamelCase,
        toTitleCase: toTitleCase,
        toDashCase: toDashCase
    };
});


app.controller('PersonController', ['PersonFactory', function (PersonFactory) {
        var self = this;

        self.persons = PersonFactory.getPersons();

        self.titleCase = function (name) {
            return PersonFactory.toTitleCase(name);
        };
        self.camelCase = function (name) {
            return PersonFactory.toCamelCase(name);
        };
        self.dashCase = function (name) {
            return PersonFactory.toDashCase(name);
        };

    }]);

app.directive('loginForm', function ()
{

    return {
        restrict: 'E', // Can only be used as an element
        templateUrl: "loginForm.html"
    };

});


app.filter('myFilter', function () {

    return function (data) {
        var person = ''; // String
        person += data.lastname;
        person += ' ' + data.firstname;
        return person;
    };

});
var app = angular.module('app');
app.service('PersonsService', ['$http', function($http) {

	var baseURL = 'http://localhost:8080/';

	this.getPerson = function(url) {
		return $http({
			method : 'GET',
			url : url
		});
	}

	this.addPerson = function(person) {
		return $http({
			method : 'POST',
			url : baseURL + 'persons',
			data : JSON.stringify(person)
		});
	}

	this.updatePerson = function(url, person) {
		return $http({
			method : 'PATCH',
			url : url,
			data : JSON.stringify(person)
		});
	}

	this.deletePerson = function(url) {
		return $http({
			method : 'DELETE',
			url : url
		});
	}

	this.getAllPersons = function() {
		return $http({
			method : 'GET',
			url : baseURL + 'persons'
		});
	}

}]);
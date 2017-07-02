var app = angular.module('app');

app.controller('PersonsCtrl', ['$scope', 'PersonsService',
	function($scope, PersonsService) {

		$scope.prepareUpdatePerson = function(person) {
			$scope.clearMessages();
			$scope.getPerson(person._links.person.href);
		}

		$scope.updatePerson = function() {

			var error = '';
			if(error = $scope.validadePerson()) {
				$scope.showErrorMessage(error);
				return;
			}

			PersonsService.updatePerson($scope.person._links.person.href,
				$scope.person).then(
					function success(response) {
						$scope.showMessage('Person data updated!');
						$scope.clear();
					}, function error(response) {
						$scope.showErrorMessage('Error updating person!');
					}
				);
		}

		$scope.getPerson = function(url) {
			PersonsService.getPerson(url).then(
				function success(response) {
					$scope.person = response.data;
				}, function error(response) {
					if (response.status === 404) {
						$scope.showErrorMessage('Person not found!');
					} else {
						$scope.showErrorMessage('Error getting person!');
					}
				}
			);
		}

		$scope.addPerson = function() {

			var error = '';
			if(error = $scope.validadePerson()) {
				$scope.showErrorMessage(error);
				return;
			}

			PersonsService.addPerson($scope.person).then(
				function success(response) {
					$scope.showMessage('Person added!');
					$scope.clear();
				}, function error(response) {
					$scope.showErrorMessage('Error adding person!');
				}
			);
		}

		$scope.deletePerson = function(person) {
			PersonsService.deletePerson(person._links.person.href).then(
				function success(response) {
					$scope.showMessage('Person deleted!');
					$scope.clear();
				}, function error(response) {
					$scope.showErrorMessage('Error deleting person!');
				})
		}

		$scope.getAllPersons = function() {
			PersonsService.getAllPersons().then(function success(response) {
				$scope.persons = response.data._embedded.persons;
			}, function error(response) {
				$scope.showErrorMessage('Error getting persons!');
			});
		}

		$scope.start = function() {
			$scope.person = null;
			$scope.clearMessages();
			$scope.getAllPersons();
		}

		$scope.clear = function() {
			$scope.person = null;
			$scope.getAllPersons();
		}

		$scope.showErrorMessage = function(errorMessage) {
			$scope.message = '';
			$scope.errorMessage = errorMessage;
		}

		$scope.showMessage = function(message) {
			$scope.errorMessage = '';
			$scope.message = message;
		}

		$scope.clearMessages = function() {
			$scope.errorMessage = '';
			$scope.message = '';
		}

		$scope.validadePerson = function() {
			
			if (!$scope.person) {
				return "Enter a Person!";
			}

			if(!$scope.person.firstName) {
				return "Enter a First Name!";
			}

			if(!$scope.person.lastName) {
				return "Enter a Last Name!";
			}

			return '';
		}

		$scope.start();

}]);
'use strict';

describe('Controller: VideoctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('newSiteApp'));

  var VideoctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VideoctrlCtrl = $controller('VideoctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(VideoctrlCtrl.awesomeThings.length).toBe(3);
  });
});

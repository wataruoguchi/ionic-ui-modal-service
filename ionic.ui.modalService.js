/*
 * This code is generated from coffeescript
 * Repository
 * https://github.com/wataruoguchi/ionic-ui-modal-service/
 *
 * Reference, respectfully
 * http://stackoverflow.com/questions/27434262/pass-a-controller-to-ionicmodal/27880980#27880980
 * http://codepen.io/julianpaulozzi/pen/wBgpjM?editors=101
 * http://forum.ionicframework.com/t/ionic-modal-service-with-extras/15357
 */
(function() {
  "use strict";
  var appModalService;
  appModalService = function($ionicModal, $rootScope, $q, $injector, $controller) {
    var _clearnup, _evalController, show;
    show = function(templateUrl, controller, parameters, options) {
      var defaultOptions, deferred, modalScope, thisScopeId;
      deferred = $q.defer();
      modalScope = $rootScope.$new();
      thisScopeId = modalScope.$id;
      defaultOptions = {
        animation: "slide-in-up",
        focusFirstInput: false,
        backdropClickToClose: true,
        hardwareBackButtonClose: true,
        modalCallback: null
      };
      options = angular.extend({}, defaultOptions, options);
      $ionicModal.fromTemplateUrl(templateUrl, {
        scope: modalScope,
        animation: options.animation,
        focusFirstInput: options.focusFirstInput,
        backdropClickToClose: options.backdropClickToClose,
        hardwareBackButtonClose: options.hardwareBackButtonClose
      }).then(function(modal) {
        var ctrlEval, ctrlInstance, locals;
        modalScope.modal = modal;
        modalScope.openModal = function() {
          modalScope.modal.show();
        };
        modalScope.closeModal = function(result) {
          deferred.resolve(result);
          modalScope.modal.hide();
        };
        modalScope.$on("modal.hidden", function(thisModal) {
          var modalscopeId;
          if (thisModal.currentScope) {
            modalscopeId = thisModal.currentScope.$id;
            if (thisScopeId === modalscopeId) {
              _clearnup(thisModal.currentScope);
            }
          }
        });
        locals = {
          "$scope": modalScope,
          "parameters": parameters
        };
        ctrlEval = _evalController(controller);
        ctrlInstance = $controller(controller, locals);
        if (ctrlEval.isControllerAs) {
          ctrlInstance.openModal = modalScope.openModal;
          ctrlInstance.closeModal = modalScope.closeModal;
        }
        modalScope.modal.show().then(function() {
          modalScope.$broadcast("modal.afterShow", modalScope.modal);
        });
        if (angular.isFunction(options.modalCallback)) {
          options.modalCallback(modal);
        }
      }, function(err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };
    _clearnup = function(scope) {
      scope.$destroy();
      if (scope.modal) {
        scope.modal.remove();
      }
    };
    _evalController = function(ctrlName) {
      var fragments, result;
      result = {
        isControllerAs: false,
        controllerName: "",
        propName: ""
      };
      fragments = (ctrlName || "").trim().split(/\s+/);
      result.isControllerAs = fragments.length === 3 && (fragments[1] || "").toLowerCase() === "as";
      if (result.isControllerAs) {
        result.controllerName = fragments[0];
        result.propName = fragments[2];
      } else {
        result.controllerName = ctrlName;
      }
      return result;
    };
    return {
      show: show
    };
  };
  return angular.module("ionic.ui.modalService", []).factory("appModalService", ["$ionicModal", "$rootScope", "$q", "$injector", "$controller", appModalService]);
})();

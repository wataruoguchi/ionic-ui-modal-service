# ionic-ui-modal-service
Pass parameters to ionic modal. Inspired by [@julianpaulozzi on stackoverflow](http://stackoverflow.com/users/3002080/julianpaulozzi?tab=profile), respectfully

## What is this?
This is an [ionic](http://ionicframework.com/) modal module you can pass any parameters.

## Demo?
You can access to CodePen on [@julianpaulozzi's post](http://stackoverflow.com/questions/27434262/pass-a-controller-to-ionicmodal/27880980#27880980)

## Usage
Load the js file in your `index.html`

```html
<script src="js/ionic.ui.modalService.js"></script>
```

Load the module

```coffeescript
angular.module("starter", ["ionic", "ionic.ui.modalService"])
```

Make your modals service. Here it is named `myModals`

```coffeescript
(->
  "use strict"
  myModals = ["appModalService", (appModalService) ->
    showYourModal = (data) ->
      appModalService.show("templates/yourModalTemplate.html", "YourModalCtrl as vm", data)

    service = {
      showYourModal: showYourModal
    }
  ]

  angular
  .module("starter")
  .factory("myModals", myModals)
)()
```

Call the service in your controller. `YourController` is a controller of where your modal will be opened

```coffeescript
YourController = (myModals) ->
  vm = @
  vm.openMyModal = (data) ->
    if data
      myModals.showYourModal(data)
    return
  return
```

```html
<ion-view>
  <ion-content ng-controller="YourController as yourCtrl">
    <button class="button" on-click="yourCtrl.showYourModal(somedata)">
    :
    :
```

And here is an example of modal itself

```coffeescript
YourModalCtrl = (parameters) ->
  vm = @
  vm.data = parameters

  vm.closeMyModal = (result) ->
    if result
      vm.closeModal(result)
    return

  return
```

`templates/yourModalTemplate.html`

```html
<div class="modal">
  <ion-header-bar class="bar bar-header bar-light">
    <button class="button btn-done" ng-click="vm.closeMyModal(vm.data)">Close</button>
  </ion-header-bar>
  <ion-content class="content list modal-list">
    <div class="item item-text-wrap text-left">{{vm.data.name}}</div>
    :
    :
```

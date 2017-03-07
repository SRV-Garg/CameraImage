
var examplecamera=angular.module('starter', ['ionic','ngCordova'])

examplecamera.controller("myCtrl",function($scope,$http,$ionicActionSheet,$timeout){
	document.addEventListener("deviceready", onDeviceReady, false);
	var pictureSource;
	var destinationType;
	$scope.smallImage="";
	var image;
	function onDeviceReady() {
		pictureSource=navigator.camera.PictureSourceType;
		destinationType=navigator.camera.DestinationType;
	}
	
	
	$scope.show = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: 'From Camera' },
       { text: 'From Gallery' }
     ],
     titleText: 'Take Picture',
     cancelText: 'Cancel',
     cancel: function() {
          return true;
        },
     buttonClicked: function(index) {
       if(index==0){
		   navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,destinationType: destinationType.DATA_URL });
		   return true;
	   }
	   else if(index==1){
		   var source = pictureSource.SAVEDPHOTOALBUM;
		navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, destinationType: destinationType.DATA_URL,sourceType: source });
	   }
     }
   });

   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
     hideSheet();
   }, 5000);

 };
	$scope.capturePhoto=function(){
		alert("in capture");
		navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,destinationType: destinationType.DATA_URL });
	}
	
	$scope.getPhoto=function() {
		alert("in gallery");
		var source = pictureSource.SAVEDPHOTOALBUM;
		navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, destinationType: destinationType.DATA_URL,sourceType: source });
	}
	
	function onPhotoURISuccess(imageURI) {
		//alert("gallery"+imageURI);
		image = imageURI;
	}
	
	function onPhotoDataSuccess(imageData) {
		alert("camera");
		image="data:image/jpeg;base64," + imageData;
		
	}
	
	function onFail(message) {
		alert('Failed because: ' + message);
	}
	
	$scope.insert = function(){
				$scope.smallImage=image;
	}			
})
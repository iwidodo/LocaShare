$(document).ready(function() {
	$("#getPhotoSrc").on('click',uploadFromGallery);
  /*After prev function finish, go to confirmation page*/
  $.when.apply(this,uploadFromGallery).done(function(){
    $.mobile.changePage( "#upConfirmation", { transition: "pop"} );
  })
});


function uploadFromGallery() {

  console.log("uploadFromGallery Clicked");
    // Retrieve image file location from specified source
  navigator.camera.getPicture(uploadPhoto,
      function(message) { alert('get picture failed'); },
      { quality: 50, 
      destinationType: navigator.camera.DestinationType.FILE_URI,
      sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY }
      );

}


function uploadPhoto(imageURI) {
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1)+'.png';
    options.mimeType="text/plain";

    var params = new Object();

    options.params = params;

    //version 1 (according to firebase)
    var uploadTask = storageRef.child('images/' + options.fileName).put(imageURI);

    /*version 2
    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI("https://locashare-de548.firebaseio.com"), win, fail, options);
	*/
}

function win(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}

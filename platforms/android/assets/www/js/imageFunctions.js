
    // Wait for device API libraries to load

    $(document).ready(function() {

    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value
    $("#captPhoto").on('touchstart',capturePhoto);
    $("#captPhotoEdit").on('click',capturePhotoEdit);
    /*$("#getPhotoSrc").on('click',getPhotoSrc);*/
    $("#getPhotoAlbum").on('click',getPhotoAlbum);
    });

    //
    document.addEventListener("deviceready",getCameraReady,false);

    // device APIs are available
    //
    function getCameraReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64-encoded image data
      // console.log(imageData);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      //
      smallImage.style.display = 'block';

      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI
      // console.log(imageURI);

      // Get image handle
      //
      var largeImage = document.getElementById('largeImage');

      // Unhide image elements
      //
      largeImage.style.display = 'block';

      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
    }

    // A button will call this function
    //
    function capturePhoto() {
      console.log('capture photo selected');
      // Take picture using device camera and retrieve image as base64-encoded string

      console.log('file uri ' + destinationType.FILE_URI);
      console.log('data url ' + destinationType.DATA_URL);

       navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 30,
        targetWidth: 600,
        targetHeight: 600,
        destinationType: destinationType.FILE_URI,
        saveToPhotoAlbum: true
    });

      //navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        //destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function getPhotoSrc() {
      console.log("getPhotoSrc Clicked");
      
      source = Camera.PictureSourceType.PHOTOLIBRARY;
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    function getPhotoAlbum() {
      source = pictureSource.SAVEDPHOTOALBUM;
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    //
    function onFail(message) {
      alert('Failed because: ' + message);
    }

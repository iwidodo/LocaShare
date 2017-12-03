$(document).ready(function() {
  $("#download").on('click',downloadFromGallery);
});

function downloadFromGallery() { 

    console.log("downloadFromGallery Clicked");

// Create a reference to the file we want to download
// Create a reference from a Google Cloud Storage URI
var gsReference = storage.refFromURL('gs://bucket/images/stars.jpg')
var starsRef = storageRef.child('images/stars.jpg');

// Get the download URL
starsRef.getDownloadURL().then(function(url) {
  // Insert url into an <img> tag to "download"
}).catch(function(error) {
  switch (error.code) {
    case 'storage/object_not_found':
      // File doesn't exist
      break;

    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;

    case 'storage/unknown':
      // Unknown error occurred, inspect the server response
      break;
  }
});

}
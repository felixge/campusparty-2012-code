$(function() {
  var socket = io.connect('http://localhost');
  socket.on('image', function(url) {
    var $img = $('<img/>').attr('src', url);
    $('body').prepend($img);
  });
});


 $(document).ready(function() {
  alert("Connected");
   $('#btn').click(function (event) {
      
      event.preventDefault();
      alert($('#m').val());
      $("#messages").append('<li>'+username+": "+($('#m').val())+'</li>');
     // socket.emit('message',$('#m').val());
      $.get('http://localhost:3000/api/join/10', function(data) {
         console.log("data is ", data);
         var socket = io.connect('http://localhost:3000');
         socket.on('message', function(message) {
     //$("#messages").append('<li>'+socket.username+": "+message+'</li>');
    })
      });
     
  })
  
 });

 
  
 //   var user ;var msg;
 //   socket.on('user', function(name){
 //     user = name;
 //   });
 //   socket.on('text', function(message) {
 //     msg = message;
 //     $("#messages").append('<li>'+user+": "+msg+'</li>');
 //   });
  //  $(document).ready(function(){
  //   alert("inside testSocket");
  //  });
  //  var username = prompt('What\'s your username?');
  //  //socket.emit('name', username);
  //  $('#btn').click(function (event) {
      
  //     event.preventDefault();
  //     alert($('#m').val());
  //     $("#messages").append('<li>'+username+": "+($('#m').val())+'</li>');
  //    // socket.emit('message',$('#m').val());
  //     $.get('http://localhost:3000/api/join/10', function(data) {
  //        console.log("data is ", data);
  //     });
     
  // })/Users/nimmyissac/Desktop/Thesis/Murmillo/client/src
  ///Users/nimmyissac/Desktop/Thesis/Murmillo/client/dist
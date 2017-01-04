// =====================================================================
// pseudo Code
  // open socket for roomID (easy, 'medium', hard)
  // assign user to the corr


  // Get problem based on easy, medium, hard

  // emit 'start' event to the client (client should listent for 'start' and render home and start time clock)
    // send problem to the user using socket (later)
    // emit 'start' event to the client (client should render home page upon 'start' event)

    // emit 'submitSoln' event from the client (server should evaluate code)
      // 1) evalute code (create a function that reutns 'error', 'fail', 'pass')
      // 2) notify users the results
          // error - syntax error, only notify to a specific only
          // fail - broard resutls to all users int the room
          // pass - close sockets for all users with message

    // listen for 'timeout' event from the client (server should close sockets for all users with message)

  //res.end("");


// =====================================================================
// http://stackoverflow.com/questions/35680565/sending-message-to-specific-client-in-socket-io
// https://divillysausages.com/2015/07/12/an-intro-to-socket-io/

 // sending to sender-client only
 socket.emit('message', "this is a test");

 // sending to all clients, include sender
 io.emit('message', "this is a test");

 // sending to all clients except sender
 socket.broadcast.emit('message', "this is a test");

 // sending to all clients in 'game' room(channel) except sender
 socket.broadcast.to('game').emit('message', 'nice game');

 // sending to all clients in 'game' room(channel), include sender
 io.in('game').emit('message', 'cool game');

 // sending to sender client, only if they are in 'game' room(channel)
 socket.to('game').emit('message', 'enjoy the game');

 // sending to all clients in namespace 'myNamespace', include sender
 io.of('myNamespace').emit('message', 'gg');

 // sending to individual socketid
 socket.broadcast.to(socketid).emit('message', 'for your eyes only');
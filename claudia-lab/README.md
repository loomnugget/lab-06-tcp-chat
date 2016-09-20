
##About:
This program has two modules. `client.js` creates a client constructor which takes user input and stores a reference to a socket (connection between client and server), a random nickname, and a random id. `server.js` is responsible for creating the server, passing in user input, and handling events. Custom events are created for sending messages to all clients, creating a nickname and direct messaging between clients. When a user is registered on the server, they are added to the client pool and removed when they exit the session.

##To get the program running:
Install dependencies from `package.json`

##To connect to the server:
Run the `server.js` file in node (should say `server running on port 3000`). Open up additional console windows to create clients by entering `[telnet localhost 3000]`.

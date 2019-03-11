# chat-app-auth0
chat-app-advanced
1. run 'docker-compose -f docker-compose.yml up' and type Ctl+Z to hide 
2. this running process (make sure port 3306 and 8080 not using)
3. login the http://localhost:8080 with the username: root, password: example, and then create a database named 'chat-app'
4. run 'npm install' in client and server side respectively
5. add '(window as any).global = window;' in polyfills.ts file in /client/src/ployfills.ts file;
6. change to server side and run 'node index.js' in the terminal
7. open another terminal and change to client side running 'ng serve'

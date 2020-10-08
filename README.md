# WordyURL.com
Turn hard to remember URLs into easy to remember.

Can be accessed at:
https://wordyurl.com/

Todo:
- Make pages nice for the error, redirection and notfound page
- The error message on the recently generated urls is not very good looking.

Fix:
- There is currently an issue in the deployment build where if you type https://urlwords.dreamhosters.com// there is a white screen.

Some issues I had:
- CORS was disallowing me to redirect the user by sending a GET request from the front to this server and redirecting from the GET request.
- I completely forgot to import path and spent hours wondering why client-routing wasn't working.
- If there is an error when building the deployment build, then I should probably fix them as they can cause strange issues. 

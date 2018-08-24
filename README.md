Firestore:
  - functions what are deployed on firebase ignores permissions from firestore rules
  - to debug functions in shell you should provide a private key. In this test project it stores in key.json file
  - two options to call the lambda function:
    - through the ordinary ajax request
    - through the firebase.callable method 
    
Circle CI:
  - add firebase token to the env variable of the project. Not to the context.
  - context only for storing artifact(not sure)
  - to deploy artifact add firebase-tools to dev-dependency. Add firebase.json to the root. Set hosting folder as build folder.
  - check if .firebaserc file exists. If no, run firebase use --add.
-------------------------------------------------------------------------------------------------------------------------------------------
TASK:

  FireStore:

 - implements authorization with google auth
 - implements storing todos in the firestore DB
 - implements toggle done button
 - create permission rule for toggle done button
 - implements backup todos button
 - implements FCM on update and backup events
 - implements background messages handling
 - implements foreground messages handling
 - implements attachments section and store it on firestore storage
 - deploy build on firebase hosting

  Cicle CI:

 - sequre the git branch with hooks(deny push in master, only MR merges)
 - configure test job
 - configure lint job
 - configure build job
 - configure deploy job

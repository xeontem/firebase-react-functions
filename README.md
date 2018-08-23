- functions what are deployed on firebase ignores permissions from firestore rules
- to debug functions in shell you should provide a private key. In this test project it stores in key.json file
- two options to call the lambda function:
    - through the ordinary ajax request
    - through the firebase.callable method


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

  Cicle CI:

 - sequre the git branch with hooks(deny push in master, only MR merges)
 - configure test job
 - configure lint job
 - configure build job
 - configure deploy job

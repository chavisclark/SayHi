//Example usage of SayHi library

$('#login').click(function() { //click function initializes the creation of the new SayHi object
  
  //passes an example user through to create the SayHi object  
  var helloTalk = Hi$('Phil', 'Dunphy');

  //hides the login container to simulate the appearance of a successful log in
  $('#login_container').hide();

  helloTalk
  .setLang($('#lang') //Sets language of the object
    .val()) // returns value
      .HTMLspeak('#greeting', true) // targets the `#greeting` node element with a formal greeting set to `true`
        .log() //records log-in session to the console

});
//Safely create self-contained execution context
(function(global, $) {
  var SayHi = function(firstName, lastName, language) {
    //Return a function constructor for cleaner code base
    return new SayHi.init(firstName, lastName, language);
  }

  var supportedLangs = ['en', 'es'];

  //Set messages for English and Spanish
  //These are only exposed to this enclosed object
  var greetings = {
    en: 'Hello',
    es: 'Hola'
  };

  var formalGreetings = {
    en: 'Greetings',
    es: 'Saludos'
  };

  var logMessages = {
    en: 'Logged in',
    es: 'Inició sesión'
  };

  SayHi.prototype = {
    fullName: function() {
      return this.firstName + ' ' + this.lastName;
    },

    validate: function() {

    }
  };

  SayHi.init = function(firstName, lastName, language) {
    //Build properties for new insatnces of SayHi
    var self = this;
    self.firstName = firstName || '';
    self.lastName = lastName || '';
    self.language = language || 'en';
  }

  //Attach init's prototype to the SayHi prototype
  SayHi.init.prototype = SayHi.prototype;

  //Expose SayHi to the global object
  global.SayHi = global.Hi$ = SayHi;

//Pass the window and jQuery object to SayHi
})(window, jQuery);
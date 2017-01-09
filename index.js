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
    //Sets the prototype methods 
    fullName: function() {
      //returns first and last name
      return this.firstName + ' ' + this.lastName;
    },

    validate: function() {
      //checks if program supports given language input
      if (supportedLangs.indexOf(this.language) === -1) {
        throw "Invalid language";
      }
    },

    greeting: function() {
      //returns informal greeting in desired language
      return greetings[this.language] + ' ' + this.firstName + '!';
    },

    formalGreeting: function() {
      //returns formal greeting in desired language
      return formalGreetings[this.language] + ' ' + this.fullName() + '!';
    },

    greet: function(formal) {
      //handles which greeting function to call
      var message;

      if (formal) {
          message = this.formalGreeting(); 
      }

      if (!formal) {
          message = this.greeting(); 
      }

      //logs the intended greeting
      if (console) {
        console.log(message);
      }

      //returning `this` makes the method chainable 
      return this;
    },

    log: function() {
      //log greeting activity
      if (console) {
        console.log(logMessages[this.language] + ': ' + this.fullName());
      }

      return this;
    },

    setLang: function(lang) {
      //sets which language to support
      this.language = lang;

      this.validate();

      return this;
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
//Safely create self-contained execution context
;(function(global, $) {
  var SayHi = function(firstName, lastName, language) {
    //Returns a function constructor
    return new SayHi.init(firstName, lastName, language);
  }

  // The following variables are only exposed to this enclosed object
  //---START--//

  //language support values as array
  var supportedLangs = ['en', 'es'];

  //Informal greetings for English and Spanish
  var greetings = {
    en: 'Hello',
    es: 'Hola'
  };

  //Formal greetings for English and Spanish
  var formalGreetings = {
    en: 'Greetings',
    es: 'Saludos'
  };

  //Logged messages for English and Spanish
  var logMessages = {
    en: 'Logged in',
    es: 'Inició sesión'
  };

  //---END---//

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

    selectGreeting: function(formal) {
      var message;

      //set message variable to the result of the formal greeting method
      if (formal) {
          message = this.formalGreeting(); 
      }

      //set message variable to the result of the informal greeting method
      if (!formal) {
          message = this.informalGreeting(); 
      }
      //return the resulting greeting message
      return message;
    },

    informalGreeting: function() {
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
      
      //selects greeting type
      this.selectGreeting(formal, message);
      
      //logs the intended greeting
      if (console) {
        console.log(this.selectGreeting(formal, message));
      }

      //returning `this` makes the method chainable 
      return this;
    },

    log: function() {
      //log greeting activity
      if (console) {
        console.log(logMessages[this.language] + ': ' + this.fullName());
      }

      //returning `this` makes the method chainable
      return this;
    },

    setLang: function(lang) {
      //sets which language to support
      this.language = lang;

      this.validate();

      //returning `this` makes the method chainable
      return this;
    },

    HTMLspeak: function(selector, formal) {
      //Handle jquery support
      if(!$) {
        throw 'jQuery not loaded';
      }

      //Handle node selection requirement
      if(!selector) {
        throw 'Missing targeted DOM node'
      }

      //select html node to display greeting
      var msg = this.selectGreeting(formal);
      console.log(msg)
      $(selector).html(msg)

      //returning `this` makes the method chainable
      return this;
    }
  };

  //the actual object is created here, allowing use of the `new` object
  //created in the initial SayHi function
  SayHi.init = function(firstName, lastName, language) {
    //Build properties for new insatnces of SayHi
    var self = this;
    self.firstName = firstName || '';
    self.lastName = lastName || '';
    self.language = language || 'en';

    self.validate();
  }

  //Attach init's prototype to the SayHi prototype
  SayHi.init.prototype = SayHi.prototype;

  //Expose SayHi to the global object
  global.SayHi = global.Hi$ = SayHi;

//Pass the window and jQuery object to SayHi
})(window, jQuery);
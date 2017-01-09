//Safely create self-contained execution context
(function(global, $) {
  var SayHi = function(firstName, lastName, language) {
    //Return a function constructor for cleaner code base
    return new SayHi.init(firstName, lastName, language);
  }

  SayHi.prototype = {};

  SayHi.init = function(firstName, lastName, language) {
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
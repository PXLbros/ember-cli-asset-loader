(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['WebFont'] };
  }

  define('WebFont', [], vendorModule);
})();

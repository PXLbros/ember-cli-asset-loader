/*jshint node:true*/
module.exports = {
    description: '',

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

    afterInstall: function() {
        return this.addBowerPackageToProject('webfontloader'); // is a promise
    }
};

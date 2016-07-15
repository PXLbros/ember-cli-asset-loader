/* jshint node: true */
'use strict';

module.exports = {
    name: 'ember-cli-asset-loader',

    included: function(app) {
        this._super.included(app);
        app.import(app.bowerDirectory + '/webfontloader/webfontloader.js');
    },

    isDevelopingAddon: function() {
        return true;
    }
};

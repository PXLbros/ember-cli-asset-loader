/* globals YT, FB */

import Ember from 'ember';
import WebFont from 'webfontloader';

function loadMedia(sources, tag) {
    return new Ember.RSVP.Promise(res => {
        // Create video element
        let element = document.createElement(tag);

        // Loop through all sources and add them to the element element
        sources.forEach(source => {
            // Create source element
            let sourceElement  = document.createElement('source');
            sourceElement.src  = source.src;
            sourceElement.type = source.type;
            // Append source element to element element
            element.appendChild(sourceElement);
        });

        // Bind loaded func
        element.addEventListener('canplaythrough', () => {
            element.volume = 1;
            res(element);
        }, true);

        // Generic error function for failed assets
        let errorFunc = () => {
            res(false);
        };

        // Bind error events
        element.addEventListener('error',   errorFunc, true);
        element.addEventListener('abort',   errorFunc, true);
        element.addEventListener('invalid', errorFunc, true);

        // Trigger element loading
        element.volume = 0;
        element.load();
        element.play();
    });
}

export default Ember.Service.extend({

    /**
     @method loadImage
     @param {String} path Path to the image asset
     @return {Promise} promise Resolves to the loaded image object or false if the image errors
     */
    loadImage(path) {
        return new Ember.RSVP.Promise(res => {
            let img     = document.createElement('img');
            img.onload  = () => { res(img); };
            img.onerror = () => { res(false); };
            img.src     = path;
        });
    },

    /**
     @method loadVideo
     @param {Array} sources Array of sources
     @return {Promise} promise Resolves to the loaded image object of false if the video errors
     */
    loadVideo(sources) {
        return loadMedia(sources, 'video');
    },

    /**
     @method loadAudio
     @param {Array} sources Array of sources
     @return {Promise} promise Resolves to the loaded image object of false if the video errors
     */
    loadAudio(sources) {
        return loadMedia(sources, 'audio');
    },

    /**
     @method loadYoutubeApi Loads the youtube api script
     @return {Promise} promise
     */
    loadYoutubeApi() {
        // Load yt script
        return new Ember.RSVP.Promise(res => {
            var tag     = document.createElement('script');
            tag.src     = "https://www.youtube.com/iframe_api";
            tag.onerror = () => { res(false); };

            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = () => { res(YT); };
        });
    },

    /**
     @method loadFacebookApi Loads the facebook api script
     @return {Promise} promise
     */
    loadFacebookApi(appId) {
        return new Ember.RSVP.Promise(res => {
            if (Ember.$('#fb-root').length === 0) {
                Ember.$('body').append('<div id="fb-root"></div>');
            }
            window.fbAsyncInit = function() {
                FB.init({
                    appId      : appId || '',
                    xfbml      : true,
                    version    : 'v2.1'
                });
                Ember.run(function(){
                    res(FB);
                });
            };

            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
                js.onerror = () => { res(false); };
             }(document, 'script', 'facebook-jssdk'));
        });
    },

    /**
     @method loadFonts Loads fonts using webfontloader
     @param {Object} config Config object for webfont loader
     */
    loadFonts(/*config*/) {
        WebFont.load();
        return WebFont;
    }
});

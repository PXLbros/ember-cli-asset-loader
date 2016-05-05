/* globals YT */

import Ember from 'ember';

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
    }
});

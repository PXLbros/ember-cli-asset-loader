/* globals YT, FB, WebFont */

import Ember from 'ember';

// Define map for holding loaded assets
let loadedAssets = new Ember.Map();

function setLoadedAsset(name, asset) {
    if(!loadedAssets.has('name')) { loadedAssets.set(name, asset); }
    else { throw `Asset name must be unique. Asset with name ${name} has already been registered.`; }
}

export default Ember.Service.extend(Ember.Evented, {

    _assetLoaded(assetName, asset) {
        this.trigger('assetLoaded', assetName, asset);
    },




    /**
     @method _loadMedia
     @param {Array} media
     @param {String} element Html element to create
     @return {Promise} promise Resolves when the media has been loaded
     */
    _loadMedia(media, tagName) {
        return new Ember.RSVP.Promise(res => {
            // Create video element
            let element = document.createElement(tagName);

            // Loop through all sources and add them to the element element
            media.sources.forEach(source => {
                // Create source element
                let sourceElement  = document.createElement('source');
                sourceElement.src  = source.src;
                sourceElement.type = source.type;
                // Append source element to element element
                element.appendChild(sourceElement);
            });

            // Bind loaded func
            element.addEventListener('canplaythrough', () => {
                element.pause();
                element.volume = 1;
                this._assetLoaded(media.name, element);
                res(element);
            }, true);

            // Generic error function for failed assets
            let errorFunc = () => {
                this._assetLoaded(media.name, false);
                res(false);
            };

            // Bind error events
            element.addEventListener('error',   errorFunc, true);
            element.addEventListener('abort',   errorFunc, true);
            element.addEventListener('invalid', errorFunc, true);

            // Trigger element loading
            element.load();
            element.play();
            element.volume = 0;
            setLoadedAsset(media.name, element);
        });
    },


    /**
     @method loadImage
     @param {String} path Path to the image asset
     @return {Promise} promise Resolves to the loaded image object or false if the image errors
     */
    loadImage(image) {
        return new Ember.RSVP.Promise(res => {
            let img     = document.createElement('img');
            img.onload  = () => {
                this._assetLoaded(image.name, img);
                res(img);
            };
            img.onerror = () => {
                this._assetLoaded(image.name, false);
                res(false);
            };
            img.src     = image.src;
            setLoadedAsset(image.name, img);
        });
    },




    /**
     @method loadVideo
     @param {Array} media
     @return {Promise} promise Resolves to the loaded image object of false if the video errors
     */
    loadVideo(video) {
        return this._loadMedia(video, 'video');
    },




    /**
     @method loadAudio
     @param {Array} sources Array of sources
     @return {Promise} promise Resolves to the loaded image object of false if the video errors
     */
    loadAudio(audio) {
        return this._loadMedia(audio, 'audio');
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
            tag.onerror = () => {
                this._assetLoaded('youtube', false);
                res(false);
            };

            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = () => {
                this._assetLoaded('youtube', YT);
                res(YT);
            };
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
                    this._assetLoaded('facebook', FB);
                    res(FB);
                });
            };

            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
                js.onerror = () => {
                    this._assetLoaded('facebook', false);
                    res(false);
                };
             }(document, 'script', 'facebook-jssdk'));
        });
    },




    /**
     @method loadFonts Loads fonts using webfontloader
     @param {Object} config Config object for webfontloader
     */
    loadFonts(config) {
        return new Ember.RSVP.Promise(res => {
            config.active       = res;
            config.inactive     = res;
            WebFont.load(config);
        });
    },



    /**
     @method getLoadedAsset
     @param {String} name Name of the asset
     */
    getLoadedAsset(name) {
        return loadedAssets.get(name);
    }
});

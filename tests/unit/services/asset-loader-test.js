import { moduleFor, test } from 'ember-qunit';

moduleFor('service:asset-loader', 'Unit | Service | asset loader', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

// Test if the service loads images
test('it loads images', function(assert) {
    let service = this.subject();
    // This test is async
    let done    = assert.async();
    // Set path of demo image
    let image = { name: 'starry_night', src: '/starry_night.jpg' };

    // Call loadImage
    service.loadImage(image).then(img => {
        // Assert the image object is returned
        assert.ok(img);
        // Assert the image has completed loading
        assert.ok(img.complete);
        // Assert that the returned image src contains the original provided image path
        assert.ok(img.src.indexOf(image.src) !== -1);
        done();
    }, () => {
        // This promise should never fail so fail the test if it does
        assert.ok(false);
        done();
    });
});

// Test what happens when the service can not load the image
test('image load fails gracefully', function(assert) {
    let service = this.subject();
    // This test is async
    let done    = assert.async();
    // Set path of demo image
    let imgPath = 'non_existant_image.jpg';

    // Call loadImage
    service.loadImage(imgPath).then(img => {
        // Assert the promise returns false
        assert.ok(!img);
        done();
    }, () => {
        // This promise should never fail so fail the test if it does
        assert.ok(false);
        done();
    });
});

// Test loading of video
test('it can load videos', function(assert) {
    let service = this.subject();
    // This test is async
    let done    = assert.async();
    // Define sources
    let source = {
        name: 'trailer',
        sources: [
            { type: 'video/webm', src: '/trailer.webm' },
            { type: 'video/mp4',  src: '/trailer.mp4'  },
            { type: 'video/ogg',  src: '/trailer.ogv'  }
        ]
    };

    service.loadVideo(source).then(video => {
        // Make sure that the promies returns the right object
        assert.ok(video);
        // Make sure the video has enough data to play per: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState
        assert.equal(4, video.readyState);
        done();
    }, () => {
        // This promise should never fail so fail the test if it does
        assert.ok(false);
        done();
    });
});

/**
 * @todo Add test for failing video
 */

// Test loading of audio
test('it can load audio', function(assert) {
    let service = this.subject();
    // This test is async
    let done    = assert.async();
    // Define sources
    let source = {
        name: 'music',
        sources: [
            { type: 'audio/mp3', src: '/music.mp3' },
            { type: 'audio/mp4', src: '/music.mp4' },
            { type: 'audio/ogg', src: '/music.oga' },
            { type: 'audio/wav', src: '/music.wav' }
        ]
    };

    service.loadAudio(source).then(audio => {
        // Make sure that the promies returns the right object
        assert.ok(audio);
        // Make sure the video has enough data to play per: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState
        assert.equal(4, audio.readyState);
        done();
    }, () => {
        // This promise should never fail so fail the test if it does
        assert.ok(false);
        done();
    });
});

/**
 * @todo Add test for failing audio
 */

// Test loading the youtube api script
test('it loads the youtube script', function(assert) {
    let service = this.subject();
    // This test is async
    let done    = assert.async();

    // Call loadYoutubeApi
    service.loadYoutubeApi().then(yt => {
        // Assert the promise returns false
        assert.ok(yt);
        assert.equal(1, yt.loaded);
        done();
    }, () => {
        // This promise should never fail so fail the test if it does
        assert.ok(false);
        done();
    });
});

// Test loading the facebook api script
test('it loads the facebook script', function(assert) {
    let service = this.subject();
    // This test is async
    let done    = assert.async();

    // Call loadYoutubeApi
    service.loadFacebookApi().then(fb => {
        // Assert the promise returns false
        assert.ok(fb);
        done();
    }, () => {
        // This promise should never fail so fail the test if it does
        assert.ok(false);
        done();
    });
});

/**
 * @todo Not sure how to force a failure of the facebook load script
 */

// Make sure it loads fonts
test('it loads fonts', function(assert) {
    let service = this.subject();
    // This test is async
    let done    = assert.async();

    // Call loadFonts with known working font
    service.loadFonts({
        google: {
            families: ['Droid Sans', 'Droid Serif']
        }
    }).then(() => {
        // Check that the HTML is recieving the correct classes to indicate success as per webfontloader
        assert.ok($('html').hasClass('wf-droidsans-n4-active wf-droidserif-n4-active wf-active'));
        done();
    }, () => {
        // This promise should never fail so fail the test if it does
        assert.ok(false);
        done();
    });
});

// Make sure you can retrieve loaded assets
test('can look up loaded assets', function(assert) {
    let service = this.subject();
    // This test is async
    let done    = assert.async();

    let image   = { name: 'starry_night', src: '/starry_night.jpg' };

    service.loadImage(image).then(img => {
        // Make sure we can retrieve the loaded image
        let loadedImage = service.getLoadedAsset('starry_night');
        assert.equal(img, loadedImage);

        done();
    }, () => {
        // This promise should never fail so fail the test if it does
        assert.ok(false);
        done();
    });
});

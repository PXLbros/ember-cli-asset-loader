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
    let imgPath = '/starry_night.jpg';

    // Call loadImage
    service.loadImage(imgPath).then(img => {
        // Assert the image object is returned
        assert.ok(img);
        // Assert the image has completed loading
        assert.ok(img.complete);
        // Assert that the returned image src contains the original provided image path
        assert.ok(img.src.indexOf(imgPath) !== -1);
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
    let sources = [
        { type: 'video/mp4',  src: '/trailer.mp4'  },
        { type: 'video/ogg',  src: '/trailer.ogv'  },
        { type: 'video/webm', src: '/trailer.webm' }
    ];

    service.loadVideo(sources).then(video => {
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

// Add test for failing video

// Test loading of audio
test('it can load audio', function(assert) {
    let service = this.subject();
    // This test is async
    let done    = assert.async();
    // Define sources
    let sources = [
        { type: 'audio/mp3', src: '/music.mp3' },
        { type: 'audio/mp4', src: '/music.mp4' },
        { type: 'audio/ogg', src: '/music.oga' },
        { type: 'audio/wav', src: '/music.wav' }
    ];

    service.loadAudio(sources).then(audio => {
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

// Add test for failing audio

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

// Test what happens when the service can not load the image
test('it loads fonts', function(assert) {
    let service = this.subject();
    // This test is async
    //let done    = assert.async();

    let wf = service.loadFonts({});
    console.log(wf);
    assert.ok(wf);
});

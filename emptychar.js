const injectedStyles = `
  .video-js {
    position: fixed;
    right: 10px !important;
    bottom: 100px !important;
    width: 330px;
    height: 215px;
    z-index: 100;
  }
  .close-button {
    position: absolute;
    top: -20px;
    right: 5px;
    cursor: pointer;
    font-size: 16px;
    color: #333;
  }


  .vjs-tech {
    width: 330px;
    height: 215px;
  position: fixed;
      right: 10px;
      bottom: 100px;
    z-index: 99;
  }

  .my-video_ima-ad-container {
    z-index: 300;
  }

  @media screen and (max-width: 759px) {
    .video-js {
      position: fixed;
      right: 10px !important;
      bottom: 55px !important;
      width: 256px !important;
      height: 144px !important;
      z-index: 100;
    }

    .vjs-tech {
  position: fixed;
      right: 10px;
      bottom: 55px;
      width: 256px !important;
      height: 144px !important;
      z-index: 99;
    }

    .my-video_ima-ad-container {
      z-index: 300;
    }
  }
`;

// Function to inject styles into the HTML document
function injectStyles() {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = injectedStyles;

  document.head.appendChild(styleElement);
}

// Call the function to inject styles when the DOM is ready
document.addEventListener('DOMContentLoaded', injectStyles);

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Content Loaded");

  var player = videojs('my-video', { muted: true });
  player.muted(true);
  player.play();

  console.log("Video.js player initialized");

  var vastTagPreroll = "https://googleads.g.doubleclick.net/pagead/ads?client=ca-video-pub-6419767829488704&slotname=emptycharacter&ad_type=video&description_url=https%3A%2F%2Ffilesamples.com%2Fsamples%2Fvideo%2Fmp4%2Fsample_960x400_ocean_with_audio.mp4&max_ad_duration=30000&videoad_start_delay=0&vpmute=1&vpa=click";
  var vastTagMidroll = "path/to/your/vast-tag.xml";
  var vastTagPostroll = "path/to/your/vast-tag.xml";
  var prerollTriggered = false;
  var postrollTriggered = false;
  var midrollRequested = false;
  var midrollInterval = 5 * 60; // 5 minutes
  var lastMidrollTime = 0; // The time when the last mid-roll ad was played

  if (!prerollTriggered) {
    player.ima({
      adTagUrl: vastTagPreroll,
      showControlsForAds: true,
      debug: false,
    });
  } else {
    player.ima({
      adTagUrl: '',
      showControlsForAds: true,
      debug: false,
    });
  }
  console.log("IMA settings configured");

  player.ima.initializeAdDisplayContainer();
  console.log("IMA ad display container initialized");

  function requestMidrollAd() {
    midrollRequested = true;
    player.ima.changeAdTag(vastTagMidroll);
    player.ima.requestAds();
  }

  player.on("timeupdate", function () {
    var currentTime = player.currentTime();
    console.log("Current time:", currentTime);
    var timeSinceLastMidroll = currentTime - lastMidrollTime;

    if (timeSinceLastMidroll >= midrollInterval && !midrollRequested) {
      lastMidrollTime = currentTime; // Update the last mid-roll ad time
      console.log("Midroll triggered");
      requestMidrollAd();
    }
  });

  player.on("ended", function () {
    console.log("Video ended");
    if (!postrollTriggered) {
      postrollTriggered = true;
      console.log("Postroll triggered");

      player.ima.requestAds({
        adTagUrl: vastTagPostroll,
      });

      console.log("Postroll ads requested");
    }
  });

  player.on("adsready", function () {
    if (midrollRequested) {
      console.log("Ads ready - midroll");
    } else {
      console.log("Ads ready - preroll");
      player.src(
        "https://video.twimg.com/amplify_video/1360061497691541505/vid/340x270/c4mklPwyMcAsZu6e.mp4"
      );
    }
  });

  player.on("aderror", function () {
    console.log("Ads aderror");
    player.play();
  });

  player.on("adend", function () {
    if (lastMidrollTime > 0) {
      console.log("A midroll ad has finished playing.");
      midrollRequested = false;
    } else {
      console.log("The preroll ad has finished playing.");
      prerollTriggered = true;
    }
 //    player.play();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var targetDiv = document.querySelector('.video-js');
  var targetDiv2 = document.querySelector('.vjs-tech');
  var targetDiv3 = document.querySelector('.my-video_ima-ad-container');
var targetDiv4 = document.querySelector('.trigger');

  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function handleScroll() {
    if (isElementInViewport(targetDiv4) && window.matchMedia('(min-width: 767px)').matches) {
           targetDiv.style.cssText = 'position:relative !important;width: 640px;height: 460px;';
      targetDiv.style.right = '15px';
      targetDiv.style.bottom = '75px';
      targetDiv.style.zIndex = '100';
targetDiv2.style.position = 'relative !important';
      targetDiv2.style.width = '640px';
      targetDiv2.style.height = '460px';
      targetDiv2.style.zIndex = '99';
      targetDiv3.style.zIndex = '200';
    } else if (isElementInViewport(targetDiv4) && window.matchMedia('(max-width: 767px)').matches)  {
      targetDiv.style.cssText = 'position:relative !important;width: 330px; height: 215px;';
      targetDiv.style.right = '0';
      targetDiv.style.bottom = '0';
      targetDiv.style.width = 'auto';
      targetDiv.style.height = 'auto';
      targetDiv.style.zIndex = '100';
targetDiv2.style.position = 'relative !important';
      targetDiv2.style.width = '330px';
      targetDiv2.style.height = '215px';
      targetDiv2.style.zIndex = '99';
      targetDiv3.style.zIndex = '200';
    } else {
      targetDiv.style.cssText = 'position: fixed !important; width: 330px;height: 215px;';
targetDiv2.style.cssText = 'width: 330px;height: 215px;'
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();
});
document.addEventListener("DOMContentLoaded", function () {
  var targetDiv = document.getElementById('my-video');

  var closeButton = document.createElement('span');
  closeButton.innerHTML = 'X';
  closeButton.className = 'close-button';

  targetDiv.appendChild(closeButton);

  closeButton.addEventListener('click', function () {
    targetDiv.style.display = 'none';
  });
});


var Webflow = Webflow || [];
Webflow.push(() => {
  videoScrubOnScroll();
});

function videoScrubOnScroll() {
  const headerEl = '.section_home-header';
  const stickyEl = '.section_home-header_sticky';

  const videoEl = document.querySelector('.section_home-header_video video');

  // check if metadata is already loaded
  if (videoEl.readyState >= 2) {
    onVideoMetadataLoaded();
  } else {
    // wait for metadata to load
    videoEl.addEventListener('loadedmetadata', onVideoMetadataLoaded);
  }

  function onVideoMetadataLoaded() {
    // IOS fix to placebo play the video so that it renders, then immediately pause it
    videoEl.play();
    videoEl.pause();

    const videoDuration = videoEl.duration;
    const videoDurationRatio = 100 / videoDuration;

    const videoScrollTL = gsap.timeline({
      defaults: { duration: 1 },
      scrollTrigger: {
        trigger: headerEl,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        // markers: true,
        onUpdate: (self) => {
          // frame in the video
          videoEl.currentTime =
            (self.progress.toFixed(3) / videoDurationRatio) * 100;
        },
      },
    });

    videoScrollTL.fromTo(stickyEl, { scale: 0.9 }, { scale: 1 });
  }
}

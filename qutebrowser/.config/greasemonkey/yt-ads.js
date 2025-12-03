
// ==UserScript==
// @name         Auto Skip YouTube Ads
// @version      1.1.0
// @description  Speed up and skip YouTube ads automatically
// @author       jso8910 and others
// @match        *://*.youtube.com/*
// ==/UserScript==
   // Redirect /shorts/ URLs to normal watch page or subscriptions
    //if (location.pathname.startsWith("/shorts/")) {
    //    const videoId = location.pathname.split("/shorts/")[1];
    //    if (videoId) {
    //        location.replace(`https://www.youtube.com/watch?v=${videoId}`);
    //    } else {
    //        location.replace("https://www.youtube.com/feed/subscriptions");
    //    }
    //    return;
    //}

//document.addEventListener('load', () => {
//    const btn = document.querySelector('.videoAdUiSkipButton,.ytp-ad-skip-button-modern')
//    if (btn) {
//        btn.click()
//    }
//    const ad = [...document.querySelectorAll('.ad-showing')][0];
//  if (ad) {
//        document.querySelector('video').currentTime = 9999999999;
//        const checker = setInterval(() => {
//            const btn = document.querySelector('.videoAdUiSkipButton, .ytp-ad-skip-button-modern');
//            if (btn) {
//                if (btn) btn.click();
//                clearInterval(checker);
//            }
//        }, 100);
//    }
//}, true);

//(function() {
//    'use strict';
//
//    // Function to hide Shorts and promoted content
//    function cleanYouTube() {
//        // Hide ALL Shorts shelves
//        document.querySelectorAll('ytd-reel-shelf-renderer').forEach(el => el.style.display = 'none');
//
//        // Hide Shorts thumbnails in recommendations / grid / feed / search
//        document.querySelectorAll(
//            'ytd-reel-item-renderer, ytd-rich-item-renderer[mini-mode], a[href*="/shorts/"], ytd-grid-video-renderer:has(a[href*="/shorts/"])'
//        ).forEach(el => el.style.display = 'none');
//
//        // Hide promoted/advertisement video tiles
//        document.querySelectorAll('ytd-promoted-sparkles-web-renderer, ytd-ad-slot-renderer, ytd-display-ad-renderer, ytd-compact-promoted-item-renderer')
//            .forEach(el => el.style.display = 'none');
//
//        // Hide normal-looking ads labeled as "Ad" or "Promoted"
//        document.querySelectorAll('ytd-video-renderer, ytd-grid-video-renderer, ytd-rich-item-renderer')
//            .forEach(el => {
//                const badge = el.querySelector('#ad-badge-text, .badge-style-type-ad, .ytd-ad-badge-renderer');
//                if (badge) el.style.display = 'none';
//            });
//    }
//
//    // Function to skip/fast-forward ads
//    function skipAds() {
//        const adVideo = document.querySelector('video.ad-showing');
//
//        if (!adVideo) return;
//
//        // Click skip button if it exists
//        const skipBtn = document.querySelector('.videoAdUiSkipButton, .ytp-ad-skip-button-modern');
//        if (skipBtn) skipBtn.click();
//
//        // Fast-forward ad if no skip button
//        if (!skipBtn) {
//            adVideo.currentTime = adVideo.duration;
//
//            // Keep checking in case skip button appears later
//            const checker = setInterval(() => {
//                const btn = document.querySelector('.videoAdUiSkipButton, .ytp-ad-skip-button-modern');
//                if (btn || adVideo.ended) {
//                    if (btn) btn.click();
//                    clearInterval(checker);
//                }
//            }, 100);
//        }
//    }
//
//    // Unified observer for all dynamic content
//    const observer = new MutationObserver(() => {
//        cleanYouTube();
//        skipAds();
//    });
//
//    observer.observe(document.body, { childList: true, subtree: true });
//
//    // Run once immediately for initial content
//    cleanYouTube();
//    skipAds();
//})();

     /*const skipBtn = document.querySelector('.videoAdUiSkipButton, .ytp-ad-skip-button-modern');
    // Click skip button if available
    if (skipBtn) skipBtn.click();
    // Optional: fast-forward attempt (may not always work)
    const ad = [...document.querySelectorAll('.ad-showing')][0];
    if (ad) document.querySelector('video').currentTime = 9999999999;*/
// ==UserScript==
// @name         YouTube Clean + Auto-Skip Ads
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Skip ads, hide Shorts, hide promoted videos on YouTube
// @match        https://www.youtube.com/*
// @run-at       document-start
// ==/UserScript==

    // Run repeatedly to handle dynamic content
    //setInterval(() => {

    //          // ====== Ad Skipping and Fast-Forward Correction ======
    //    const skipBtn = document.querySelector('.videoAdUiSkipButton, .ytp-ad-skip-button-modern');
    //    const adOverlay = document.querySelector('.ad-showing');
    //    const videoElement = document.querySelector('video');
    //    
    //    // 1. Click the Skip Button
    //    // This is the fastest and safest method. Do it if it exists.
    //    if (skipBtn) {
    //        skipBtn.click();
    //    }
    //    // 2. Fast-Forward Non-Skippable/Un-Skipped Ads
    //    else if (adOverlay && videoElement) {
    //        
    //        // Check if the video is currently playing an AD (e.g., short duration)
    //        // Or use a very high value and correct it immediately after.
    //        // The high value works well to force the end.
    //        videoElement.currentTime = 9999999999;
    //        
    //        // **IMMEDIATE CORRECTION:** After forcing the ad to end, 
    //        // the video will transition to the main content. The main video 
    //        // will now be at the end. We need to reset it.
    //        // A small delay helps ensure the player state has shifted.
    //        setTimeout(() => {
    //            // If the ad overlay is GONE, it means we successfully skipped.
    //            // Reset the video time to start or where it left off.
    //            // We'll reset to a safe early time (e.g., 1 second).
    //            if (!document.querySelector('.ad-showing')) {
    //                videoElement.currentTime = 1; 
    //                videoElement.play();
    //            }
    //        }, 50); // Small delay to let the YouTube player process the ad ending
    //    }
(function() {
    'use strict';


      let lastMainVideoTime = 0;
      let adIsShowing = false;
    // Run repeatedly to handle dynamic content
    setInterval(() => {

        // ====== Ad Skipping and Fast-Forward Correction ======
        const skipBtn = document.querySelector('.videoAdUiSkipButton, .ytp-ad-skip-button-modern');
        const adOverlay = document.querySelector('.ad-showing');
        const videoElement = document.querySelector('video');

        if (!adOverlay) {
              // Only update if the video is not paused or stopped, to keep the time current.
              if (!videoElement.paused) { 
                  lastMainVideoTime = videoElement.currentTime;
              }
              adIsShowing = false; // Reset the flag
          }

          // --- PHASE 1: Detection and Flagging (Simplified) ---
          // If an ad is showing AND we haven't flagged it yet, log the time we already stored.
          if (adOverlay && !adIsShowing) {
              adIsShowing = true; // Set the flag to true now
              // The lastMainVideoTime was set in the block above just before the ad took over.
              console.log(`Ad detected. Storing pre-ad time: ${lastMainVideoTime.toFixed(2)}s`);
          }

        // --- PHASE 2: Ad Skipping Logic ---

        // 1. Click the Skip Button (Handles both automatic and manual skip)
        // If a skip button is available, click it. 
        if (skipBtn) {
            // Note: If YOU click the skip button manually, this *setInterval* loop 
            // will detect it and click it too, which doesn't hurt. The next step 
            // will handle the time correction.
            skipBtn.click();
            console.log("Clicked the skip button.");
        }
        
        // 2. Fast-Forward Non-Skippable/Un-Skipped Ads
        else if (adOverlay && videoElement) {
            // Only force-skip if an ad is showing AND the auto-skip button isn't available.
            // This is the "nuclear" option for non-skippable or timed ads.
            videoElement.currentTime = 9999999999;
            console.log("Force-skipping ad via high currentTime.");
        }

        // --- PHASE 3: Correction After Ad Ends ---

        // The ad overlay is GONE, AND we know an ad was just showing (adIsShowing is now false)
        // Check if the current time is near the end of the video (a common side effect of the force skip)
        // We only correct if we had a stored time to go back to.
        const isNearEnd = videoElement.duration && videoElement.currentTime > (videoElement.duration - 5);

        if (!adOverlay && (lastMainVideoTime > 0) && isNearEnd) {
             
            // **CORRECTION:** We successfully skipped. Jump back to the stored time.
            // A small delay is still helpful to let the player fully transition back.
            setTimeout(() => {
                videoElement.currentTime = lastMainVideoTime;
                // Reset the stored time so we only jump back once per ad
                lastMainVideoTime = 0; 
                console.log(`Ad skipped. Resetting video time to ${videoElement.currentTime.toFixed(2)}s`);
                videoElement.play(); // Ensure playback resumes
            }, 50); // Small delay
        }

        // ====== Shorts Removal ======
        // Hide all Shorts shelves
        document.querySelectorAll('ytd-reel-shelf-renderer').forEach(el => el.style.display = 'none');

        // Hide Shorts thumbnails anywhere
        document.querySelectorAll(
            'ytd-reel-item-renderer, ytd-rich-item-renderer[mini-mode], a[href*="/shorts/"], ytd-grid-video-renderer:has(a[href*="/shorts/"])'
        ).forEach(el => el.style.display = 'none');

        // ====== Promoted Video Removal ======
        // Remove promoted tiles
        document.querySelectorAll('ytd-promoted-sparkles-web-renderer, ytd-ad-slot-renderer, ytd-display-ad-renderer, ytd-compact-promoted-item-renderer')
            .forEach(el => el.style.display = 'none');

        // Remove normal-looking ads with badge
        document.querySelectorAll('ytd-video-renderer, ytd-grid-video-renderer, ytd-rich-item-renderer')
            .forEach(el => {
                const badge = el.querySelector('#ad-badge-text, .badge-style-type-ad, .ytd-ad-badge-renderer');
                if (badge) el.style.display = 'none';
            });
    }, 100); 
})();


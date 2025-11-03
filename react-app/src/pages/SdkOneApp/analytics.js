
import analytics from '@viewlift/analytics/analytics-core/index.cjs'
import adobeAnalytics from '@viewlift/analytics/adobe-analytics-sdk/index.cjs.js'
import { analyticsConfig } from './config'

/**
 * Sends a tracking event to Adobe Analytics with the provided data layer and media configuration.
 */
export function trackAdobeEvent({ dataLayerPayload, mediaConfig }) {
  if (typeof window === 'undefined') return

  try {
    const { appMeasurementScript, mediaSdkScript, trackingServer, appMeasurementRSID, marketingCloudOrgId, playerName } = analyticsConfig || {}
    const isConfigAvailable = appMeasurementScript && mediaSdkScript && trackingServer && appMeasurementRSID && marketingCloudOrgId;
    if (!isConfigAvailable) {
      console.error("[Adobe Analytics] Missing analytics configuration");
      return;
    }

    return analytics({
      app: 'adobe-analytics',
      plugins: [
        adobeAnalytics({
          appMeasurementUrl: appMeasurementScript,
          mediaSdkUrl: mediaSdkScript,
          trackingServer,
          appMeasurementRSID,
          marketingCloudOrgId,
          playerName,
          dataLayerPayload,
          mediaConfig
        }),
      ]
    });
  } catch (error) {
    console.error("[Adobe Analytics] Event tracking failed:", error);
  }
}


/**
 * Tracks Adobe media event by sending the player instance and video data.
 */
export const trackAdobeMediaEvent = (e, playerInstance) => {
  const payload = {
    mediaConfig: {
      instance: playerInstance,
      playerData: e?.response?.video,
    },
    dataLayerPayload: null,
  }
  trackAdobeEvent(payload)
}

/**
 * Sends a tracking event to Adobe Analytics with the specified event name and configuration.
 */
export const trackAdobeAnalyticsEvent = (eventName, eventConfig) => {
  const payload = {
    dataLayerPayload: { eventName, eventConfig },
    mediaConfig: null,
  }
  trackAdobeEvent(payload)
}

/**
 * Defines all supported Adobe Analytics event types with their respective trigger points in the app flow.
 */
export const EVENT_TYPES = {
  ADOBE_PASS_AUTHORIZE_SUCCESS: "Adobe Pass:Authorize:Success",  // After a successful authorization check on a video asset.
  ADOBE_PASS_AUTHORIZE_FAIL: "Adobe Pass:Authorize:Fail",        // After a failed authorization check, capturing error codes.
  SHOWS: "SHOWS",                                                // On navigating to the shows page.
  SERIES: "SERIES",                                              // On navigating to the series page.
  SERIES_VIDEO_DETAILS: "SERIES:VIDEO DETAILS",                  // On navigating to the video details page within a series.
  VIDEO_PLAYER: "VIDEO PLAYER",                                  // On player initialization or playback start.
  SEARCH: "SEARCH",                                              // On search input submission.
  SEARCH_RESULTS: "SEARCH:SEARCH RESULTS"                        // On search results page load.
};

/**
 * Defines all supported Adobe Analytics event names with their respective trigger points in the app flow.
 */
export const EVENT_NAMES = {
  PAGE_LOAD: "Page Load",                                         // On initial page load of the app or a specific page.
  PROVIDER_SIGN_IN: "Provider Sign-In",                           // When the user initiates MVPD sign-in flow.
  ADOBE_PASS_AUTHENTICATE_SUCCESS: "Adobe Pass:Authenticate:Success", // After a successful authentication via Adobe Pass.
  ADOBE_PASS_AUTHENTICATE_FAIL: "Adobe Pass:Authenticate:Fail",   // After a failed authentication attempt via Adobe Pass.
  OPEN_MVPD_SELECTOR: "Open MVPD Selector",                       // When the MVPD provider selection modal is opened.
  ADOBE_PASS_AUTHORIZE_SUCCESS: "Adobe Pass:Authorize:Success",   // After a successful authorization check on a video asset.
  ADOBE_PASS_AUTHORIZE_FAIL: "Adobe Pass:Authorize:Fail",         // After a failed authorization check, capturing error codes.
  ADOBE_PASS_AUTHENTICATE_DEACTIVATE: "Adobe Pass:Authenticate:Deactivate", // When an authenticated user is logged out or deactivated.
};



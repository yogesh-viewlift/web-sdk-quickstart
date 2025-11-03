import { getMacros } from "./helper";

export const apiConfig = {
  xApikey: "BkSBbok02k6RYUlCLRzI23wac0euoSfC3FP7uW2S",
  apiBaseUrl: "https://spinco.staging.api.viewlift.com",
  domain: "spinco.staging.web.viewlift.com",
  siteName: "spinco",
}

/**
 * Player config for initializing the video player.
 * Fetches token and macros dynamically.
 */
export const playerConfig = {
  videoId: "60d60fe3-69f1-45ab-a707-deda8c337297",   // The Avengers
  playerId: "my-player",
  apiBaseUrl: `https://spinco.staging.api.viewlift.com/v3`,
  skin: "VL_ONE",
  mute: true,
  autoplay: true,
  customData: {
    macros: getMacros(),
  }
};

/**
 * TVE Auth Config.
 * 
 * Adds 'debugConfig' only on localhost to handle redirect using whitelisted domains, ssince localhost is not part of the allowed whitelist.
 */
export const tveAuthConfig = {
  // apiConfig,
  apiConfig: {
    xApikey: "WX41iaJiOw7hJW8sNbDP5JpVwmjaH6t6y3xbQUsc",
    apiBaseUrl: "https://usanetwork.api.viewlift.com",
    domain: "www.usanetwork.com",
    siteName: "usanetwork",
  },
  mediaInfo: {
    // displayMedia: true,
    // tveBannerUrl: "https://spinco.staging.asset.viewlift.com/images/2025/05/26/placeholder3x4-1748260656583.png?impolicy=resize&w=1920&h=1080",
    // tveBannerAltDescription: "Provider logo",
    // navigationOptions: {
    //   showBackIcon: true, 
    //   showCloseIcon: false,
    // },
  },
  authSetting: {
    isTveAuth: true,
    // isActivateTveDevice: true,
    tveSuccessRedirectCb: () => {
      console.log("Auth Successful")
      window.location.reload();
    },  // Optional
    tveAuthTokenCb: (token) => console.log("token callback: ", token), // Optional
  },
  styleInfo: {
    loginCtaBgColor: "#9f9a9a",
    loginCtaTextColor: "#0f0d0d",
    loginCtaBorderRadius: "4px",
  },
  debugConfig: {
    tveRedirectUrl: "www.spinco.staging.web.viewlift.com",   // provide any whitlisted domain
    tveClientDomain: "spinco.staging.web.viewlift.com",
  },
};

/**
 * Analytics Config
 */
export const analyticsConfig = {
  appMeasurementScript: 'https://assets.adobedtm.com/77ca722dd820/ae6395085722/launch-00a734d6c003-development.min.js', 
  appMeasurementRSID: 'fanspincosandbox',
  mediaSdkScript: 'https://appcms.staging.asset.viewlift.com/MediaSDK.js',  
  trackingServer: 'fandango.hb-api.omtrdc.net',
  marketingCloudOrgId: '8CF467C25245AE3F0A490D4C@AdobeOrg',
  playerName: 'VL Web Player',
}

// Next video ID to be played (used in the demo app for switching videos)
export const nextVideoId = "1269deb1-8f41-4ade-8af0-800e69728e2d"
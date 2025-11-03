import { macroMap } from './macro';

/**
 * Retrieves macros from the macro map based on requested keys.
 * If no keys are provided, returns an empty object.
 * Only keys present in the macro map will be included in the result.
 *
 * @param {string[]} requestedKeys - Array of macro keys to fetch.
 * @returns {Object} - An object containing the requested macros (empty if none found).
 *
 * @example
 * const selectedMacros = getMacros(['VIEWLIFT_WIDTH', 'VIEWLIFT_USER', 'VIEWLIFT_DEVICE_CATEGORY']);
 */
export const getMacros = (requestedKeys = []) => {
  const filteredMacros = {}
  if (Array.isArray(requestedKeys) && requestedKeys.length > 0) {
    requestedKeys.forEach((key) => {
      if (macroMap.hasOwnProperty(key)) {
        filteredMacros[key] = macroMap[key]
      }
    })
  }
  return filteredMacros
}


/**
 * Maps subscription-related error codes to user-friendly messages
 * shown when access to content is restricted due to authorization or plan issues.
 */
export const subscriptionErrorMessages = {
  FORBIDDEN: "You do not have permission to access this content.",
  CANT_ACCESS_TVE_CONTENT: "This content requires authentication with your TV provider.",
  SVOD_CONTENT_NOT_INCLUDED_WITH_SUBSCRIPTION: "Your current subscription does not include this content.",
  SVOD_SUBSCRIPTION_NOT_FOUND: "No active subscription found. Please subscribe to access this content.",
  SVOD_TVE_SUBSCRIPTION_NOT_FOUND: "An active TV provider subscription is required to view this content.",
  TVE_SUBSCRIPTION_NOT_FOUND: "To view this content, please authenticate with your TV provider.",
  TVOD_NO_CONTENT_ACCESS: "This video is not available under your current plan."
};

/**
   *  Appends a new <video> element inside the specified container if it doesn't already exist
   */
export function appendNewVideoElement(playerId, videoContainerId) {
  const videoContainer = document.getElementById(videoContainerId)
  if (videoContainer) {
    const existingVideo = document.getElementById(playerId)
    if (!existingVideo) {
      const videoTag = document.createElement("video")
      videoTag.classList.add("video-js")
      videoTag.id = playerId
      videoTag.style.width = "100%"
      videoTag.style.height = "100%"
      videoContainer.appendChild(videoTag)
      console.log("New video element appended")
    } else {
      console.log("Video element already exists")
    }
  } else {
    console.warn("Video container not found")
  }
}

/**
* Mock page data object used for development and testing purposes.
* 
* This is a placeholder for the actual `pageData` object that should be 
* provided as per the app's data flow (e.g., from props, API response, 
* global store, or CMS).
*/
export const mockPageData = {
  siteInternalName: "USA network",   // Site name for tracking (app)
  title: 'Video Title',              // Content title (title)
  contentType: '',                   // Logical content group (contenthub)
  mvpdProvider: '',                  // User’s MVPD provider (network)
  tveUserId: '',                     // Unique Adobe Pass user identifier (passguid)
  requestorID: '',                   // Adobe Pass requestorID (passnetwork)
  authZError: '',                    // Authorization error details if any
  referer: '',                       // Referrer URL of the page
  videoData: '',                     // Video metadata (id, length, type, etc.)
  entitlementStatus: '',             // Authorization status (passauthorize/videostatus)
  seasonNumber: '',                  // Season number (season)
  episodeNumber: '',                 // Episode number (epnumber)
  endCardType: '',                   // End card type shown after video
  currentVideoTime: '',              // Current playback time in seconds
}

import React, { useEffect, useState } from "react"
import VLPlayerCore from "@viewlift/player/esm/index"
import "@viewlift/web-authentication/dist/assets/style.css"
import "@viewlift/player/esm/bundle.css"
import VLAuthentication from "@viewlift/web-authentication"
import { disposeSession, triggerSessionComplete } from '@viewlift/analytics/adobe-analytics-sdk/index.cjs.js'
import { playerConfig, tveAuthConfig, analyticsConfig, apiConfig, nextVideoId } from "./config"
import { subscriptionErrorMessages, appendNewVideoElement, mockPageData } from "./helper"
import { trackAdobeMediaEvent, trackAdobeAnalyticsEvent, EVENT_NAMES, EVENT_TYPES } from "./analytics"
import "./style.scss"

const VlPlayer = () => {
  const [showTveAuthButton, setShowTveAuthButton] = useState(true) // Show TVE Auth Button only if the user is NOT logged in via TVE
  const [hardwallError, setHardwallError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loginStatus, setLoginStatus] = useState({})
  const [error, setError] = useState(null)
  const playerId = playerConfig?.playerId || "vl-player"
  const videoContainerId = playerConfig?.videoContainerId || "vl-video-container"


  const { StandaloneAuthentication, getAuthToken, getTveAuthStatus, authorizeTvePlayback  } = VLAuthentication()

  const getToken = async () => {
    try {
      const token = await getAuthToken({ apiConfig })
      console.log("token:", token)
      return token
    } catch (err) {
      console.error("Error fetching token:", err)
    }



  }

  const getLoginStatus = async () => {
    try {
      const authStatus = await getTveAuthStatus({ apiConfig })
      console.log("authStatus:", authStatus)
      setLoginStatus(authStatus)
      
    } catch (err) {
      console.error("Error fetching TVE auth status:", err)
    }
  }

  /**
   *  Disposes the existing player instance if it's already initialized
   */
  function disposePlayer() {
    const isPlayerInitialised = VLPlayerCore()?.isPlayerInitialised(playerId)
    if (isPlayerInitialised) {
      VLPlayerCore()?.dispose(playerId)
    }
  }

  /**
   *   Handles TVE authorization flow: pauses playback, authorizes, resumes or handles failure
   */
  const handleTveAuthorization = (e) => {
    setIsLoading(true)
    let playerInstance = null
    // Handle player playback as validating authorization
    const isPlayerInitialised = VLPlayerCore()?.isPlayerInitialised(playerId)
    if (isPlayerInitialised) {
      playerInstance = VLPlayerCore()?.getPlayer(playerId)
      if (playerInstance) playerInstance.pause()
    }
    const config = {
      apiConfig: apiConfig,
      param: {
        plans: e?.response?.plans || [],
      },
    }
    console.log("plans",e?.response?.plans)
    // debugger
    // Initiate Authorization
    authorizeTvePlayback(config)
      .then((res) => {
        console.log("res: ====== ", res)
        console.log("Authorization successful for playback.")
        setHardwallError(null)
        console.log("hello 1")
      })
      .catch((err) => {
        console.log("hello 2")
        console.error("TVE Authorization failed:", err)
        disposePlayer()
        appendNewVideoElement(playerId, videoContainerId) // Re-add video element after dispose
        setHardwallError(err || "TVE Authorization Failed")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  /**
   * Handles TVE hardwall errors by mapping known error codes to user-friendly messages
   * and optionally displaying an authorization button.
   */
  const handleTveHardwallError = (e) => {
    const errData = e?.response?.response?.data || {}
    const errCode = errData?.errorCode
    let errorMsg = e?.msg || errData?.errorMessage || "An error occurred while initializing the player."
    let showAuthButton = false

    if (errCode in subscriptionErrorMessages) {
      errorMsg = subscriptionErrorMessages[errCode]
      showAuthButton = true // Show button for subscription-related errors
    } else if (errCode === "VIDEO_NOT_EXISTS") {
      errorMsg = "Sorry, the video you’re looking for is unavailable."
    }
    setShowTveAuthButton(showAuthButton)
    setHardwallError(errorMsg)
  }

  /**
   * Initializes the video player with the provided configuration.
   * If the user is logged in via TVE, it triggers authorization handling;
   * otherwise, handles errors based on entitlement or video availability.
   */
  const initiateVideoPlayer = async () => {
    setError(null)
    setIsLoading(true)
    // const { isTveLoggedIn } = getTokenInfo()
    const { isTveLoggedIn } = false
    const token = await getToken()
    const updatedPlayerConfig = {
      ...playerConfig,
      token
    }
    VLPlayerCore()
      .init(updatedPlayerConfig)
      .then(async (e) => {
        const playerInstance = VLPlayerCore().getPlayer(playerId)
        trackAdobeMediaEvent(e, playerInstance)
        trackVideoPlayerEvent(e)
        isTveLoggedIn && handleTveAuthorization(e)
      })
      .catch(async (e) => (isTveLoggedIn ? handleTveAuthorization(e) : handleTveHardwallError(e)))
      .finally(() => setIsLoading(false))
  }
  const loadVideoPlayer = () => {
    // const { isTveLoggedIn } = getTokenInfo()
    const { isTveLoggedIn } = false
    VLPlayerCore().load(playerId, nextVideoId, getToken())
    .then(async (e) => {
        // Analytics Session Complete
        // Simulate Session Complete - Note : In real scenario, sessionComplete should be automatically triggered on actual video completion. 
        // but for scenerio like Linear channel purpose we are triggering it manually.
        triggerSessionComplete()

        const playerInstance = VLPlayerCore().getPlayer(playerId)
        trackAdobeMediaEvent(e, playerInstance)
        trackVideoPlayerEvent(e)
        isTveLoggedIn && handleTveAuthorization(e)
      })
      .catch(async (e) => (isTveLoggedIn ? handleTveAuthorization(e) : handleTveHardwallError(e)))
      .finally(() => setIsLoading(false))
  }

  const intializeNewPlayerInstance = () => {
    console.log("Intializing new player instance")
    // Analytics Session End
    //Dispose previous Analytics Session - Note : Trigger when user switches to the new player instance.
    disposeSession();

    disposePlayer()
    appendNewVideoElement(playerId, videoContainerId) // Re-add video element after dispose
    playerConfig.videoId = nextVideoId
    initiateVideoPlayer()
  }

  /**
   * Tracks a video player event in Adobe Analytics for the app.
   */
  const trackVideoPlayerEvent = (res) => {
    const videoContent = res?.response?.video
    const videoData = {
      title: videoContent?.gist?.title || "",
      videoData: {
        contentType: videoContent?.gist?.contentType || "",
        airDate: videoContent?.publishDate || "",
        videoLength: videoContent?.runtime || "",
      },
    }
    trackAdobeAnalyticsEvent(EVENT_NAMES?.PAGE_LOAD, { type: EVENT_TYPES.VIDEO_PLAYER, videoData })
  }

  /**
   * Tracks a "Page Load" event in Adobe Analytics when an app page loads.
   */
  const trackPageLoadEvent = () => {
    const data = mockPageData // Sample: replace mockPageData with actual page data from props or API as per your app’s data flow.
    const pageData = {
      siteInternalName: data?.siteInternalName,
      title: data?.title,
      videoData: {
        videoId: data?.id || playerConfig?.videoId,
        contentType: data?.contentType,
      },
    }
    trackAdobeAnalyticsEvent(EVENT_NAMES?.PAGE_LOAD, { type: EVENT_TYPES.SHOWS, ...pageData })
  }

  useEffect(() => {
    trackPageLoadEvent()
    initiateVideoPlayer()
    getLoginStatus()
    return () => {
      disposePlayer()
    }
  }, [])

  return (
    <div className="vl-player-container">

      {isLoading && (
        <div className="vl-player-spinner-container">
          <div className="vl-player-spinner"></div>
        </div>
      )}
      {error && <div className="vl-player-error-message">Error: {error || "Something went wrong. Please try again."}</div>}

      <div className="vl-player-content">
        {/* video player */}
        {!hardwallError && (
          <div id={videoContainerId}>
            <video id={playerId} className="video-js" style={{ width: "100%", height: "100%" }}></video>
          </div>
        )}
        {/* Security Wall */}
        {hardwallError && (
          <div className="vl-player-security-wall">
            <div className="vl-player-security-wall-message">
              <p className="msg">{hardwallError || "To view this content, please authenticate with your TV provider."}</p>

              {showTveAuthButton && (
                <div className="vl-player-tve-button">
                  <StandaloneAuthentication config={tveAuthConfig} />
                </div>
              )}
            </div>
          </div>
        )}

        <div className="vl-player-tve-button">
          <StandaloneAuthentication config={tveAuthConfig} />
        </div>

      </div>

      { analyticsConfig?.isAdobeAnalyticsEnabled ? 
        <div
          className="vl-player-analytics-buttons"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
            marginTop: "20px",
          }}
        >
          <p className="vl-player-note">
            <strong>Note:</strong> These buttons are provided for testing Adobe Analytics
            helper functions. For detailed setup, please refer to the{" "}
            <a
              href="https://developer.viewlift.com/docs/new-analytics-implementation#/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
            .
          </p>

          <div className="vl-player-analytics-button-group">
            <label>Simulate Session Completion</label>
            <button className="vl-player-load-button" onClick={loadVideoPlayer}>
              Switch Asset
            </button>
          </div>

          <div className="vl-player-analytics-button-group">
            <label>Simulate Session End</label>
            <button className="vl-player-load-button" onClick={intializeNewPlayerInstance}>
              Switch Player Instance
            </button>
          </div>
        </div> : null
      }

      {/* Login details (for testing purpose) */}
      <div className="tve-login-status">
        <div>
          {<p>Login Status: {loginStatus?.isLoggedIn ? "Yes" : "No"} </p>}
          {loginStatus?.site && <p>Site: {loginStatus?.site} </p>}
          {loginStatus?.tveMetadata?.mvpdProvider && <p>Mvpd Provider: {loginStatus?.tveMetadata?.mvpdProvider} </p>}
          {loginStatus?.user?.name && <p>User Name: {loginStatus?.user?.name} </p>}
          {loginStatus?.user?.id && <p>User Id: {loginStatus?.user?.id} </p>}
        </div>
        {/* <button onClick={getLoginStatus}>Get Latest Status</button> */}
      </div>

      
    </div>
  )
}

export default VlPlayer

import React from 'react'
import VLAuthentication from "@viewlift/web-authentication"

/**
 * TVE Auth Config.
 */
export const tveAuthConfig2 = {
  apiConfig: {
    xApikey: "BkSBbok02k6RYUlCLRzI23wac0euoSfC3FP7uW2S",
    apiBaseUrl: "https://spinco.staging.api.viewlift.com",
    domain: "spinco.staging.web.viewlift.com",
    siteName: "spinco",
  },
  debugConfig: {
    tveRedirectUrl: "https://spinco.staging.web.viewlift.com/",
    tveClientDomain: "spinco.staging.web.viewlift.com",
  },
  authSetting: {
    isTveAuth: true,
    // isActivateTveDevice: true,
    openProviderInNewTab: true,
    tveSuccessRedirectCb: () => {
      console.log("TVE Auth Success Redirect Callback Triggered");
      window.location.reload();
    }
  },
  mediaInfo: {
    displayMedia: false,
    // tveBannerUrl: '',
    // tveBannerAltDescription: "Provider logo", 
    // tveBannerUrl: "https://spinco.staging.asset.viewlift.com/images/2025/05/26/placeholder3x4-1748260656583.png?impolicy=resize&w=1920&h=1080", 
    navigationOptions: {
      showBackIcon: true, 
      onBackCallback: null,
      showCloseIcon: false,
      onCloseCallback: null,
    },
  },
  styleInfo: {
    loginCtaBorderRadius: "4px",
    loginCtaBorderColor: "#000000",
    loginCtaVerticalMargin: "10px",
    loginCtaHorizontalMargin: "10px",

    moduleBackgroundColor: "#2b2b2b",
    moduleTextColor: "#ffffff",
  },
};


const index = () => {
  const { StandaloneAuthentication } = VLAuthentication()

  return (
    <div>
      <StandaloneAuthentication config={tveAuthConfig2}/>
      {/* <ActivateTveDevice config={tveActivateDeviceConfig}/> */}
    </div>
  )
}

export default index
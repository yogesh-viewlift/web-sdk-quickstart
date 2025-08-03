import Cookies from 'js-cookie';
// import { setToken } from "../../helpers";

const playerConfig = {
  videoId: "0a348aee-d35f-4fa4-a24d-2cd37d09db18",
  playerId: "my-player",
  apiBaseUrl: window?.app_data?.site?.host || "https://spinco.staging.api.viewlift.com/v3",
  token: Cookies.get('token') || '',
  skin: "VL_ONE",
  mute: true,
  autoplay: true,
  // tvProviderLogoUrl: "tvProviderLogoUrl",
};

export const getPlayerConfig = (videoId) => {
  const urlParams = new URLSearchParams(window.location.search);
  const paramVideoId = urlParams.get('videoID');
  const finalVideoId = paramVideoId || videoId;
  
  if (!finalVideoId) return playerConfig;

  return {
    ...playerConfig,
    videoId: finalVideoId
  }
}

export const tveAuthConfig = {
  apiConfig: {
    xApikey: window?.xApiKey,
    siteName: window?.app_data?.site?.siteInternalName,
    domain: window?.app_data?.site?.host || "spinco.staging.web.viewlift.com",
    apiBaseUrl: window?.app_data?.appcmsMain?.apiConfig?.apiBaseUrl,
  },
  mediaInfo: {
    tveBannerUrl: "https://spinco.staging.asset.viewlift.com/images/2025/05/26/placeholder3x4-1748260656583.png?impolicy=resize&w=1920&h=1080",
    tveBannerAltDescription: "Provider logo",
  },
  authSetting: {
    isTveAuth: true,
    isTveOnly: window?.app_data?.appcmsMain?.monetizationConfig?.tveLoginOnly || true,
    tveSuccessRedirectCb: (tokenData) => {
      setToken(tokenData)
    }
  },
  styleInfo: {
    loginCtaBgColor: "#1c1c1c",
    loginCtaTextColor: "#ffffff",
    loginCtaBgColor: "#cac3c3",
    loginCtaTextColor: "#0f0d0d",
    loginCtaWidth: "100%",
    loginCtaBorderRadius: "4px",
  },
  debugConfig: {
    tveRedirectUrl: "https://spinco.staging.web.viewlift.com/tve-login",
    tveRedirectAuthQueryParam: "sessionAuthStatus",
    tveClientDomain: "spinco.staging.web.viewlift.com",
  },
}

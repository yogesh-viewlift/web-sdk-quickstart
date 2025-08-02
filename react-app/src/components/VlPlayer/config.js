import Cookies from 'js-cookie';
// import { setToken } from "../../helpers";

export const playerConfig = {
  videoId: "2aad1269-e37e-4d7b-98d8-f9c4b4dc0958",
  playerId: "my-player",
  apiBaseUrl: window?.app_data?.site?.host || "spinco.staging.web.viewlift.com",
  token: Cookies.get('token') || '',
  skin: "VL_ONE",
  mute: true,
  autoplay: true,
  // tvProviderLogoUrl: "tvProviderLogoUrl",
};

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
    loginCtaWidth: "100%",
    loginCtaBorderRadius: "4px",
  }
}

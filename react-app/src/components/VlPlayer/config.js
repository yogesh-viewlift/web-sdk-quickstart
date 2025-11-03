import Cookies from 'js-cookie';
// import { setToken } from "../../helpers";

if (process.env.NODE_ENV !== 'production') {
  if (!process.env.REACT_APP_X_API_KEY) console.warn('REACT_APP_X_API_KEY is not set');
  if (!process.env.REACT_APP_SITE_NAME) console.warn('REACT_APP_SITE_NAME is not set');
  if (!process.env.REACT_APP_API_BASE_URL) console.warn('REACT_APP_API_BASE_URL is not set');
}

const playerConfig = {
  videoId: "",
  playerId: "my-player",
  apiBaseUrl: (typeof process !== 'undefined' && process.env.REACT_APP_API_BASE_URL) || "",
  token: Cookies.get('token') || '',
  skin: "VL_ONE",
  mute: true,
  autoplay: true,
  // tvProviderLogoUrl: "tvProviderLogoUrl",
  // SPINCO
  apiBaseUrl: "https://spinco.staging.api.viewlift.com/v3",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbm9ueW1vdXNJZCI6IjUxMTAxYzY2Mzk3NmY3Mjc4NWNhMDQxODU2YzMyZWJkNDU4MjZlNTJiMDkyZDUzNTQ4YjcyNDM5NDIxMjRmNzIiLCJjb3VudHJ5Q29kZSI6IklOIiwiZGV2aWNlSWQiOiJicm93c2VyLWFhOTQwNDI5LWJiZGUtNjIwMC0xNGE5LWVjY2VmMDUxZWY3NSIsImV4cCI6MTc4MzUxMDYyMSwiaWF0IjoxNzUxOTc0NjIxLCJpZCI6IjUxYTk1NWE1LTA0NzktNGVlZC04NDQ3LWM1NTU5M2VkYjc5ZSIsImlwYWRkcmVzcyI6IjIwMy4xMzIuMTMzLjEyNiIsImlwYWRkcmVzc2VzIjoiMjAzLjEzMi4xMzMuMTI2LDEwLjE2MC4wLjEwNCIsInBvc3RhbGNvZGUiOiIzMDEwMDEiLCJwcm92aWRlciI6InZpZXdsaWZ0Iiwic2l0ZSI6InNwaW5jbyIsInNpdGVJZCI6ImNlYTM5OGI5LTA5YWItNDMzMS05NThmLThjM2Q2YTM1NmI4OCIsInVzZXJJZCI6IjUxYTk1NWE1LTA0NzktNGVlZC04NDQ3LWM1NTU5M2VkYjc5ZSIsInVzZXJuYW1lIjoiYW5vbnltb3VzIn0.HqKGeHGOf6gU6DBZbUvI8ckR8fh5JozdwxkJW5u4W_M",
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
    xApikey: (typeof process !== 'undefined' && process.env.REACT_APP_X_API_KEY) || "",
    siteName: (typeof process !== 'undefined' && process.env.REACT_APP_SITE_NAME) || "",
    domain: (typeof process !== 'undefined' && process.env.REACT_APP_DOMAIN) || "",
    apiBaseUrl: (typeof process !== 'undefined' && process.env.REACT_APP_API_BASE_URL) || "",
    xApikey: "BkSBbok02k6RYUlCLRzI23wac0euoSfC3FP7uW2S",
    siteName: "spinco",
    domain: "spinco.staging.web.viewlift.com",
    apiBaseUrl: "https://spinco.staging.api.viewlift.com",
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

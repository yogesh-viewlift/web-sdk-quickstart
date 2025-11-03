export const getMacrosFromMetadata = () => {
  let macrosObj = {};
  let macroMap = new Map();
  metadata?.length > 0 && metadata?.map((ele) => {
    macroMap.set(ele.name, ele.value);
  })
  macrosObj['VIEWLIFT_PROF'] = macroMap.get('prof.web') || ''
  macrosObj['VIEWLIFT_CSID'] = macroMap.get('csid.web.dtc') || ''
  macrosObj['VIEWLIFT_CAID'] = macroMap.get('caid.web') || 'mystics2024'
  macrosObj['VIEWLIFT_SLAU'] = macroMap.get('slau.web')
  if (isMobile()) {
    macrosObj = { ...macrosObj, VIEWLIFT_CSID: macroMap.get('csid.mweb.dtc') || '' };
  }
  return macrosObj
}


export const getCustomMacros = async () => {
  let macros = {}
  let md5 = require('md5')
  const fwTveProvider = await getFwTveProvider()
  const store = await fetchUserDetails();
  const token = await getToken()
  let monetizationModels = []
  let monetizationPlans = []
  let monetisationFrequnecy = ''
  if (store?.user?.isSubscribed) {
    monetizationModels.push('SVOD')
    monetisationFrequnecy = store?.user?.subscription?.subscriptionPlanInfo?.renewalCycleType?.toLowerCase()
    if (store?.user?.isVip) {
      monetizationPlans.push('VIP Plan')
    } else {
      monetizationPlans.push(store?.user?.subscription?.subscriptionInfo?.planId)
    }
  }
  if (store?.user?.tveMetadata?.tveProvider || store?.user?.tveProvider) {
    monetizationModels.push('TVE')
    if (store?.user?.isVip) {
      monetizationPlans.push('VIP Plan')
    } else {
      monetizationPlans.push(store?.user?.tveSubscriptions?.[0]?.planId || store?.user?.subscription?.tveSubscriptions?.[0]?.planId)
    }
  }
  const isMonetizationModels = (monetizationModels && monetizationModels.length > 0) ? true : false
  const isMonetizationPlans = (monetizationPlans && monetizationPlans.length > 0) ? true : false

  const us_priv_cookie_val = Cookies.get("us_privacy") || Cookies.get("usprivacy");
  const US_PRIVACY_VAL = us_priv_cookie_val !== undefined ? us_priv_cookie_val : '1YNN';
  const userCountry = jwtDecode(token)?.countryCode || store?.user?.country
  const userState = store?.user?.city || ''

  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isMobileDevice = /android|iphone|ipad|ipod|windows phone/i.test(userAgent.toLowerCase());

  macros = {
    ...(isMonetizationModels && { 'VIEWLIFT_MONETIZATION_MODEL': monetizationModels?.toString() }),
    ...(isMonetizationPlans && { 'VIEWLIFT_MONETIZATION_PLAN': monetizationPlans?.toString() }),
    VIEWLIFT_US_PRIVACY: US_PRIVACY_VAL,
    'VIEWLIFT_MODEL_FREQUENCY': monetisationFrequnecy,
    'VIEWLIFT_DEVICE_CONECTION': navigator?.connection?.effectiveType,
    'VIEWLIFT_USER_COUNTRY': userCountry,
    'VIEWLIFT_USER_STATE': userState,
    'VIEWLIFT_DEVICE_CATEGORY': isMobileDevice ? 'mobile' : 'desktop',
    'VIEWLIFT_TVE_PROVIDER': fwTveProvider ? md5(fwTveProvider) : 'none'
  }
  return macros
}

export const getMacrosFromMetaData = async (metadata) => {
  let retObj = {};
  const store = getStorageItem('AuthenticationStore');
  let macroMap = new Map();
  metadata?.length && metadata.map((ele) => {
    macroMap.set(ele.name, ele.value);
  })

  let SVOD = (store && store?.user?.isSubscribed && !store?.user?.tveUserId) || false;
  let TVE = (store && !store?.user?.isSubscribed && (store?.user?.tveProvider || store?.user?.tveMetadata?.tveProvider)) || false;

  // CSID
  if (isMobile) {
    if (SVOD)
      retObj = { ...retObj, VIEWLIFT_CSID: macroMap.get('csid.mweb.dtc') || '' };

    else if (TVE)
      retObj = { ...retObj, VIEWLIFT_CSID: macroMap.get('csid.mweb.tve') || '' };
  }
  else {
    if (SVOD)
      retObj = { ...retObj, VIEWLIFT_CSID: macroMap.get('csid.web.dtc') || '' };

    else if (TVE)
      retObj = { ...retObj, VIEWLIFT_CSID: macroMap.get('csid.web.tve') || '' };
  }

  // SFID
  if (SVOD)
    retObj = { ...retObj, VIEWLIFT_SFID: macroMap.get('sfid.dtc') || '' };

  else if (TVE)
    retObj = { ...retObj, VIEWLIFT_SFID: macroMap.get('sfid.tve') || '' };

  // PROF
  if (isMobile)
    retObj = { ...retObj, VIEWLIFT_PROF: macroMap.get('prof.mweb') || '' };
  else
    retObj = { ...retObj, VIEWLIFT_PROF: macroMap.get('prof.web') || '' };

  return retObj;
}
export default function uipathConfig() {
  const ENV = process.env;
  const {
    REACT_APP_UP_CLIENT_ID: clientId,
    REACT_APP_UP_USER_KEY: userKey,
    REACT_APP_UP_TENANT_NAME: tenantName,
  } = ENV;

  async function getToken() {
    // 인증 api는 https://account.uipath.com
    // 나머지는 https://cloud.uipath.com
    // access_token은 localStorage에 저장.
    // access_token의 만료기간 고려하여 로컬스토리지 만료 값 설정 필요.

    const response = await fetch('/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-UIPATH-TenantName': tenantName,
      },
      body: JSON.stringify({
        grant_type: 'refresh_token',
        client_id: clientId,
        refresh_token: userKey,
      }),
    });

    const result = await response.json();
    const { access_token: accessToken } = result;
    window.localStorage.setItem('access_token', accessToken);
  }

  async function getLicense() {
    const response = await fetch('/odata/Settings/UiPath.Server.Configuration.OData.GetLicense', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
        'X-UIPATH-TenantName': tenantName,
      },
    });

    const result = await response.json();
    console.log(result);
  }

  async function getProcesses() {
    const response = await fetch('/odata/Processes', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
        'X-UIPATH-TenantName': tenantName,
      },
    });

    const result = await response.json();
    console.log(result);
  }

  async function doConfig() {
    await getToken();
    await getLicense();
    await getProcesses();
  }

  doConfig();
}

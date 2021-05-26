
// /* eslint-disable max-len */
// export default async function uipathConfig() {
//   const ENV = process.env;
//   const {
//     REACT_APP_UP_CLIENT_ID: clientId,
//     REACT_APP_UP_USER_KEY: userKey,
//     REACT_APP_UP_TENANT_NAME: tenantName,
//   } = ENV;
//   async function getToken() {
//     // 인증 api는 https://account.uipath.com
//     // 나머지는 https://cloud.uipath.com
//     const response = await fetch('/oauth/token', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-UIPATH-TenantName': tenantName,
//       },
//       body: JSON.stringify({
//         grant_type: 'refresh_token',
//         client_id: clientId,
//         refresh_token: userKey,
//       }),
//     });

//     const result = await response.json();
//     const { access_token: accessToken } = result;
//     window.localStorage.setItem('access_token', accessToken);
//   }

//   async function getLicense() {
//     const response = await fetch('/odata/Settings/UiPath.Server.Configuration.OData.GetLicense', {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
//         'X-UIPATH-TenantName': tenantName,
//       },
//     });

//     const result = await response.json();
//     console.log('license:', result);
//   }

//   async function getProcesses() {
//     const response = await fetch('/odata/Processes', {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
//         'X-UIPATH-TenantName': tenantName,
//       },
//     });

//     const result = await response.json();
//     console.log('processes:', result);
//   }

//   async function getReleases() {
//     const response = await fetch('/odata/Releases', {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
//         'X-UIPATH-TenantName': tenantName,
//       },
//     });

//     const result = await response.json();
//     console.log('Releases:', result);
//   }

//   async function getRobots() {
//     const response = await fetch('/odata/Sessions/UiPath.Server.Configuration.OData.GetGlobalSessions?$expand=Robot($expand=License)', {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
//         'X-UIPATH-TenantName': tenantName,
//         'X-UIPATH-ORGANIZATIONUNITID': 1401270,
//       },
//     });

//     const result = await response.json();
//     console.log('Robots:', result);
//   }

  // async function startJobs() {
  //   const response = await fetch('/odata/Jobs/UiPath.Server.Configuration.OData.StartJobs', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'Application/json',
  //       Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
  //       'X-UIPATH-TenantName': tenantName,
  //       'X-UIPATH-OrganizationUnitId': 1401270,
  //     },
  //     body: JSON.stringify({
  //       startInfo: {
  //         ReleaseKey: 'ea9382df-0e68-4d54-aa12-3175c5df9237', // ReleaseKey: getRelease()'s result.value[idx].Key
  //         Strategy: 'Specific',
  //         RobotIds: [501630], // RobotIds: getRobots()'s result.value[idx].Robot.Id
  //         Source: 'Manual',
  //         JobPriority: 'Normal',
  //         InputArguments: '{}',
  //       },
  //     }),
  //   });

  //   const result = await response.json();
  //   console.log(result);
  // }

  // async function doConfig() {
  //   await getToken();
  //   await getLicense();
  //   await getProcesses();
  //   await getRobots();
  //   await getReleases();
    // console.log(getToken, getLicense, getProcesses, getRobots, getReleases, startJobs);
    // await startJobs();
  }

  // await doConfig();
}

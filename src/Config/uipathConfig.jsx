const ENV = process.env;
const {
  REACT_APP_UP_CLIENT_ID: clientId,
  REACT_APP_UP_USER_KEY: userKey,
  REACT_APP_UP_TENANT_NAME: tenantName,
} = ENV;

// store token to localstorage
// by using this token, Can authorize
export const getToken = async () => {
  try {
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

    if (response.status === 200) {
      const result = await response.json();
      const { access_token: accessToken } = result;
      window.localStorage.setItem('access_token', accessToken);

      console.log('success');
    }
  } catch (err) {
    console.log(err);
  }
};

// return processes array
export const getProcesses = async () => {
  try {
    const response = await fetch('/odata/Processes', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
        'X-UIPATH-TenantName': tenantName,
      },
    });
    if (response.status === 200) {
      const result = await response.json();
      return result.value; // processes array.
    } return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getReleaseInfo = async (processName) => {
  try {
    const response = await fetch('/odata/Releases', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
        'X-UIPATH-TenantName': tenantName,
      },
    });

    if (response.status === 200) {
      const result = await response.json();
      const resultRelease = result.value.filter((release) => release.Name === processName);
      const { OrganizationUnitId: orgId, Key: key } = resultRelease[0];
      return {
        orgId,
        key,
      };
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getRobotId = async (orgId, robotName) => {
  try {
    const response = await fetch('/odata/Sessions/UiPath.Server.Configuration.OData.GetGlobalSessions?$expand=Robot($expand=License)', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
        'X-UIPATH-TenantName': tenantName,
        'X-UIPATH-ORGANIZATIONUNITID': orgId,
      },
    });
    if (response.status === 200) {
      const result = await response.json();
      const selectedRobot = result.value.filter((robot) => robot.Robot.Name === robotName);
      return selectedRobot[0].Robot.Id;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const startJob = async (orgId, releaseKey, robotId) => {
  try {
    const response = await fetch('/odata/Jobs/UiPath.Server.Configuration.OData.StartJobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
        'X-UIPATH-TenantName': tenantName,
        'X-UIPATH-OrganizationUnitId': orgId,
      },
      body: JSON.stringify({
        startInfo: {
          ReleaseKey: releaseKey, // ReleaseKey: getRelease()'s result.value[idx].Key
          Strategy: 'Specific',
          RobotIds: [robotId], // RobotIds: getRobots()'s result.value[idx].Robot.Id
          Source: 'Manual',
          JobPriority: 'Normal',
          InputArguments: '{}',
        },
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getJob = async (jobId, orgId) => {
  try {
    const response = await fetch(`/odata/Jobs(${jobId})`, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
        'X-UIPATH-TenantName': tenantName,
        'X-UIPATH-OrganizationUnitId': orgId,
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

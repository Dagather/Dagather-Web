/* eslint-disable max-len */
export default function uipathConfig() {
  async function test() {
    // 인증 api는 https://account.uipath.com
    // 나머지는 https://cloud.uipath.com
    // axios를 통해 proxy 사용하는게 제일 좋아보임.
    // 각 api 값은 환경변수 값으로 치환해야함.
    // refresh_token 값이 자꾸 바뀌는건 생각을 좀 해봐야함.
    // 실행순서: 토큰 발급(로컬 포스트맨으로 하는게 제일 좋아보임) -> 해당 토큰으로 API 사용.
    const response = await fetch('/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-UIPATH-TenantName': 'DefaultTenant',
      },
      body: JSON.stringify({
        grant_type: 'refresh_token',
        client_id: '8DEv1AMNXczW3y4U15LL3jYf62jK93n5',
        refresh_token: 'VoIsvD9uBSCSgVpMmKUvUglNrtjCG33SoQyz-EOTCFpyX',
      }),
    });

    const result = await response.json();
    const { access_token: accessToken } = result;
    console.log(accessToken);
  }

  async function getLicense() {
    const response = await fetch('/dagatucttgua/DefaultTenant/odata/Settings/UiPath.Server.Configuration.OData.GetLicense', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJUTkVOMEl5T1RWQk1UZEVRVEEzUlRZNE16UkJPVU00UVRRM016TXlSalUzUmpnMk4wSTBPQSJ9.eyJodHRwczovL3VpcGF0aC9lbWFpbCI6Im1vX2l6X3RvX0BuYXZlci5jb20iLCJodHRwczovL3VpcGF0aC9lbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50LnVpcGF0aC5jb20vIiwic3ViIjoib2F1dGgyfFVpUGF0aC1BQURWMnxjZjE2ZTMyYzc5MjRkZGY4IiwiYXVkIjpbImh0dHBzOi8vb3JjaGVzdHJhdG9yLmNsb3VkLnVpcGF0aC5jb20iLCJodHRwczovL3VpcGF0aC5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjIxNzk1MDczLCJleHAiOjE2MjE4ODE0NzMsImF6cCI6IjhERXYxQU1OWGN6VzN5NFUxNUxMM2pZZjYyaks5M241Iiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBvZmZsaW5lX2FjY2VzcyJ9.fnjvSWiHueix75Yf7hUvhbr2v81rkzBbDTzqe5SbctMA2-zm3ro8alC9GzSP582MWu98FE5G7O3WDJJ6Xw6645lgKCkkz4XEx96xWkVF8ePMaP7tG5Jth4Mr61Yga7cjcn6TN2-TF6uj-g_JUQHbWh4t9m3nF_7QIebOXBJCoBVGzNmOILv1hjG0vnQPv3UXdKnZBgk0YLU8CHt1HnU6KAXsmzbEKs97i933ut-Sd2Di4LigGfpw-aNRGMWo24mTUSb2cGgDJ-lBwtxfW523s_PEgKywvtvgFLhqCGdY8bwfIC98_o16QTSebe_EpqKhV3NYgORbI1uJEk1nkOtLjg',
        'X-UIPATH-TenantName': 'DefaultTenant',
      },
    });

    const result = await response.json();
    console.log(result);
  }

  async function tt() {
    const response = await fetch('/dagatucttgua/DefaultTenant/odata/Processes', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJUTkVOMEl5T1RWQk1UZEVRVEEzUlRZNE16UkJPVU00UVRRM016TXlSalUzUmpnMk4wSTBPQSJ9.eyJodHRwczovL3VpcGF0aC9lbWFpbCI6Im1vX2l6X3RvX0BuYXZlci5jb20iLCJodHRwczovL3VpcGF0aC9lbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50LnVpcGF0aC5jb20vIiwic3ViIjoib2F1dGgyfFVpUGF0aC1BQURWMnxjZjE2ZTMyYzc5MjRkZGY4IiwiYXVkIjpbImh0dHBzOi8vb3JjaGVzdHJhdG9yLmNsb3VkLnVpcGF0aC5jb20iLCJodHRwczovL3VpcGF0aC5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjIxNzkyNjUzLCJleHAiOjE2MjE4NzkwNTMsImF6cCI6IjhERXYxQU1OWGN6VzN5NFUxNUxMM2pZZjYyaks5M241Iiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBvZmZsaW5lX2FjY2VzcyJ9.sHrjt9Rhg0ZXd8Ce4bRJZXiq2C09LGi3iCVqjHDFmlb3ivS8zNdlSfF-AwG09j6GQcplaUNJS16ahlM4WYmZUihz-z65qBilW0MtSYr_BRmOobkX6jsy8kYVIPF8VUrWRGQC3t2f9twOXNv63_kipMmofp3c3U4RIDoO2AfB_QM51fSZ64oO304wXrhpWW1R2Mov0R0HcRr292ZDDPNrYdHlXDookmisLN4Z-WkJynZiuZOqh_N7tQxq4xxNydOJfETP_GN5f3I78AWydU24hW6HkRgoGRi4ANuh2u2PtbIcF7auMZWSfnrqTdp9c71ZNMnrMmTtgoreSuZzkKESXw',
        'X-UIPATH-TenantName': 'DefaultTenant',
      },
    });

    const result = await response.json();
    console.log(result);
  }

  // test();
  console.log(test, getLicense);
  // getLicense();
  tt();
}

# Login API 文档

## login

| Request 类 | API URL | 请求类型 | 说明 |
|-----------|---------|---------|------|
| `LoginByAuthIdRequest` | `/sso/login/authIdLogin` | `AbstractPostRequest` | AuthId登录 |
| `LoginByMsgCodeRequest` | `/sso/login/msgCodeLogin` | `AbstractPostRequest` | 短信验证码登录 |
| `LoginByMsgCodeTempRequest` | `/sso/login/msgCodeLoginTemp` | `AbstractPostRequest` | 短信验证码登录，临时 |
| `LoginByTokenRequest` | `/sso/login/ssoLogin` | `AbstractPostRequest` | token单点登录 |
| `LoginByUsbKeyRequest` | `/sso/login/usbKeyLogin` | `AbstractPostRequest` | U盾登录 |
| `LoginInfoDetailRequest` | `/sso/login/loginInfoDetail` | `AbstractGetRequest` | 包含用户、单位等全部信息 |
| `LoginRequest` | `/sso/login/login` | `AbstractPostRequest` | 用户名密码登录 |
| `MsgCodeLoginSendCodeRequest` | `/sso/login/msgCodeLoginSendCode` | `AbstractPostRequest` | 发送登录短信验证码 |
| `MsgCodeLoginSendCodeTempRequest` | `/sso/login/msgCodeLoginSendCodeTemp` | `AbstractPostRequest` | 发送登录短信验证码 |
| `MsgCodeRegisterSendCodeTempRequest` | `/sso/login/msgCodeRegisterSendCodeTemp` | `AbstractPostRequest` | 发送登录短信验证码 |
| `QueryLoginUserInfoRequest` | `/sso/login/queryLoginUserInfo` | `AbstractGetRequest` | 只包含用户基本信息 |
| `RefreshTokenRequest` | `/sso/login/refreshToken` | `AbstractPostRequest` | 使用refreshToken刷新token |
| `RegisterByMsgCodeTempRequest` | `/sso/login/msgCodeRegisterTemp` | `AbstractPostRequest` | 短信验证码登录，临时 |
| `TokenLogoutRequest` | `/sso/login/tokenLogout` | `AbstractGetRequest` | 退出登录 |
| `TokenVerifyRequest` | `/sso/login/tokenVerify` | `AbstractGetRequest` | 校验token |


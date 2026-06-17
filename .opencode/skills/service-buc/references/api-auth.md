# Auth 认证管理 API 文档

| Request 类 | API URL | 请求类型 | 说明 |
|-----------|---------|---------|------|
| `RegisterBySmsReq` | `` | `BaseReq` | 注册用户req |
| `AddThirdPartyByAuthIdRequest` | `/auth/authUser/addThirdPartyByAuthId` | `AbstractPostRequest` | 根据authId绑定第三方id |
| `AddThirdPartyByUsernameRequest` | `/auth/authUser/addThirdPartyByUsername` | `AbstractPostRequest` | 根据用户名绑定第三方id |
| `AuthByUsernamePasswordRequest` | `/auth/authUser/auth` | `AbstractPostRequest` | 用户名密码登录验证 |
| `AuthByAuthIdRequest` | `/auth/authUser/authByAuthId` | `AbstractPostRequest` | authId登录验证 |
| `AuthByUsbKeyRequest` | `/auth/authUser/authWithUsbKey` | `AbstractPostRequest` | U盾登录验证 |
| `BatchCancelOrgDisableLoginRequest` | `/auth/authUser/batchCancelOrgDisableLogin` | `AbstractPostRequest` | 批量取消组织禁用登录 |
| `BatchCreateOrgDisableLoginRequest` | `/auth/authUser/batchCreateOrgDisableLogin` | `AbstractPostRequest` | 批量保存组织禁用登录信息 |
| `AuthUserBatchDeleteRequest` | `/auth/authUser/batchDelete` | `AbstractPostRequest` | 用户批量删除 |
| `QueryUserInfoByAuthIdsRequest` | `/auth/authUser/batchQueryUserInfoByAuthIds` | `AbstractGetRequest` | authId批量查询用户信息 增加用户类别 逗号分隔 用户类别 |
| `BatchQueryUsernameOrPhoneExistRequest` | `/auth/authUser/batchQueryUsernameOrPhoneExist` | `AbstractPostRequest` | 批量查询用户名或手机号是否已存在 |
| `AuthUserBatchRegisterRequest` | `/auth/authUser/batchRegister` | `AbstractPostRequest` | 用户手机号批量注册 |
| `BatchRegisterUsernameAndPhoneRequest` | `/auth/authUser/batchRegisterUsernameAndPhone` | `AbstractPostRequest` | 批量注册用户（用户名+手机号） |
| `AuthUserDeleteRequest` | `/auth/authUser/delete/` | `AbstractPostRequest` | 用户删除 增加用户类型 |
| `DeleteThirdPartyRequest` | `/auth/authUser/deleteThirdParty` | `AbstractPostRequest` | 删除第三方id及绑定关系 |
| `AuthUserModifyRequest` | `/auth/authUser/modify` | `AbstractPostRequest` | 用户修改 |
| `AuthUserPhoneDuplicatedRequest` | `/auth/authUser/phoneDuplicated` | `AbstractGetRequest` | 查询手机号是否重复 |
| `QueryAuthIdByPhoneRequest` | `/auth/authUser/queryAuthIdByPhone` | `AbstractGetRequest` | 查询手机号对应的authId |
| `QueryAuthIdByUsernameRequest` | `/auth/authUser/queryAuthIdByUsername` | `AbstractGetRequest` | 查询用户名对应的authId 增加用户类别 |
| `QueryAuthUserByThirdPartyIdRequest` | `/auth/authUser/queryByThirdPartyId` | `AbstractGetRequest` | 查询第三方id对应的用户信息 |
| `QueryIsDisableOrgLoginRequest` | `/auth/authUser/queryIsDisableOrgLogin` | `AbstractPostRequest` | 批量取消组织禁用登录 |
| `QueryUserLoginLogPageRequest` | `/auth/authUser/queryLoginLogPage` | `AbstractGetRequest` | 查询登录日志分页列表 |
| `QueryUserOperateLogPageRequest` | `/auth/authUser/queryOperateLogPage` | `AbstractGetRequest` | 查询操作日志分页列表 |
| `QueryOrgUpdatePasswordConfigRequest` | `/auth/authUser/queryOrgUpdatePasswordConfig/` | `AbstractGetRequest` | 查询单位定期改密配置 Request 机构id |
| `QueryThirdPartyIdByAuthIdAndTypeRequest` | `/auth/authUser/queryThirdPartyByAuthIdAndType` | `AbstractGetRequest` | 查询第三方id对应的用户信息 |
| `QueryUsbKeyBindOrgIdsRequest` | `/auth/authUser/queryUsbKeyBindOrgIds` | `AbstractGetRequest` | 查询用户绑定u盾的单位列表 |
| `QueryUsernameOrPhoneExistRequest` | `/auth/authUser/queryUsernameOrPhoneExist` | `AbstractGetRequest` | 查询用户名或手机号是否已存在(包含要排除的authId) |
| `AuthUserRegisterRequest` | `/auth/authUser/register` | `AbstractPostRequest` | 用户注册 |
| `SetOrgUpdatePasswordConfigRequest` | `/auth/authUser/setOrgUpdatePasswordConfig` | `AbstractPostRequest` | 设置单位定期改密配置 机构id 开/关 YES/NO |
| `AuthUserDuplicatedRequest` | `/auth/authUser/userDuplicated` | `AbstractGetRequest` | 查询用户名是否重复 与username和phone比较 |
| `AuthUserInfoByAuthIdRequest` | `/auth/authUser/userInfoByAuthId/` | `AbstractGetRequest` | 按authId查询用户信息 增加用户类别 |
| `AuthUserUsernameDuplicatedRequest` | `/auth/authUser/usernameDuplicated` | `AbstractGetRequest` | 查询用户名是否重复 |
| `AuthPersonalUserRegisterRequest` | `/userInfo/registerBySms` | `AbstractPostRequest` | 个人用户注册 用户手机号短信注册 |


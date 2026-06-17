# User API 文档

## user

| Request 类 | API URL | 请求类型 | 说明 |
|-----------|---------|---------|------|
| `ChangeUserCurrentOrganizationRequest` | `/user/user/changeOrganization` | `AbstractPostRequest` | 用户新增 |
| `ObtainDataPermissionRuleRequest` | `/user/data/permission/obtain` | `AbstractPostRequest` | 获取用户数据权限 |
| `UserAddRequest` | `/user/user/` | `AbstractPostRequest` | 用户新增 |
| `UserBatchAddRequest` | `/user/user/batchCreateSdk` | `AbstractPostRequest` | 用户批量新增 |
| `UserBatchFindOrganizationListRequest` | `/user/user/batchFindOrganizationList` | `AbstractPostRequest` | 批量查询用户所在的机构列表 |
| `UserCurrentOrganizationRequest` | `/user/user/currentOrganization?authId=` | `AbstractGetRequest` | 查询用户所在的机构 |
| `UserOrgPurchasedAppRequest` | `/user/user/orgPurchasedApp` | `AbstractPostRequest` | 用户所在单位已购应用 |


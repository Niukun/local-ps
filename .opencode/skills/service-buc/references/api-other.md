# Other API 文档

## password

| Request 类 | API URL | 请求类型 | 说明 |
|-----------|---------|---------|------|
| `FindPasswordRequest` | `/auth/authUser/findPassword` | `AbstractPostRequest` | 找回密码（重置为随机密码） |
| `IgnoreUpdatePasswordTipRequest` | `/auth/authUser/ignoreUpdatePasswordTip` | `AbstractPostRequest` | 忽略更新密码提示 |
| `QueryPasswordTipsRequest` | `/auth/authUser/queryPasswordTips` | `AbstractGetRequest` | 查询密码提示 |
| `ResetPasswordEncryptRequest` | `/auth/authUser/resetPasswordEncrypt` | `AbstractPostRequest` | 重置密码（密码参数md5加密） |
| `ResetPasswordRequest` | `/auth/authUser/resetPassword` | `AbstractPostRequest` | 重置密码 |
| `UpdatePasswordEncryptRequest` | `/auth/authUser/updatePasswordEncrypt` | `AbstractPostRequest` | 修改密码（密码参数md5加密） |
| `UpdatePasswordRequest` | `/auth/authUser/updatePassword` | `AbstractPostRequest` | 修改密码 |

## sms

| Request 类 | API URL | 请求类型 | 说明 |
|-----------|---------|---------|------|
| `SendSmsRequest` | `/sms/send` | `AbstractPostRequest` | 短信发送接口 |
| `SendSmsRequest2` | `/sms/sendWithContent` | `AbstractPostRequest` | 短信发送接口v2 |
| `VerifySmsRequest` | `/sms/verify` | `AbstractPostRequest` | 短信验证接口 |
| `VerifySmsRequest2` | `/sms/verifySms2` | `AbstractPostRequest` | 短信验证接口v2 |

## sysArea

| Request 类 | API URL | 请求类型 | 说明 |
|-----------|---------|---------|------|
| `AreaFindByIdRequest` | `/user/sysArea/` | `AbstractGetRequest` | 根据id查询机构角色信息 |
| `AreaQueryRequest` | `/user/sysArea/query` | `AbstractGetRequest` | 查询区域 |
| `AreaTreeRequest` | `/user/sysArea/tree` | `AbstractGetRequest` | 系统区域树形结构查询 |
| `SubAreaRequest` | `/user/sysArea/subArea` | `AbstractGetRequest` | 系统子区域查询 |

## industry

| Request 类 | API URL | 请求类型 | 说明 |
|-----------|---------|---------|------|
| `GetIndustryInfoByIdRequest` | `/industry/getIndustryInfoById/` | `AbstractGetRequest` | 根据id查询行业信息 |
| `GetIndustryInfoTreeRequest` | `/industry/getIndustryInfoTree/` | `AbstractGetRequest` | 行业信息树形结构查询 |
| `GetSubIndustryInfosRequest` | `/industry/getSubIndustryInfos` | `AbstractGetRequest` | 获取子行业列表 |
| `QueryIndustryInfoRequest` | `/industry/queryIndustryInfo` | `AbstractGetRequest` | 查询行业信息 |

## organizationAppInst

| Request 类 | API URL | 请求类型 | 说明 |
|-----------|---------|---------|------|
| `BatchOrganizationListAppInstRequest` | `/user/orgAppInst/listAppInstByOrgIds` | `AbstractGetRequest` | 查询机构与应用实例关联信息列表 |
| `BatchOrganizationMapAppInstRequest` | `/user/orgAppInst/mapAppInstByOrgIds` | `AbstractGetRequest` | 查询机构与应用实例关联信息列表 |
| `OrganizationAppInstRequest` | `/user/orgAppInst/getAppInst` | `AbstractGetRequest` | 查询机构与应用实例关联信息 |
| `OrganizationAppInstUpdStatusRequest` | `/user/orgAppInst/updateStatus` | `AbstractPostRequest` | 修改机构应用实例权限状态 |
| `OrganizationAssignAppInstRequest` | `/user/orgAppInst/assign` | `AbstractPostRequest` | 分配机构应用实例 |
| `OrganizationBatchAssignAppInstRequest` | `/user/orgAppInst/assignBatch` | `AbstractPostRequest` | 批量关联机构应用实例 |
| `OrganizationListAppInstRequest` | `/user/orgAppInst/listAppInstByOrgId` | `AbstractGetRequest` | 查询机构与应用实例关联信息列表 |
| `OrganizationListOrgByAppRequest` | `/user/orgAppInst/listOrgByAppInst` | `AbstractGetRequest` | 查询应用实例与机构关联信息列表 |
| `OrganizationRevokeAppInstRequest` | `/user/orgAppInst/revoke` | `AbstractPostRequest` | 取消机构应用实例访问权限 |

## organizationRole

| Request 类 | API URL | 请求类型 | 说明 |
|-----------|---------|---------|------|
| `OrganizationCanBindResourceRequest` | `/user/orgRole/canBindResourceTree` | `AbstractGetRequest` | 查询机构角可以绑定的菜单 |
| `OrganizationRoleAddRequest` | `/user/orgRole/` | `AbstractPostRequest` | 机构角色新增 |
| `OrganizationRoleAssignRequest` | `/user/orgRole/assign` | `AbstractPostRequest` | 分配机构角色 |
| `OrganizationRoleDeleteRequest` | `/user/orgRole/logicDelete` | `AbstractPostRequest` | 机构角色删除 |
| `OrganizationRoleFindByIdRequest` | `/user/orgRole/` | `AbstractGetRequest` | 根据id查询机构角色信息 |
| `OrganizationRoleListRequest` | `/user/orgRole/list` | `AbstractGetRequest` | 查询机构角色 |
| `OrganizationRolePageRequest` | `/user/orgRole/page` | `AbstractGetRequest` | 分页查询机构角色 |
| `OrganizationRoleResourceAssociateRequest` | `/user/orgRole/associateResourceAndOrgRole` | `AbstractPostRequest` | 机构角色关联资源 |
| `OrganizationRoleResourceRequest` | `/user/orgRole/resources?orgRoleId=` | `AbstractGetRequest` | 查询机构角色关联的菜单 |
| `OrganizationRoleUpdateRequest` | `/user/orgRole/` | `AbstractPutRequest` | 机构角色修改 |


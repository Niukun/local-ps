# BUC SDK API 完整参考

## SysDictData

| Request 类 | API URL | 请求类型 | DTO | 说明 |
|-----------|---------|---------|-----|------|
| `BatchSysDictDataDeleteRequest` | `/user/system/dict/data/batchRemove` | `AbstractPostRequest` | `BatchDeleteSysDictDataRequest` | 系统员工角色删除 |
| `SysDictDataAddRequest` | `/user/system/dict/data/add` | `AbstractPostRequest` | `AddSysDictDataRequest` | SysDictData新增/修改 |
| `SysDictDataDeleteRequest` | `/user/system/dict/data/remove/` | `AbstractGetRequest` | `` | 系统员工角色删除 |
| `SysDictDataFindByDictCodeRequest` | `/user/system/dict/data/` | `AbstractGetRequest` | `` | 查询字典数据详细 |
| `SysDictDataFindByDictTypeRequest` | `/user/system/dict/data/type/` | `AbstractGetRequest` | `` | 根据字典类型查询字典数据信息 |
| `SysDictDataPageRequest` | `/user/system/dict/data/list` | `AbstractGetRequest` | `SysDictDataPageQuery` | 分页查询 |
| `SysDictDataUpdateRequest` | `/user/system/dict/data/edit` | `AbstractPostRequest` | `AddSysDictDataRequest` | SysDictData新增/修改 |

## SysDictType

| Request 类 | API URL | 请求类型 | DTO | 说明 |
|-----------|---------|---------|-----|------|
| `BatchSysDictTypeDeleteRequest` | `/user/system/dict/type/batchRemove` | `AbstractPostRequest` | `BatchDeleteSysDictTypeRequest` | 系统员工角色删除 |
| `SysDictTypeAddRequest` | `/user/system/dict/type/add` | `AbstractPostRequest` | `AddSysDictTypeRequest` | SysDictData新增/修改 |
| `SysDictTypeDeleteRequest` | `/user/system/dict/type/remove/` | `AbstractGetRequest` | `` | 系统员工角色删除 |
| `SysDictTypeFindByDictIdRequest` | `/user/system/dict/type/getInfo/` | `AbstractGetRequest` | `` | 查询字典数据详细 |
| `SysDictTypeFindByDictTypeRequest` | `/user/system/dict/type/` | `AbstractGetRequest` | `` | 根据字典类型查询字典数据信息 |
| `SysDictTypeOptionSelectRequest` | `/user/system/dict/type/optionselect` | `AbstractGetRequest` | `` | 分页查询 |
| `SysDictTypePageRequest` | `/user/system/dict/type/list` | `AbstractGetRequest` | `SysDictTypePageQuery` | 分页查询 |
| `SysDictTypeUpdateRequest` | `/user/system/dict/type/edit` | `AbstractPostRequest` | `AddSysDictTypeRequest` | SysDictData新增/修改 |

## application

| Request 类 | API URL | 请求类型 | DTO | 说明 |
|-----------|---------|---------|-----|------|
| `AddAppAndAppInstRequest` | `/user/application/addApplicationAndApplicationInstance` | `AbstractPostRequest` | `` | 新增应用和应用实例 |
| `AddApplicationInstanceRequest` | `/user/application/addApplicationInstance` | `AbstractPostRequest` | `` | 新增应用实例 |
| `AddApplicationRequest` | `/user/application/addApplication` | `AbstractPostRequest` | `` | 新增应用 |
| `AppAndAppInstanceCascadeRequest` | `/user/application/appAndAppInstanceCascade` | `AbstractPostRequest` | `` | 应用&应用实例级联查询 |
| `ApplicationCascadeQuerySelectorRequest` | `/user/application/applicationCascadeQuerySelector` | `AbstractPostRequest` | `` | 查询所有应用ByProdLine |
| `DeleteApplicationByApplicationIdRequest` | `/user/application/deleteApplicationByApplicationId` | `AbstractPostRequest` | `` | 根据applicationId删除应用 |
| `DeleteApplicationInstanceRequest` | `/user/application/deleteApplicationInstance` | `AbstractPostRequest` | `` | 根据applicationInstanceId删除应用 |
| `FindAllApplicationsByProductLineRequest` | `/user/application/ApplicationCascadeQuerySelector` | `AbstractPostRequest` | `QueryAppInstPageRequest` | 查询所有应用ByProdLine |
| `FindApplicationInstanceWithPageRequest` | `/user/application/findApplicationInstanceWithPage` | `AbstractPostRequest` | `ApplicationInstanceQuery` | 查询所有应用 |
| `QueryAllAppInstRequest` | `/user/application/findAllAppInst` | `AbstractPostRequest` | `` | 获取所有应用实例 |
| `QueryAllApplicationsListRequest` | `/user/application/findAllApplicationsList` | `AbstractPostRequest` | `QueryAppListRequest` | 查询所有应用 |
| `QueryAllApplicationsRequest` | `/user/application/findAllApplications` | `AbstractPostRequest` | `QueryAppInstPageRequest` | 查询所有应用 |
| `QueryAppInstByAppInstSignRequest` | `/user/application/getApplicationInstanceByApplicationInstanceSign` | `AbstractPostRequest` | `` | 按单位ids查询对应应用实例list |
| `QueryAppInstByOrganIdAndBelongSourceRequest` | `/user/application/findAppInstByOrganIdAndBelongSource` | `AbstractPostRequest` | `` | 按单位和项目查对应的应用实例 |
| `QueryAppInstBySigns` | `/user/application/findAppInstsBySigns` | `AbstractGetRequest` | `` | 批量按应用实例标识查询应用实例信息 |
| `QueryAppInstNamesByAppNameRequest` | `/user/application/findApplicationInstanceNamesByApplicationName` | `AbstractPostRequest` | `` | 按单位ids查询对应应用实例list |
| `QueryApplicationInstancesByOrganIdsRequest` | `/user/application/findApplicationInstancesByOrganIds` | `AbstractPostRequest` | `` | 按单位ids查询对应应用实例list |
| `QueryApplicationInstancesByProjectRequest` | `/user/application/findApplicationInstancesByProject` | `AbstractPostRequest` | `` | 按项目查对应的应用实例 |
| `QueryChannelsByProjectNosRequest` | `/user/application/findChannelsByProjectNos` | `AbstractPostRequest` | `` | 按项目list查询通道配置list |
| `QueryProjectsByProductLineRequest` | `/user/application/findProjectsByProductLine` | `AbstractGetRequest` | `` | 按产品线查询项目列表 |
| `UpdateAppAndAppInstRequest` | `/application/updateApplicationAndApplicationInstance` | `AbstractPostRequest` | `` | 修改应用和应用实例 |
| `UpdateApplicationInstanceRequest` | `/user/application/updateApplicationInstance` | `AbstractPostRequest` | `` | 修改应用实例 |
| `UpdateApplicationRequest` | `/user/application/updateApplication` | `AbstractPostRequest` | `` | 修改应用 |

## industry

| Request 类 | API URL | 请求类型 | DTO | 说明 |
|-----------|---------|---------|-----|------|
| `GetIndustryInfoByIdRequest` | `/industry/getIndustryInfoById/` | `AbstractGetRequest` | `` | 根据id查询行业信息 |
| `GetIndustryInfoTreeRequest` | `/industry/getIndustryInfoTree/` | `AbstractGetRequest` | `IndustryInfoTreeQuery` | 行业信息树形结构查询 |
| `GetSubIndustryInfosRequest` | `/industry/getSubIndustryInfos` | `AbstractGetRequest` | `SubIndustryInfoQuery` | 获取子行业列表 |
| `QueryIndustryInfoRequest` | `/industry/queryIndustryInfo` | `AbstractGetRequest` | `IndustryInfoQuery` | 查询行业信息 |

## login

| Request 类 | API URL | 请求类型 | DTO | 说明 |
|-----------|---------|---------|-----|------|
| `LoginByAuthIdRequest` | `/sso/login/authIdLogin` | `AbstractPostRequest` | `LoginRequest` | AuthId登录 |
| `LoginByMsgCodeRequest` | `/sso/login/msgCodeLogin` | `AbstractPostRequest` | `` | 短信验证码登录 |
| `LoginByMsgCodeTempRequest` | `/sso/login/msgCodeLoginTemp` | `AbstractPostRequest` | `LoginRequest` | 短信验证码登录，临时 |
| `LoginByTokenRequest` | `/sso/login/ssoLogin` | `AbstractPostRequest` | `LoginRequest` | token单点登录 |
| `LoginByUsbKeyRequest` | `/sso/login/usbKeyLogin` | `AbstractPostRequest` | `LoginRequest` | U盾登录 |
| `LoginInfoDetailRequest` | `/sso/login/loginInfoDetail` | `AbstractGetRequest` | `` | 包含用户、单位等全部信息 |
| `LoginRequest` | `/sso/login/login` | `AbstractPostRequest` | `LoginRequest` | 用户名密码登录 |
| `MsgCodeLoginSendCodeRequest` | `/sso/login/msgCodeLoginSendCode` | `AbstractPostRequest` | `` | 发送登录短信验证码 |
| `MsgCodeLoginSendCodeTempRequest` | `/sso/login/msgCodeLoginSendCodeTemp` | `AbstractPostRequest` | `LoginRequest` | 发送登录短信验证码 |
| `MsgCodeRegisterSendCodeTempRequest` | `/sso/login/msgCodeRegisterSendCodeTemp` | `AbstractPostRequest` | `LoginRequest` | 发送登录短信验证码 |
| `QueryLoginUserInfoRequest` | `/sso/login/queryLoginUserInfo` | `AbstractGetRequest` | `` | 只包含用户基本信息 |
| `RefreshTokenRequest` | `/sso/login/refreshToken` | `AbstractPostRequest` | `` | 使用refreshToken刷新token |
| `RegisterByMsgCodeTempRequest` | `/sso/login/msgCodeRegisterTemp` | `AbstractPostRequest` | `LoginRequest` | 短信验证码登录，临时 |
| `TokenLogoutRequest` | `/sso/login/tokenLogout` | `AbstractGetRequest` | `` | 退出登录 |
| `TokenVerifyRequest` | `/sso/login/tokenVerify` | `AbstractGetRequest` | `` | 校验token |

## organArchitecture

| Request 类 | API URL | 请求类型 | DTO | 说明 |
|-----------|---------|---------|-----|------|
| `"/"` | `AbstractGetRequest` | `` | `* @Description` |  |
| `GetOrgStaffListRequest` | `/user/mixOrganization/staff/findList` | `AbstractGetRequest` | `OrgArchiteStaffQuery` | @Description |
| `GetOrganArchitectureCountStaffRequest` | `/user/mixOrganization/countStaff` | `AbstractGetRequest` | `OrganizationArchitectureCountStaffQuery` | @Description |
| `GetOrganArchitectureDetailRequest` | `/user/mixOrganization/detail/` | `AbstractGetRequest` | `` | @Description |
| `GetOrganArchitectureRemoteStaffListRequest` | `/user/mixOrganization/remote/getStaffList` | `AbstractGetRequest` | `GetRemoteOrgStaffQuery` | @Description 获取远程员工列表 |
| `OrganArchitectureAddRequest` | `/user/mixOrganization/add` | `AbstractPostRequest` | `AddOrganArchitectureRequest` | @Description |
| `OrganArchitectureLogicDeleteRequest` | `/user/mixOrganization/logicDelete` | `AbstractPostRequest` | `DeleteOrganArchitectureRequest` | @Description |
| `OrganArchitectureRemoteImportUserRequest` | `/user/mixOrganization/remote/importUser` | `AbstractPostRequest` | `ImportRemoteOrgUserRequest` | @Description 导入远程成员 |
| `OrganArchitectureStaffListPageRequest` | `/user/mixOrganization/getStaffPage` | `AbstractGetRequest` | `OrgStaffPageQuery` | @Description |
| `OrganArchitectureTreeFormatRequest` | `/user/mixOrganization/getOrganizationTree` | `AbstractGetRequest` | `OrganArchitectureTreeQuery` | @Description |
| `OrganArchitectureUpdateRequest` | `/user/mixOrganization/update` | `AbstractPutRequest` | `UpdateOrganArchitectureRequest` | @Description |
| `OrganArchitectureUpdateStaffRequest` | `/user/mixOrganization/updateStaff` | `AbstractPostRequest` | `ImportRemoteOrgUserRequest` | @Description 组织架构修改员工 |
| `OrganArchitectureWithSubOrgListRequest` | `/user/mixOrganization/getOrganizationWithSubOrgList?organizationId=` | `AbstractGetRequest` | `OrganArchitectureTreeQuery` | @Description |

## organNode

| Request 类 | API URL | 请求类型 | DTO | 说明 |
|-----------|---------|---------|-----|------|
| `OrganNodeAddRequest` | `/user/orgTypeNode/` | `AbstractPostRequest` | `AddOrgTypeNodeRequest` | 系统节点 |
| `OrganNodeAddStaffRequest` | `/user/orgTypeNode/addStaff` | `AbstractPostRequest` | `AddStaffToNodeRequest` | 新增节点人员 |
| `OrganNodeBatchAddRequest` | `/user/orgTypeNode/createBatch` | `AbstractPostRequest` | `AddOrgTypeNodeRequest` | 批量新增 |
| `OrganNodeBatchRemoveStaffRequest` | `/user/orgTypeNode/batchRemoveStaff` | `AbstractPostRequest` | `BatchRemoveStaffFromNodeRequest` | 从组织架构维度节点批量移除员工 |
| `OrganNodeDeleteRequest` | `/user/orgTypeNode/delete` | `AbstractPostRequest` | `DeleteOrgTypeNodeRequest` | 系统部门逻辑删除 |
| `OrganNodeDetailRequest` | `/user/orgTypeNode/detail?id=` | `AbstractGetRequest` | `` | 详情查询 |
| `OrganNodeFindOrgTypeStaffListRequest` | `/user/orgTypeNode/listOrgTypeStaff/` | `AbstractGetRequest` | `` | 列表查询 |
| `OrganNodeListByStaffRequest` | `/user/orgTypeNode/listByStaff` | `AbstractGetRequest` | `` | 按员工id获取组织架构维度列表 |
| `OrganNodePageRequest` | `/user/orgTypeNode/page` | `AbstractGetRequest` | `OrganNodePageQuery` | 根据组织id查询组织部门分页列表 |
| `OrganNodeRemoveStaffRequest` | `/user/orgTypeNode/removeStaff` | `AbstractPostRequest` | `RemoveStaffFromNodeRequest` | 系统部门新增 |
| `OrganNodeStaffListRequest` | `/user/orgTypeNode/listStaff` | `AbstractGetRequest` | `QueryNodeStaffListRequest` | 列表查询 |
| `OrganNodeStaffPageRequest` | `/user/orgTypeNode/pageStaff` | `AbstractGetRequest` | `QueryNodeStaffRequest` | 分页查询 |
| `OrganNodeTreeRequest` | `/user/orgTypeNode/tree` | `AbstractGetRequest` | `OrganNodeTreeQuery` | 根据组织id查询组织部门树 |
| `OrganNodeUpdateRequest` | `/user/orgTypeNode/` | `AbstractPutRequest` | `UpdateOrgTypeNodeRequest` | 修改节点 |

## organType

| Request 类 | API URL | 请求类型 | DTO | 说明 |
|-----------|---------|---------|-----|------|
| `OrganTypeAddRequest` | `/user/orgType/` | `AbstractPostRequest` | `AddOrgTypeRequest` | 系统节点 |
| `OrganTypeDeleteRequest` | `/user/orgType/logicDelete` | `AbstractPostRequest` | `DeleteOrgTypeRequest` | 系统部门逻辑删除 |
| `OrganTypeDetailRequest` | `/user/orgType/detail?id=` | `AbstractGetRequest` | `` | 详情查询 |
| `OrganTypeListRequest` | `/user/orgType/list` | `AbstractGetRequest` | `OrganTypeQuery` | 列表查询 |
| `OrganTypePageRequest` | `/user/orgType/page` | `AbstractGetRequest` | `OrganTypePageQuery` | 分页查询 |
| `OrganTypeUpdateRequest` | `/user/orgType/` | `AbstractPutRequest` | `UpdateOrgTypeRequest` | 修改节点 |

## organization

| Request 类 | API URL | 请求类型 | DTO | 说明 |
|-----------|---------|---------|-----|------|
| `AccountRegisterRequest` | `/user/organization/registerAccount` | `AbstractPostRequest` | `RegisterOrgAccountRequest` | 机构开户+企业认证 |
| `AddLinkmanRequest` | `/user/organization/addLinkman` | `AbstractPostRequest` | `AddLegalUserLinkmanRequest` | 机构开户添加联系人 |
| `OrganizationAddRequest` | `/user/organization/` | `AbstractPostRequest` | `AddOrganizationRequest` | 新增机构 |
| `OrganizationBatchAddProjectSourceRequest` | `/user/organization/batchCreateOrganizationProjectSourceSdk` | `AbstractPostRequest` | `AddOrganizationProjectRequest` | 批量维护机构项目关系 |
| `OrganizationBatchAddRequest` | `/user/organization/batchCreateSdk` | `AbstractPostRequest` | `AddOrganizationRequest` | 批量新增机构 |
| `OrganizationBatchOpenAcctRequest` | `/user/organization/openAccountBatch` | `AbstractPostRequest` | `AddOrganizationRequest` | 批量新增机构 |
| `OrganizationDeleteRequest` | `/user/organization/logicDelete` | `AbstractPostRequest` | `DeleteOrganizationRequest` | 机构逻辑删除 |
| `OrganizationDetailRequest` | `/user/organization/detail/` | `AbstractGetRequest` | `` | 机构详情查询 |
| `OrganizationLegalUserQueryRequest` | `/user/organization/queryOrganizationLegalUser/` | `AbstractGetRequest` | `` | 查询默认机构信息 |
| `OrganizationListByProjectSourceRequest` | `/user/organization/findListByProjectSource` | `AbstractGetRequest` | `` | 查询项目下机构列表 |
| `OrganizationListByQueryRequest` | `/user/organization/findList` | `AbstractGetRequest` | `OrganizationQuery` | 机构列表查询 |
| `OrganizationNameExistRequest` | `/user/organization/orgNameExist` | `AbstractGetRequest` | `` | 机构名是否存在 |
| `OrganizationOpenAcctRequest` | `/user/organization/openAccount` | `AbstractPostRequest` | `AddOrganizationRequest` | 机构开户 |
| `OrganizationPageQueryRequest` | `/user/organization/page` | `AbstractGetRequest` | `OrganizationPageQuery` | 机构分页查询 |
| `OrganizationResourceQueryRequest` | `/user/organization/queryOrganizationResource` | `AbstractGetRequest` | `OrganizationResourceQuery` | 机构角色关联 |
| `OrganizationResourceTreeRequest` | `/user/organization/queryOrganizationResourceTree` | `AbstractGetRequest` | `OrganizationResourceQuery` | 机构角色关联 |
| `OrganizationRoleAssociateRequest` | `/user/organization/orgRole/associate` | `AbstractPostRequest` | `AddOrganizationRequest` | 分配机构角色 |
| `OrganizationRoleQueryRequest` | `/user/organization/queryOrganizationRole` | `AbstractGetRequest` | `OrganizationRoleQuery` | 机构角色关联 |
| `OrganizationTreeFormatRequest` | `/user/organization/treeFormat` | `AbstractGetRequest` | `OrganizationTreeFormQuery` | 机构树查询 |
| `OrganizationTreeRequest` | `/user/organization/tree` | `AbstractGetRequest` | `OrganizationQuery` | 机构树查询 |
| `OrganizationUpdateAcctRequest` | `/user/organization/updateAccount` | `AbstractPostRequest` | `OpenOrgAccoutRequest` | 机构开户信息修改 |
| `OrganizationUpdateProjectSourceRequest` | `/user/organization/updateOrganizationProjectSource` | `AbstractPostRequest` | `UpdateOrganizationProjectSourceRequest` | 修改机构项目编号 |
| `OrganizationUpdateRequest` | `/user/organization/` | `AbstractPutRequest` | `UpdateOrganizationRequest` | 机构修改 |
| `QueryDefaultOrganizationIdRequest` | `/user/userDefaultOrganization/findDefaultOrganizationId` | `AbstractGetRequest` | `` | 查询默认机构信息 |
| `UpdateDefaultOrgForWebRequest` | `/user/userDefaultOrganization/updateDefaultOrgForWeb` | `AbstractPostRequest` | `UpdateUserDefaultOrgForWebRequest` | 按 authId 和 deploySign 进行修改 |
| `UpdateDefaultOrganizationRequest` | `/user/userDefaultOrganization/updateDefaultOrganization` | `AbstractPostRequest` | `UpdateUserDefaultOrganizationRequest` | 设置默认机构 |

## organizationAppInst

| Request 类 | API URL | 请求类型 | DTO | 说明 |
|-----------|---------|---------|-----|------|
| `BatchOrganizationListAppInstRequest` | `/user/orgAppInst/listAppInstByOrgIds` | `AbstractGetRequest` | `ListAppInstByOrgRequest` | 查询机构与应用实例关联信息列表 |
| `BatchOrganizationMapAppInstRequest` | `/user/orgAppInst/mapAppInstByOrgIds` | `AbstractGetRequest` | `ListAppInstByOrgsRequest` | 查询机构与应用实例关联信息列表 |
| `OrganizationAppInstRequest` | `/user/orgAppInst/getAppInst` | `AbstractGetRequest` | `AppInstRequest` | 查询机构与应用实例关联信息 |
| `OrganizationAppInstUpdStatusRequest` | `/user/orgAppInst/updateStatus` | `AbstractPostRequest` | `AssignOrgAppInstRequest` | 修改机构应用实例权限状态 |
| `OrganizationAssignAppInstRequest` | `/user/orgAppInst/assign` | `AbstractPostRequest` | `AddOrgRoleRequest` | 分配机构应用实例 |
| `OrganizationBatchAssignAppInstRequest` | `/user/orgAppInst/assignBatch` | `AbstractPostRequest` | `AssignOrgAppInstRequest` | 批量关联机构应用实例 |
| `OrganizationListAppInstRequest` | `/user/orgAppInst/listAppInstByOrgId` | `AbstractGetRequest` | `OrgRoleQuery` | 查询机构与应用实例关联信息列表 |
| `OrganizationListOrgByAppRequest` | `/user/orgAppInst/listOrgByAppInst` | `AbstractGetRequest` | `ListAppInstByOrgRequest` | 查询应用实例与机构关联信息列表 |
| `OrganizationRevokeAppInstRequest` | `/user/orgAppInst/revoke` | `AbstractPostRequest` | `AssignOrgAppInstRequest` | 取消机构应用实例访问权限 |

## organizationRole

| Request 类 | API URL | 请求类型 | DTO | 说明 |
|-----------|---------|---------|-----|------|
| `OrganizationCanBindResourceRequest` | `/user/orgRole/canBindResourceTree` | `AbstractGetRequest` | `CanBindResourceTreeRequest` | 查询机构角可以绑定的菜单 |
| `OrganizationRoleAddRequest` | `/user/orgRole/` | `AbstractPostRequest` | `AddOrgRoleRequest` | 机构角色新增 |
| `OrganizationRoleAssignRequest` | `/user/orgRole/assign` | `AbstractPostRequest` | `AssignOrgRoleRequest` | 分配机构角色 |
| `OrganizationRoleDeleteRequest` | `/user/orgRole/logicDelete` | `AbstractPostRequest` | `AddOrgRoleRequest` | 机构角色删除 |
| `OrganizationRoleFindByIdRequest` | `/user/orgRole/` | `AbstractGetRequest` | `` | 根据id查询机构角色信息 |
| `OrganizationRoleListRequest` | `/user/orgRole/list` | `AbstractGetRequest` | `OrgRoleQuery` | 查询机构角色 |
| `OrganizationRolePageRequest` | `/user/orgRole/page` | `AbstractGetRequest` | `OrgRolePageQuery` | 分页查询机构角色 |
| `OrganizationRoleResourceAssociateRequest` | `/user/orgRole/associateResourceAndOrgRole` | `AbstractPostRequest` | `AddOrgRoleRequest` | 机构角色关联资源 |
| `OrganizationRoleResourceRequest` | `/user/orgRole/resources?orgRoleId=` | `AbstractGetRequest` | `` | 查询机构角色关联的菜单 |
| `OrganizationRoleUpdateRequest` | `/user/orgRole/` | `AbstractPutRequest` | `AddOrgRoleRequest` | 机构角色修改 |

## organizationTree

| Request 类 | API URL | 请求类型 | DTO | 说明 |
|-----------|---------|---------|-----|------|
| `FindAllChildrenOrganizationsByOrganizationIdRequest` | `/user/organizationTree/findAllChildrenOrganizationsByOrganizationId` | `AbstractGetRequest` | `` | 根据单位id查询所有子单位列表 |
| `GetAllChildrenOrganizationsByOrganizationIdRequest` | `/user/organizationTree/getAllChildrenOrganizationsByOrganizationId` | `AbstractGetRequest` | `` | 根据单位id查询所有子单位列表 |

## password

| Request 类 | API URL | 请求类型 | DTO | 说明 |
|-----------|---------|---------|-----|------|
| `FindPasswordRequest` | `/auth/authUser/findPassword` | `AbstractPostRequest` | `` | 找回密码（重置为随机密码） |
| `IgnoreUpdatePasswordTipRequest` | `/auth/authUser/ignoreUpdatePasswordTip` | `AbstractPostRequest` | `` | 忽略更新密码提示 |
| `QueryPasswordTipsRequest` | `/auth/authUser/queryPasswordTips` | `AbstractGetRequest` | `` | 查询密码提示 |
| `ResetPasswordEncryptRequest` | `/auth/authUser/resetPasswordEncrypt` | `AbstractPostRequest` | `` | 重置密码（密码参数md5加密） |
| `ResetPasswordRequest` | `/auth/authUser/resetPassword` | `AbstractPostRequest` | `` | 重置密码 |
| `UpdatePasswordEncryptRequest` | `/auth/authUser/updatePasswordEncrypt` | `AbstractPostRequest` | `` | 修改密码（密码参数md5加密） |
| `UpdatePasswordRequest` | `/auth/authUser/updatePassword` | `AbstractPostRequest` | `` | 修改密码 |

## relation

| Request 类 | API URL | 请求类型 | DTO | 说明 |
|-----------|---------|---------|-----|------|
| `RoleResourceRelationRequest` | `/user/relation/roleAndResource` | `AbstractGetRequest` | `RelationRoleResourceRequest` | 角色资源关联数据 |
| `StaffResourceRelationRequest` | `/user/relation/staffAndResource` | `AbstractGetRequest` | `RelationRoleResourceRequest` | 员工资源关联数据 |
| `StaffRoleRelationRequest` | `/user/relation/staffAndRole` | `AbstractGetRequest` | `RelationStaffRoleRequest` | 员工角色关联数据 |

## resource

| Request 类 | API URL | 请求类型 | DTO | 说明 |
|-----------|---------|---------|-----|------|
| `BatchResourceDeleteRequest` | `/user/resource/batchLogicDelete` | `AbstractPostRequest` | `BatchDeleteResourceRequest` | 批量应用资源新增 |
| `GetSubResourceIdsRequest` | `/user/resource/getSubResourceIds/` | `AbstractGetRequest` | `` | 根据id查询应用资源 |
| `ResourceAddRequest` | `/user/resource/` | `AbstractPostRequest` | `AddResourceRequest` | 应用资源新增 |
| `ResourceDeleteRequest` | `/user/resource/logicDelete` | `AbstractPostRequest` | `AddResourceRequest` | 应用资源新增 |
| `ResourceFindByIdRequest` | `/user/resource/` | `AbstractGetRequest` | `` | 根据id查询应用资源 |
| `ResourceListRequest` | `/user/resource/list` | `AbstractGetRequest` | `ResourcePageQuery` | 查询应用资源列表 |
| `ResourcePageRequest` | `/user/resource/page` | `AbstractGetRequest` | `ResourcePageQuery` | 分页查询应用资源 |
| `ResourceTreeQueryRequest` | `/user/resource/tree` | `AbstractGetRequest` | `ResourceTreeRequest` | 查询应用资源列表 |
| `ResourceUpdateRequest` | `/user/resource/` | `AbstractPutRequest` | `AddResourceRequest` | 应用资源修改 |

## sms

| Request 类 | API URL | 请求类型 | DTO | 说明 |
|-----------|---------|---------|-----|------|
| `SendSmsRequest` | `/sms/send` | `AbstractPostRequest` | `` | 短信发送接口 |
| `SendSmsRequest2` | `/sms/sendWithContent` | `AbstractPostRequest` | `` | 短信发送接口v2 |
| `VerifySmsRequest` | `/sms/verify` | `AbstractPostRequest` | `` | 短信验证接口 |
| `VerifySmsRequest2` | `/sms/verifySms2` | `AbstractPostRequest` | `` | 短信验证接口v2 |

## staff

| Request 类 | API URL | 请求类型 | DTO | 说明 |
|-----------|---------|---------|-----|------|
| `OrganAdminListRequest` | `/user/staff/admin` | `AbstractGetRequest` | `StaffQuery` | 机构管理员查询 |
| `StaffAddRequest` | `/user/staff/` | `AbstractPostRequest` | `AddStaffRequest` | 员工新增 |
| `StaffBatchCreateRequest` | `/user/staff/batchCreateSdk` | `AbstractPostRequest` | `AddStaffRequest` | 员工批量新增 |
| `StaffBatchLogicDeleteRequest` | `/user/staff/batchLogicDelete` | `AbstractPostRequest` | `BatchDeleteStaffRequest` | 员工逻辑删除 |
| `StaffBatchRoleAssociateRequest` | `/user/staff/sysRole/associateRoleBatch` | `AbstractPostRequest` | `AssociateBatchStaffRoleRequest` | 批量员工和多系统角色关联 |
| `StaffDeptManagerRequest` | `/user/staff/deptManager?staffId=` | `AbstractGetRequest` | `` | 员工部门领导 |
| `StaffDeptManagersRequest` | `/user/staff/deptManagers?staffId=` | `AbstractGetRequest` | `` | 员工所有部门领导及上级部门领导 |
| `StaffDirectLeaderRequest` | `/user/staff/directLeader?staffId=` | `AbstractGetRequest` | `` | 员工直属领导 |
| `StaffDirectLeadersRequest` | `/user/staff/directLeaders?staffId=` | `AbstractGetRequest` | `` | 员工所有直属领导及上级领导 |
| `StaffFindByAuthIdRequest` | `/user/staff/findStaffByAuthId` | `AbstractGetRequest` | `` | 根据authId查询系统员工 |
| `StaffFindByIdRequest` | `/user/staff/` | `AbstractGetRequest` | `` | 根据id查询员工 |
| `StaffFindListRequest` | `/user/staff/findList` | `AbstractGetRequest` | `StaffQuery` | 员工查询 |
| `StaffLogicDeleteRequest` | `/user/staff/logicDelete` | `AbstractPostRequest` | `AddStaffRequest` | 员工逻辑删除 |
| `StaffPageByNamePhoneEmailRequest` | `/user/staff/findStaffByUserNamePhoneEmail` | `AbstractGetRequest` | `StaffPageByNamePhoneEmailQuery` | 用户名/手机号/邮箱地址查询所在单位的员工 |
| `StaffPageQueryRequest` | `/user/staff/page` | `AbstractGetRequest` | `StaffPageQuery` | 员工分页查询 |
| `StaffResourceAssociateRequest` | `/user/staff/resource/associate` | `AbstractPostRequest` | `AssociateStaffResRequest` | 员工和资源关联 |
| `StaffResourceQueryRequest` | `/user/staff/queryStaffResources` | `AbstractGetRequest` | `StaffResourceQuery` | 员工查询关联资源 |
| `StaffResourceTreeQueryRequest` | `/user/staff/queryStaffResourcesTree` | `AbstractGetRequest` | `StaffResourceQuery` | 员工查询关联资源 |
| `StaffRoleAssociateRequest` | `/user/staff/sysRole/associate` | `AbstractPostRequest` | `AddStaffRequest` | 员工和角色关联 |
| `StaffRoleBatchAssociateRequest` | `/user/staff/sysRole/associateBatch` | `AbstractPostRequest` | `AssociateBatchStaffRoleRequest` | 员工和角色关联 |
| `StaffRoleQueryRequest` | `/user/staff/queryStaffRoles` | `AbstractGetRequest` | `StaffQuery` | 员工查询关联角色 |
| `StaffUpdateNewRequest` | `/user/staff/update` | `AbstractPostRequest` | `AddStaffRequest` | 员工新增 |
| `StaffUserAddRequest` | `/user/staff/addUserStaff` | `AbstractPostRequest` | `AddStaffRequest` | 员工用户新增 |
| `StaffUserBatchAddRequest` | `/user/staff/batchAddUserStaff` | `AbstractPostRequest` | `AddStaffUserRequest` | 员工用户新增 |
| `StaffUserInfoUpdateRequest` | `/user/staff/updateUserInfo` | `AbstractPostRequest` | `UpdateStaffUserInfoRequest` | 员工修改 |

## sysArea

| Request 类 | API URL | 请求类型 | DTO | 说明 |
|-----------|---------|---------|-----|------|
| `AreaFindByIdRequest` | `/user/sysArea/` | `AbstractGetRequest` | `` | 根据id查询机构角色信息 |
| `AreaQueryRequest` | `/user/sysArea/query` | `AbstractGetRequest` | `AreaQuery` | 查询区域 |
| `AreaTreeRequest` | `/user/sysArea/tree` | `AbstractGetRequest` | `SysAreaTreeQuery` | 系统区域树形结构查询 |
| `SubAreaRequest` | `/user/sysArea/subArea` | `AbstractGetRequest` | `SubAreaQuery` | 系统子区域查询 |

## sysDept

| Request 类 | API URL | 请求类型 | DTO | 说明 |
|-----------|---------|---------|-----|------|
| `SysDeptAddRequest` | `/user/sysDept/` | `AbstractPostRequest` | `AddSysDeptRequest` | 系统部门新增 |
| `SysDeptAncestorRequest` | `/user/sysDept/ancestor/` | `AbstractGetRequest` | `` | 根据系统部门id查询系统部门祖先节点 |
| `SysDeptBatchAddRequest` | `/user/sysDept/batchCreateSdk` | `AbstractPostRequest` | `AddSysDeptRequest` | 系统部门批量新增 |
| `SysDeptBatchDeleteRequest` | `/user/sysDept/batchLogicDelete` | `AbstractPostRequest` | `BatchDeleteSysDeptRequest` | 系统部门逻辑删除 |
| `SysDeptDeleteRequest` | `/user/sysDept/logicDelete` | `AbstractPostRequest` | `DeleteOrganizationRequest` | 系统部门逻辑删除 |
| `SysDeptFindByIdRequest` | `/user/sysDept/` | `AbstractGetRequest` | `` | 根据系统部门id查询系统部门信息 |
| `SysDeptListRequest` | `/user/sysDept/list` | `AbstractGetRequest` | `SysDeptQuery` | 系统部门列表查询 |
| `SysDeptPageRequest` | `/user/sysDept/page` | `AbstractGetRequest` | `SysDeptPageQuery` | 系统部门列表分页查询 |
| `SysDeptStaffCountRequest` | `/user/sysDept/sysStaff/count` | `AbstractGetRequest` | `SysDeptStaffQuery` | 系统部门员工统计 |
| `SysDeptStaffListRequest` | `/user/sysDept/sysStaff` | `AbstractGetRequest` | `OrganizationQuery` | 系统部门员工列表查询 |
| `SysDeptTreeRequest` | `/user/sysDept/tree` | `AbstractGetRequest` | `SysDeptTreeQuery` | 根据组织id查询组织部门树 |
| `SysDeptUpdateRequest` | `/user/sysDept/` | `AbstractPutRequest` | `UpdateSysDeptRequest` | 系统部门修改 |

## sysDuty

| Request 类 | API URL | 请求类型 | DTO | 说明 |
|-----------|---------|---------|-----|------|
| `SysDutyAddRequest` | `/user/sysDuty/` | `AbstractPostRequest` | `AddSysDeptRequest` | 系统岗位新增 |
| `SysDutyDeleteRequest` | `/user/sysDuty/logicDelete` | `AbstractPostRequest` | `DeleteSysDeptRequest` | 系统岗位逻辑删除 |
| `SysDutyFindByIdRequest` | `/user/sysDuty/` | `AbstractGetRequest` | `` | 根据系统岗位id查询系统岗位信息 |
| `SysDutyListRequest` | `/user/sysDuty/list` | `AbstractGetRequest` | `SysDutyPageQuery` | 分页查询系统岗位 |
| `SysDutyPageRequest` | `/user/sysDuty/page` | `AbstractGetRequest` | `SysDutyPageQuery` | 分页查询系统岗位 |
| `SysDutyStaffAssociateRequest` | `/user/sysDuty/sysStaff/associate` | `AbstractPostRequest` | `AssociateStaffDutyRequest` | 分配系统员工岗位 |
| `SysDutyStaffInRequest` | `/user/sysDuty/staffInDuty` | `AbstractGetRequest` | `StaffInDutyRequest` | 查询岗位关联的员工 |
| `SysDutyUpdateRequest` | `/user/sysDuty/` | `AbstractPutRequest` | `UpdateSysDeptRequest` | 系统岗位修改 |

## sysRole

| Request 类 | API URL | 请求类型 | DTO | 说明 |
|-----------|---------|---------|-----|------|
| `BatchSysRoleDeleteRequest` | `/user/sysRole/batchLogicDelete` | `AbstractPostRequest` | `BatchDeleteSysRoleRequest` | 批量系统员工角色删除 |
| `BatchSysRoleStaffAssociateRequest` | `/user/sysRole/sysStaff/batchAssociate` | `AbstractPostRequest` | `AssociateBatchSysStaffRequest` | 系统角色和多系统员工关联 |
| `DefaultSysRoleAddRequest` | `/user/sysRole/addDefaultRole` | `AbstractPostRequest` | `AddDefaultSysRoleRequest` | 内置系统员工角色新增 |
| `DefaultSysRolePageRequest` | `/user/sysRole/defaultRolePage` | `AbstractGetRequest` | `DefaultSysRolePageQuery` | 分页查询系统内置角色 |
| `QueryAppInstByAppInstSigns` | `/application/findAppInstsBySignsQuery` | `AbstractPostRequest` | `` | 批量按应用实例标识查询应用实例信息 post 接口 |
| `SysRoleAddRequest` | `/user/sysRole/` | `AbstractPostRequest` | `AddOrgRoleRequest` | 系统员工角色新增 |
| `SysRoleDeleteRequest` | `/user/sysRole/logicDelete` | `AbstractPostRequest` | `DeleteOrgRoleRequest` | 系统员工角色删除 |
| `SysRoleFindByIdRequest` | `/user/sysRole/` | `AbstractGetRequest` | `` | 根据id查询机构角色信息 |
| `SysRoleGroupTreeRequest` | `/user/sysRoleGroup/roleTree` | `AbstractGetRequest` | `SysRoleGroupTreeQuery` | 查询角色组详情 |
| `SysRoleListRequest` | `/user/sysRole/list` | `AbstractGetRequest` | `SysRoleQuery` | 查询机构角色列表 |
| `SysRoleListResourceRequest` | `/user/sysRole/resource` | `AbstractGetRequest` | `SysRoleResourcesQuery` | 查询系统员工角色集合关联的资源集合 |
| `SysRolePageRequest` | `/user/sysRole/page` | `AbstractGetRequest` | `SysRolePageQuery` | 分页查询机构角色 |
| `SysRoleResourceAssociateRequest` | `/user/sysRole/resource/associate` | `AbstractPostRequest` | `AssociateSysRoleResRequest` | 系统应用角色关联资源 |
| `SysRoleResourceRequest` | `/user/sysRole/resource/` | `AbstractGetRequest` | `OrgRoleResourcesQuery` | 分页查询机构角色 |
| `SysRoleResourceTreeRequest` | `/user/sysRole/resourceTree` | `AbstractGetRequest` | `` | 分页查询机构角色 |
| `SysRoleStaffDisassociateRequest` | `/user/sysRole/staff/disassociate` | `AbstractPostRequest` | `AssociateSysRoleResRequest` | 系统角色和员工解除绑定 |
| `SysRoleStaffRequest` | `/user/sysRole/associateStaffList` | `AbstractGetRequest` | `SysRoleAssociateStaffQuery` | 查询角色关联的人员 |
| `SysRoleUpdateRequest` | `/user/sysRole/` | `AbstractPutRequest` | `UpdateSysRoleRequest` | 系统员工角色修改 |

## user

| Request 类 | API URL | 请求类型 | DTO | 说明 |
|-----------|---------|---------|-----|------|
| `ChangeUserCurrentOrganizationRequest` | `/user/user/changeOrganization` | `AbstractPostRequest` | `AddUserRequest` | 用户新增 |
| `ObtainDataPermissionRuleRequest` | `/user/data/permission/obtain` | `AbstractPostRequest` | `DataPermissionRuleRequest` | 获取用户数据权限 |
| `UserAddRequest` | `/user/user/` | `AbstractPostRequest` | `AddUserRequest` | 用户新增 |
| `UserBatchAddRequest` | `/user/user/batchCreateSdk` | `AbstractPostRequest` | `AddUserRequest` | 用户批量新增 |
| `UserBatchFindOrganizationListRequest` | `/user/user/batchFindOrganizationList` | `AbstractPostRequest` | `UserQuery` | 批量查询用户所在的机构列表 |
| `UserCurrentOrganizationRequest` | `/user/user/currentOrganization?authId=` | `AbstractGetRequest` | `UserQuery` | 查询用户所在的机构 |
| `UserOrgPurchasedAppRequest` | `/user/user/orgPurchasedApp` | `AbstractPostRequest` | `` | 用户所在单位已购应用 |

## userrole

| Request 类 | API URL | 请求类型 | DTO | 说明 |
|-----------|---------|---------|-----|------|
| `QueryUserResourceRequest` | `/user/userRole/user/resource` | `AbstractGetRequest` | `SysRoleAssociateStaffQuery` | 查询角色关联的人员 |
| `UserRoleAddRequest` | `/user/userRole/` | `AbstractPostRequest` | `AddSysRoleRequest` | 系统员工角色新增 |
| `UserRoleDeleteRequest` | `/user/userRole/logicDelete` | `AbstractPostRequest` | `DeleteSysRoleRequest` | 系统员工角色删除 |
| `UserRoleFindByIdRequest` | `/user/userRole/` | `AbstractGetRequest` | `` | 根据id查询机构角色信息 |
| `UserRoleListRequest` | `/user/userRole/list` | `AbstractGetRequest` | `SysRoleQuery` | 查询机构角色列表 |
| `UserRolePageRequest` | `/user/userRole/page` | `AbstractGetRequest` | `SysRolePageQuery` | 分页查询机构角色 |
| `UserRoleResourceAssociateRequest` | `/user/userRole/resource/associate` | `AbstractPostRequest` | `AssociateSysRoleResRequest` | 系统应用角色关联资源 |
| `UserRoleResourceRequest` | `/user/userRole/resource/` | `AbstractGetRequest` | `` | 分页查询机构角色 |
| `UserRoleResourceTreeRequest` | `/user/userRole/resourceTree` | `AbstractGetRequest` | `` | 分页查询机构角色 |
| `UserRoleStaffAssociateRequest` | `/user/userRole/user/associate` | `AbstractPostRequest` | `AssociateUserRoleRequest` | 系统角色和员工解除绑定 |
| `UserRoleStaffDisassociateRequest` | `/user/userRole/user/disassociate` | `AbstractPostRequest` | `DisassociateSysRoleStaffRequest` | 系统角色和员工解除绑定 |
| `UserRoleUpdateRequest` | `/user/userRole/` | `AbstractPutRequest` | `UpdateSysRoleRequest` | 系统员工角色修改 |


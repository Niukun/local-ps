# Organization API 文档

## organization

| Request 类 | API URL | 请求类型 | 说明 |
|-----------|---------|---------|------|
| `AccountRegisterRequest` | `/user/organization/registerAccount` | `AbstractPostRequest` | 机构开户+企业认证 |
| `AddLinkmanRequest` | `/user/organization/addLinkman` | `AbstractPostRequest` | 机构开户添加联系人 |
| `OrganizationAddRequest` | `/user/organization/` | `AbstractPostRequest` | 新增机构 |
| `OrganizationBatchAddProjectSourceRequest` | `/user/organization/batchCreateOrganizationProjectSourceSdk` | `AbstractPostRequest` | 批量维护机构项目关系 |
| `OrganizationBatchAddRequest` | `/user/organization/batchCreateSdk` | `AbstractPostRequest` | 批量新增机构 |
| `OrganizationBatchOpenAcctRequest` | `/user/organization/openAccountBatch` | `AbstractPostRequest` | 批量新增机构 |
| `OrganizationDeleteRequest` | `/user/organization/logicDelete` | `AbstractPostRequest` | 机构逻辑删除 |
| `OrganizationDetailRequest` | `/user/organization/detail/` | `AbstractGetRequest` | 机构详情查询 |
| `OrganizationLegalUserQueryRequest` | `/user/organization/queryOrganizationLegalUser/` | `AbstractGetRequest` | 查询默认机构信息 |
| `OrganizationListByProjectSourceRequest` | `/user/organization/findListByProjectSource` | `AbstractGetRequest` | 查询项目下机构列表 |
| `OrganizationListByQueryRequest` | `/user/organization/findList` | `AbstractGetRequest` | 机构列表查询 |
| `OrganizationNameExistRequest` | `/user/organization/orgNameExist` | `AbstractGetRequest` | 机构名是否存在 |
| `OrganizationOpenAcctRequest` | `/user/organization/openAccount` | `AbstractPostRequest` | 机构开户 |
| `OrganizationPageQueryRequest` | `/user/organization/page` | `AbstractGetRequest` | 机构分页查询 |
| `OrganizationResourceQueryRequest` | `/user/organization/queryOrganizationResource` | `AbstractGetRequest` | 机构角色关联 |
| `OrganizationResourceTreeRequest` | `/user/organization/queryOrganizationResourceTree` | `AbstractGetRequest` | 机构角色关联 |
| `OrganizationRoleAssociateRequest` | `/user/organization/orgRole/associate` | `AbstractPostRequest` | 分配机构角色 |
| `OrganizationRoleQueryRequest` | `/user/organization/queryOrganizationRole` | `AbstractGetRequest` | 机构角色关联 |
| `OrganizationTreeFormatRequest` | `/user/organization/treeFormat` | `AbstractGetRequest` | 机构树查询 |
| `OrganizationTreeRequest` | `/user/organization/tree` | `AbstractGetRequest` | 机构树查询 |
| `OrganizationUpdateAcctRequest` | `/user/organization/updateAccount` | `AbstractPostRequest` | 机构开户信息修改 |
| `OrganizationUpdateProjectSourceRequest` | `/user/organization/updateOrganizationProjectSource` | `AbstractPostRequest` | 修改机构项目编号 |
| `OrganizationUpdateRequest` | `/user/organization/` | `AbstractPutRequest` | 机构修改 |
| `QueryDefaultOrganizationIdRequest` | `/user/userDefaultOrganization/findDefaultOrganizationId` | `AbstractGetRequest` | 查询默认机构信息 |
| `UpdateDefaultOrgForWebRequest` | `/user/userDefaultOrganization/updateDefaultOrgForWeb` | `AbstractPostRequest` | 按 authId 和 deploySign 进行修改 |
| `UpdateDefaultOrganizationRequest` | `/user/userDefaultOrganization/updateDefaultOrganization` | `AbstractPostRequest` | 设置默认机构 |


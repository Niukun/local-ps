# Staff API 文档

## staff

| Request 类 | API URL | 请求类型 | 说明 |
|-----------|---------|---------|------|
| `OrganAdminListRequest` | `/user/staff/admin` | `AbstractGetRequest` | 机构管理员查询 |
| `StaffAddRequest` | `/user/staff/` | `AbstractPostRequest` | 员工新增 |
| `StaffBatchCreateRequest` | `/user/staff/batchCreateSdk` | `AbstractPostRequest` | 员工批量新增 |
| `StaffBatchLogicDeleteRequest` | `/user/staff/batchLogicDelete` | `AbstractPostRequest` | 员工逻辑删除 |
| `StaffBatchRoleAssociateRequest` | `/user/staff/sysRole/associateRoleBatch` | `AbstractPostRequest` | 批量员工和多系统角色关联 |
| `StaffDeptManagerRequest` | `/user/staff/deptManager?staffId=` | `AbstractGetRequest` | 员工部门领导 |
| `StaffDeptManagersRequest` | `/user/staff/deptManagers?staffId=` | `AbstractGetRequest` | 员工所有部门领导及上级部门领导 |
| `StaffDirectLeaderRequest` | `/user/staff/directLeader?staffId=` | `AbstractGetRequest` | 员工直属领导 |
| `StaffDirectLeadersRequest` | `/user/staff/directLeaders?staffId=` | `AbstractGetRequest` | 员工所有直属领导及上级领导 |
| `StaffFindByAuthIdRequest` | `/user/staff/findStaffByAuthId` | `AbstractGetRequest` | 根据authId查询系统员工 |
| `StaffFindByIdRequest` | `/user/staff/` | `AbstractGetRequest` | 根据id查询员工 |
| `StaffFindListRequest` | `/user/staff/findList` | `AbstractGetRequest` | 员工查询 |
| `StaffLogicDeleteRequest` | `/user/staff/logicDelete` | `AbstractPostRequest` | 员工逻辑删除 |
| `StaffPageByNamePhoneEmailRequest` | `/user/staff/findStaffByUserNamePhoneEmail` | `AbstractGetRequest` | 用户名/手机号/邮箱地址查询所在单位的员工 |
| `StaffPageQueryRequest` | `/user/staff/page` | `AbstractGetRequest` | 员工分页查询 |
| `StaffResourceAssociateRequest` | `/user/staff/resource/associate` | `AbstractPostRequest` | 员工和资源关联 |
| `StaffResourceQueryRequest` | `/user/staff/queryStaffResources` | `AbstractGetRequest` | 员工查询关联资源 |
| `StaffResourceTreeQueryRequest` | `/user/staff/queryStaffResourcesTree` | `AbstractGetRequest` | 员工查询关联资源 |
| `StaffRoleAssociateRequest` | `/user/staff/sysRole/associate` | `AbstractPostRequest` | 员工和角色关联 |
| `StaffRoleBatchAssociateRequest` | `/user/staff/sysRole/associateBatch` | `AbstractPostRequest` | 员工和角色关联 |
| `StaffRoleQueryRequest` | `/user/staff/queryStaffRoles` | `AbstractGetRequest` | 员工查询关联角色 |
| `StaffUpdateNewRequest` | `/user/staff/update` | `AbstractPostRequest` | 员工新增 |
| `StaffUserAddRequest` | `/user/staff/addUserStaff` | `AbstractPostRequest` | 员工用户新增 |
| `StaffUserBatchAddRequest` | `/user/staff/batchAddUserStaff` | `AbstractPostRequest` | 员工用户新增 |
| `StaffUserInfoUpdateRequest` | `/user/staff/updateUserInfo` | `AbstractPostRequest` | 员工修改 |


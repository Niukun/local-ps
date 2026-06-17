# Organarchitecture API 文档

## organArchitecture

| Request 类 | API URL | 请求类型 | 说明 |
|-----------|---------|---------|------|
| `"/"` | `AbstractGetRequest` | `` |  |
| `GetOrgStaffListRequest` | `/user/mixOrganization/staff/findList` | `AbstractGetRequest` | @Description |
| `GetOrganArchitectureCountStaffRequest` | `/user/mixOrganization/countStaff` | `AbstractGetRequest` | @Description |
| `GetOrganArchitectureDetailRequest` | `/user/mixOrganization/detail/` | `AbstractGetRequest` | @Description |
| `GetOrganArchitectureRemoteStaffListRequest` | `/user/mixOrganization/remote/getStaffList` | `AbstractGetRequest` | @Description 获取远程员工列表 |
| `OrganArchitectureAddRequest` | `/user/mixOrganization/add` | `AbstractPostRequest` | @Description |
| `OrganArchitectureLogicDeleteRequest` | `/user/mixOrganization/logicDelete` | `AbstractPostRequest` | @Description |
| `OrganArchitectureRemoteImportUserRequest` | `/user/mixOrganization/remote/importUser` | `AbstractPostRequest` | @Description 导入远程成员 |
| `OrganArchitectureStaffListPageRequest` | `/user/mixOrganization/getStaffPage` | `AbstractGetRequest` | @Description |
| `OrganArchitectureTreeFormatRequest` | `/user/mixOrganization/getOrganizationTree` | `AbstractGetRequest` | @Description |
| `OrganArchitectureUpdateRequest` | `/user/mixOrganization/update` | `AbstractPutRequest` | @Description |
| `OrganArchitectureUpdateStaffRequest` | `/user/mixOrganization/updateStaff` | `AbstractPostRequest` | @Description 组织架构修改员工 |
| `OrganArchitectureWithSubOrgListRequest` | `/user/mixOrganization/getOrganizationWithSubOrgList?organizationId=` | `AbstractGetRequest` | @Description |

## organNode

| Request 类 | API URL | 请求类型 | 说明 |
|-----------|---------|---------|------|
| `OrganNodeAddRequest` | `/user/orgTypeNode/` | `AbstractPostRequest` | 系统节点 |
| `OrganNodeAddStaffRequest` | `/user/orgTypeNode/addStaff` | `AbstractPostRequest` | 新增节点人员 |
| `OrganNodeBatchAddRequest` | `/user/orgTypeNode/createBatch` | `AbstractPostRequest` | 批量新增 |
| `OrganNodeBatchRemoveStaffRequest` | `/user/orgTypeNode/batchRemoveStaff` | `AbstractPostRequest` | 从组织架构维度节点批量移除员工 |
| `OrganNodeDeleteRequest` | `/user/orgTypeNode/delete` | `AbstractPostRequest` | 系统部门逻辑删除 |
| `OrganNodeDetailRequest` | `/user/orgTypeNode/detail?id=` | `AbstractGetRequest` | 详情查询 |
| `OrganNodeFindOrgTypeStaffListRequest` | `/user/orgTypeNode/listOrgTypeStaff/` | `AbstractGetRequest` | 列表查询 |
| `OrganNodeListByStaffRequest` | `/user/orgTypeNode/listByStaff` | `AbstractGetRequest` | 按员工id获取组织架构维度列表 |
| `OrganNodePageRequest` | `/user/orgTypeNode/page` | `AbstractGetRequest` | 根据组织id查询组织部门分页列表 |
| `OrganNodeRemoveStaffRequest` | `/user/orgTypeNode/removeStaff` | `AbstractPostRequest` | 系统部门新增 |
| `OrganNodeStaffListRequest` | `/user/orgTypeNode/listStaff` | `AbstractGetRequest` | 列表查询 |
| `OrganNodeStaffPageRequest` | `/user/orgTypeNode/pageStaff` | `AbstractGetRequest` | 分页查询 |
| `OrganNodeTreeRequest` | `/user/orgTypeNode/tree` | `AbstractGetRequest` | 根据组织id查询组织部门树 |
| `OrganNodeUpdateRequest` | `/user/orgTypeNode/` | `AbstractPutRequest` | 修改节点 |

## organType

| Request 类 | API URL | 请求类型 | 说明 |
|-----------|---------|---------|------|
| `OrganTypeAddRequest` | `/user/orgType/` | `AbstractPostRequest` | 系统节点 |
| `OrganTypeDeleteRequest` | `/user/orgType/logicDelete` | `AbstractPostRequest` | 系统部门逻辑删除 |
| `OrganTypeDetailRequest` | `/user/orgType/detail?id=` | `AbstractGetRequest` | 详情查询 |
| `OrganTypeListRequest` | `/user/orgType/list` | `AbstractGetRequest` | 列表查询 |
| `OrganTypePageRequest` | `/user/orgType/page` | `AbstractGetRequest` | 分页查询 |
| `OrganTypeUpdateRequest` | `/user/orgType/` | `AbstractPutRequest` | 修改节点 |

## organizationTree

| Request 类 | API URL | 请求类型 | 说明 |
|-----------|---------|---------|------|
| `FindAllChildrenOrganizationsByOrganizationIdRequest` | `/user/organizationTree/findAllChildrenOrganizationsByOrganizationId` | `AbstractGetRequest` | 根据单位id查询所有子单位列表 |
| `GetAllChildrenOrganizationsByOrganizationIdRequest` | `/user/organizationTree/getAllChildrenOrganizationsByOrganizationId` | `AbstractGetRequest` | 根据单位id查询所有子单位列表 |


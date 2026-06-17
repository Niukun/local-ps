# Resource API 文档

## resource

| Request 类 | API URL | 请求类型 | 说明 |
|-----------|---------|---------|------|
| `BatchResourceDeleteRequest` | `/user/resource/batchLogicDelete` | `AbstractPostRequest` | 批量应用资源新增 |
| `GetSubResourceIdsRequest` | `/user/resource/getSubResourceIds/` | `AbstractGetRequest` | 根据id查询应用资源 |
| `ResourceAddRequest` | `/user/resource/` | `AbstractPostRequest` | 应用资源新增 |
| `ResourceDeleteRequest` | `/user/resource/logicDelete` | `AbstractPostRequest` | 应用资源新增 |
| `ResourceFindByIdRequest` | `/user/resource/` | `AbstractGetRequest` | 根据id查询应用资源 |
| `ResourceListRequest` | `/user/resource/list` | `AbstractGetRequest` | 查询应用资源列表 |
| `ResourcePageRequest` | `/user/resource/page` | `AbstractGetRequest` | 分页查询应用资源 |
| `ResourceTreeQueryRequest` | `/user/resource/tree` | `AbstractGetRequest` | 查询应用资源列表 |
| `ResourceUpdateRequest` | `/user/resource/` | `AbstractPutRequest` | 应用资源修改 |

## relation

| Request 类 | API URL | 请求类型 | 说明 |
|-----------|---------|---------|------|
| `RoleResourceRelationRequest` | `/user/relation/roleAndResource` | `AbstractGetRequest` | 角色资源关联数据 |
| `StaffResourceRelationRequest` | `/user/relation/staffAndResource` | `AbstractGetRequest` | 员工资源关联数据 |
| `StaffRoleRelationRequest` | `/user/relation/staffAndRole` | `AbstractGetRequest` | 员工角色关联数据 |


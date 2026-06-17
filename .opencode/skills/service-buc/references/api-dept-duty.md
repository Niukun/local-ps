# Dept Duty API 文档

## sysDept

| Request 类 | API URL | 请求类型 | 说明 |
|-----------|---------|---------|------|
| `SysDeptAddRequest` | `/user/sysDept/` | `AbstractPostRequest` | 系统部门新增 |
| `SysDeptAncestorRequest` | `/user/sysDept/ancestor/` | `AbstractGetRequest` | 根据系统部门id查询系统部门祖先节点 |
| `SysDeptBatchAddRequest` | `/user/sysDept/batchCreateSdk` | `AbstractPostRequest` | 系统部门批量新增 |
| `SysDeptBatchDeleteRequest` | `/user/sysDept/batchLogicDelete` | `AbstractPostRequest` | 系统部门逻辑删除 |
| `SysDeptDeleteRequest` | `/user/sysDept/logicDelete` | `AbstractPostRequest` | 系统部门逻辑删除 |
| `SysDeptFindByIdRequest` | `/user/sysDept/` | `AbstractGetRequest` | 根据系统部门id查询系统部门信息 |
| `SysDeptListRequest` | `/user/sysDept/list` | `AbstractGetRequest` | 系统部门列表查询 |
| `SysDeptPageRequest` | `/user/sysDept/page` | `AbstractGetRequest` | 系统部门列表分页查询 |
| `SysDeptStaffCountRequest` | `/user/sysDept/sysStaff/count` | `AbstractGetRequest` | 系统部门员工统计 |
| `SysDeptStaffListRequest` | `/user/sysDept/sysStaff` | `AbstractGetRequest` | 系统部门员工列表查询 |
| `SysDeptTreeRequest` | `/user/sysDept/tree` | `AbstractGetRequest` | 根据组织id查询组织部门树 |
| `SysDeptUpdateRequest` | `/user/sysDept/` | `AbstractPutRequest` | 系统部门修改 |

## sysDuty

| Request 类 | API URL | 请求类型 | 说明 |
|-----------|---------|---------|------|
| `SysDutyAddRequest` | `/user/sysDuty/` | `AbstractPostRequest` | 系统岗位新增 |
| `SysDutyDeleteRequest` | `/user/sysDuty/logicDelete` | `AbstractPostRequest` | 系统岗位逻辑删除 |
| `SysDutyFindByIdRequest` | `/user/sysDuty/` | `AbstractGetRequest` | 根据系统岗位id查询系统岗位信息 |
| `SysDutyListRequest` | `/user/sysDuty/list` | `AbstractGetRequest` | 分页查询系统岗位 |
| `SysDutyPageRequest` | `/user/sysDuty/page` | `AbstractGetRequest` | 分页查询系统岗位 |
| `SysDutyStaffAssociateRequest` | `/user/sysDuty/sysStaff/associate` | `AbstractPostRequest` | 分配系统员工岗位 |
| `SysDutyStaffInRequest` | `/user/sysDuty/staffInDuty` | `AbstractGetRequest` | 查询岗位关联的员工 |
| `SysDutyUpdateRequest` | `/user/sysDuty/` | `AbstractPutRequest` | 系统岗位修改 |


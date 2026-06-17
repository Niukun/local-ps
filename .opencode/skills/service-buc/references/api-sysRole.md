# Sysrole API 文档

## sysRole

| Request 类 | API URL | 请求类型 | 说明 |
|-----------|---------|---------|------|
| `BatchSysRoleDeleteRequest` | `/user/sysRole/batchLogicDelete` | `AbstractPostRequest` | 批量系统员工角色删除 |
| `BatchSysRoleStaffAssociateRequest` | `/user/sysRole/sysStaff/batchAssociate` | `AbstractPostRequest` | 系统角色和多系统员工关联 |
| `DefaultSysRoleAddRequest` | `/user/sysRole/addDefaultRole` | `AbstractPostRequest` | 内置系统员工角色新增 |
| `DefaultSysRolePageRequest` | `/user/sysRole/defaultRolePage` | `AbstractGetRequest` | 分页查询系统内置角色 |
| `QueryAppInstByAppInstSigns` | `/application/findAppInstsBySignsQuery` | `AbstractPostRequest` | 批量按应用实例标识查询应用实例信息 post 接口 |
| `SysRoleAddRequest` | `/user/sysRole/` | `AbstractPostRequest` | 系统员工角色新增 |
| `SysRoleDeleteRequest` | `/user/sysRole/logicDelete` | `AbstractPostRequest` | 系统员工角色删除 |
| `SysRoleFindByIdRequest` | `/user/sysRole/` | `AbstractGetRequest` | 根据id查询机构角色信息 |
| `SysRoleGroupTreeRequest` | `/user/sysRoleGroup/roleTree` | `AbstractGetRequest` | 查询角色组详情 |
| `SysRoleListRequest` | `/user/sysRole/list` | `AbstractGetRequest` | 查询机构角色列表 |
| `SysRoleListResourceRequest` | `/user/sysRole/resource` | `AbstractGetRequest` | 查询系统员工角色集合关联的资源集合 |
| `SysRolePageRequest` | `/user/sysRole/page` | `AbstractGetRequest` | 分页查询机构角色 |
| `SysRoleResourceAssociateRequest` | `/user/sysRole/resource/associate` | `AbstractPostRequest` | 系统应用角色关联资源 |
| `SysRoleResourceRequest` | `/user/sysRole/resource/` | `AbstractGetRequest` | 分页查询机构角色 |
| `SysRoleResourceTreeRequest` | `/user/sysRole/resourceTree` | `AbstractGetRequest` | 分页查询机构角色 |
| `SysRoleStaffDisassociateRequest` | `/user/sysRole/staff/disassociate` | `AbstractPostRequest` | 系统角色和员工解除绑定 |
| `SysRoleStaffRequest` | `/user/sysRole/associateStaffList` | `AbstractGetRequest` | 查询角色关联的人员 |
| `SysRoleUpdateRequest` | `/user/sysRole/` | `AbstractPutRequest` | 系统员工角色修改 |


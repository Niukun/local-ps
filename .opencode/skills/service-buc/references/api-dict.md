# Dict API 文档

## SysDictData

| Request 类 | API URL | 请求类型 | 说明 |
|-----------|---------|---------|------|
| `BatchSysDictDataDeleteRequest` | `/user/system/dict/data/batchRemove` | `AbstractPostRequest` | 系统员工角色删除 |
| `SysDictDataAddRequest` | `/user/system/dict/data/add` | `AbstractPostRequest` | SysDictData新增/修改 |
| `SysDictDataDeleteRequest` | `/user/system/dict/data/remove/` | `AbstractGetRequest` | 系统员工角色删除 |
| `SysDictDataFindByDictCodeRequest` | `/user/system/dict/data/` | `AbstractGetRequest` | 查询字典数据详细 |
| `SysDictDataFindByDictTypeRequest` | `/user/system/dict/data/type/` | `AbstractGetRequest` | 根据字典类型查询字典数据信息 |
| `SysDictDataPageRequest` | `/user/system/dict/data/list` | `AbstractGetRequest` | 分页查询 |
| `SysDictDataUpdateRequest` | `/user/system/dict/data/edit` | `AbstractPostRequest` | SysDictData新增/修改 |

## SysDictType

| Request 类 | API URL | 请求类型 | 说明 |
|-----------|---------|---------|------|
| `BatchSysDictTypeDeleteRequest` | `/user/system/dict/type/batchRemove` | `AbstractPostRequest` | 系统员工角色删除 |
| `SysDictTypeAddRequest` | `/user/system/dict/type/add` | `AbstractPostRequest` | SysDictData新增/修改 |
| `SysDictTypeDeleteRequest` | `/user/system/dict/type/remove/` | `AbstractGetRequest` | 系统员工角色删除 |
| `SysDictTypeFindByDictIdRequest` | `/user/system/dict/type/getInfo/` | `AbstractGetRequest` | 查询字典数据详细 |
| `SysDictTypeFindByDictTypeRequest` | `/user/system/dict/type/` | `AbstractGetRequest` | 根据字典类型查询字典数据信息 |
| `SysDictTypeOptionSelectRequest` | `/user/system/dict/type/optionselect` | `AbstractGetRequest` | 分页查询 |
| `SysDictTypePageRequest` | `/user/system/dict/type/list` | `AbstractGetRequest` | 分页查询 |
| `SysDictTypeUpdateRequest` | `/user/system/dict/type/edit` | `AbstractPostRequest` | SysDictData新增/修改 |


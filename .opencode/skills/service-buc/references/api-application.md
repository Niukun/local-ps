# Application API 文档

## application

| Request 类 | API URL | 请求类型 | 说明 |
|-----------|---------|---------|------|
| `AddAppAndAppInstRequest` | `/user/application/addApplicationAndApplicationInstance` | `AbstractPostRequest` | 新增应用和应用实例 |
| `AddApplicationInstanceRequest` | `/user/application/addApplicationInstance` | `AbstractPostRequest` | 新增应用实例 |
| `AddApplicationRequest` | `/user/application/addApplication` | `AbstractPostRequest` | 新增应用 |
| `AppAndAppInstanceCascadeRequest` | `/user/application/appAndAppInstanceCascade` | `AbstractPostRequest` | 应用&应用实例级联查询 |
| `ApplicationCascadeQuerySelectorRequest` | `/user/application/applicationCascadeQuerySelector` | `AbstractPostRequest` | 查询所有应用ByProdLine |
| `DeleteApplicationByApplicationIdRequest` | `/user/application/deleteApplicationByApplicationId` | `AbstractPostRequest` | 根据applicationId删除应用 |
| `DeleteApplicationInstanceRequest` | `/user/application/deleteApplicationInstance` | `AbstractPostRequest` | 根据applicationInstanceId删除应用 |
| `FindAllApplicationsByProductLineRequest` | `/user/application/ApplicationCascadeQuerySelector` | `AbstractPostRequest` | 查询所有应用ByProdLine |
| `FindApplicationInstanceWithPageRequest` | `/user/application/findApplicationInstanceWithPage` | `AbstractPostRequest` | 查询所有应用 |
| `QueryAllAppInstRequest` | `/user/application/findAllAppInst` | `AbstractPostRequest` | 获取所有应用实例 |
| `QueryAllApplicationsListRequest` | `/user/application/findAllApplicationsList` | `AbstractPostRequest` | 查询所有应用 |
| `QueryAllApplicationsRequest` | `/user/application/findAllApplications` | `AbstractPostRequest` | 查询所有应用 |
| `QueryAppInstByAppInstSignRequest` | `/user/application/getApplicationInstanceByApplicationInstanceSign` | `AbstractPostRequest` | 按单位ids查询对应应用实例list |
| `QueryAppInstByOrganIdAndBelongSourceRequest` | `/user/application/findAppInstByOrganIdAndBelongSource` | `AbstractPostRequest` | 按单位和项目查对应的应用实例 |
| `QueryAppInstBySigns` | `/user/application/findAppInstsBySigns` | `AbstractGetRequest` | 批量按应用实例标识查询应用实例信息 |
| `QueryAppInstNamesByAppNameRequest` | `/user/application/findApplicationInstanceNamesByApplicationName` | `AbstractPostRequest` | 按单位ids查询对应应用实例list |
| `QueryApplicationInstancesByOrganIdsRequest` | `/user/application/findApplicationInstancesByOrganIds` | `AbstractPostRequest` | 按单位ids查询对应应用实例list |
| `QueryApplicationInstancesByProjectRequest` | `/user/application/findApplicationInstancesByProject` | `AbstractPostRequest` | 按项目查对应的应用实例 |
| `QueryChannelsByProjectNosRequest` | `/user/application/findChannelsByProjectNos` | `AbstractPostRequest` | 按项目list查询通道配置list |
| `QueryProjectsByProductLineRequest` | `/user/application/findProjectsByProductLine` | `AbstractGetRequest` | 按产品线查询项目列表 |
| `UpdateAppAndAppInstRequest` | `/application/updateApplicationAndApplicationInstance` | `AbstractPostRequest` | 修改应用和应用实例 |
| `UpdateApplicationInstanceRequest` | `/user/application/updateApplicationInstance` | `AbstractPostRequest` | 修改应用实例 |
| `UpdateApplicationRequest` | `/user/application/updateApplication` | `AbstractPostRequest` | 修改应用 |


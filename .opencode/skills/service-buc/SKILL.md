---
name: service-buc
description: 美络云 BUC 用户中心。支持管理用户、机构、员工，配置角色权限、登录认证，维护应用、字典、部门、岗位等基础数据。当用户需要进行账号管理、组织架构维护、权限分配、登录对接等操作时激活。
---

## 服务概述

BUC（Business User Center）是美络云统一用户中心，提供用户全生命周期管理、机构组织管理、员工管理、认证授权、角色权限、登录与会话、应用管理、基础数据字典等核心能力的业务服务。

## 前置条件

### 1. 添加依赖

```xml
<dependency>
    <groupId>com.izkml</groupId>
    <artifactId>global-user-sdk</artifactId>
    <version>1.0.0-SNAPSHOT</version>
</dependency>

<!-- JsonResult 所在包，非 global-user-sdk 传递依赖，需单独添加 -->
<dependency>
    <groupId>com.izkml.mlyun.framework</groupId>
    <artifactId>mlyun-core-common</artifactId>
    <version>2.1.0-SNAPSHOT</version>
</dependency>
```

> **AI 注意**：添加 `mlyun-core-common` 前，先检查项目 `pom.xml` 是否已有该依赖（可能通过其他模块传递引入）。如果项目已有则无需重复添加。JsonResult 包路径：`com.izkml.mlyun.framework.common.result.JsonResult`。

> SDK 包路径：`DefaultMlyunClient` → `com.zkml.api.DefaultMlyunClient`，所有 Request 类统一使用 `New` 前缀版本，位于 `com.izkml.user.sdk.global.sdk.request.refactor` 子包下（如 `NewStaffFindByIdRequest`）。注意 `New` 前缀的 Request 类在对应模块的子包中，例如员工相关在 `.refactor.**staff**` 下。

### 2. 配置服务地址与应用实例标识

```yml
mlyun:
  ubs:
    business-uc:
      url: http://10.5.4.101:9988            # 业务用户中心地址，用于 SDK 日常接口调用
      application-inst-sign: f3a2b1c00610d4e8f7c-ZD-SAAS     # 应用实例标识，由 AI 自动生成，格式 {applicationSign}-{environment}
```

- `business-uc.url`: 业务用户中心地址，用于 SDK 接口调用
- `business-uc.application-inst-sign`: 应用实例标识，全局唯一，格式见下文

### 2. 配置客户端

```java
@Configuration
public class BucClientConfig {

    @Value("${mlyun.ubs.business-uc.url}")
    private String businessUcUrl;

    @Bean
    public DefaultMlyunClient bucClient() {
        return new DefaultMlyunClient(businessUcUrl);
    }
}
```

### 3. 调用示例

```java
@Autowired
private DefaultMlyunClient bucClient;

public void queryStaffDetail() {
    String staffId = "12345";
    NewStaffFindByIdRequest request = new NewStaffFindByIdRequest(staffId);
    MlyunResponse response = bucClient.execute(request);
    // response.getBody() 返回 JSON 字符串；response.isSuccess() 判断是否成功
    String body = response.getBody();
}
```

> **注意**：`execute()` 返回 `com.zkml.api.MlyunResponse`，不是 String。需要通过 `response.getBody()` 获取响应 JSON 字符串，`response.isSuccess()` 判断是否成功。`execute()` 会抛出 `com.zkml.api.ApiException`，需要 try-catch 或方法签名声明抛出。

## 业务前置条件

### 应用标识与应用实例标识

| 概念 | 说明 | 示例 |
|------|------|------|
| 应用名称 | 用户提供，如 "测试应用" | `测试应用` |
| 应用标识 Application Sign | AI 自动生成（uuid 19 位） | `f3a2b1c00610d4e8f7c` |
| 环境 Environment | 固定值 `ZD-SAAS` | `ZD-SAAS` |
| 应用实例标识 Application Inst Sign | `{applicationSign}-{environment}` | `f3a2b1c00610d4e8f7c-ZD-SAAS` |

标识规则：`applicationInstanceSign = applicationSign + "-" + environment`。applicationSign 由 AI 自动生成，environment 固定为 `ZD-SAAS`。

AI 自动生成 applicationSign（uuid 19 位 hex），不再要求用户提供标识。

### AI 自动初始化流程

业务方只需提供应用名称，AI 自动生成标识并完成初始化流程。

**步骤 1**：检查 `mlyun.ubs.business-uc.application-inst-sign` 是否已配置 → 已配置则跳过。

**步骤 2**：未配置时询问应用名称
> "请提供应用名称，例如：『测试应用』，我将自动生成标识并完成初始化。"

**步骤 3**：调用组织用户中心 `http://10.5.4.101:8100/user-sdk-global` 全流程初始化

```bash
# AI 自动生成的变量
APP_NAME="{用户提供的应用名称}"
APP_SIGN=$(python3 -c "import uuid; print(uuid.uuid4().hex[:19])")
ENVIRONMENT="ZD-SAAS"
APP_INST_SIGN="${APP_SIGN}-${ENVIRONMENT}"
DEFAULT_ORG_ID="7k0fmIx7zCDYqgkFTNW"
ORG_CENTER_URL="http://10.5.4.101:8100/user-sdk-global"

# 1. 查重 — 确认应用实例标识未被占用
curl -s "${ORG_CENTER_URL}/new/application/findAppInstsBySigns?applicationInstanceSigns=${APP_INST_SIGN}"
# → {"result":"success","code":200,"model":null} 表示不存在，可创建

# 2. 创建应用+应用实例（使用完整参数结构）
curl -s -X POST "${ORG_CENTER_URL}/new/application/addApplicationAndApplicationInstance" \
  -H "Content-Type: application/json" \
  -d '{
    "openUrl": "http://10.5.4.101:9988/sync",
    "environment": "'"${ENVIRONMENT}"'",
    "applicationSign": "'"${APP_SIGN}"'",
    "applicationInstanceName": "'"${APP_NAME}"'",
    "applicationDTO": {
      "applicationType": "INSIDE",
      "applicationSign": "'"${APP_SIGN}"'",
      "applicationProductLine": "JG",
      "applicationName": "'"${APP_NAME}"'"
    },
    "deploySign": "ZKML_ZHIDA_TEST",
    "applicationInstanceSign": "'"${APP_INST_SIGN}"'",
    "applicationProductLine": "JG"
  }'

# 3. 新建机构角色（注意：使用 /user/orgRole/ 非 /new/user/orgRole/）
ROLE_RESPONSE=$(curl -s -X POST "${ORG_CENTER_URL}/user/orgRole/" \
  -H "Content-Type: application/json" \
  -d '{
    "applicationInstSign": "'"${APP_INST_SIGN}"'",
    "roleName": "默认机构角色"
  }')
ROLE_ID=$(echo "$ROLE_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('model',''))")

# 4. 分配应用实例给默认机构（注意：使用 /user/orgAppInst/assign 非 /new/user/orgAppInst/assign）
curl -s -X POST "${ORG_CENTER_URL}/user/orgAppInst/assign" \
  -H "Content-Type: application/json" \
  -d '{
    "organizationId": "'"${DEFAULT_ORG_ID}"'",
    "applicationSign": "'"${APP_SIGN}"'",
    "applicationInstSign": "'"${APP_INST_SIGN}"'",
    "deploySign": "ZKML",
    "createDefaultRole": false,
    "staffId": "97f1c2e425ec43dd86b4f9498e87a6f8",
    "roleId": "'"${ROLE_ID}"'"
  }'

# 5. 写入项目配置 application.yml
# mlyun.ubs.business-uc.application-inst-sign: ${APP_INST_SIGN}
```

> **经验教训**：创建机构角色和分配应用实例的 API 路径**不带 `/new/` 前缀**，实际路径为 `/user/orgRole/` 和 `/user/orgAppInst/assign`。查重和创建应用实例的路径带 `/new/` 前缀。创建应用+应用实例时需要使用完整的参数结构（含 `applicationDTO`、`openUrl`、`deploySign` 等字段）。

**步骤 3**：初始化完成，继续执行业务操作。

### AI 行为规则

- 检查 `mlyun.ubs.business-uc.application-inst-sign` 配置，未配置则触发初始化
- 组织用户中心地址 `http://10.5.4.101:8100/user-sdk-global` AI 内部维护，不写入项目配置
- applicationSign 由 AI 自动生成（uuid 19 位 hex），不再询问用户标识
- 初始化完成写入配置后，后续交互不再重复

## 业务模块

| 模块 | 说明 |
|------|------|
| 用户管理 | 用户基本信息增删改查、批量操作 |
| 机构管理 | 机构增删改查、树形结构、开户、关联联系人 |
| 员工管理 | 员工增删改查、角色关联、资源授权、跨机构、领导查询 |
| 系统角色 | 角色增删改查、资源关联、员工关联、默认角色 |
| 用户-角色 | 用户与角色关联、资源查询 |
| 认证管理 | 用户名/手机号/第三方认证注册、登录日志、密码管理 |
| 登录与会话 | 多种登录方式、token 管理、验证码、SSO |
| 应用管理 | 应用与应用实例增删改查、部署管理 |
| 资源/菜单 | 资源树管理、菜单权限 |
| 部门管理 | 部门增删改查、树形结构 |
| 岗位管理 | 岗位增删改查、员工关联 |
| 字典管理 | 字典类型与数据维护 |
| 组织架构 | 组织节点、类型、架构树、员工分配 |
| 短信服务 | 短信发送、验证 |
| 行政区划 | 省市区划查询 |

## API 文档

各模块 API 详细列表和说明见以下文档：
- [用户管理](references/api-user.md)
- [机构管理](references/api-organization.md)
- [员工管理](references/api-staff.md)
- [认证管理](references/api-auth.md)
- [登录与会话](references/api-login.md)
- [系统角色](references/api-sysRole.md)
- [应用管理](references/api-application.md)
- [部门/岗位](references/api-dept-duty.md)
- [字典管理](references/api-dict.md)
- [组织架构](references/api-organArchitecture.md)
- [资源/权限](references/api-resource.md)
- [短信/密码/区划/行业等](references/api-other.md)

## SDK 使用规范

调用 BUC 接口时，优先在 `com.izkml.user.sdk.global.sdk.request.refactor` 包下查找带 `New` 前缀的 Request 类。SDK 中有则优先使用该接口，`New` 前缀类统一返回 `MlyunResponse`，其 `getBody()` 反序列化为 `com.izkml.mlyun.framework.common.result.JsonResult<T>`。

```java
// ✅ 正确：使用 New 前缀 — body 反序列化为 JsonResult<T>，结构统一
NewStaffFindByIdRequest req = new NewStaffFindByIdRequest(staffId);
MlyunResponse resp = bucClient.execute(req);
JsonResult<JSONObject> result = JSON.parseObject(resp.getBody(), JsonResult.class);
// result.isSuccess() — 是否成功
// result.getMessage() — 提示信息
// result.getData() — 业务数据（泛型类型擦除，实际返回 JSONObject）

// ❌ 避免：使用旧版（无 New 前缀）— 返回值格式不一致，需自行解析
StaffFindByIdRequest oldReq = new StaffFindByIdRequest(staffId);
bucClient.execute(oldReq);
```

> **注意**：`JsonResult` 的包为 `com.izkml.mlyun.framework.common.result`，需要单独引入 `mlyun-core-common` 依赖。`JsonResult` 没有 `getCode()` 方法，判断成功应使用 `isSuccess()`。
>
> `New` 前缀 Request 类放在对应模块的子包下，例如员工相关在 `com.izkml.user.sdk.global.sdk.request.refactor.**staff**` 下，角色相关在 `**.sysRole**` 下，以此类推。

## 常用业务场景

### 1. 创建员工用户（用户+员工信息+组织）

```java
AddStaffUserRequest addStaffUserReq = new AddStaffUserRequest();
addStaffUserReq.setUsername("zhangsan");
addStaffUserReq.setRealName("张三");
addStaffUserReq.setPhone("13800138000");
addStaffUserReq.setPassword("123456");
addStaffUserReq.setOrganizationId("orgId");
NewStaffUserAddRequest request = new NewStaffUserAddRequest(addStaffUserReq);
MlyunResponse response = bucClient.execute(request);
```

`AddStaffUserRequest` 包含创建用户+员工所需的全部字段（`organizationId`、`deptId`、`username`、`phone`、`password`、`realName`、`emailAddress`、`jobNo` 等）。

### 2. 分配角色给员工

```java
AssociateStaffRoleRequest associateReq = new AssociateStaffRoleRequest();
associateReq.setStaffId(staffId);
associateReq.setSysRoleIds(Arrays.asList(roleIdList));
NewStaffRoleAssociateRequest request = new NewStaffRoleAssociateRequest(associateReq);
bucClient.execute(request);
```

### 3. 分页查询员工

```java
StaffPageQuery query = new StaffPageQuery();
query.setOrganizationId(orgId);
query.setPageNo(1);
query.setPageSize(20);
query.setApplicationInstSign(bucApplicationInstSign);
NewStaffPageQueryRequest request = new NewStaffPageQueryRequest(query);
bucClient.execute(request);
```

`StaffPageQuery` 还支持按 `nickName`（姓名）、`phone`（手机号）、`status`（状态）、`deptId`（部门）、`staffId`（员工 ID）等条件筛选。

### 4. 分页查询机构

```java
OrganizationPageQuery query = new OrganizationPageQuery();
query.setPageNo(1);
query.setPageSize(20);
query.setApplicationInstSign(bucApplicationInstSign);
NewOrganizationPageQueryRequest request = new NewOrganizationPageQueryRequest(query);
bucClient.execute(request);
```

### 5. 用户登录

```java
LoginRequestDTO loginDto = new LoginRequestDTO();
loginDto.setUsername("zhangsan");
loginDto.setPassword("123456");
NewLoginRequest request = new NewLoginRequest(loginDto);
bucClient.execute(request);
// 登录成功后可获取 token 等信息
```

## 关键业务规则

1. **优先使用业务管理后台**：如无特殊需求，业务系统不应直接调用接口进行开户、维护部门、维护人员、维护人员角色等操作。这些可通过集成业务管理后台统一前端实现，前端地址：[http://10.5.4.236:6067/login](http://10.5.4.236:6067/login)。

# DefaultApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**appControllerGetHello**](#appcontrollergethello) | **GET** / | |
|[**lircControllerSend**](#lirccontrollersend) | **POST** /ir | |

# **appControllerGetHello**
> appControllerGetHello()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from 'jukeblade-typescript-client';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.appControllerGetHello();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **lircControllerSend**
> lircControllerSend(irCodeDto)


### Example

```typescript
import {
    DefaultApi,
    Configuration,
    IrCodeDto
} from 'jukeblade-typescript-client';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let irCodeDto: IrCodeDto; //

const { status, data } = await apiInstance.lircControllerSend(
    irCodeDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **irCodeDto** | **IrCodeDto**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


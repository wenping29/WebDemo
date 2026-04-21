
import type { LoginResult, UserLogin } from './model.index';
import { Api } from './path';
import type { HotelRoomRequest, HotelRoomResult, RoomDetailResult } from './model.index';
// import { GET_LOGIN } from "@/mock/index.ts"; 
import axios from '@/api/RequestHttp';
// import axios from 'axios'
/**
 * 登录介绍接口
 * @param params
 * @returns
 */
export const getLoginApi = (params: UserLogin) => {
  return axios.Post<LoginResult>(Api.GET_LOGIN, params)
}

export const getForgetPasswordApi = (params: UserLogin) => {
  return axios.Post<LoginResult>(Api.GET_LOGIN, params)
}

/**
 * 注册用户
 * @param params
 * @returns
 */
export const getRegisterApi = (params:UserLogin ) => {
  return axios.Post<LoginResult>(Api.GET_REGISTER, params)
}

/**
 * 注销用户
 * @param params
 * @returns
 */
export const getDeleteApi = (params: { room_id: string | number }) => {
  return axios.get<LoginResult>(Api.GET_DELETE, params)
}

/**
 * 获取房型介绍接口
 * @param params
 * @returns
 */
export const getHotelRoomApi = (params: HotelRoomRequest) => {
  return axios.get<any>(Api.GET_HOTEL_ROOM, params)
}

export const getHotelRoomList = (params: HotelRoomRequest) => {
  return axios.get<any>(Api.getHotelRoomList, params)
}
//getHotelRoomListTop6
export const getHotelRoomListTop6 = (params: HotelRoomRequest) => {
  return axios.get<any>(Api.getHotelRoomListTop6, params)
}
//getcarouselList
export const getCarouselList = (params: HotelRoomRequest) => {
  return axios.get<any>(Api.getCarouselList, params)
}
//getTitleList
export const getTitleList = (params: HotelRoomRequest) => {
  return axios.get<any>(Api.getTitleList, params)
}
export const getTopLogList = (params: HotelRoomRequest) => {
  return axios.get<any>(Api.getTopLogList, params)
}
/**
 * 获取房型详情
 * @param params
 * @returns
 */
export const getRoomDetailApi = (params: { room_id: string | number }) => {
  return axios.get<RoomDetailResult>(Api.GET_ROOM_DETAIL, params)
}

export const getUserCount = () => {
  return axios.get<any>(Api.GET_USER_COUNT)
}
export const getActiveUserCount1 = () => {
  return axios.get<any>(Api.GET_USER_ActiveCOUNT)
}
export const getSaleCount = () => {
  return axios.get<any>(Api.GET_SaleCount)
}
export const getAllIncome = () => {
  return axios.get<any>(Api.GET_AllIncome)
}
export const getReportData = () => {
  return axios.get<any>(Api.GET_ReportData)
}
export const getReportList = () => {
  return axios.get<any>(Api.GET_ReportList)
}
export const getReportViewData = () => {
  return axios.get<any>(Api.GET_ReportViewData)
}
/*
    get_gmv();
    get_order_count();
    get_activies_user_count();
    get_change_race();
*/
export const getReportGMV = () => {
  // Gross Merchandise Volume
  return axios.get<any>(Api.getReportGMV)
}
export const getReportOrderCount = () => {
  // Gross Merchandise Volume
  return axios.get<any>(Api.getReportOrderCount)
}
export const getReportActiviesUserCount = () => {
  // Gross Merchandise Volume
  return axios.get<any>(Api.getReportActiviesUserCount)
}
export const getReportChangeRace = () => {
  // Gross Merchandise Volume
  return axios.get<any>(Api.getReportChangeRace)
}

export const getPayrecordData = (params: any) => {
  // Gross Merchandise Volume
  //console.log(params)
  return axios.get<any>(Api.getPayrecordData, {
    ...params
  })
}
export const getDataBaseQuery = (params: any) => {
  // Gross Merchandise Volume
  //console.log(params)
  return axios.get<any>(Api.getDataBaseQuery, {
    ...params
  })
}

export const getDynamicValue = (params: any) => {
   return axios.get<any>(Api.getDynamicValue, {
    ...params
  })
}
export const getMSGValue = (params: any) => {
   return axios.get<any>(Api.getMSGValue, {
    ...params
  })
}
export const getCollectionList = (params: any) => {
   return axios.get<any>(Api.getCollectionList, {
    ...params
  })
}
export const GetHistoryList = (params: any) => {
   return axios.get<any>(Api.GetHistoryList, {
    ...params
  })
}
export const GetMessageList = (params: any) => {
   return axios.get<any>(Api.GetMessageList, {
    ...params
  })
}
export const GetDynamicList = (params: any) => {
   return axios.get<any>(Api.GetDynamicList, {
    ...params
  })
}
export const getHeaderMenuList = (params: any) => {
   return axios.get<any>(Api.getHeaderMenuList, {
    ...params
  })
}
export const getHeaderInfo = (params: any) => {
   return axios.get<any>(Api.getHeaderInfo, {
    ...params
  })
}

export const getVehicles = (params: any) => {
   return axios.get<any>(Api.getVehicles, {
    ...params
  })
}

export const getVehiclesTable = (params: any) => {
   return axios.get<any>(Api.getVehiclesTable, {
    ...params
  })
}

export const getVehiclesCardStatus = (params: any) => {
   return axios.get<any>(Api.getVehiclesCardStatus, {
    ...params
  })
}

export const getVehiclesTrackings = (params: any) => {
   return axios.Post<any>(Api.getVehiclesTrackings, {
    ...params
  })
}
export const GetVehiclePointInfo = (params:any) => {
  return axios.Post<any>(Api.getVehiclePointInfo,{...params});
};

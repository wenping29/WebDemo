interface Result {
    code:number,
    msg:string
}
export interface ResultData<T =any> extends Result {
    data:T
}

export interface HotelRoomRequest extends BasicPageParams {
  hotel_id: string
  sort?: string
  [property: string]: any
}

export type HotelRoomResult = BasicFetchResult<HotelRoomItem>

export interface HotelRoomItem {
  content: string
  room_id: string
  src: string
  room_name: string
  thumbnail: string
  weekdays_price: string
  weekend_price: string
  date: string
  [property: string]: any
}

export interface RoomDetailResult {
  content: string
  image: Image[]
  room_name: string
  service: string
  weekdays_price: string
  weekend_price: string
  [property: string]: any
}

export interface Image {
  is_vr: string
  name: string
  url: string
  [property: string]: any
}

export interface BasicPageParams {
  page: number
  pageSize: number
}

export interface BasicFetchResult<T> {
  list: T[]
  total: number
}

export interface BasicResult<T> {
  tData: T[]
}

export interface UserInfo  {
  content: string
  id: string
  name: string
  email: string
  birthDate: string
  tell: string
  address:string
  head_img: string
  [property: string]: any
}

export interface MenuItem  {
  path: string
  name: string
  key: string
  display:Boolean,
  children?: MenuItem[]

}

export interface UserLogin {
  password: string
  name: string
  email:string
}
export interface QueryData{
  status:Number,
  message:string,
  Data:object,
  success: boolean
};
export interface UserRegister {
  content: string
  id: string
  name: string
  password:string
  email: string
  birthDate: string
  tell: string
  address:string
  sex:string
  [property: string]: any
}
export type LoginResult = BasicResult<UserInfo>


// 定义缴费记录接口
export interface PaymentRecord {
  recordNo: string;
  payerName: string;
  payerPhone: string;
  paymentType: 'water' | 'electricity' | 'gas' | 'property' | 'parking' | 'other';
  amount: number;
  paymentMethod: 'alipay' | 'wechat' | 'unionpay' | 'cash' | 'transfer' | '';
  paymentStatus: 'unpaid' | 'paid' | 'refunded' | 'failed';
  paymentTime: string;
  remark?: string;
}

// 定义查询表单接口
export interface QueryForm {
  recordNo: string;
  payerName: string;
  paymentStatus: string;
  paymentType: string;
  paymentTimeStart: string;
  paymentTimeEnd: string;
  minAmount: number | '';
  maxAmount: number | '';
  paymentMethod: string;
}

// 定义缴费类型统计接口
export interface PaymentTypeStat {
  type: string;
  count: number;
  amount: number;
}
// 定义数据项接口
export interface DataItem {
  id: string;
  name: string;
  category: 'category1' | 'category2' | 'category3' | 'category4';
  value: number;
  status: 'active' | 'inactive' | 'pending' | 'deleted';
  createTime: string;
  creator: string;
  remark?: string;
}

// 定义查询表单接口
export interface QueryForm {
  id: string;
  name: string;
  status: string;
  category: string;
  createTimeStart: string;
  createTimeEnd: string;
  creator: string;
  minValue: number | '';
  maxValue: number | '';
  keyword: string;
}

export interface Item {
  src: string;
  name: string;
  date: string;
  value: string;
  url: string;
}
// 定义车辆状态类型
export type VehicleStatus = 'online' | 'offline' | 'warning';
// 定义车辆信息接口
export interface VehiclePointInfo {
  id: string;
  licensePlate: string;
  type: string;
  driverName: string;
  driverPhone: string;
  status: VehicleStatus;
  location: string;
  latitude: number;
  longitude: number;
  speed: number;
  direction: string;
  updateTime: string;
}
// 定义类型
export interface Vehicle {
  id: string;
  licensePlate: string;
  vIN: string;
  model: string;
  type: 'truck' | 'van' | 'bus' | 'special';
  department: 'logistics' | 'distribution' | 'transport' | 'maintenance';
  purchaseDate: string;
  driverName: string;
  driverPhone: string;
  status: 'running' | 'stopped' | 'maintenance' | 'idle';
  currentSpeed?: number; // 仅运行中车辆有此数据
  maintenanceEndDate?: string; // 仅维修中车辆有此数据
  lastUpdateTime: string;
  totalMileage: number;
  monthlyMileage: number;
  maintenanceDueDate: string;
  maintenanceDueDays: number;
  remarks?: string;
}

export interface TrackPoint {
  id: string;
  timestamp: string;
  x: number; // 地图上的X百分比位置
  y: number; // 地图上的Y百分比位置
  speed: number; // km/h
  location: string; // 位置描述
  direction: number; // 方向角度
}

export interface TrackStats {
  pointCount: number;
  distance: number; // km
  duration: number; // 秒
  avgSpeed: number; // km/h
  maxSpeed: number; // km/h
}

export interface Filters {
  licensePlate: string;
  status: '' | 'running' | 'stopped' | 'maintenance' | 'idle';
  type: '' | 'truck' | 'van' | 'bus' | 'special';
  department: '' | 'logistics' | 'distribution' | 'transport' | 'maintenance';
  driver: string;
  purchaseDateStart: string;
  purchaseDateEnd: string;
}

export interface FormData extends Omit<Vehicle, 'id' | 'lastUpdateTime' | 'totalMileage' | 'monthlyMileage' | 'maintenanceDueDays' | 'currentSpeed' | 'maintenanceEndDate'> {
  id?: string;
}

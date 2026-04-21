export interface Persion {
    age: number,
    name:string,
    tell:string,
    car:CarInterface,
    id:string
}

export interface CarInterface {
   
    brand:string,
    price:number
}
export interface FormState {
  username: string;
  password: string;
  remember: boolean;
}
// 类型定义
export interface Department {
  id: string;
  name: string;
}

export interface ReportItem {
  id: string;
  date: string;
  departmentId: string;
  amount: number;
  orders: number;
  users: number;
  status: 'active' | 'inactive' | 'pending';
}


export type PersonList= Array<Persion>;
export type PersonList2 = Persion[];
 
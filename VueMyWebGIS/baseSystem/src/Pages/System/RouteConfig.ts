// 定义路由元信息类型
export interface RouteMeta {
  title?: string;
  icon?: string;
  sort?: number;
  showInMenu?: boolean;
  keepAlive?: boolean;
  requiresAuth?: boolean;
}

// 定义路由类型
export  interface RouteConfig {
  id: string;
  name: string;
  path: string;
  component: string;
  redirect?: string;
  children?: RouteConfig[];
  meta: RouteMeta;
}
export interface IProduct {
  id?: number,
  name: string,
  amount: string,
}

export interface IUser {
  id?: number,
  username: string,
  classe: string,
  level: string,
  password: string,
}

export interface IOrder {
  id: number,
  userId: number,
}

export interface ILogin {
  username: string,
  password: string,
}

export interface IOrders {
  userId: number,
  id?: number,
  productsIds: number[],
}
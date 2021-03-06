import service from '../index'

interface RequestResType<T> {
  code: number
  msg: string
  data: T
}

interface RegisterRes {
  id: number
}

interface EmailRes {
  email: string
  message: null
}

export const apiRegister = async (data) =>
  await service.post<RequestResType<RegisterRes>>('/users/register', data)

export const apiLogin = async (data) =>
  await service.post<RequestResType<any>>('/users/login', data)

export const apiSendEmail = async (email) =>
  await service.post<RequestResType<EmailRes>>('/emails/send', {
    email
  })

/****************************************************************************** */

// export const demo_get = async () =>
//   await service.get('http://localhost:3000/dt1_1')

// interface TempAxiosResponse_p {
//   code: number
//   data: RequestResObj
//   msg: string
// }

// interface TempAxiosResponse_g {
//   code: number
//   data: RequestResObj_g
//   msg: string
// }

// interface RequestResObjT {
//   departmentId: number
//   organizationId: number
// }
// interface RequestResObjT_g {
//   departmentId_g: number
//   organizationId_g: number
// }

// interface RequestResObj {
//   t: RequestResObjT
//   token: string
// }

// interface RequestResObj_g {
//   t: RequestResObjT_g
//   token: string
// }

// export const demo_post = async (data) =>
//   await service.post<TempAxiosResponse_p>('/department/login', data)
// export const demo_get = async (data) =>
//   await service.post<TempAxiosResponse_g>('/department/login', data)

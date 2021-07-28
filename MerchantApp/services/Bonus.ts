import env from '../config/env';
import axios from 'axios';



export interface ICollectPointsRequest {
    card: string,
    amount: string,
    batchId: string,
    productId: number
}

export interface IICollectPointsResponse {
 spentBonus?: number,
  orgName?:string,
  terminalId?: string | number,
  address?: string,
  receiptId?: string,
  tranType?: string,
  accumBonus?: number,
  status?: string,
  bonus?: number,
  availableScore?: number
  amount?: number,
  card?: string,
  tranDate?: string,
  merchantName?: string,
  stan?: string

}

export interface IPayWithPointsRequest {
    card: string,
    amount: number,
    batchId: string,
    deviceTranId: string,
    otp: string
}

export interface IPayWithPointsResponse {
    userId: number,
    firstName: string,
    lastName: string,
    userRole: number,
    userName: string,
    phoneNumber: string,
    secondaryPhoneNumber: string,
    email: string,
    merchantId: string,
    address: string,
    personCode: string,
    birthDate: string,
    sex: number,
    operUserId: number
}


export interface ICloseDayRequest {
    batchId: string,
    accumulateTranCount: number,
    accumulateAmount: number,
    accumulateAmountRevers: number,
    payTranCount: number,
    payAmount: number,
    payAmountRevers: number,
    payTranCountGc: number,
    payAmountGc: number,
    payReversGc: number
}

export interface ICloseDayResponse {
    batchId: string,
    accumulateTranCount: number,
    accumulateAmount: number,
    accumulateAmountRevers: number,
    payTranCount: number,
    payAmount: number,
    payAmountRevers: number,
    payTranCountGc: number,
    payAmountGc: number,
    payReversGc: number
}



export interface IGetAccountInfroResponse {
    amount?: number,
    errorCode?: number,
    errorDesc?: string,
    fullName?: string,
    score?: number
}

export interface ISendOtpRequest {
    card: string
}

export interface ISendOtpResponse {

}

class Bonus {

    CollectPoints = async (data: ICollectPointsRequest) => {
        return await axios.post<IICollectPointsResponse>(`${env.API_URL}/api/Bonus/Accumulation`, data);
    }

    PayWithPoints = async (data: IPayWithPointsRequest) => {
        return await axios.post<IPayWithPointsResponse>(`${env.API_URL}/api​/Bonus​/MakePayment`, data);
    }

    CloseDay = async (data: ICloseDayRequest) => {
        return await axios.post<ICloseDayResponse>(`${env.API_URL}/api/Bonus/CloseDay`, data);
    }

    GetAccountInfo = async (card: string) => {
        return await axios.get<IGetAccountInfroResponse>(`${env.API_URL}/api/Bonus/GetAccountInfo?Card=${card}`);
    }

    SendOtp = async (data: ISendOtpRequest) => {
        return await axios.post(`${env.API_URL}/api/Bonus/SendOtp`,)
    }
}


export default new Bonus();

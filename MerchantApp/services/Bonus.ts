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
    amount: number | string,
    batchId: string,
    deviceTranId: string,
    otp: string
}

export interface IPayWithPointsResponse {
  spentBonus: number,
  orgName: string,
  terminalId: string,
  address: string,
  receiptId: string,
  tranType: string,
  accumBonus: number,
  status: string,
  bonus: number,
  amount: number,
  card: string,
  tranDate: string,
  merchantName: string,
  stan: string,
  availableScore: number,
  availableAmount: number
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
    initials?: string
    score?: number
}

export interface ISendOtpRequest {
    card: string
}

export interface ISendOtpResponse {
    errorDesc: string,
    errorCode: number
}

class Bonus {

    CollectPoints = async (data: ICollectPointsRequest) => {
        return await axios.post<IICollectPointsResponse>(`${env.API_URL}/api/Bonus/Accumulation`, data);
    }

    PayWithPoints = async (data: IPayWithPointsRequest) => {
        return await axios.post<IPayWithPointsResponse>(`${env.API_URL}/api/Bonus/MakePayment`, data);
    }

    ReverseTransaction = async(type:number, data:any) => {
        return await axios.post(`${env.API_URL}/api/Bonus/ReverseTransaction?transactionType=${type}`, data);
    }
    CloseDay = async (data: ICloseDayRequest) => {
        return await axios.post<ICloseDayResponse>(`${env.API_URL}/api/Bonus/CloseDay`, data);
    }

    GetAccountInfo = async (card: string) => {
        return await axios.get<IGetAccountInfroResponse>(`${env.API_URL}/api/Bonus/GetAccountInfo?Card=${card}`);
    }

    SendOtp = async (data: ISendOtpRequest) => {
        return await axios.post(`${env.API_URL}/api/Bonus/SendOtp`, data)
    }
}


export default new Bonus();

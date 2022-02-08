import env from '../config/env';
import axios from 'axios';

export interface IResonseError {
    errorDesc: string,
    errorCode: string
}

export interface ICollectPointsRequest {
    card: string,
    amount: string | string,
    batchId: string,
    productId: number
}

export interface ICollectPointsResponseData {
    declinedByUnicard?: number
    spentBonus?: number,
    orgName?: string | null,
    terminalId?: string | number,
    address?: string,
    receiptId?: string,
    tranType?: string,
    accumulatedBonus: number,
    status?: string,
    bonus?: number,
    availableScore?: number
    amount?: number,
    card?: string,
    tranDate?: string,
    merchantName?: string,
    stan?: string,
    userId?: number

}

export interface ICollectPointsResponse{ 
    data?: ICollectPointsResponseData,
    success: boolean,
    error?: IResonseError
}

export interface IPayWithPointsRequest {
    card: string,
    amount: number | string,
    batchId: string,
    deviceTranId: string,
    otp: string
}

export interface IPayWithPointsResponseData {
    spentBonus?: number,
    orgName?: string,
    terminalId?: string,
    address?: string,
    receiptId?: string,
    tranType?: string,
    accumBonus?: number,
    status?: string,
    bonus?: number,
    amount?: number,
    card?: string,
    tranDate?: string,
    merchantName?: string,
    stan?: string,
    availableScore?: number,
    availableAmount?: number
}

export interface IPayWithPointsResponse {
    data?: IPayWithPointsResponseData,
    success: boolean,
    error?:IResonseError
}

export interface ICloseDayRequest {
    batchId: string,
    accumulateTranCount: number,
    accumulateAmount: number,
    accumulateAmountRevers: number,
    payTranCount: number,
    payAmount: number,
    payAmountRevers: number,

}

export interface ICloseDayResponseData {
    errorCode: number,
    errorDesc: string
   
}

export interface ICloseDayResponse {
    data?: ICloseDayResponseData,
    success: boolean,
    error?: IResonseError
   
}


export interface IGetAccountInfroResponseData {
    amount?: number,
    errorCode?: number,
    errorDesc?: string,
    fullName?: string,
    initials?: string
    score?: number,
    clientStatus?: string
}

export interface IGetAccountInfroResponse {
    data?: IGetAccountInfroResponseData,
    success: boolean,
    error?: IResonseError
}

export interface ISendOtpRequest {
    card: string
}


export interface ISendOtpResponseData {
    errorDesc: string,
    errorCode: number
}

export interface ISendOtpResponse {
    data?: ISendOtpResponseData,
    success: boolean,
    error?:IResonseError
}

export interface IReverseTransactionRequest {
    card: string | number,
    amount: string | number,
    deviceId?: string,
    stan: string
}

export interface IReverseTransactionResponseData  {
    declinedByUnicard: number,
    accumulatedBonus: number,
    orgName: any,
    address: string,
    merchantName: string,
    receiptId: string,
    tranType: string,
    status: string,
    bonus: number,
    errorDesc: string,
    errorCode: number,
    userId: number,
    stan: string,
    availableScore: number,
    availableAmount: number,
    reversed?: boolean
}

export interface IReverseTransactionResponse  {
    data?:IReverseTransactionResponseData
    success: boolean,
    errors?: IResonseError
}

class Bonus {

    CollectPoints = async (data: ICollectPointsRequest) => {
        return await axios.post<ICollectPointsResponse>(`${env.API_URL}/api/Bonus/Accumulation`, data);
    }

    PayWithPoints = async (data: IPayWithPointsRequest) => {
        return await axios.post<IPayWithPointsResponse>(`${env.API_URL}/api/Bonus/MakePayment`, data);
    }

    ReverseTransaction = async (type: number, data: IReverseTransactionRequest) => {
        return await axios.post<IReverseTransactionResponse>(`${env.API_URL}/api/Bonus/ReverseTransaction?transactionType=${type}`, data);
    }
    CloseDay = async (data: ICloseDayRequest) => {
        return await axios.post<ICloseDayResponse>(`${env.API_URL}/api/Bonus/CloseDay`, data);
    }

    GetAccountInfo = async (card: string) => {
        return await axios.get<IGetAccountInfroResponse>(`${env.API_URL}/api/Bonus/GetAccountInfo?Card=${card}`);
    }

    SendOtp = async (data: ISendOtpRequest) => {
        return await axios.post(`${env.API_URL}/api/Otp/SendOtp`, data);
    }

    SendUserOtp = async(value: string) => {
        return await axios.post(`${env.API_URL}/api/Otp/SendUserOtp`, {username: value});
    }

    ChangeUserPassword = async(data: any) => {
        return await axios.post(`${env.API_URL}/api/users/ChangeUserPassword`, data)
    }
}


export default new Bonus();

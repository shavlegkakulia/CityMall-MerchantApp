import env from '../config/env';
import axios from 'axios';



export interface ICollectPointsRequest {
    card: string,
    amount: number,
    deviceId: string,
    batchId: string,
    productId: number
}

export interface IICollectPointsResponse {
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

export interface IPayWithPointsRequest {
    card: string,
    amount: number,
    deviceId: string,
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
    deviceId: string,
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
    deviceId: string,
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

    GetAccountInfo = async (card: string, deviceId: string) => {
        return await axios.get<IGetAccountInfroResponse>(`${env.API_URL}/api/Bonus/GetAccountInfo?Card=${card}&DeviceId=${deviceId}`);
    }

    SendOtp = async (data: ISendOtpRequest) => {
        return await axios.post(`${env.API_URL}/api/Bonus/SendOtp`,)
    }
}


export default new Bonus();

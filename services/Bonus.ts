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

export interface ICollectPointsResponse {
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
    error?: IResonseError
}


export interface IUserInfo {
    amount: number,
    score: number,
    initials: string,
    clientStatus: string
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

export interface IVouchers {
    amount: number,
    centre: number,
    createDate: string,
    discountPercentage: number,
    isActive: boolean,
    merchants: string[],
    numberOfVouchers: number,
    sqlScript?: null,
    userID: number
    voucherCode: string,
    voucherDescription: string,
    voucherEndDate: string,
    voucherID: number,
    voucherPerMerchant: number,
    voucherPurchasePoints: number,
    voucherSegmentID: number,
    voucherStartDate: string,
    voucherVolume: number
}

export interface IGetAccountInfoResponseData {
    amount: number,
    clientStatus: string,
    errorCode: number,
    errorDesc: string,
    fullName: string,
    initials: string,
    score: number,
    spendRate: any,
    vouchers: IVouchers[] | []

}

export interface IGetAccountInfoResponse {
    data?: IGetAccountInfoResponseData,
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
    error?: IResonseError
}

export interface IReverseTransactionRequest {
    card: string | number,
    amount: string | number,
    deviceId?: string,
    stan: string
}

export interface IReverseTransactionResponseData {
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

export interface IReverseTransactionResponse {
    data?: IReverseTransactionResponseData
    success: boolean,
    errors?: IResonseError
}

export interface IUseVoucherRequest {
    card: string,
    voucherCode: string,
    amount?: number,
    initialAmount?: number | string
}

export interface IUsedVoucher {
    id: number,
    stan: string,
    card: string,
    voucherCode: string,
    voucherDescription: string,
    merchId: string,
    terminalId: string,
    deviceId: string,
    isActive: boolean,
    voucherUseDate: string
}


export interface IReverseVoucher {
    stan: string,
    voucherCode: string,
    card: string
}

export interface ITerminalInfo {
    id: number,
    userId: number,
    terminalId: string,
    merchantId: string,
    isActive: boolean,
    canSpend: boolean,
    needSmsValidation: boolean,
    deviceId: string,
    merchantName: string,
    orgId: number
}

export interface IClientTransaction {
    stan?: string,
    card?: string,
    accountNumber?: string,
    authDate?: Date,
    amount?: number,
    tranType?: string,
    merchantName?: string,
    merchantAddress?: string,
    reversaled?: number,
    terminalId?: string,
    centre?: number,
    merchantId?: string,
    transactionType?: number,
    imageURL?: string
}

interface IClientTransactionResponse {
    data?: IClientTransaction[]
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
        return await axios.get<IGetAccountInfoResponse>(`${env.API_URL}/api/Bonus/GetAccountInfo?Card=${card}`);
    }

    GetTerminalInfo = async () => {
        return await axios.get<ITerminalInfo>(`${env.API_URL}/api/Terminal/GetTerminalInfo`);
    }

    SendOtp = async (data: ISendOtpRequest) => {
        return await axios.post(`${env.API_URL}/api/Otp/SendOtp`, data);
    }

    SendUserOtp = async (value: string) => {
        return await axios.post(`${env.API_URL}/api/Otp/SendUserOtp`, { username: value });
    }

    ChangeUserPassword = async (data: any) => {
        return await axios.post(`${env.API_URL}/api/users/ChangeUserPassword`, data)
    }

    UseVoucher = async (data: IUseVoucherRequest) => {
        return await axios.post(`${env.API_URL}/api/Voucher/UseVoucher`, data);
    }

    GetClientTransactions = async () => {
        return await axios.get<IClientTransactionResponse>(`${env.API_URL}/api/Clients/GetUserTransactions?Page=1&PageSize=50`);
    }

    GetUsedVouchers = async () => {
        return await axios.get<IUsedVoucher[]>(`${env.API_URL}/api/Voucher/GetUsedVouchers`);
    }

    ReverseVoucher = async (data: IReverseVoucher) => {
        console.log(`${env.API_URL}/api/Voucher/ReverseVoucher`, data);
        return await axios.post(`${env.API_URL}/api/Voucher/ReverseVoucher`, data);
    }

}


export default new Bonus();

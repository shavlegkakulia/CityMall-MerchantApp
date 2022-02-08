import storage from './../services/StorageService';
export interface ITransaction {
    tranAmount?: number,
    tranType?: string,
    stan?: string,
    card: string,
    deviceId: string,
    batchId: string,
    tranDate: number,
    respCode?: string,
    reversed: boolean,
}

export const getTransactions = async () => {
    let transactions = []
    try {
        transactions = JSON.parse(await storage.getItem('transactions') || '[]');
    } catch (error) {
        return [];
    }

    return transactions;
}

export const addTransaction = async (t: ITransaction) => {
    let tempTransactions = await getTransactions();
    tempTransactions.push(t);
    return await storage.setItem('transactions', JSON.stringify(tempTransactions));
}

export const updateTransactions = async (s: string) => {
    let tempTransactions = await getTransactions();
    let i = tempTransactions.findIndex((t: any) => t.stan === s);
    tempTransactions[i].reversed = true;
    return await storage.setItem('transactions', JSON.stringify(tempTransactions));
}

export const clearTransactions = async () => {
    return await storage.setItem('transactions', '[]')
}
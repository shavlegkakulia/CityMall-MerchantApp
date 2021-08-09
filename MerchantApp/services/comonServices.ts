export const validateAmountInput = (value: string) => {
    if (Number(value) < 0) return false;
    if(value.includes(',')  || value.includes('-')) return false;
    
    if (value.startsWith('00')) return false;
    let dotCounter = 0;
    for (let i = 0; i < value.length; i++) {
        if (value[i] === '.') dotCounter++;
    };
    if (dotCounter > 1) {
        return false;
    };
    if (value.includes('.')) {
        let split = value.split('.');
        if (split[1].length > 2) return false;
    };
    return true;
}
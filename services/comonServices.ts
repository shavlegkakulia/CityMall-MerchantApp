const Alphabet = [
    'A', 'a', 'B', 'b', 'C', 'c', 'D', 'd',
    'E', 'e', 'F', 'f', 'G', 'g', 'H', 'h',
    'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l',
    'M', 'm', 'N', 'n', 'O', 'o', 'P', 'p',
    'Q', 'q', 'R', 'r', 'S', 's', 'T', 't',
    'U', 'u', 'V', 'v', 'W', 'w', 'X', 'x',
    'Y', 'y', 'Z', 'z'
  ]

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


const isLetter = (str: string) => {
    return str.length === 1 && str.match(/[a-z]/i);
}

const isNumeric = (str: string) =>{
    return /^\d+$/.test(str);
}

export const validateChangePassword = (value: string) => {
    if(value.length < 8) return false
    let containsLetter = false;
    let containsDigit = false;

    for (let i = 0; i < value.length; i++) {
        if (isLetter(value[i])) containsLetter = true;
        if (isNumeric(value[i])) containsDigit = true;
    }
    return containsLetter && containsDigit;
    
}
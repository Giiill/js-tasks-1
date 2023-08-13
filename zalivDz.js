/*
1.
Написать функцию, которая принимает 2 аргумента (строка, подстрока) и возвращает массив индексов всех подстрок
function searchIndexes(str, substr) {}

Примеры
str- далеко далеко пасутся кто? правильно - коровы
substr - да

result - [0,7]

str- далеко далеко пасутся кто? правильно - коровы
substr - ко

result - [4,11,38]

*/

// РЕШЕНИЕ
// написание на reduce действительно отличный способ, ничего лучше не знаю что придумать
// переписал на forEach но думаю что на reduce твой вариант все жё легче читается
function searchIndexes(str, substr) {
    const replaceTo = str.replaceAll(substr, "~").split("");
    let acc = [];
    replaceTo.forEach((item, index, array) => {
        return item === "~" ? acc.push(index + acc.length) : false;
    });
    return acc;
}


// ===============================================================================================

/*
2.
https://leetcode.com/problems/multiply-strings (https://leetcode.com/problems/multiply-strings/)
Немного усложняем. Ожидаю что могу туда передать строки в формате 
“..5”, “2,5”, “0.0000026”, “0000050,10”.
Если вычислить не можем, то выводим ошибку
“Error: can’t count as number”
*/
// РЕШЕНИЕ
// ===============================================================================================
// данный код мой немного переписан, включил в него из твоего примера
// замену запятых на точки, и он проходит все тесты. А твой код у меня наоборот не проходит все тесты
var multiply = function(num1, num2) {
    const parseNum1 = intoNumber(num1);
    const parseNum2 = intoNumber(num2);

   function intoNumber(num) {
        let parseNum = num.replace(/[.]+|[,]+/g, ".");
       if (isNaN(parseNum)) {
           return 'Error: can\'t count as number';
       };
       if (parseNum.includes('.')) {
           const lengthAfterPoint = parseNum.match(/\.(\d+)/)[1].length;
           return parseNum = Number(parseNum) * 10 ** lengthAfterPoint;
       } else {
           return num;
       };
   }
   return String(BigInt(parseNum1) * BigInt(parseNum2));
};





// ===============================================================================================

/*
3. https://leetcode.com/problems/integer-to-roman/

*/
// РЕШЕНИЕ
// разобрал твой код и переписал его, можно сказать немного оптимизировал,
// уменьшил кол-во шагов при вычислении символа. Например если символ меньше 10, то
// вычислении начнётся с ключа 9, пропуская тем самым не нужные вычисления.
// По идеи это должно ускорить выполнении функции.
var intToRoman = function(num) {
    const romanSigns = {
        1000: "M", 
        900: "CM", 
        500: "D", 
        400: "CD", 
        100: "C", 
        90: "XC", 
        50: "L", 
        40: "XL", 
        10: "X", 
        9: "IX", 
        5: "V", 
        4: "IV", 
        1: "I", 
    };
    let finalSum = '';
    const reverseDict = Object.keys(romanSigns).reverse();

    const getRomanSigns = (index, num) => {
        const startIndex = reverseDict.indexOf(index);
        for (let i = startIndex; i <= 12 ; ++i) {
            const sum = num - reverseDict[i];
            if (sum >= 0) {
                finalSum = finalSum + romanSigns[reverseDict[i]];
                num = sum
                break;
            };
        };
        return handleIntToRoman(num)
    };
    const handleIntToRoman = (num) => {
        if (num === 0) {
            return finalSum;
        }
        else if (num <= 3999) {
        return getRomanSigns('1000', num);
        } 
        else if (num <= 99) {
        return getRomanSigns('90', num);
        } 
        else if (num <= 9) {
        return getRomanSigns('9', num);
        };
        if (num > 3999) {
            return '';
        };
    };
return handleIntToRoman(num);
};



// ===============================================================================================




/*
4.https://leetcode.com/problems/longest-substring-without-repeating-characters/
*/
// РЕШЕНИЕ

var lengthOfLongestSubstring = function(s) {
    const substrings = new Set();
    // convert character "\" to text
    s = s.replace(/[\n\r\t]/g, match => 
    match === '\n' ? '\\n' : match === '\r' ? '\\r' : '\\t');

    const addSubstrings = (string) => {
        // function to check first and last character for duplicates
        const searchRepeatingSymbol = (substr) => {
            const firstSymbol = substr[0];
            const lastSymbol = substr[substr.length - 1];

            if (firstSymbol === lastSymbol) {
                return true;
            }
            
            const trimmedSubstr = substr.slice(1, -1);
            return trimmedSubstr.includes(firstSymbol) || trimmedSubstr.includes(lastSymbol);
        };
        // calculating and adding a substring
        let endPosition = 1; 
        for (let i = 0; i < string.length; ++i) {
            for (let ii = endPosition; ii <= string.length; ++ii) { 
                const substr = string.slice(i, ii);
                if (substr.length > 1) {
                    if (searchRepeatingSymbol(substr)) {
                        endPosition = ii; 
                        break;
                    } else if (!substrings.has(substr)) {   
                        substrings.add(substr);                
                    };
                } else if (!substrings.has(substr)) {
                    substrings.add(substr); 
                };
            };
        };
        
    };
    addSubstrings(s);
    // find substring of maximum length
    let maxLength = 0;
    for (const substr of substrings) {
        maxLength = Math.max(maxLength, substr.length)
    }
    return maxLength;
};

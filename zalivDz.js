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
function searchIndexes(str, substr) {
    let array = [];
    let num = 0;
    while (num != -1) {
        num = str.indexOf(substr, num);
        if (num != -1) {
            array.push(num);
            ++num;
        };
    };
    return array;
    
}
console.log(searchIndexes('далеко далеко пасутся кто? правильно - коровы', 'ко'));

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
var multiply = function(num1, num2) {
    if (isNaN(num1) || isNaN(num2)) {
        return 'Error: can\’t count as number';
    };
    if (num1.includes('.')) {
        let n = num1.indexOf('.');
        let numLength = num1.length - n - 1;
        num1 = BigInt(Number(num1) * 10 ** numLength);
        
    };
    if (num2.includes('.')) {
        let n = num2.indexOf('.');
        let numLength = num2.length - n - 1;
        num2 = BigInt(Number(num2) * 10 ** numLength);
        
    };
    
    let result = BigInt(num1) * BigInt(num2);
    
    return String(result);
};

console.log(multiply("0.0000026", "3"));

// ===============================================================================================

/*
3. https://leetcode.com/problems/integer-to-roman/

*/
// РЕШЕНИЕ
var intToRoman = function(num) {
    const singleNumber = {
        0: "",
        1: "I",
        2: "II",
        3: "III",
        4: "IV",
        5: "V",
        6: "VI",
        7: "VII",
        8: "VIII",
        9: "IX"
    };
    const decimalNumbers = {
        0: "",
        1: "X",
        2: "XX",
        3: "XXX",
        4: "XL",
        5: "L",
        6: "LX",
        7: "LXX",
        8: "LXXX",
        9: "XC"
    };
    const hundrethsNumbers = {
        0: "",
        1: "C",
        2: "CC",
        3: "CCC",
        4: "CD",
        5: "D",
        6: "DC",
        7: "DCC",
        8: "DCCC",
        9: "CM"
    };
    const thousandthNumbers = {
        0: "",
        1: "M",
        2: "MM",
        3: "MMM"
    };
    let result;
     let converted = Number(num);
    if (typeof converted === 'number') {
        converted = String(converted);
        let itemPostition = 1;
        for (let i = 0; i < converted.length; ++i) {
            let num = converted[converted.length - itemPostition];
            if (itemPostition === 1) {
                result = singleNumber[num];
            } else if (itemPostition === 2) {
                result = decimalNumbers[num] + result;
            } else if (itemPostition === 3) {
                result = hundrethsNumbers[num] + result;
            } else if (itemPostition === 4) {
                result = thousandthNumbers[num] + result;
            };
            ++itemPostition;
        };
    } else {
        console.log(false);
    };
    
    return result;

};

/*
4.https://leetcode.com/problems/longest-substring-without-repeating-characters/
*/

// РЕШЕНИЕ (НЕ решена доконца, так-как не прошла последний тест leetCode, "Превышен лимит времени")
var lengthOfLongestSubstring = function(s) {
    if (!(s.length === 0) && !(isNaN(s) === 'number')) {
        
        const repSubstr = [];
        let substr;
        let positionStart = 0;
        let positionEnd = 1;

        for (;positionEnd <= s.length;) {
            substr = s.slice(positionStart, positionEnd);
            if (!(repSubstr.includes(substr))) {
                const symbols = [];
                for (let checkSymbol = 1; checkSymbol <= substr.length; ++checkSymbol ) {
                    const lastSymbol = 1;
                    if (substr[substr.length - checkSymbol] === substr[substr.length - lastSymbol]) {
                        symbols.push(substr[substr.length - checkSymbol]);
                    };
                };
                if (symbols.length > 1) {
                    positionEnd = ++positionStart;
                    ++positionEnd;
                } else {
                    repSubstr.push(substr);
                };
            } else if (repSubstr.includes(substr)) {
                ++positionEnd;
            };
        };
        function findLongString(repSubstr) {
            let itemOne = repSubstr[0];
            for (let itemtwo of repSubstr) {
                if (itemOne.length < itemtwo.length) {
                    itemOne = itemtwo;
                }; 
            };
            return itemOne.length;
        };
        return findLongString(repSubstr);
    } else {
        return 0;
    };
};

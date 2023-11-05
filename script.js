let result = document.getElementById('result');
let buttons = Array.from(document.getElementsByTagName('button'));
let calculated = false;

function calculate(expression) {
    try {
        let precision = 10;
        let newExpression = expression.replace(/([^.0-9])/g, ",$1,").split(",");
        for(let i=0; i<newExpression.length; i++) {
            if(["+", "-", "×", "÷"].includes(newExpression[i]) && !isNaN(newExpression[i-1]) && !isNaN(newExpression[i+1])) {
                newExpression[i-1] = (Math.round(newExpression[i-1] * Math.pow(10, precision)) / Math.pow(10, precision)).toString();
                newExpression[i+1] = (Math.round(newExpression[i+1] * Math.pow(10, precision)) / Math.pow(10, precision)).toString();
            }
        }
        return eval(newExpression.join("").replace("×", "*").replace("÷", "/"));
    } catch {
        return "错误";
    }
}

buttons.map(button => {
    button.addEventListener('click', (e) => {
        if(result.innerText == '错误') {
            result.innerText = '';
        }
        if(e.target.innerText == '=') {
            result.innerText = calculate(result.innerText);
            calculated = true;
        } else if(e.target.innerText == 'AC') {
            result.innerText = '';
        } else {
            if(result.innerText == '0' && !isNaN(e.target.innerText)) {
                result.innerText = '';
            }
            if(calculated && !isNaN(e.target.innerText)) {
                result.innerText = '';
                calculated = false;
            }
            if(["+", "-", "×", "÷"].includes(e.target.innerText)) {
                if(result.innerText.length > 0 && ["+", "-", "×", "÷"].includes(result.innerText.slice(-1))) {
                    result.innerText = result.innerText.slice(0, -1) + e.target.innerText;
                } else if(result.innerText.length > 0) {
                    result.innerText += e.target.innerText;
                }
            } else {
                result.innerText += e.target.innerText;
            }
        }
        if(result.innerText == '') {
            result.innerText = '0';
        }
    });
});

// 添加键盘事件监听器
document.addEventListener('keydown', function(event) {
    let key = event.key;
    let validKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '*', '/', '.', 'Enter', 'Backspace'];
    if (validKeys.includes(key)) {
        if (key === 'Enter') {
            key = '=';
        } else if (key === 'Backspace') {
            key = 'AC';
        }
        let button = buttons.find(button => button.innerText === key);
        if (button) {
            button.click();
        }
    }
});
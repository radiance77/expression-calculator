function eval() {
  // Do not use eval!!!
  return;
}

const operators = {
  '+': (a, b) => b + a,
  '-': (a, b) => b - a,
  '*': (a, b) => b * a,
  '/': (a, b) => { if (a !== 0) { return b / a } else throw ('TypeError: Division by zero.') }
};

const deleteSpaces = (str) => {
  let result = [];
  let num = '';
  str = str.split('');
  let flag = false;

  for(let i = 0; i < str.length; i++) {
    if (!(+str[i] === +str[i]) && str[i] !== ' ') {
      flag = false;
      result.push(num);
      num = '';
      result.push(str[i]);
    }
    else if(str[i] !== ' '){
      if(flag){
        num += str[i];
      }
      else{
        flag = true;
        num += str[i];
      }
    }
  }
  if (flag) result.push(num)
  return result.filter(elem => elem !== '');
}

const expressionCalculator = (expr) => {
  let count = 0;
  let str = expr.slice();
  for(elem of str){
    if(elem === ')'){
      count++;
    } else if(elem === '(') {
      count--;
    }
  } 
  if(count !== 0) throw ("ExpressionError: Brackets must be paired");

  // Convert a string to an array without spaces

  expr = deleteSpaces(expr);

  // Convert a string to reverse Polish notation
  let reversedExpr = [];
  let stack = [];
  const pr = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
  };
  for (let i = 0; i < expr.length; ++i) {
      if (+expr[i] === +expr[i]) {
        reversedExpr.push(expr[i]);
      }
      else if (expr[i] === '(') {
          stack.push(expr[i]);
      }
      else if (expr[i] === ')') {
          while (stack[stack.length - 1] !== '(') {
            reversedExpr.push(stack.pop());
          }
          stack.pop();
      }
      else {
          while (pr[expr[i]] <= pr[stack[stack.length - 1]]) {
            reversedExpr.push(stack.pop());
          }
          stack.push(expr[i]);
      }
  }
  while (stack.length !== 0) {
    reversedExpr.push(stack.pop());
  }

  // Calculations
  let stackReverseExpr = [];
  for (let i = 0; i < reversedExpr.length; ++i) {
      if (+reversedExpr[i] === +reversedExpr[i]) {
        stackReverseExpr.push(+reversedExpr[i]);
      }
      else {
          stackReverseExpr.push(operators[reversedExpr[i]](stackReverseExpr.pop(), stackReverseExpr.pop()));
      }
  }

  return stackReverseExpr.pop();
}

module.exports = {
    expressionCalculator
}
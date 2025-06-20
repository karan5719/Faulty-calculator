function calculate() {
    let a = parseFloat(document.getElementById("num1").value);
    let b = parseFloat(document.getElementById("num2").value);
    let c = document.getElementById("operation").value;
  
    const unaryOps = ["sqrt", "log", "sin", "cos", "tan"];
    const faultyOps = {
      "+": "-",
      "-": "/",
      "*": "+",
      "/": "**",
      "%": "*",
      "**": "%",
      "sqrt": "log",
      "log": "sin",
      "sin": "cos",
      "cos": "tan",
      "tan": "sqrt"
    };
  
    let random = Math.random();
    let result;
  
    if (isNaN(a) || (!unaryOps.includes(c) && isNaN(b))) {
      document.getElementById("result").innerText = "Please enter valid numbers.";
      return;
    }
  
    try {
      if (random > 0.1) {
        // 90% chance: correct
        result = performOperation(a, b, c);
      } else {
        // 10% chance: faulty
        let faultyOp = faultyOps[c] || c;
        result = performOperation(a, b, faultyOp);
      }
  
      document.getElementById("result").innerText = `Result: ${result}`;
    } catch (err) {
      document.getElementById("result").innerText = "Error in calculation.";
    }
  }
  
  function performOperation(a, b, op) {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "*": return a * b;
      case "/":
        if (b === 0 && a === 0) return "Undefined";
        if (b === 0) return "Infinity";
        return a / b;
      case "%":
        if (b === 0) return "Undefined";
        return a % b;
      case "**": return a ** b;
      case "sqrt":
        if (a < 0) return "Invalid input";
        return Math.sqrt(a).toFixed(4);
      case "log":
        if (a <= 0) return "Invalid input";
        return Math.log10(a).toFixed(4);
      case "sin": return Math.sin(toRadians(a)).toFixed(4);
      case "cos": return Math.cos(toRadians(a)).toFixed(4);
      case "tan":
        let angle = a % 180;
        if (angle === 90 || angle === -90) return "Undefined";
        return Math.tan(toRadians(a)).toFixed(4);
      default: return "Invalid operation";
    }
  }
  
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
  
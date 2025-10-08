// Global variables for tracking
let totalCalculations = 0;
let errorsDetected = 0;
let isFaulty = false;

function calculate() {
    // Show loading state
    const btn = document.getElementById("calculateBtn");
    const resultDiv = document.getElementById("result");
    const statsDiv = document.getElementById("stats");
    
    btn.classList.add("loading");
    resultDiv.classList.remove("success", "error", "shake", "bounce");
    resultDiv.innerHTML = '<div class="result-placeholder">Calculating...</div>';
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
        performCalculation();
    }, 800);
}

function performCalculation() {
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
    let actualResult;
    isFaulty = false;
  
    if (isNaN(a) || (!unaryOps.includes(c) && isNaN(b))) {
      showResult("Please enter valid numbers.", "error");
      return;
    }
  
    try {
      // Calculate actual result first
      actualResult = performOperation(a, b, c);
      
      if (random > 0.1) {
        // 90% chance: correct
        result = actualResult;
        isFaulty = false;
      } else {
        // 10% chance: faulty
        let faultyOp = faultyOps[c] || c;
        result = performOperation(a, b, faultyOp);
        isFaulty = true;
      }
  
      // Update statistics
      totalCalculations++;
      if (isFaulty) {
        errorsDetected++;
      }
      
      // Show result with appropriate styling
      const resultText = isFaulty ? 
        ` Result: ${result} (This might be wrong!)` : 
        `Result: ${result}`;
      
      showResult(resultText, isFaulty ? "error" : "success");
      
      // Update stats display
      updateStats();
      
    } catch (err) {
      showResult("Error in calculation.", "error");
    }
    
    // Remove loading state
    const btn = document.getElementById("calculateBtn");
    btn.classList.remove("loading");
}

function showResult(text, type) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = text;
    resultDiv.className = `result ${type}`;
    
    // Add animation based on result type
    if (type === "error") {
        resultDiv.classList.add("shake");
    } else {
        resultDiv.classList.add("bounce");
    }
    
    // Remove animation classes after animation completes
    setTimeout(() => {
        resultDiv.classList.remove("shake", "bounce");
    }, 1000);
}

function updateStats() {
    const statsDiv = document.getElementById("stats");
    const totalCalculationsEl = document.getElementById("totalCalculations");
    const errorsDetectedEl = document.getElementById("errorsDetected");
    
    if (totalCalculations > 0) {
        statsDiv.style.display = "block";
        totalCalculationsEl.textContent = totalCalculations;
        errorsDetectedEl.textContent = errorsDetected;
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

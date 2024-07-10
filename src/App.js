import React, { useState } from "react";
import "./App.css";

function App() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [operation, setOperation] = useState("percent");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [total, setTotal] = useState("");
  const [parts, setParts] = useState("");
  const [distributionResult, setDistributionResult] = useState("");
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [growthResult, setGrowthResult] = useState("");

  const calculate = () => {
    const num1 = parseFloat(number1);
    const num2 = parseFloat(number2);
    let calculationResult;

    if (isNaN(num1) || isNaN(num2)) {
      calculationResult = "Please enter valid numbers in both fields.";
    } else {
      switch (operation) {
        case "percent":
          calculationResult = `${num1} is ${((num1 / num2) * 100).toFixed(
            2
          )}% of ${num2}`;
          break;
        case "percentOf":
          calculationResult = `${num1}% of ${num2} is ${(
            (num1 / 100) *
            num2
          ).toFixed(2)}`;
          break;
        case "increase":
          calculationResult = `The percentage increase from ${num1} to ${num2} is ${(
            ((num2 - num1) / num1) *
            100
          ).toFixed(2)}%`;
          break;
        case "decrease":
          calculationResult = `The percentage decrease from ${num1} to ${num2} is ${(
            ((num1 - num2) / num1) *
            100
          ).toFixed(2)}%`;
          break;
        case "difference":
          calculationResult = `The percentage difference between ${num1} and ${num2} is ${(
            (Math.abs(num1 - num2) / ((num1 + num2) / 2)) *
            100
          ).toFixed(2)}%`;
          break;
        default:
          calculationResult = "Invalid operation";
      }
    }

    setResult(calculationResult);
    addToHistory(calculationResult);
  };

  const clearInputs = () => {
    setNumber1("");
    setNumber2("");
    setResult("");
  };

  const calculateDistribution = () => {
    const totalValue = parseFloat(total);
    const numParts = parseInt(parts);

    if (isNaN(totalValue) || isNaN(numParts) || numParts <= 0) {
      setDistributionResult("Please enter valid numbers.");
      return;
    }

    const partValue = totalValue / numParts;
    const percentage = (1 / numParts) * 100;

    const result = `Each part is ${partValue.toFixed(2)} (${percentage.toFixed(
      2
    )}% of the total)`;
    setDistributionResult(result);
    addToHistory(`Distribution: ${result}`);
  };

  const calculateCompoundGrowth = () => {
    const principalValue = parseFloat(principal);
    const rateValue = parseFloat(rate);
    const yearsValue = parseInt(years);

    if (isNaN(principalValue) || isNaN(rateValue) || isNaN(yearsValue)) {
      setGrowthResult("Please enter valid numbers.");
      return;
    }

    const futureValue =
      principalValue * Math.pow(1 + rateValue / 100, yearsValue);
    const totalGrowth = ((futureValue - principalValue) / principalValue) * 100;

    const result = `Future value: ${futureValue.toFixed(
      2
    )}. Total growth: ${totalGrowth.toFixed(2)}%`;
    setGrowthResult(result);
    addToHistory(`Compound Growth: ${result}`);
  };

  const addToHistory = (result) => {
    setHistory((prevHistory) => {
      const newHistory = [result, ...prevHistory];
      return newHistory.slice(0, 5);
    });
  };

  return (
    <div className="container">
      <h1>Advanced Percentage Calculator</h1>

      <div className="calculator">
        <div className="input-group">
          <label htmlFor="number1">Number 1</label>
          <input
            type="number"
            id="number1"
            value={number1}
            onChange={(e) => setNumber1(e.target.value)}
            placeholder="Enter first number"
          />
        </div>
        <div className="input-group">
          <label htmlFor="number2">Number 2</label>
          <input
            type="number"
            id="number2"
            value={number2}
            onChange={(e) => setNumber2(e.target.value)}
            placeholder="Enter second number"
          />
        </div>
        <div className="input-group">
          <label htmlFor="operation">Operation</label>
          <select
            id="operation"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <option value="percent">Calculate Percentage</option>
            <option value="percentOf">Calculate % of Number</option>
            <option value="increase">Calculate % Increase</option>
            <option value="decrease">Calculate % Decrease</option>
            <option value="difference">Percentage Difference</option>
          </select>
        </div>
        <div className="button-group">
          <button onClick={calculate}>Calculate</button>
          <button onClick={clearInputs}>Clear</button>
        </div>
        <div id="result">{result}</div>
        <div className="explanation">
          This calculator performs various percentage calculations based on two
          input numbers and the selected operation.
        </div>
      </div>

      <div className="advanced-features">
        <h2>Advanced Features</h2>
        <div className="feature">
          <h3>Percentage Distribution</h3>
          <div className="input-group">
            <label htmlFor="total">Total Value</label>
            <input
              type="number"
              id="total"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              placeholder="Enter total value"
            />
          </div>
          <div className="input-group">
            <label htmlFor="parts">Number of Parts</label>
            <input
              type="number"
              id="parts"
              value={parts}
              onChange={(e) => setParts(e.target.value)}
              placeholder="Enter number of parts"
            />
          </div>
          <button onClick={calculateDistribution}>
            Calculate Distribution
          </button>
          <div id="distributionResult">{distributionResult}</div>
          <div className="explanation">
            The Percentage Distribution tool helps you divide a total value into
            equal parts and calculates the percentage each part represents.
          </div>
        </div>
        <div className="feature">
          <h3>Compound Growth</h3>
          <div className="input-group">
            <label htmlFor="principal">Initial Value</label>
            <input
              type="number"
              id="principal"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="Enter initial value"
            />
          </div>
          <div className="input-group">
            <label htmlFor="rate">Annual Growth Rate (%)</label>
            <input
              type="number"
              id="rate"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Enter annual growth rate"
            />
          </div>
          <div className="input-group">
            <label htmlFor="years">Number of Years</label>
            <input
              type="number"
              id="years"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="Enter number of years"
            />
          </div>
          <button onClick={calculateCompoundGrowth}>
            Calculate Compound Growth
          </button>
          <div id="growthResult">{growthResult}</div>
          <div className="explanation">
            The Compound Growth calculator determines the future value of an
            investment based on the initial value, annual growth rate, and
            number of years.
          </div>
        </div>
      </div>

      <div className="history">
        <h2>Calculation History</h2>
        <ul id="historyList">
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";

import { WidgetBody, WidgetControls } from "@/components/ui/Widget";

export const Calculator = ({
  display: savedDisplay = "0",
  onConfigChange,
  onRemove,
}) => {
  const [display, setDisplay] = useState(savedDisplay);
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [shouldResetDisplay, setshouldResetDisplay] = useState(null);

  function inputDigit(digit) {
    if (shouldResetDisplay) {
      setDisplay(digit);
      setshouldResetDisplay(false);
      return;
    }

    if (display === "0") {
      setDisplay(digit);
      return;
    }

    setDisplay(display + digit);
  }

  function inputDecimal() {
    if (shouldResetDisplay) {
      setDisplay("0.");
      setshouldResetDisplay(false);
    }

    if (display.includes("0.0")) return;

    setDisplay(display + ".");
  }

  function chooseOperator(nextOperator) {
    setPreviousValue(Number(display));
    setOperator(nextOperator);
    setshouldResetDisplay(true);
  }

  function calculate() {
    if (operator === null || previousValue === null) return;

    const currentValue = Number(display);
    let result;

    if (operator === "+") {
      result = previousValue + currentValue;
    }

    if (operator === "-") {
      result = previousValue - currentValue;
    }

    if (operator === "*") {
      result = previousValue * currentValue;
    }

    if (operator === "/") {
      result = previousValue / currentValue;
    }

    setDisplay(String(result));
    setPreviousValue(null);
    setOperator(null);
    setshouldResetDisplay(true);
  }

  function clearCalculator() {
    updateDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setshouldResetDisplay(false);
  }

  function updateDisplay(nextDisplay) {
    setDisplay(nextDisplay);
    onConfigChange?.({ display: nextDisplay });
  }

  const button = `
    w-10
  `

  return (
    <WidgetBody
      top={<span>{display}</span>}
      middle={
        <div className="grid grid-cols-4 gap-2">
          <button onClick={clearCalculator} className={`clickable ${button}`}>C</button>
          <button onClick={() => chooseOperator("/")} className={`clickable ${button}`}>/</button>
          <button onClick={() => chooseOperator("*")} className={`clickable ${button}`}>*</button>
          <button onClick={() => chooseOperator("-")} className={`clickable ${button}`}>-</button>

          <button onClick={() => inputDigit("7")} className={`clickable ${button}`}>7</button>
          <button onClick={() => inputDigit("8")} className={`clickable ${button}`}>8</button>
          <button onClick={() => inputDigit("9")} className={`clickable ${button}`}>9</button>
          <button onClick={() => chooseOperator("+")} className={`clickable ${button}`}>+</button>

          <button onClick={() => inputDigit("4")} className={`clickable ${button}`}>4</button>
          <button onClick={() => inputDigit("5")} className={`clickable ${button}`}>5</button>
          <button onClick={() => inputDigit("6")} className={`clickable ${button}`}>6</button>
          <button onClick={calculate} className={`clickable ${button}`}>=</button>

          <button onClick={() => inputDigit("1")} className={`clickable ${button}`}>1</button>
          <button onClick={() => inputDigit("2")} className={`clickable ${button}`}>2</button>
          <button onClick={() => inputDigit("3")} className={`clickable ${button}`}>3</button>
          <button onClick={inputDecimal} className={`clickable ${button}`}>.</button>
        </div>
      }
      bottom={
        <WidgetControls>
          <WidgetControls.Erase onClick={onRemove} />
        </WidgetControls>
      }
    />
  );
};

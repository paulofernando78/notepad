import { useState } from "react";

import { WidgetBody, WidgetControls } from "@/components/ui/Widget";
import { Icon } from "@/components/ui/Icon";

export const Calculator = ({
  display: savedDisplay = "0",
  onConfigChange,
  onRemove,
}) => {
  const [display, setDisplay] = useState(savedDisplay);
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  function inputDigit(digit) {
    if (shouldResetDisplay) {
      updateDisplay(digit);
      setShouldResetDisplay(false);
      return;
    }

    if (display === "0") {
      updateDisplay(digit);
      return;
    }

    updateDisplay(display + digit);
  }

  function inputDecimal() {
    if (shouldResetDisplay) {
      updateDisplay("0.");
      setShouldResetDisplay(false);
      return;
    }

    if (display.includes(".")) return;

    updateDisplay(display + ".");
  }

  function inputPercent() {
    const percentageValue = Number(display) / 100;

    updateDisplay(String(percentageValue));
    setShouldResetDisplay(true);
  }

  function toggleSign() {
    if (display === "0") return;

    if (display.startsWith("-")) {
      updateDisplay(display.slice(1));
      return;
    }

    updateDisplay(`-${display}`);
  }

  function getResult(firstValue, secondValue, currentOperator) {
    if (currentOperator === "+") return firstValue + secondValue;
    if (currentOperator === "-") return firstValue - secondValue;
    if (currentOperator === "*") return firstValue * secondValue;
    if (currentOperator === "/") return firstValue / secondValue;

    return secondValue;
  }

  function chooseOperator(nextOperator) {
    const currentValue = Number(display);

    if (previousValue !== null && operator !== null && !shouldResetDisplay) {
      const result = getResult(previousValue, currentValue, operator);

      updateDisplay(String(result));
      setPreviousValue(result);
      setOperator(nextOperator);
      setShouldResetDisplay(true);

      return;
    }

    setPreviousValue(currentValue);
    setOperator(nextOperator);
    setShouldResetDisplay(true);
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

    updateDisplay(String(result));
    setPreviousValue(null);
    setOperator(null);
    setShouldResetDisplay(true);
  }

  function clearCalculator() {
    updateDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setShouldResetDisplay(false);
  }

  function deleteLastDigit() {
    if (shouldResetDisplay) {
      updateDisplay("0");
      setShouldResetDisplay(false);
      return;
    }

    if (display.length === 1) {
      updateDisplay("0");
      return;
    }

    updateDisplay(display.slice(0, -1));
  }

  function updateDisplay(nextDisplay) {
    setDisplay(nextDisplay);
    onConfigChange?.({ display: nextDisplay });
  }

  const button = `
    size-9
    !rounded-full
    !p-0
    flex
    items-center
    justify-center
    border-0
    bg-gray-900/70
    text-white
    hover:bg-gray-800
  `;
  const utilityButton = "bg-emerald-950/70 hover:bg-emerald-900";
  const operatorButton = "bg-emerald-800/70 hover:bg-emerald-700";
  const equalButton = "bg-emerald-600 hover:bg-emerald-500";

  return (
    <WidgetBody
      top={
        <div
          className="
        flex
        justify-end
        mx-12
        p-2
        text-gray-800
        border
        rounded-lg"
        >
          <span className="text-lg">{display}</span>
        </div>
      }
      middle={
        <div className="grid grid-cols-4 gap-1.5">
          <button
            onClick={clearCalculator}
            className={`clickable ${button} ${utilityButton}`}
          >
            AC
          </button>
          <button
            onClick={toggleSign}
            className={`clickable ${button} ${utilityButton}`}
          >
            ()
          </button>
          <button
            onClick={inputPercent}
            className={`clickable ${button} ${utilityButton}`}
          >
            %
          </button>
          <button
            onClick={() => chooseOperator("/")}
            className={`clickable ${button} ${operatorButton}`}
          >
            <Icon name="divide" className="text-white" />
          </button>

          <button
            onClick={() => inputDigit("7")}
            className={`clickable ${button}`}
          >
            7
          </button>
          <button
            onClick={() => inputDigit("8")}
            className={`clickable ${button}`}
          >
            8
          </button>
          <button
            onClick={() => inputDigit("9")}
            className={`clickable ${button}`}
          >
            9
          </button>
          <button
            onClick={() => chooseOperator("*")}
            className={`clickable ${button} ${operatorButton}`}
          >
            <Icon name="x" className="text-white" />
          </button>

          <button
            onClick={() => inputDigit("4")}
            className={`clickable ${button}`}
          >
            4
          </button>
          <button
            onClick={() => inputDigit("5")}
            className={`clickable ${button}`}
          >
            5
          </button>
          <button
            onClick={() => inputDigit("6")}
            className={`clickable ${button}`}
          >
            6
          </button>

          <button
            onClick={() => chooseOperator("-")}
            className={`clickable ${button} ${operatorButton}`}
          >
            <Icon name="minus" className="text-white" />
          </button>
          <button
            onClick={() => inputDigit("1")}
            className={`clickable ${button}`}
          >
            1
          </button>
          <button
            onClick={() => inputDigit("2")}
            className={`clickable ${button}`}
          >
            2
          </button>
          <button
            onClick={() => inputDigit("3")}
            className={`clickable ${button}`}
          >
            3
          </button>
          <button
            onClick={() => chooseOperator("+")}
            className={`clickable ${button} ${operatorButton}`}
          >
            <Icon name="plus" className="text-white" />
          </button>
          <button
            onClick={() => inputDigit("0")}
            className={`clickable ${button}`}
          >
            0
          </button>
          <button onClick={inputDecimal} className={`clickable ${button}`}>
            .
          </button>
          <button onClick={deleteLastDigit} className={`clickable ${button}`}>
            <Icon name="delete" className="text-white" />
          </button>
          <button
            onClick={calculate}
            className={`clickable ${button} ${equalButton}`}
          >
            <Icon name="equal" className="text-white" />
          </button>
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

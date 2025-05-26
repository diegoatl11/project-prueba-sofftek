import React from "react";

interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="step-indicator">
      <div
        className={`step-indicator__step ${
          currentStep === 1 ? "step-indicator__step--active" : ""
        }`}
      >
        <span className="step-indicator__circle">1</span>
        <span className="step-indicator__label">Planes y coberturas</span>
        <span className="step-indicator__dots"></span>
      </div>

      <div
        className={`step-indicator__step ${
          currentStep === 2 ? "step-indicator__step--active" : ""
        }`}
      >
        <span className="step-indicator__circle">2</span>
        <span className="step-indicator__label">Resumen</span>
      </div>
    </div>
  );
};

export default StepIndicator;

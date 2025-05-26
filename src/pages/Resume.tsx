import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { labelResume } from "../constants/Resume/resume";
import { defaultPlan, defaultUser } from "../constants/Resume/data";
import StepIndicator from "../components/StepIndicator";

const Resume = () => {
  const [user, setUser] = useState(defaultUser);
  const [plan, setPlan] = useState(defaultPlan);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedPlan = localStorage.getItem("selectedPlan");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          name: parsedUser.name ?? defaultUser.name,
          lastName: parsedUser.lastName ?? defaultUser.lastName,
          docType: parsedUser.docType ?? defaultUser.docType,
          docNumber: parsedUser.docNumber ?? defaultUser.docNumber,
          phone: parsedUser.phone ?? defaultUser.phone,
        });
      }

      if (storedPlan) {
        const parsedPlan = JSON.parse(storedPlan);
        const formattedPrice = `$ ${parsedPlan?.price} al mes`;
        setPlan({
          name: parsedPlan.name ?? defaultPlan.name,
          price: formattedPrice ?? defaultPlan.price,
        });
      }
    } catch (error) {
      console.warn("Error al parsear datos desde localStorage:", error);
    }
  }, []);

  const handleBack = () => navigate("/plans");

  return (
    <div className="resume">
      <StepIndicator currentStep={2} />
      <button className="resume__back" onClick={handleBack}>
        {labelResume.back}
      </button>

      <h2 className="resume__title">{labelResume.title}</h2>

      <div className="resume__card">
        <p className="resume__label">{labelResume.subtitle}</p>

        <div className="resume__user">
          <span className="resume__user-name">
            {user.name} {user.lastName}
          </span>
        </div>

        <div className="resume__section">
          <h3 className="resume__section-title">{labelResume.responsible}</h3>
          <p>
            {user.docType}: {user.docNumber}
          </p>
          <p>
            {labelResume.phone}: {user.phone}
          </p>
        </div>

        <div className="resume__section">
          <h3 className="resume__section-title">{labelResume.planChosen}</h3>
          <p>{plan.name}</p>
          <p>
            {labelResume.resumePrice}: {plan.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resume;

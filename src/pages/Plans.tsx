import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPlans } from "../service/plansService";
import { type OptionKey, cardOptions } from "../constants/Plans/cardOptions";
import { type Plan } from "../types/plan";
import { labelPlans } from "../constants/Plans/plans";
import StepIndicator from "../components/StepIndicator";
import Slider from "react-slick";

const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const Plans = () => {
  const [selectedOption, setSelectedOption] = useState<OptionKey | null>(null);
  const [name, setName] = useState("Usuario");
  const [plans, setPlans] = useState<Plan[]>([]);
  const navigate = useNavigate();

  const formatPlans = (data: any[]): Plan[] =>
    data.map((plan, index) => ({
      id: String(index + 1),
      name: plan.name.trim(),
      price: plan.price,
      benefits: plan.description.map((desc: string) => desc.trim()),
      recommended: plan.price === 99,
      age: plan.age,
    }));

  const loadPlans = useCallback(async () => {
    try {
      const { list } = await fetchPlans();

      const userAge = (() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser)?.age ?? 0 : 0;
      })();

      console.log("User age:", userAge);

      const filteredPlans = list.filter(
        (plan: { age: number }) => userAge <= plan.age
      );
      setPlans(formatPlans(filteredPlans));
    } catch (error) {
      console.error("Failed to load plans:", error);
    }
  }, []);

  useEffect(() => {
    localStorage.removeItem("selectedPlan");

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user?.name) setName(user.name);
      } catch {
        console.warn("Error al parsear usuario desde localStorage");
      }
    }
  }, []);

  useEffect(() => {
    if (selectedOption) {
      loadPlans();
    }
  }, [selectedOption, loadPlans]);

  const handlePlanSelect = (plan: Plan) => {
    if (!selectedOption) return;

    const isOther = selectedOption === "other";
    const selectedFor = isOther ? "Para alguien más" : "Para mí";

    const discountedPrice = isOther ? plan.price * 0.95 : plan.price;

    const selectedPlan = {
      ...plan,
      price: discountedPrice,
      selectedFor,
    };

    localStorage.setItem("selectedPlan", JSON.stringify(selectedPlan));
    navigate("/resume");
  };

  return (
    <div className="plans">
      <div className="plans__content">
        <StepIndicator currentStep={1} />
        <h1 className="plans__title">
          {name}, {labelPlans.tittle}
        </h1>
        <p className="plans__subtitle">{labelPlans.subtitle}</p>

        <div className="plans__cards">
          {cardOptions.map(({ key, title, text }) => {
            const isSelected = selectedOption === key;
            return (
              <div
                key={key}
                className={`plans__card ${
                  isSelected ? "plans__card--selected" : ""
                }`}
                onClick={() => setSelectedOption(key)}
              >
                <div className={`plans__icon plans__icon--${key}`} />
                <h3 className="plans__card-title">{title}</h3>
                <p className="plans__card-text">{text}</p>
              </div>
            );
          })}
        </div>

        {plans.length > 0 && (
          <div className="plans__carousel">
            <Slider {...sliderSettings}>
              {plans.map((plan) => (
                <div className="plans__plan-card" key={plan.id}>
                  {plan.recommended && (
                    <div className="plans__plan-badge">
                      {labelPlans.recomended}
                    </div>
                  )}
                  <h4 className="plans__plan-title">{plan.name}</h4>
                  <p className="plans__plan-price">${plan.price} al mes</p>
                  <ul className="plans__plan-benefits">
                    {plan.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                  <button
                    className="plans__plan-button"
                    onClick={() => handlePlanSelect(plan)}
                  >
                    {labelPlans.buttonPlan}
                  </button>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
};

export default Plans;

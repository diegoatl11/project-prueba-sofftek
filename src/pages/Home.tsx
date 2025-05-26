import familyImg from "../assets/image/Home/home_logo.png";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../service/userService";
import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import { validationSchema } from "../schemas/validationHome";
import { labelForm } from "../constants/Home/forms";
import { type FormValues } from "../types/home";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();

  const initialValues: FormValues = {
    docType: "DNI",
    docNumber: "",
    phone: "",
    privacy: true,
    communications: true,
  };

  const calculateAge = (birthDate: string): number => {
    const [day, month, year] = birthDate.split("-").map(Number);
    const birth = new Date(year, month - 1, day);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
    if (
      currentMonth < birth.getMonth() ||
      (currentMonth === birth.getMonth() && currentDay < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      const response = await fetchUser();

      const userinfo = {
        ...values,
        age: calculateAge(response.birthDay),
        ...response,
      };

      localStorage.setItem("user", JSON.stringify(userinfo));
      navigate("/plans");
    } catch (error) {
      alert("Error al obtener datos del usuario");
      console.error(error);
    }
    setSubmitting(false);
  };

  return (
    <>
      <section className="home">
        <div className="home__content container">
          <div className="home__image">
            <img src={familyImg} alt="home__family" />
          </div>

          <div className="home__form">
            <span className="home__tag">{labelForm.tag}</span>
            <h1 className="home__title">{labelForm.tittle}</h1>
            <p className="home__description">{labelForm.description}</p>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="home__inputs">
                    <div className="home__select-group">
                      <Field as="select" name="docType">
                        <option value="DNI">DNI</option>
                        <option value="RUC">RUC</option>
                      </Field>

                      <Field
                        type="text"
                        name="docNumber"
                        placeholder="Nro. de documento"
                      />
                      <ErrorMessage
                        name="docNumber"
                        component="div"
                        className="error"
                      />
                    </div>

                    <Field type="text" name="phone" placeholder="Celular" />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className="home__checkboxes">
                    <label>
                      <Field type="checkbox" name="privacy" />
                      {labelForm.checkboxes.privacy.label}
                    </label>
                    <ErrorMessage
                      name="privacy"
                      component="div"
                      className="error"
                    />

                    <label>
                      <Field type="checkbox" name="communications" />
                      {labelForm.checkboxes.communications.label}
                    </label>
                    <ErrorMessage
                      name="communications"
                      component="div"
                      className="error"
                    />

                    <a href="#">{labelForm.terms}</a>
                  </div>

                  <button
                    className="home__btn"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {labelForm.buttom}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;

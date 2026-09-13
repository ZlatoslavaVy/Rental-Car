"use client";

import { Field, Form, Formik, type FormikHelpers } from "formik";
import { useId, useState } from "react";
import toast from "react-hot-toast";

import { makeBookingRequest } from "@/lib/api/cars.service";
import { rentalValidationSchema } from "@/validations/rentalValidation";
import { RentCarPayload } from "@/types/car";

import css from "./CarRentalForm.module.css";

const initialValues: RentCarPayload = {
  name: "",
  email: "",
  comment: "",
};

interface CarRentalFormProps {
  id: string;
}

const CarRentalForm = ({ id }: CarRentalFormProps) => {
  const [isLoading, setLoading] = useState(false);
  const fieldId = useId();

  const handleSubmit = async (values: RentCarPayload, actions: FormikHelpers<RentCarPayload>) => {
    try {
      setLoading(true);
      const result = await makeBookingRequest(id, values);

      if (result) {
        toast.success("Car rental request sent successfully!");
        actions.resetForm();
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.formWrapper}>
      <p className={css.formTitle}>Book your car now</p>
      <p className={css.formDescription}>Stay connected! We are always ready to help you.</p>

      <Formik
        initialValues={initialValues}
        validationSchema={rentalValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, submitCount }) => {
          const hasError = (field: keyof RentCarPayload) =>
            Boolean(errors[field] && (touched[field] || submitCount > 0));

          return (
            <Form className={css.form}>
              <div className={css.fieldWrapper}>
                <Field
                  id={`${fieldId}-name`}
                  name="name"
                  placeholder="Name*"
                  className={css.input}
                />
                {hasError("name") && <span className={css.errorText}>{errors.name}</span>}
              </div>

              <div className={css.fieldWrapper}>
                <Field
                  id={`${fieldId}-email`}
                  name="email"
                  type="email"
                  placeholder="Email*"
                  className={css.input}
                />
                {hasError("email") && <span className={css.errorText}>{errors.email}</span>}
              </div>

              <div className={css.fieldWrapper}>
                <Field
                  as="textarea"
                  id={`${fieldId}-comment`}
                  name="comment"
                  placeholder="Comment"
                  className={css.textarea}
                />
                {hasError("comment") && <span className={css.errorText}>{errors.comment}</span>}
              </div>

              <button type="submit" disabled={isLoading} className={css.rentButton}>
                {isLoading && <span className={css.loader}></span>}
                Send
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CarRentalForm;

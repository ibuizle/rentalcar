"use client";

import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import Calendar from "@/components/Calendar/Calendar";
import { rentCar } from "@/lib/cars";
import type { BookingRequestPayload, RentalFormValues } from "@/types/car";
import styles from "./RentalForm.module.css";

type RentalFormProps = {
  carId: string;
};

const initialValues: RentalFormValues = {
  name: "",
  email: "",
  bookingDate: "",
  comment: "",
};

export default function RentalForm({ carId }: RentalFormProps) {
  const [values, setValues] = useState<RentalFormValues>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function changeField(field: keyof RentalFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = values.name.trim();
    const email = values.email.trim();
    const comment = values.comment.trim();

    if (!name || !email) {
      toast.error("Please fill in name and email");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload: BookingRequestPayload = {
        name,
        email,
        ...(comment ? { comment } : {}),
      };

      const response = await rentCar(carId, payload);

      toast.success(response.message || "Booking request created successfully");
      setValues(initialValues);
    } catch {
      toast.error("Booking service is temporarily unavailable");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={styles.rentalForm} onSubmit={handleSubmit}>
      <h2>Book your car now</h2>
      <p>Stay connected! We are always ready to help you.</p>

      <input
        type="text"
        name="name"
        placeholder="Name*"
        autoComplete="name"
        required
        value={values.name}
        onChange={(event) => changeField("name", event.target.value)}
      />

      <input
        type="email"
        name="email"
        placeholder="Email*"
        autoComplete="email"
        required
        value={values.email}
        onChange={(event) => changeField("email", event.target.value)}
      />

      <Calendar
        value={values.bookingDate}
        onChange={(date) => changeField("bookingDate", date)}
      />

      <textarea
        name="comment"
        placeholder="Comment"
        value={values.comment}
        onChange={(event) => changeField("comment", event.target.value)}
      />

      <button
        className={`primaryButton ${styles.formButton}`}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";

export default function FeedbackForm() {
  const [form, setForm] = useState({ name: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", form);
    alert("Feedback submitted successfully!");
    setForm({ name: "", message: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 shadow-lg rounded-2xl bg-white"
    >
      <h2 className="text-xl font-semibold mb-4">Feedback Form</h2>
      <Input
        label="Your Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <Input
        label="Message"
        name="message"
        value={form.message}
        onChange={handleChange}
        required
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}

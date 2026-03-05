import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { first_name, email, message } = formData;
    if (!first_name || !email || !message) {
      toast.error("❌ Please fill out all fields!");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("❌ Please enter a valid email address.");
      return;
    }

    setLoading(true);
    emailjs
      .send(
        "service_r47rh4n",
        "template_b71q2a6",
        formData,
        "IZeQAt9QusTErsVma"
      )
      .then(
        () => {
          toast.success("Message sent successfully!");
          setFormData({ first_name: "", email: "", message: "" });
          setLoading(false);
        },
        () => {
          toast.error("❌ Failed to send message. Please try again.");
          setLoading(false);
        }
      );
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex justify-center py-12 px-4">
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
      <div
        className={`w-full max-w-3xl rounded shadow-sm overflow-hidden ${
          isMobile ? "flex flex-col" : "flex flex-row"
        }`}
      >
        {/* Left Panel */}
        <div
          className={`flex-1 ${
            isMobile ? "rounded-t-lg" : "rounded-l-lg"
          } bg-yellow-500 text-white p-6 flex flex-col justify-center`}
        >
          <h2 className="text-2xl font-semibold mb-2">Get in Touch</h2>
          <p className="text-sm leading-relaxed">
            Have a question or want to work together? Send us a message and we’ll get back to you quickly.
          </p>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-white p-6">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {["first_name", "email", "message"].map((field) => (
              <div key={field} className="relative w-full">
                {field === "message" ? (
                  <textarea
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 resize-none"
                    style={{ height: isMobile ? "80px" : "100px" }}
                  />
                ) : (
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                  />
                )}
                <label
                  className={`absolute left-3 transition-all text-gray-400 pointer-events-none ${
                    formData[field] ? "-top-2 text-xs text-yellow-500" : "top-2 text-sm"
                  }`}
                >
                  {field === "first_name"
                    ? "Your Name"
                    : field === "email"
                    ? "Email Address"
                    : "Your Message"}
                </label>
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-medium rounded py-2 border border-yellow-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition"
            >
              {loading ? "Sending..." : <><IoPaperPlaneOutline /> Send Message</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
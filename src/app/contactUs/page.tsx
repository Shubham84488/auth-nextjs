"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react';
import toast, {Toaster } from 'react-hot-toast';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData)
    toast.success("Submitted")
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="bg-gray-100 text-gray-800 p-6">
      <div className="container mx-auto">
        <Toaster/>
        {/* Title Section */}
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-700 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Have questions or need assistance? Reach out to the CampNew team!
          </p>
        </section>

        {/* Contact Form Section */}
        <section className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Email"
                required
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Subject"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </section>

        {/* Contact Information Section */}
        <section className="text-center mt-12">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Contact Information</h2>
          <p className="text-gray-700 mb-2">📍 123 Rajkot Marg, Delhi, India</p>
          <p className="text-gray-700 mb-2">📞 Phone: 999-2123-848</p>
          <p className="text-gray-700">✉️ Email: support@campnew.com</p>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;

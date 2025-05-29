import React from "react";

const Contact = () => {
  return (
    <section className="p-8 bg-white dark:bg-gray-900">
      <h3 className="text-3xl font-bold mb-6 text-center">Contact</h3>
      <form className="max-w-xl mx-auto flex flex-col gap-4">
        <input className="p-2 rounded border" type="text" placeholder="Name" required />
        <input className="p-2 rounded border" type="email" placeholder="Email" required />
        <textarea className="p-2 rounded border" rows="4" placeholder="Message" required></textarea>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
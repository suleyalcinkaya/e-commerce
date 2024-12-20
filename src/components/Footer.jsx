import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white px-4 py-8 border-t">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Bandage</h2>
          <div className="flex gap-4 mb-6">
            <a href="#" className="text-blue-600"><FaFacebook size={20} /></a>
            <a href="#" className="text-pink-600"><FaInstagram size={20} /></a>
            <a href="#" className="text-blue-400"><FaTwitter size={20} /></a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Company Info</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Carrier</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">We are hiring</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Carrier</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">We are hiring</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Features</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Business Marketing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">User Analytic</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Live Chat</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Unlimited Support</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">IOS & Android</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Watch a Demo</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Customers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">API</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-bold mb-4">Get In Touch</h3>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your Email"
              className="flex-1 p-3 border rounded-md"
            />
            <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">
              Subscribe
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-2">Lorem ips sum dolor amet</p>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-gray-600">
          <p>Made With Love By Finland All Right Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

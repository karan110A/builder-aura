import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-8 w-8 text-blue-400 dark:text-blue-300" />
              <span className="text-xl font-bold">PadhaiHub</span>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              Empowering students with quality education and personalized
              learning experiences. Join thousands of successful students who
              achieved their academic goals with us.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>123 Education Street, Learning City, LC 12345</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>info@padhaihub.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Our Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/teachers"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Our Faculty
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Class Timings */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Class Timings</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Monday - Friday</span>
              </div>
              <p className="text-sm">Morning: 6:00 AM - 12:00 PM</p>
              <p className="text-sm">Evening: 4:00 PM - 9:00 PM</p>
              <div className="flex items-center space-x-2 mt-3">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Saturday - Sunday</span>
              </div>
              <p className="text-sm">9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 PadhaiHub. All rights reserved. | Designed with ❤️ for
            better education
          </p>
        </div>
      </div>
    </footer>
  );
}

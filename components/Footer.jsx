import Link from "next/link";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedin
} from "react-icons/fa"; // Importing icons from React Icons


const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-16 mt-16">
      <div className="container mx-auto px-6">
        {/* Logo and Description */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-6 md:space-y-0">
          <div className="flex items-center space-x-3">
            {/* Logo Section */}
            <img
              src="/logo.png"
              alt="AI Career Coach Logo"
              className="w-16 h-16 object-contain"
            />
            <p className="text-3xl font-bold text-primary hover:text-white transition duration-300">
              Momentum
            </p>
          </div>
          <p className="text-center md:text-right text-sm text-gray-400 flex items-center justify-center space-x-1">
            Empowering your career with AI-driven guidance.
          </p>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-12">
          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {["Features", "Pricing", "Testimonials", "Integration"].map(
                (item, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="group relative hover:text-primary transition duration-300"
                    >
                      {item}
                      <span className="absolute bottom-[-3px] left-0 w-full h-[2px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {["Blog", "Case Studies", "Support"].map((item, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    className="group relative hover:text-primary transition duration-300"
                  >
                    {item}
                    <span className="absolute bottom-[-3px] left-0 w-full h-[2px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {["About Us", "Privacy Policy", "Terms & Conditions"].map(
                (item, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="group relative hover:text-primary transition duration-300"
                    >
                      {item}
                      <span className="absolute bottom-[-3px] left-0 w-full h-[2px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Career Resources Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Career Resources
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {["LinkedIn Learning", "Coursera", "Udemy", "Glassdoor"].map(
                (item, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="group relative hover:text-primary transition duration-300"
                    >
                      {item}
                      <span className="absolute bottom-[-3px] left-0 w-full h-[2px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Social Media Icons Section */}
        <div className="flex justify-center items-center space-x-8 mt-12">
          <Link
            href="https://www.linkedin.com/in/soumojit-banerjee-4914b3228/"
            aria-label="LinkedIn Learning"
          >
            <FaLinkedin className="w-8 h-8 text-gray-400 hover:text-primary transition transform duration-300 hover:scale-110" />
          </Link>
          <Link
            href="https://www.facebook.com/soumojit.banerjee.125"
            aria-label="Facebook"
          >
            <FaFacebookF className="w-8 h-8 text-gray-400 hover:text-primary transition transform duration-300 hover:scale-110" />
          </Link>
          <Link
            href="https://www.instagram.com/soumo622/"
            aria-label="Instagram"
          >
            <FaInstagram className="w-8 h-8 text-gray-400 hover:text-primary transition transform duration-300 hover:scale-110" />
          </Link>
          <Link href="https://github.com/soumojit622" aria-label="Github">
            <FaGithub className="w-8 h-8 text-gray-400 hover:text-primary transition transform duration-300 hover:scale-110" />
          </Link>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-400">

          <p>
            &copy; {new Date().getFullYear()} Momentum. All rights reserved.
          </p>
          <p className="mt-4">
            Made with{" "}
            <span role="img" aria-label="love" className="inline-block">
              ❤️
            </span>{" "}
            by{" "}
            <span className="font-semibold text-white">Soumojit Banerjee</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

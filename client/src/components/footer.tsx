import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail } from "lucide-react";

const quickLinks = [
  { label: "About", href: "about" },
  { label: "Services", href: "services" },
  { label: "Portfolio", href: "portfolio" },
  { label: "Contact", href: "contact" },
];

const serviceLinks = [
  { label: "Financial Consulting", href: "#" },
  { label: "Investment Analysis", href: "#" },
  { label: "Risk Management", href: "#" },
  { label: "Strategic Planning", href: "#" },
];

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Mail, href: "#", label: "Email" },
];

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <h3 className="text-2xl font-bold font-serif mb-4 gradient-text">Sarah Chen</h3>
            <p className="text-background/80 mb-6 leading-relaxed">
              Professional finance consultant dedicated to transforming businesses through strategic financial planning and innovative solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-background/60 hover:text-accent transition-colors duration-300"
                  data-testid={`footer-social-${link.label.toLowerCase()}`}
                >
                  <link.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-background/80">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="hover:text-accent transition-colors duration-300"
                    data-testid={`footer-link-${link.href}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-background/80">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-accent transition-colors duration-300"
                    data-testid={`footer-service-${link.label.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-background/20 mt-8 pt-8 text-center"
        >
          <p className="text-background/60">
            &copy; 2024 Sarah Chen Finance Consulting. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

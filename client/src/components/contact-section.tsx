import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Linkedin, Twitter, Mail, Calendar, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useState } from "react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Office Location",
    content: ["123 Financial District", "New York, NY 10004", "United States"],
  },
  {
    icon: Phone,
    title: "Phone & Email",
    content: ["+1 (555) 123-4567", "sarah.chen@financepro.com"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 2:00 PM", "Sunday: Closed"],
  },
];

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Mail, href: "#", label: "Email" },
  { icon: Calendar, href: "#", label: "Schedule" },
];

export default function ContactSection() {
  const { elementRef, hasIntersected } = useIntersectionObserver();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleServiceChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      service: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Implement form submission logic
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-primary via-primary to-blue-800 text-primary-foreground"
      ref={elementRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 gradient-text-contact">Get In Touch</h2>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
            Ready to transform your financial operations? Let's discuss how we can drive growth and optimize your business performance together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div key={info.title} className="flex items-start space-x-4">
                  <div className="glass-light bg-accent/20 text-primary-foreground border border-accent/30 p-3 rounded-lg shadow-lg hover-glow transition-all duration-300">
                    <info.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                    <div className="text-primary-foreground/80">
                      {info.content.map((line, lineIndex) => (
                        <div key={lineIndex}>{line}</div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-bold font-serif mb-6 gradient-text-primary">Connect With Me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="glass bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/30 p-3 rounded-lg hover:glass-strong hover:bg-primary-foreground/20 hover:border-primary-foreground/50 transition-all duration-400 hover-glow shadow-lg"
                    data-testid={`social-link-${link.label.toLowerCase()}`}
                    aria-label={`Connect with me on ${link.label}`}
                  >
                    <link.icon className="w-6 h-6" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-strong text-card-foreground p-8 rounded-2xl shadow-2xl border border-border/20 hover-lift"
          >
            <h3 className="text-2xl font-bold font-serif mb-6 gradient-text-primary">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                    First Name
                  </label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className="w-full glass-light border border-border/30 focus:border-accent/50 focus:ring-accent/20 transition-all duration-300"
                    data-testid="input-first-name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className="w-full glass-light border border-border/30 focus:border-accent/50 focus:ring-accent/20 transition-all duration-300"
                    data-testid="input-last-name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="w-full glass-light border border-border/30 focus:border-accent/50 focus:ring-accent/20 transition-all duration-300"
                  data-testid="input-email"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                  Company
                </label>
                <Input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Your Company"
                  className="w-full glass-light border border-border/30 focus:border-accent/50 focus:ring-accent/20 transition-all duration-300"
                  data-testid="input-company"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                  Service Interested In
                </label>
                <Select onValueChange={handleServiceChange} value={formData.service}>
                  <SelectTrigger className="w-full glass-light border border-border/30 focus:border-accent/50 transition-all duration-300" data-testid="select-service">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accounting">Financial Accounting</SelectItem>
                    <SelectItem value="analysis">Financial Analysis</SelectItem>
                    <SelectItem value="consulting">Strategic Consulting</SelectItem>
                    <SelectItem value="risk">Risk Management</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full glass-light border border-border/30 focus:border-accent/50 focus:ring-accent/20 transition-all duration-300"
                  data-testid="textarea-message"
                />
              </div>

              <Button
                type="submit"
                className="w-full glass bg-primary/20 text-primary-foreground border border-primary/30 px-8 py-4 rounded-lg font-semibold hover:glass-strong hover:bg-primary/30 hover:border-primary/50 transition-all duration-400 hover-lift hover-glow shadow-lg"
                data-testid="button-send-message"
              >
                Send Message <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

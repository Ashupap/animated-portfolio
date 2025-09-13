import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Clock, Linkedin, Twitter, Mail, Calendar, Send, CheckCircle, AlertCircle, Building, User, MessageSquare, DollarSign, Clock3, Users, Target, Star, Award, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { 
  contactFormSchema, 
  type ContactFormData,
  serviceOptions,
  industryOptions,
  companySizeOptions,
  budgetRangeOptions,
  timelineOptions,
  contactMethodOptions,
  projectTypeOptions
} from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

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

const credentials = [
  { icon: Award, title: "CPA Certified", subtitle: "Public Accountant" },
  { icon: TrendingUp, title: "15+ Years", subtitle: "Finance Experience" },
  { icon: Shield, title: "Risk Management", subtitle: "Specialist" },
  { icon: Target, title: "Strategic", subtitle: "Planning Expert" }
];

const successSteps = [
  "Your message has been received",
  "We'll review your requirements within 24 hours", 
  "Initial consultation scheduled if applicable",
  "Proposal and next steps delivered"
];

export default function ContactSection() {
  const { elementRef, hasIntersected } = useIntersectionObserver();
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      industry: undefined,
      companySize: undefined,
      service: "financial-analysis",
      projectType: undefined,
      budgetRange: undefined,
      timeline: undefined,
      contactMethod: "email",
      subject: "",
      message: "",
      hearAboutUs: undefined,
      newsletter: false,
      privacyConsent: false,
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setIsSuccess(true);
      form.reset();
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error Sending Message",
        description: "Please try again or contact us directly via email.",
        variant: "destructive",
      });
      console.error("Contact form error:", error);
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const resetSuccess = () => {
    setIsSuccess(false);
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-primary via-primary to-blue-800 text-primary-foreground relative overflow-hidden"
      ref={elementRef}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/95 to-blue-800/90"></div>
        <div className="absolute inset-0 starfield-overlay opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
          {/* Contact Information & Credentials */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="glass-light bg-accent/20 text-primary-foreground border border-accent/30 p-3 rounded-xl shadow-lg hover-glow transition-all duration-300">
                    <info.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                    <div className="text-primary-foreground/80 space-y-1">
                      {info.content.map((line, lineIndex) => (
                        <div key={lineIndex}>{line}</div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Professional Credentials */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="glass-strong bg-primary-foreground/5 border border-primary-foreground/10 p-6 rounded-2xl"
            >
              <h3 className="text-2xl font-bold font-serif mb-6 gradient-text-primary">Professional Credentials</h3>
              <div className="grid grid-cols-2 gap-4">
                {credentials.map((credential, index) => (
                  <div
                    key={credential.title}
                    className="flex items-center space-x-3 p-3 glass-light rounded-lg hover-lift transition-all duration-300"
                    data-testid={`credential-${index}`}
                  >
                    <credential.icon className="w-8 h-8 text-accent" />
                    <div>
                      <div className="font-semibold text-sm">{credential.title}</div>
                      <div className="text-xs text-primary-foreground/70">{credential.subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-2xl font-bold font-serif mb-6 gradient-text-primary">Connect With Me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    whileHover={{ scale: 1.1, rotateY: 10 }}
                    whileTap={{ scale: 0.95 }}
                    className="glass bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/30 p-3 rounded-xl hover:glass-strong hover:bg-primary-foreground/20 hover:border-primary-foreground/50 transition-all duration-400 hover-glow shadow-lg"
                    data-testid={`social-link-${link.label.toLowerCase()}`}
                    aria-label={`Connect with me on ${link.label}`}
                  >
                    <link.icon className="w-6 h-6" aria-hidden="true" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Modern Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-strong text-card-foreground p-8 rounded-2xl shadow-2xl border border-border/20 hover-lift relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-card/50 to-card/30 pointer-events-none"></div>
            <div className="relative z-10">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center space-x-3 mb-8">
                      <MessageSquare className="w-8 h-8 text-accent" />
                      <h3 className="text-2xl font-bold font-serif gradient-text-primary">Send a Message</h3>
                    </div>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Personal Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground/90 font-medium flex items-center space-x-2">
                                  <User className="w-4 h-4" />
                                  <span>First Name *</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="John"
                                    className="glass-light border border-border/30 focus:border-accent/50 focus:ring-accent/20 transition-all duration-300 bg-background/50"
                                    data-testid="input-first-name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-destructive text-sm" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground/90 font-medium flex items-center space-x-2">
                                  <User className="w-4 h-4" />
                                  <span>Last Name *</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Doe"
                                    className="glass-light border border-border/30 focus:border-accent/50 focus:ring-accent/20 transition-all duration-300 bg-background/50"
                                    data-testid="input-last-name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-destructive text-sm" />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground/90 font-medium flex items-center space-x-2">
                                  <Mail className="w-4 h-4" />
                                  <span>Email Address *</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="john@example.com"
                                    type="email"
                                    className="glass-light border border-border/30 focus:border-accent/50 focus:ring-accent/20 transition-all duration-300 bg-background/50"
                                    data-testid="input-email"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-destructive text-sm" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground/90 font-medium flex items-center space-x-2">
                                  <Phone className="w-4 h-4" />
                                  <span>Phone Number</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="+1 (555) 123-4567"
                                    type="tel"
                                    className="glass-light border border-border/30 focus:border-accent/50 focus:ring-accent/20 transition-all duration-300 bg-background/50"
                                    data-testid="input-phone"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-destructive text-sm" />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Company Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground/90 font-medium flex items-center space-x-2">
                                  <Building className="w-4 h-4" />
                                  <span>Company</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Your Company"
                                    className="glass-light border border-border/30 focus:border-accent/50 focus:ring-accent/20 transition-all duration-300 bg-background/50"
                                    data-testid="input-company"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-destructive text-sm" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="industry"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground/90 font-medium flex items-center space-x-2">
                                  <TrendingUp className="w-4 h-4" />
                                  <span>Industry</span>
                                </FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="glass-light border border-border/30 focus:border-accent/50 bg-background/50" data-testid="select-industry">
                                      <SelectValue placeholder="Select industry" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="glass-strong border border-border/30">
                                    {Object.entries(industryOptions).map(([value, label]) => (
                                      <SelectItem key={value} value={value}>{label}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage className="text-destructive text-sm" />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Service & Project Information */}
                        <FormField
                          control={form.control}
                          name="service"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground/90 font-medium flex items-center space-x-2">
                                <Target className="w-4 h-4" />
                                <span>Service Interested In *</span>
                              </FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger className="glass-light border border-border/30 focus:border-accent/50 bg-background/50" data-testid="select-service">
                                    <SelectValue placeholder="Select a service" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="glass-strong border border-border/30">
                                  {Object.entries(serviceOptions).map(([value, label]) => (
                                    <SelectItem key={value} value={value}>{label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-destructive text-sm" />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="budgetRange"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground/90 font-medium flex items-center space-x-2">
                                  <DollarSign className="w-4 h-4" />
                                  <span>Budget Range</span>
                                </FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="glass-light border border-border/30 focus:border-accent/50 bg-background/50" data-testid="select-budget">
                                      <SelectValue placeholder="Select budget range" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="glass-strong border border-border/30">
                                    {Object.entries(budgetRangeOptions).map(([value, label]) => (
                                      <SelectItem key={value} value={value}>{label}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage className="text-destructive text-sm" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="timeline"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground/90 font-medium flex items-center space-x-2">
                                  <Clock3 className="w-4 h-4" />
                                  <span>Timeline</span>
                                </FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="glass-light border border-border/30 focus:border-accent/50 bg-background/50" data-testid="select-timeline">
                                      <SelectValue placeholder="Select timeline" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="glass-strong border border-border/30">
                                    {Object.entries(timelineOptions).map(([value, label]) => (
                                      <SelectItem key={value} value={value}>{label}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage className="text-destructive text-sm" />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Contact Method */}
                        <FormField
                          control={form.control}
                          name="contactMethod"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground/90 font-medium flex items-center space-x-2">
                                <Phone className="w-4 h-4" />
                                <span>Preferred Contact Method *</span>
                              </FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  className="flex space-x-6 mt-2"
                                  data-testid="radio-contact-method"
                                >
                                  {Object.entries(contactMethodOptions).map(([value, label]) => (
                                    <div key={value} className="flex items-center space-x-2">
                                      <RadioGroupItem value={value} id={value} className="border-border/50" />
                                      <label htmlFor={value} className="text-sm text-foreground/80 cursor-pointer">
                                        {label}
                                      </label>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage className="text-destructive text-sm" />
                            </FormItem>
                          )}
                        />

                        {/* Subject & Message */}
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground/90 font-medium">Subject *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Brief description of your inquiry"
                                  className="glass-light border border-border/30 focus:border-accent/50 focus:ring-accent/20 transition-all duration-300 bg-background/50"
                                  data-testid="input-subject"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-destructive text-sm" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground/90 font-medium">Message *</FormLabel>
                              <FormControl>
                                <Textarea
                                  rows={5}
                                  placeholder="Tell me about your project, goals, and how I can help you achieve them..."
                                  className="glass-light border border-border/30 focus:border-accent/50 focus:ring-accent/20 transition-all duration-300 bg-background/50 resize-none"
                                  data-testid="textarea-message"
                                  {...field}
                                />
                              </FormControl>
                              <div className="flex justify-between items-center mt-2">
                                <FormMessage className="text-destructive text-sm" />
                                <span className="text-xs text-foreground/50">
                                  {field.value?.length || 0}/2000 characters
                                </span>
                              </div>
                            </FormItem>
                          )}
                        />

                        {/* Consent & Newsletter */}
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="privacyConsent"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="border-border/50"
                                    data-testid="checkbox-privacy"
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-sm text-foreground/80">
                                    I agree to the privacy policy and terms of service *
                                  </FormLabel>
                                  <FormMessage className="text-destructive text-sm" />
                                </div>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="newsletter"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="border-border/50"
                                    data-testid="checkbox-newsletter"
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-sm text-foreground/80">
                                    Subscribe to financial insights newsletter
                                  </FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          disabled={contactMutation.isPending}
                          className="w-full glass bg-primary/20 text-primary-foreground border border-primary/30 px-8 py-4 rounded-xl font-semibold hover:glass-strong hover:bg-primary/30 hover:border-primary/50 transition-all duration-400 hover-lift hover-glow shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          data-testid="button-send-message"
                        >
                          {contactMutation.isPending ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full"
                              />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message <Send className="ml-2 w-4 h-4" />
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                      className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle className="w-10 h-10 text-green-400" />
                    </motion.div>
                    <h3 className="text-2xl font-bold font-serif mb-4 gradient-text-primary">Message Sent Successfully!</h3>
                    <p className="text-foreground/80 mb-8">Thank you for your inquiry. Here's what happens next:</p>
                    
                    <div className="space-y-4 mb-8">
                      {successSteps.map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex items-center space-x-3 text-sm text-foreground/70"
                        >
                          <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center text-xs font-bold text-accent">
                            {index + 1}
                          </div>
                          <span>{step}</span>
                        </motion.div>
                      ))}
                    </div>

                    <Button
                      onClick={resetSuccess}
                      variant="outline"
                      className="glass-light border-border/30 hover:bg-background/20"
                      data-testid="button-send-another"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
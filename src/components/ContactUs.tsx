"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Smile, NotebookPen, MessageCircle, Send, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/sonner";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        toast("Form submitted successfully!", {
          description: "We'll be in touch with you shortly.",
        });
        form.reset();
      } else {
        toast("Submission failed", {
          description: "Please try again later.",
        });
      }
    } catch (error) {
      toast("Error submitting form", {
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full mx-auto mt-16 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
      >

      <Toaster />

      <motion.div variants={itemVariants} className="space-y-2 text-center mb-8">
        <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
          Connect with SkillSwap
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Got questions, feedback, or want to partner up? Reach out — we're excited to hear from you!
        </p>
      </motion.div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Smile className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input className="pl-10 rounded-xl bg-gray-900 border-gray-700 text-white" placeholder="Jane Doe" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <NotebookPen className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input className="pl-10 rounded-xl bg-gray-900 border-gray-700 text-white" placeholder="you@skillswap.io" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <FormField control={form.control} name="message" render={({ field }) => (
              <FormItem>
                <FormLabel>Your Message</FormLabel>
                <FormControl>
                  <Textarea className="min-h-[120px] rounded-xl bg-gray-900 border-gray-700 text-white" placeholder="Tell us how we can help or collaborate..." {...field} />
                </FormControl>
                <FormDescription>Include any relevant info that will help us assist you better.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
          </motion.div>

          <motion.div variants={itemVariants} className="pt-4">
            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-gradient-to-r from-green-400 to-cyan-500 hover:from-green-500 hover:to-cyan-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Send Message
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
}

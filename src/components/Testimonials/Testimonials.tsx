import { TestimonialsSection } from "./testimonials-1"

const demoTestimonials = [
    {
      name: "Priya Sharma",
      rating: 5,
      role: "IT Procurement Head, NexaCorp",
      text: `SoftSell helped us easily liquidate unused software licenses. The process was fast, transparent, and we got a great return on our dormant assets. Highly recommended!`,
      avatar:
        "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      name: "David Kim",
      rating: 5,
      role: "Operations Manager, TechNova Ltd.",
      text: `We had multiple licenses lying unused. SoftSell’s valuation was fair and the payout was quick. Their support team was responsive and professional throughout.`,
      avatar:
        "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ];
  

export function Testimonials() {
  return <TestimonialsSection testimonials={demoTestimonials} />;
}

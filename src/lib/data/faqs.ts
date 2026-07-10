export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "How does AervonX work?",
    answer:
      "Search once and we scan flights, hotels, holiday packages and airport transfers from airlines and partners like Booking.com, so you can compare prices in one place.",
  },
  {
    question: "Do I book and pay directly on AervonX?",
    answer:
      "You start your booking on AervonX, then we take you to the airline's or partner's website to securely complete payment — the same way comparison sites like Cheapflights work. AervonX never takes your payment details.",
  },
  {
    question: "Why was I redirected to another website?",
    answer:
      "That's expected. Once you choose a deal, we hand you off to the airline or partner (such as Booking.com) to finish the booking and pay. That's who holds your reservation and who you'll deal with for tickets, confirmations and changes.",
  },
  {
    question: "Does AervonX charge a booking fee?",
    answer: "No. Searching and comparing on AervonX is always free.",
  },
  {
    question: "I need to change or cancel my booking — who do I contact?",
    answer:
      "Since your booking is held by the airline or partner you paid, changes and cancellations need to go through them directly. Check the confirmation email they sent you for their support details.",
  },
  {
    question: "How do I contact AervonX support?",
    answer: "Email us any time at support@aervonx.com and we'll get back to you as soon as we can.",
  },
];

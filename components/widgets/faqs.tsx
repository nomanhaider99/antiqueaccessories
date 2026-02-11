import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqData = [
  {
    question: "What is the delivery time?",
    answer: "Our standard delivery time is 3-5 business days for domestic orders. International shipping may take 7-14 business days depending on the location."
  },
  {
    question: "What if the product color varies?",
    answer: "Due to lighting and screen resolutions, slight color variations may occur. We strive to display our products as accurately as possible."
  },
  {
    question: "Can I Cancel my order?",
    answer: "Orders can be canceled within 24 hours of placement. Once the order has been processed or shipped, cancellation is no longer possible."
  },
  {
    question: "Returns & Exchange Policy?",
    answer: "We offer a 7-day return and exchange policy for unused items in their original packaging. Please contact our support team to initiate a request."
  },
  {
    question: "How can we track our shipment?",
    answer: "Once your order is dispatched, you will receive a tracking number via email to monitor your shipment's progress."
  },
  {
    question: "How shall I make a payment?",
    answer: "We accept all major credit/debit cards, bank transfers, and popular digital wallets."
  },
  {
    question: "How can international customers pay?",
    answer: "International customers can pay via Credit Card (Visa/Mastercard), PayPal, or Wire Transfer."
  },
  {
    question: "International Orders",
    answer: "We ship worldwide! Please note that international orders may be subject to local customs duties and taxes upon arrival."
  }
];

export function FAQs() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10">
        <h1 className="md:py-8 py-4 text-3xl font-medium text-center">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible className="w-full">
        {faqData.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b border-slate-200 py-2">
            <AccordionTrigger className="text-[#002B5B] hover:no-underline text-base text-left py-4">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 pb-4">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
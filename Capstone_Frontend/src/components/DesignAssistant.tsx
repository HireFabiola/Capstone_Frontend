import { useState } from "react";
import "../App.css";

const faqs = [
    {
        question: "What services do you offer?",
        answer:
            "We offer website design, business systems, digital solutions, debugging support, and client experience improvements.",
    },
    {
        question: "How much does a website cost?",
        answer:
            "Projects typically start under $500 for small fixes or simple support, and larger builds may range from $500 to $2,500+ depending on scope.",
    },
    {
        question: "How long does a project take?",
        answer:
            "Small updates may take a few days. Larger websites or systems usually take a few weeks depending on content, features, and feedback.",
    },
    {
        question: "Do you offer debugging help?",
        answer:
            "Yes. We can help troubleshoot existing websites, broken layouts, forms, styling issues, and application bugs.",
    },
    {
        question: "How do I start a project?",
        answer:
            "Start by submitting the contact form. Your inquiry will go directly to the studio dashboard for review.",
    },
];

export default function DesignAssistant() {
    const [isOpen, setIsOpen] = useState(false);
     const [answer, setAnswer] = useState(
        "Hi! I'm Fab 👩🏾‍💻. I'm here to answer questions about services, pricing, timelines, and how to get started with R4B Design Studio."
    );

    return (
        <div className="design-assistant">
            {isOpen && (
                <div className="assistant-window">
                    <div className="assistant-header">
                        <div>
                            <h3>Ask Fab</h3>
                            <p>Your Design Studio Guide</p>
                        </div>

                        <button onClick={() => setIsOpen(false)}>
                            ×
                        </button>
                    </div>
                    <div className="assistant-body">
                        <p className="assistant-answer">{answer}</p>

                        <div className="assistant-questions">
                            {faqs.map((faq) => (
                                <button
                                    key={faq.question}
                                    onClick={() => setAnswer(faq.answer)}
                                >
                                    {faq.question}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <button
                className="assistant-toggle"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <div className="fab-avatar">
                    👩🏾‍💻
                </div>
            </button>
        </div>
    );
}
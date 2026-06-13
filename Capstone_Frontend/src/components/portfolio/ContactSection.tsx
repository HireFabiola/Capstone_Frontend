export default function ContactSection() {
    return (
        <section id="contact" className="contact-section">
            <div className="contact-content">
                <h1 className="contact-title">
                    Let's Build Something Together
                </h1>
                <p className="contact-description">
                    Whether you're looking for a developer, collaborator, or problem
                    solver, I’d love to hear from you.
                </p>

                <form
                    className="contact-form"
                    action="https://formspree.io/f/YOUR_FORM_ID"
                    method="POST"
                >
                    <div className="form-row">
                        <input type="text" name="name" placeholder="Your Name" required />

                        <input type="email" name="email" placeholder="Your Email" required />
                    </div>

                    <input type="text" name="subject" placeholder="Subject" required />

                    <textarea
                        name="message"
                        placeholder="Tell me a little about what you're looking for..."
                        rows={6}
                        required
                    />

                    <button type="submit" className="btn-gold">
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
}
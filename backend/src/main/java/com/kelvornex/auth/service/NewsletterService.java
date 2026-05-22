package com.kelvornex.auth.service;

import com.kelvornex.auth.entity.NewsletterSubscription;
import com.kelvornex.auth.repository.NewsletterRepository;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NewsletterService {

    private static final Logger logger = LoggerFactory.getLogger(NewsletterService.class);

    private final NewsletterRepository newsletterRepository;
    private final JavaMailSender mailSender;

    public String subscribe(String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email address cannot be empty.");
        }
        
        String cleanEmail = email.trim().toLowerCase();
        Optional<NewsletterSubscription> existingSubscription = newsletterRepository.findByEmail(cleanEmail);

        if (existingSubscription.isPresent()) {
            return "You are already subscribed to our newsletter!";
        }

        // Save subscription
        NewsletterSubscription subscription = NewsletterSubscription.builder()
                .email(cleanEmail)
                .build();
        newsletterRepository.save(subscription);

        // Send newsletter welcome email
        sendWelcomeEmail(cleanEmail);

        return "Successfully subscribed to the Kelvornex newsletter!";
    }

    private void sendWelcomeEmail(String recipientEmail) {
        String htmlBody = buildWelcomeEmailHtml();

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(recipientEmail);
            helper.setSubject("Welcome to Kelvornex! Your Journey Starts Here");
            helper.setText(htmlBody, true);
            mailSender.send(message);
            logger.info("Newsletter welcome email successfully sent to {}", recipientEmail);
        } catch (Exception e) {
            logger.error("Failed to send welcome email to {}. Local SMTP configuration may be missing. Error: {}", recipientEmail, e.getMessage());
            logger.info("----- START GENERATED HTML NEWSLETTER FOR {} -----", recipientEmail);
            logger.info("\n{}", htmlBody);
            logger.info("----- END GENERATED HTML NEWSLETTER FOR {} -----", recipientEmail);
        }
    }

    private String buildWelcomeEmailHtml() {
        return "<!DOCTYPE html>\n" +
                "<html>\n" +
                "<head>\n" +
                "    <meta charset=\"utf-8\">\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                "    <title>Welcome to Kelvornex</title>\n" +
                "    <style>\n" +
                "        body {\n" +
                "            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\n" +
                "            background-color: #f8fafc;\n" +
                "            margin: 0;\n" +
                "            padding: 0;\n" +
                "            -webkit-font-smoothing: antialiased;\n" +
                "        }\n" +
                "        .wrapper {\n" +
                "            width: 100%;\n" +
                "            background-color: #f8fafc;\n" +
                "            padding: 40px 0;\n" +
                "        }\n" +
                "        .container {\n" +
                "            max-width: 600px;\n" +
                "            margin: 0 auto;\n" +
                "            background-color: #ffffff;\n" +
                "            border-radius: 12px;\n" +
                "            overflow: hidden;\n" +
                "            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);\n" +
                "            border: 1px solid #e2e8f0;\n" +
                "        }\n" +
                "        .header {\n" +
                "            background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);\n" +
                "            padding: 40px 20px;\n" +
                "            text-align: center;\n" +
                "        }\n" +
                "        .header h1 {\n" +
                "            color: #ffffff;\n" +
                "            margin: 0;\n" +
                "            font-size: 32px;\n" +
                "            font-weight: 800;\n" +
                "            letter-spacing: -0.5px;\n" +
                "        }\n" +
                "        .header p {\n" +
                "            color: #93c5fd;\n" +
                "            margin: 10px 0 0 0;\n" +
                "            font-size: 16px;\n" +
                "        }\n" +
                "        .content {\n" +
                "            padding: 40px 30px;\n" +
                "        }\n" +
                "        .welcome-text {\n" +
                "            font-size: 16px;\n" +
                "            color: #334155;\n" +
                "            line-height: 1.6;\n" +
                "            margin-bottom: 30px;\n" +
                "        }\n" +
                "        .features {\n" +
                "            margin-bottom: 30px;\n" +
                "        }\n" +
                "        .feature-card {\n" +
                "            border-left: 4px solid #3b82f6;\n" +
                "            padding-left: 15px;\n" +
                "            margin-bottom: 20px;\n" +
                "        }\n" +
                "        .feature-title {\n" +
                "            font-weight: 700;\n" +
                "            color: #1e293b;\n" +
                "            margin: 0 0 5px 0;\n" +
                "            font-size: 16px;\n" +
                "        }\n" +
                "        .feature-desc {\n" +
                "            color: #64748b;\n" +
                "            margin: 0;\n" +
                "            font-size: 14px;\n" +
                "            line-height: 1.4;\n" +
                "        }\n" +
                "        .cta-container {\n" +
                "            text-align: center;\n" +
                "            margin: 35px 0;\n" +
                "        }\n" +
                "        .cta-button {\n" +
                "            display: inline-block;\n" +
                "            background-color: #3b82f6;\n" +
                "            color: #ffffff !important;\n" +
                "            text-decoration: none;\n" +
                "            padding: 14px 28px;\n" +
                "            border-radius: 8px;\n" +
                "            font-weight: 600;\n" +
                "            font-size: 16px;\n" +
                "            box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);\n" +
                "            transition: background-color 0.2s;\n" +
                "        }\n" +
                "        .footer {\n" +
                "            background-color: #f1f5f9;\n" +
                "            padding: 30px 20px;\n" +
                "            text-align: center;\n" +
                "            border-top: 1px solid #e2e8f0;\n" +
                "        }\n" +
                "        .footer p {\n" +
                "            margin: 0 0 10px 0;\n" +
                "            color: #94a3b8;\n" +
                "            font-size: 12px;\n" +
                "        }\n" +
                "        .footer a {\n" +
                "            color: #64748b;\n" +
                "            text-decoration: underline;\n" +
                "        }\n" +
                "    </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "    <div class=\"wrapper\">\n" +
                "        <div class=\"container\">\n" +
                "            <div class=\"header\">\n" +
                "                <h1>KELVORNEX</h1>\n" +
                "                <p>Empowering the next generation of innovators</p>\n" +
                "            </div>\n" +
                "            <div class=\"content\">\n" +
                "                <div class=\"welcome-text\">\n" +
                "                    Hi there,<br><br>\n" +
                "                    Thank you for subscribing to the Kelvornex newsletter! We are thrilled to have you in our community of students, professionals, and entrepreneurs. From now on, you'll receive monthly updates on our latest course offerings, expert career advice, and exclusive community events.\n" +
                "                </div>\n" +
                "                <div class=\"features\">\n" +
                "                    <div class=\"feature-card\">\n" +
                "                        <div class=\"feature-title\">Premium Industry-Ready Courses</div>\n" +
                "                        <div class=\"feature-desc\">Learn Full-Stack Development, Data Analytics, Digital Marketing, and Artificial Intelligence designed by top experts.</div>\n" +
                "                    </div>\n" +
                "                    <div class=\"feature-card\">\n" +
                "                        <div class=\"feature-title\">Entrepreneurship Guidance</div>\n" +
                "                        <div class=\"feature-desc\">Get tools, case studies, and insights specifically designed to turn your ideas into successful business projects.</div>\n" +
                "                    </div>\n" +
                "                    <div class=\"feature-card\">\n" +
                "                        <div class=\"feature-title\">Hands-on Mentorship & Projects</div>\n" +
                "                        <div class=\"feature-desc\">Work on real-world projects and build a portfolio that stands out to recruiters and investors.</div>\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "                <div class=\"cta-container\">\n" +
                "                    <a href=\"http://localhost:5173/\" class=\"cta-button\">Explore Our Dashboard</a>\n" +
                "                </div>\n" +
                "                <div class=\"welcome-text\" style=\"margin-top: 20px;\">\n" +
                "                    Stay curious, stay inspired.<br>\n" +
                "                    <strong>The Kelvornex Team</strong>\n" +
                "                </div>\n" +
                "            </div>\n" +
                "            <div class=\"footer\">\n" +
                "                <p>&copy; 2026 Kelvornex Inc. All rights reserved.</p>\n" +
                "                <p>You received this email because you subscribed to our newsletter at our website. If you wish to unsubscribe, please click <a href=\"#\">here</a>.</p>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</body>\n" +
                "</html>";
    }
}

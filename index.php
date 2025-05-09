<?php
require 'vendor/autoload.php';  // Adjust path if not using Composer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = htmlspecialchars(trim($_POST["name"] ?? ""));
    $email = htmlspecialchars(trim($_POST["email"] ?? ""));
    $message = htmlspecialchars(trim($_POST["message"] ?? ""));

    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "All fields are required."]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Invalid email format."]);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // SMTP Server Configuration
        $mail->isSMTP();
        $mail->Host       = 'mail.yourdomain.com';      // HostGator SMTP server
        $mail->SMTPAuth   = true;
        $mail->Username   = 'your-email@yourdomain.com'; // SMTP username
        $mail->Password   = 'your-email-password';       // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // or `PHPMailer::ENCRYPTION_STARTTLS`
        $mail->Port       = 465;  // 587 for TLS

        // Sender and Recipient Information
        $mail->setFrom($email, $name);
        $mail->addAddress('your-email@yourdomain.com'); // Receiving email

        // Email Content
        $mail->Subject = "New Contact Form Submission";
        $mail->Body    = "Name: $name\nEmail: $email\n\nMessage:\n$message";

        $mail->send();
        echo json_encode(["success" => true, "message" => "Message sent successfully!"]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Error sending email: " . $mail->ErrorInfo]);
    }
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}

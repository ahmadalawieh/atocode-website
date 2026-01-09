<?php
// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Set response header
header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get form data
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$service = isset($_POST['service']) ? trim($_POST['service']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validate inputs
$errors = [];

if (empty($name)) {
    $errors[] = 'Name is required';
}

if (empty($email)) {
    $errors[] = 'Email is required';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid email format';
}

if (empty($service)) {
    $errors[] = 'Service selection is required';
}

if (empty($message)) {
    $errors[] = 'Message is required';
}

// Return errors if validation fails
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => implode(', ', $errors)]);
    exit;
}

// ============================================
// CONFIGURATION - UPDATE THESE VALUES
// ============================================
$to_email = 'hello@atocode.com'; // YOUR EMAIL ADDRESS
$from_email = 'noreply@yourdomain.com'; // FROM EMAIL (use your domain)
$subject = 'New Contact Form Submission - ATOCODE';
// ============================================

// Sanitize inputs
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$service = htmlspecialchars($service, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// Format service name
$service_names = [
    'web-development' => 'Web Development',
    'hosting' => 'Managed Hosting',
    'maintenance' => 'Maintenance & Support',
    'multiple' => 'Multiple Services'
];
$service_display = isset($service_names[$service]) ? $service_names[$service] : $service;

// Create email body
$email_body = "
New Contact Form Submission from ATOCODE Website

Name: $name
Email: $email
Service Interested In: $service_display

Message:
$message

---
Sent from ATOCODE Contact Form
";

// Create email headers
$headers = "From: $from_email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
$mail_sent = mail($to_email, $subject, $email_body, $headers);

if ($mail_sent) {
    // Success
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your message! We will get back to you soon.'
    ]);
    
    // Optional: Log submission (create a logs directory first)
    // $log_entry = date('Y-m-d H:i:s') . " - $name ($email) - $service_display\n";
    // file_put_contents('logs/submissions.log', $log_entry, FILE_APPEND);
    
} else {
    // Failed to send
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error sending your message. Please try again later or email us directly.'
    ]);
}
?>

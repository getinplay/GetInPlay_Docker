<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require_once '../admin/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

function sendEmail($email, $name, $username, $password) {
    $smtp_pw = trim(file_get_contents('my.txt'));

    $mail = new PHPMailer(true);
    try {
        // SMTP Configuration
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; // Gmail SMTP Server
        $mail->SMTPAuth   = true;
        $mail->Username   = 'getinplay.contact@gmail.com'; // Your Gmail
        $mail->Password   = $smtp_pw; // Use Gmail App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // SSL
        $mail->Port       = 465;

        // Sender and recipient
        $mail->setFrom('getinplay.contact@gmail.com', 'GetInPlay');
        $mail->addAddress($email, $name);
        $mail->addReplyTo('getinplay.contact@gmail.com', 'GetInPlay');

        // Email content
        $mail->isHTML(true);
        $mail->Subject = 'Registration Successful';
        $mail->Body = '
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Registration Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
                <div style="font-size: 24px; font-weight: bold; color: #2c3e50; margin-bottom: 20px;">Hello ' . htmlspecialchars($name) . ',</div>
                <div style="font-size: 16px; color: #555;">
                    <p>Thank you for registering with us. Here are your registration details:</p>
                    <div style="margin: 20px 0; padding: 15px; background-color: #f1f1f1; border-radius: 6px;">
                        <ul style="padding: 0; margin: 0;">
                            <li style="list-style: none; margin-bottom: 10px;"><b style="color: #2c3e50;">Full Name:</b> ' . htmlspecialchars($name) . '</li>
                            <li style="list-style: none; margin-bottom: 10px;"><b style="color: #2c3e50;">Email:</b> ' . htmlspecialchars($email) . '</li>
                            
                        </ul>
                    </div>
                    <h4 style="font-size: 20px; color: #2c3e50; margin-bottom: 10px;">Login Information:</h4>
                    <div style="margin: 20px 0; padding: 15px; background-color: #f1f1f1; border-radius: 6px;">
                        <ul style="padding: 0; margin: 0;">
                            <li style="list-style: none; margin-bottom: 10px;"><b style="color: #2c3e50;">Username:</b> ' . htmlspecialchars($username) . '</li>
                            <li style="list-style: none; margin-bottom: 10px;"><b style="color: #2c3e50;">Password:</b> ' . htmlspecialchars($password) . '</li>
                        </ul>
                    </div>
                    <p>Click below to log in to your account:</p>
                    <p><a href="http://192.168.0.130/assignment-4/index.php" >Click Here To Login</a></p>
                    <p>If you want to change your password, please log in with your current password and update it from your account settings.</p>
                </div>
                <div style="margin-top: 20px; font-size: 14px; color: #777; ">
            <p>Best Regards,<br>' . htmlspecialchars($name) . '</p>
            <p style="text-align:center">If you have any questions, feel free to <a href="mailto:getinplay.contact@gmail.com" style="color: #3498db; text-decoration: none;">contact us</a>.</p>
        </div>
            </div>
        </body>
        </html>
        ';
        $mail->AltBody = 'Hello ' . $name . ', Thank you for registering with us.';

        // Send email
        $mail->send();
        return true;
    } catch (Exception $e) {
        // Error message to debug email sending issues
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        return false;
    }
}
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (is_null($data)) {
        echo json_encode(['message' => 'Invalid JSON format.']);
        http_response_code(400);
        exit();
    }

    // Extract values from the incoming JSON data
    $name = $data['name'];
    $email = $data['email'];
    $phone_no = $data['phone_no'];
    $gender = $data['gender'];
    $username_a = $data['username'];
    $password_a = $data['password'];

    // Include the database connection
    include 'db_connect.php';
   
    // Run a single query to check all three conditions (username, email, phone)
    $stmt = $conn->prepare("
        SELECT 
            (SELECT COUNT(*) FROM register WHERE username = ?) AS username_count,
            (SELECT COUNT(*) FROM register WHERE email = ?) AS email_count,
            (SELECT COUNT(*) FROM register WHERE phone_no = ?) AS phone_count
    ");
    
    $stmt->bind_param("sss", $username_a, $email, $phone_no);
    $stmt->execute();
    $stmt->bind_result($usernameCount, $emailCount, $phoneCount);
    $stmt->fetch();
    $stmt->close();
   
    // Check if any value is greater than 0 (which means the value already exists)
    if ($usernameCount > 0) {
        echo json_encode(['success' => false ,'message' => 'Username already exists.']);
    
        exit();
    }

    if ($emailCount > 0) {
        echo json_encode(['success' => false ,'message' => 'Email already exists.']);
      
        exit();
    }

    if ($phoneCount > 0) {
        echo json_encode(['success' => false ,'message' => 'Phone number already exists.']);
       
        exit();
    }

    // Hash the password before storing it
    $hashedPassword = password_hash($password_a, PASSWORD_BCRYPT);

    // Set membership_id to 1 (as per your requirements)
    $membership_id = 1;
    
    // Insert the data into the register table
    $stmt = $conn->prepare("INSERT INTO register (full_name, email, phone_no, gender, username, user_password, membership_id) VALUES (?, ?, ?, ?, ?, ?, ?)");

    
   
    $stmt->bind_param("ssssssi", $name, $email, $phone_no, $gender, $username_a, $hashedPassword, $membership_id);
    if ($stmt->execute()) {
       
        $query = "SELECT * FROM register WHERE username = ? LIMIT 1";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('s', $username_a); // 's' indicates the parameter type is string
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        // echo $user['username'];
            $payload = [
                'username' => $user['username'],
                'user_id' => $user['id'],
                'user_phone' => $user['phone_no'],
                'user_email' => $user['email'],
                'full_name' => $user['full_name'],
                'membership_id' => $user['membership_id']
            ];
            $secret_key = 'yo12ur';  // Replace this with your actual secret key

            // Generate the JWT token
            $jwt = JWT::encode($payload, $secret_key,'HS256');
        sendEmail($email, $name, $username, $password_a);
        echo json_encode(['success' => true , 'message' => 'Registration successful.','token' => $jwt]);
        
    } else {
        echo json_encode(['success' => false ,'message' => 'Failed to register. Please try again.']);
      
    }

    $stmt->close();
    $conn->close();
}
?>
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require_once '../admin/vendor/autoload.php';

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $token = $data['token'] ?? '';
    $star = $data['star'];
    $message = $data['message'];


    if (empty($token)) {
        echo json_encode(['success' => false, 'message' => 'Token is missing']);
        exit;
    }

    $secret_key = 'yo12ur';

    try {
        // Decode the JWT token
        $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));
        $user_id = $decoded->user_id;

        // Include DB connection
        include 'db_connect.php';

        // Prepare the SQL query to insert the rating data into the database
        $sql_insert = "INSERT INTO rating (user_id, star, message) VALUES (?, ?, ?)";
        
        if ($stmt_insert = $conn->prepare($sql_insert)) {
            // Bind the parameters to the prepared statement
            $stmt_insert->bind_param("iis", $user_id, $star, $message);

            // Execute the query
            if ($stmt_insert->execute()) {
                echo json_encode(['success' => true, 'message' => 'Thank you for your feedback! We appreciate your support! 😊']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Oops! Something went wrong while submitting your rating. Please try again later.']);
            }

            // Close the prepared statement
            $stmt_insert->close();
        } else {
            echo json_encode(['success' => false, 'message' => 'network Issue']);
        }
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Invalid token']);
    }
}
?>

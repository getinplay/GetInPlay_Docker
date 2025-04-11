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
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (is_null($data)) {
        echo json_encode(['message' => 'Invalid JSON format.']);
        http_response_code(400);
        exit();
    }

    $token = $data['token'];
    $name = $data['name'];
    $email = $data['email'];
    $phone_no = $data['phone_no'];

    if (empty($token)) {
        echo json_encode(['message' => 'Token is required.']);
        http_response_code(400);
        exit();
    }

    if (empty($name) || empty($email) || empty($phone_no)) {
        echo json_encode(['message' => 'Name, email, and phone number are required.']);
        http_response_code(400);
        exit();
    }

    include 'db_connect.php';

    $secret_key = 'yo12ur';

    try {
        $decode = JWT::decode($token, new Key($secret_key, 'HS256'));
        $username_a = $decode->username;
        $user_id = $decode->user_id;

        // Check if email already exists for another user
        $checkEmailStmt = $conn->prepare("SELECT id FROM register WHERE email = ? AND id != ?");
        $checkEmailStmt->bind_param("si", $email, $user_id);
        $checkEmailStmt->execute();
        $checkEmailStmt->store_result();

        if ($checkEmailStmt->num_rows > 0) {
            echo json_encode(['success' => false, 'message' => 'Email already exists for another user.']);
            exit();
        }

        $checkEmailStmt->close();

        // Check if phone number already exists for another user
        $checkPhoneStmt = $conn->prepare("SELECT id FROM register WHERE phone_no = ? AND id != ?");
        $checkPhoneStmt->bind_param("si", $phone_no, $user_id);
        $checkPhoneStmt->execute();
        $checkPhoneStmt->store_result();

        if ($checkPhoneStmt->num_rows > 0) {
            echo json_encode(['success' => false, 'message' => 'Phone number already exists for another user.']);
            exit();
        }

        $checkPhoneStmt->close();

        $stmt = $conn->prepare("UPDATE register SET full_name = ?, email = ?, phone_no = ? WHERE username = ?");
        $stmt->bind_param("ssss", $name, $email, $phone_no, $username_a);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Profile updated successfully.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to update user details.']);
        }

        $stmt->close();
    } catch (Exception $e) {
        echo json_encode(['message' => 'Invalid token or error: ' . $e->getMessage()]);
    } finally {
        $conn->close();
    }
}

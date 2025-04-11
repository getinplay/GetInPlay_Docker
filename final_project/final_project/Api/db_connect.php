<?php
require_once __DIR__ . '/../load_env.php';

// Use the variables
$appUrl = getenv('APP_URL');
$dbHost = getenv('DB_HOST');
$servername = $dbHost; // Change if you have a different host
$username1 = "root"; // Change if you have a different username
$password = "root"; // Change if you have a MySQL password
$dbname = "getinplay";
    
// Create connection
$conn = new mysqli($servername, $username1, $password, $dbname);
    
// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}
    
?>
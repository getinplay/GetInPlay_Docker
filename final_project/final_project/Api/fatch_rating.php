<?php
// Set the appropriate headers for JSON output and CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");  // Explicitly set the response type to JSON

// Database connection details
include 'db_connect.php';

// Query to fetch rating data with stars 5 and 4, ordered by star and date
$sql = "SELECT r.user_id, r.star, r.message, r.date, reg.full_name 
        FROM rating r
        JOIN register reg ON r.user_id = reg.id
        WHERE r.deleteval = 1 AND r.star IN (4, 5)
        ORDER BY r.star DESC, r.date DESC , r.time DESC";

// Execute the query
$result = $conn->query($sql);

// Initialize an array to store the ratings
$ratings = [];

// Check if there are results
if ($result->num_rows > 0) {
    // Fetch the data and store it in the ratings array
    while ($row = $result->fetch_assoc()) {
        $ratings[] = [
            'full_name' => $row['full_name'],
            'star' => $row['star'],
            'message' => $row['message'],
            'date' => $row['date']
        ];
    }
} else {
    // If no ratings found, return an empty array
    $ratings = [];
}

// Close connection
$conn->close();

// Return the rating data as JSON
echo json_encode($ratings);
?>

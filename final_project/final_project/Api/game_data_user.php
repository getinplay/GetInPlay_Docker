<?php
// Set the appropriate headers for JSON output and CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");  // Explicitly set the response type to JSON

// Database connection details
include 'db_connect.php';

// First Query: Select all game data
$sql_games = "SELECT id, name, half_hour, hour, card_image, slider_image FROM games WHERE deleteval = 1";
$result_games = $conn->query($sql_games);

// Initialize an array to store the games
$games = [];

if ($result_games->num_rows > 0) {
    // Fetch data for each game and store it in the array
    while ($row = $result_games->fetch_assoc()) {
        $games[] = [
            "id" => $row["id"],
            "name" => $row["name"],
            "half_hour" => $row["half_hour"],
            "hour" => $row["hour"],
            "card_image" => $row["card_image"],
            "slot_image" => $row["slider_image"]
        ];
    }
} else {
    // If no games found, return an empty array
    $games = [];
}

// Second Query: Get the top 3 games by booking count
$sql_top_books = "
    SELECT g.id, g.name, COUNT(bg.game_id) AS booking_count
    FROM games g
    LEFT JOIN book_game bg ON g.id = bg.game_id
    WHERE g.deleteval = 1 AND bg.deleted = 1
    GROUP BY g.id
    ORDER BY booking_count DESC
    LIMIT 3
";

$result_top_books = $conn->query($sql_top_books);

// Initialize an array to store the top 3 games
$top_games = [];

if ($result_top_books->num_rows > 0) {
    // Fetch data for each top game and store it in the array
    while ($row = $result_top_books->fetch_assoc()) {
        $top_games[] = [
            "id" => $row["id"],
            "name" => $row["name"],
            "booking_count" => $row["booking_count"]
        ];
    }
} else {
    // If no top games found, return an empty array
    $top_games = [];
}

// Close connection
$conn->close();

// Prepare the final response
$response = [
    "games" => $games,
    "top_games" => $top_games
];

// Return the data as JSON
echo json_encode($response);
?>

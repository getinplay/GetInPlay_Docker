<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

header('Content-Type: application/json');

require_once '../admin/vendor/autoload.php'; // Ensure this points to the correct autoload file for JWT
include 'db_connect.php'; // Ensure db_connect.php is correctly configured

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    // Get the current date (or any other format that matches your DB's date format)
    $currentDate = date('Y-m-d');
    $currentTime = date('H:i');

    // Prepare the SQL queries to select records with a past date
    $query1 = "SELECT bg.*, g.name AS game_name 
               FROM book_game bg 
               LEFT JOIN games g ON bg.game_id = g.id 
               WHERE bg.DELETED = 1 
               ORDER BY bg.id DESC";
               
    $query2 = "SELECT bg.*, g.name AS game_name 
               FROM book_game bg 
               LEFT JOIN games g ON bg.game_id = g.id 
               WHERE bg.book_date < ? AND bg.DELETED = 0 
               ORDER BY bg.id DESC"; // Assuming you want to check non-deleted bookings here

    // Initialize arrays for past and canceled bookings
    $upcoming = [];
    $past = [];
    $cancleBookings = [];
    
    // Prepare first statement
    if ($stmt = $conn->prepare($query1)) {
        
        $stmt->execute();
        $result = $stmt->get_result();
        
        while ($row = $result->fetch_assoc()) {
            $bookingDate = $row['book_date'];
            $slot = $row['slot'];
    
            if ($bookingDate < $currentDate) {
                $past[] = $row;
            } elseif ($bookingDate > $currentDate) {
                $upcoming[] = $row;
            } else {
                // For today's bookings, check the time slot
                $startTime = explode('-', $slot)[0];
                $amOrPm = strtoupper(substr($slot, -2));
                $slotTime = $startTime . $amOrPm;
                $slotTime24Hour = date('H:i', strtotime($slotTime));
                
                if ($slotTime24Hour < $currentTime) {
                    $past[] = $row;
                } else {
                    $upcoming[] = $row;
                }     
            }
        }
        $stmt->close();
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Failed to prepare query for past bookings.'
        ]);
        exit;
    }
    // Prepare second statement
    if ($stmt2 = $conn->prepare($query2)) {
        // Bind parameters to the query
        $stmt2->bind_param("s", $currentDate); // "s" is for string (date format)
        
        // Execute the query
        $stmt2->execute();
        
        // Get the result for the second query
        $result2 = $stmt2->get_result();
        
        // Fetch all rows as an associative array
        while ($row = $result2->fetch_assoc()) {
            // Add the fetched data (including game_name) to the cancleBookings array
            $cancleBookings[] = $row;
        }

        // Close the second statement
        $stmt2->close();
    } else {
        // Handle errors for the second query
        echo json_encode([
            'status' => 'error',
            'message' => 'Failed to prepare query for canceled bookings.'
        ]);
        exit;
    }

    // Return the result as JSON including the count
    echo json_encode([
        'status' => 'success',
        'upcoming' => $upcoming,
        'pastdata' => $past,
        'cancle' => $cancleBookings,
        
    ]);

    // Close the connection
    $conn->close();
}
?>

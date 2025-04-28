<?php
include 'connect_database.php';
require_once __DIR__ . '/../load_env.php';

// Use the variables
$appUrl = getenv('APP_URL');
$dbHost = getenv('DB_HOST');
// Query for count of deleted users
$query1 = "SELECT COUNT(*) AS count FROM register WHERE deleteval = 1";
$result1 = mysqli_query($conn, $query1);
$row1 = mysqli_fetch_assoc($result1);
$totaluser = $row1['count'];

// Query for count of users with membership_id 2
$query2 = "SELECT COUNT(*) AS count FROM register WHERE membership_id = 2 AND deleteval = 1";
$result2 = mysqli_query($conn, $query2);
$row2 = mysqli_fetch_assoc($result2);
$membership2Count = $row2['count'];

// Query for count of users with membership_id 3
$query3 = "SELECT COUNT(*) AS count FROM register WHERE membership_id = 3 AND deleteval = 1";
$result3 = mysqli_query($conn, $query3);
$row3 = mysqli_fetch_assoc($result3);
$membership3Count = $row3['count'];

$query4 = "SELECT COUNT(*) AS count FROM games WHERE deleteval = 1";
$result4 = mysqli_query($conn, $query4);
$row4 = mysqli_fetch_assoc($result4);
$gameCount = $row4['count'];

$query1 = "SELECT name FROM games WHERE deleteval = 1";
$result1 = mysqli_query($conn, $query1);

// Store the game names in an array
$gameNames = [];
while ($row = mysqli_fetch_assoc($result1)) {
    $gameNames[] = $row['name'];
}

// Second Query: Get the count of bookings for each game where deleteval = 1
$query2 = "SELECT game_id, COUNT(*) AS booking_count
           FROM book_game
           WHERE deleted= 1
           GROUP BY game_id";

$result2 = mysqli_query($conn, $query2);

// Store the booking counts in an array
$bookingCounts = [];
while ($row = mysqli_fetch_assoc($result2)) {
    $bookingCounts[] = $row['booking_count'];
}

$query3 = "SELECT 
    MONTHNAME(book_date) AS month_name, 
    MONTH(book_date) AS month_number, 
    COUNT(*) AS booking_count
FROM book_game
WHERE deleted = 1
GROUP BY month_number, month_name";

$result3 = mysqli_query($conn, $query3);

// Store the month names and booking counts in arrays
$monthNames = [];
$mbookingCounts = [];
while ($row = mysqli_fetch_assoc($result3)) {
    $monthNames[] = $row['month_name'];
    $mbookingCounts[] = $row['booking_count'];
}
$query = "
    SELECT 
        SUM(CASE WHEN deleted = 1 THEN price ELSE 0 END) AS total_revenue,
        SUM(CASE WHEN deleted = 1 AND DATE_FORMAT(book_date, '%Y-%m') = DATE_FORMAT(CURRENT_DATE - INTERVAL 1 MONTH, '%Y-%m') THEN price ELSE 0 END) AS last_month_revenue
    FROM book_game;
";
$result = $conn->query($query);
$row = $result->fetch_assoc();
$total_revenue = $row['total_revenue'];
$last_month_revenue = $row['last_month_revenue'];

$query = "SELECT COUNT(*) AS count FROM rating WHERE deleteval = 1";
$result = $conn->query($query);
$row = $result->fetch_assoc();
$totalrate = $row['count'];

$query = "SELECT COUNT(*) as count
FROM book_game 
WHERE book_date = CURDATE() 
AND deleted = 1";
$result = $conn->query($query);
$row = $result->fetch_assoc();
$todaybooking = $row['count'];
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Admin Dashboard</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="path/to/bootstrap.css" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="css/navbar.css">
    <link rel="stylesheet" href="css/admin_home.css" />
</head>

<body>
    <!-- Navbar -->
    <?php include 'navbar.php' ?>
    <!-- Admin Info Section (outside of navbar, left side) -->
    <div class="body-part">
        <div class="admin-info-container">
            <div id="admin-details" class="admin-details">
                <div class="admin-photo-container">
                    <img src="uploads/bravo.jpeg" alt="Admin Photo" class="admin-photo" />
                </div>
                <div class="admin-name">
                    <h3>Admin</h3>
                </div>
                <div class="admin-address">
                    <p><span class="label">Address:</span> National Plaza, S7, RC Dutt Rd, Aradhana Society, Vishwas
                        Colony, Alkapuri, Vadodara, Gujarat 390007</p>
                </div>
                <div class="admin-phone">
                    <p><span class="label">Phone:</span> +91 12345 6790</p>
                </div>
                <div class="admin-email">
                    <p><span class="label">Email:</span> admin@gmail.com</p>
                </div>
                <div class="admin-email">
                    <p><span class="label">GameZone:</span> GetInPlay</p>
                </div>
                <div class="admin-email">
                    <p><span class="label">open:</span> 10.00A.M </p>
                </div>
                <div class="admin-email">
                    <p><span class="label">close:</span> 11.30P.M</p>
                </div>
            </div>
        </div>
        <!-- Main Content Layout -->
        <div class="details">
            <div class="data">
                <div class="info" onclick="handleClick('Total Member')">
                    <div class="info-content">
                        <h3 class="info-title"><i class="fa-solid fa-users"></i> Total Members</h3>
                        <p class="info-number count-value hidden"><?php echo $totaluser ?></p>
                    </div>
                </div>
                <div class="info" onclick="handleClick('Total game')">
                    <div class="info-content">
                        <h3 class="info-title"><i class="fa-solid fa-trophy"></i> Total games</h3>
                        <p class="info-number count-value hidden"><?php echo $gameCount ?></p>
                    </div>
                </div>
                <div class="info" onclick="handleClick('Silver')">
                    <div class="info-content">
                        <h3 class="info-title"><i class="fa-solid fa-medal"></i> Silver Members</h3>
                        <p class="info-number count-value hidden"><?php echo $membership2Count ?></p>
                    </div>
                </div>
                <div class="info" onclick="handleClick('Gold')">
                    <div class="info-content">
                        <h3 class="info-title"><i class="fa-solid fa-award"></i> Gold Members</h3>
                        <p class="info-number count-value hidden"><?php echo $membership3Count ?></p>
                    </div>
                </div>
            </div>
            <div class="data data2">
                <div class="info">
                    <div class="info-content">
                        <h3 class="info-title" style="font-size:1rem"><i class="fa-solid fa-hand-holding-dollar"></i> Last Month Revenue</h3>
                        <p class="info-number" style="color:green">₹ <?php echo $last_month_revenue ?></p>
                    </div>
                </div>
                <div class="info">
                    <div class="info-content">
                        <h3 class="info-title"><i class="fa-solid fa-chart-line"></i></i> Total Revenue</h3>
                        <p class="info-number"  style="color:green">₹ <?php echo $total_revenue ?></p>
                    </div>
                </div>
                <div class="info" >
                    <div class="info-content">
                        <h3 class="info-title"><i class="fa-solid fa-splotch"></i> Total Rating</h3>
                        <p class="info-number count-value hidden"><?php echo  $totalrate?></p>
                    </div>
                </div>
                <div class="info" >
                    <div class="info-content" onclick="handleClick('Today Bookings')">
                        <h3 class="info-title"><i class="fa-solid fa-calendar-days"></i> Today Bookings</h3>
                        <p class="info-number count-value hidden"><?php echo $todaybooking ?></p>
                    </div>
                </div>
            </div>
            <!-- <div class="extinfo">
                <div class="leftext">
                    <div class="info2"><i class="fa-solid fa-chart-line"></i></i> Total Revenue <br><span><?php echo $total_revenue ?></span></div>
                    <div class="info3"><i class="fa-solid fa-splotch"></i> Total Rating <br><span class="info-number count-value hidden"><?php echo $totalrate ?></span></div>
                    <div class="info4"><i class="fa-solid fa-calendar-days"></i> Today Bookings <br><span class="info-number count-value hidden"><?php echo $todaybooking ?></span></div>
                </div>
                
            </div> -->
            <div class="container mt-2">
                <div class="row">
                    <div class="col-md-6">
                        <!-- Line Chart -->
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Slot Overview</h5>
                                <canvas id="myLineChart"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <!-- Bar Chart -->
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Trending Games</h5>
                                <canvas id="myBarChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script>
            // Line Chart
            var monthNames = <?php echo json_encode($monthNames); ?>;
            var mbookingCounts = <?php echo json_encode($mbookingCounts); ?>;
            var ctxLine = document.getElementById('myLineChart').getContext('2d');
            var myLineChart = new Chart(ctxLine, {
                type: 'line',
                data: {
                    labels: monthNames,
                    datasets: [{
                        label: 'Slot',
                        data: mbookingCounts,
                        borderColor: '#4A5BE6',
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        borderWidth: 2,
                        fill: true
                    }]
                }
            });
            var gameNames = <?php echo json_encode($gameNames); ?>;
            var bookingCounts = <?php echo json_encode($bookingCounts); ?>;
            // Bar Chart
            var ctxBar = document.getElementById('myBarChart').getContext('2d');
            var myBarChart = new Chart(ctxBar, {
                type: 'bar',
                data: {
                    labels: gameNames,
                    datasets: [{
                        label: 'Trending Game',
                        data: bookingCounts,
                        borderColor: 'black',
                        backgroundColor: '#4A5BE6',
                        borderWidth: 1
                    }]
                }
            });

            document.addEventListener('DOMContentLoaded', function() {
                const countElements = document.querySelectorAll('.count-value');

                // Iterate over all count elements and trigger the animation
                countElements.forEach((element) => {
                    // Simulate an animation to transition the numbers
                    setTimeout(() => {
                        element.classList.remove('hidden'); // Remove hidden class
                        element.classList.add('fade-in'); // Add fade-in class
                    }, 300); // Delay to make sure the page content is loaded before animation
                });
            });
            // Function to animate number count
            // Function to animate number count
            function animateCount(element, endValue) {
                let startValue = -1;
                const duration = 2000; // 2 seconds duration
                const stepTime = Math.max(Math.floor(duration / endValue), 50); // Prevent too fast updates

                const interval = setInterval(function() {
                    startValue += 1;
                    element.textContent = `${startValue}`;
                    if (startValue >= endValue) {
                        clearInterval(interval);
                    }
                }, stepTime);
            }

            // Run animation on all count-value elements
            document.addEventListener('DOMContentLoaded', function() {
                const countElements = document.querySelectorAll('.count-value');

                countElements.forEach((element) => {
                    const endValue = parseInt(element.textContent.trim(), 10);
                    element.textContent = '0'; // Reset the initial value
                    animateCount(element, endValue);
                });
            });

            function handleClick(infoType) {
                let url = '';

                // Define URLs for each type
                if (infoType === 'Total Member') {
                    url = 'user_management.php'; // Redirect to the Total Member page
                } else if (infoType === 'Total game') {
                    url = 'game_management.php'; // Redirect to the Total Game page
                } else if (infoType === 'Silver') {
                    url = 'user_management.php?search=silver'; // Redirect to the Silver Membership page
                } else if (infoType === 'Gold') {
                    url = 'user_management.php?search=gold'; // Redirect to the Gold Membership page
                } else if (infoType === 'Today Bookings') {
                    url = 'admin_history.php'; // Redirect to the Today Bookings page
                }

                // Perform the redirection
                if (url) {
                    window.location.href = url; // Redirect to the URL
                }
            }
            </script>



        </div>
    </div>
</body>

</html>
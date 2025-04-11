<?php
require_once __DIR__ . '/../load_env.php';
$appUrl = getenv('APP_URL');
session_start(); // Start session
if (isset($_SESSION['games_data'])) {
    $games_data = $_SESSION['games_data'];
}
date_default_timezone_set('Asia/Kolkata'); // Set the default timezone to Indian time
 
if (!isset($_GET['game_id'])) {
    die("Game ID is missing.");
}
 
$game_id = $_GET['game_id'];
 
// Function to determine time of day (Morning/Afternoon/Evening/Night) based on end time
function getTimePeriod($time) {
    list($start, $end) = explode('-', $time);
    $endPeriod = strtoupper(substr($end, -2)); // Extract AM/PM from the end time
    $endTime = substr($end, 0, -2); // Remove AM/PM from the end time
 
    // Convert end time to 24-hour format for comparison
    $end24hr = DateTime::createFromFormat('g:iA', $endTime . $endPeriod);
    if (!$end24hr) return 'Unknown';
 
    $end24hr = $end24hr->format('H:i');
 
    // Determine time of day based on end time
    if ($end24hr >= '06:00' && $end24hr < '12:00') {
        return 'Morning';
    } elseif ($end24hr >= '12:00' && $end24hr < '17:00') {
        return 'Afternoon';
    } elseif ($end24hr >= '17:00' && $end24hr < '20:00') {
        return 'Evening';
    } else {
        return 'Night';
    }
}
 
// Get the selected date (default is today)
$selected_date = isset($_GET['date']) ? $_GET['date'] : date("Y/m/d");
 
// Get the selected filters (default is All)
$selected_filter = isset($_GET['filter']) ? $_GET['filter'] : '30min';
$selected_period = isset($_GET['period']) ? $_GET['period'] : 'All';
$selected_time_of_day = isset($_GET['time_of_day']) ? $_GET['time_of_day'] : 'All';
?>
 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game Slots</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="css/navbar.css">
    <link rel="stylesheet" href="css/view_slots.css">
</head>
<body>
    <?php include "navbar.php" ?>
 
<!-- Loader elements -->
<div id="loaderContainer" class="loader-container"></div>
<div id="loader" class="loader"></div>
<div id="loaderMessage" class="loader-message">Processing, please wait...</div>
 
<!-- Popup for Messages -->
<div id="messageOverlay"></div>
<div id="messagePopup">
    <p id="messageText"></p>
    <button id="closeMessagePopup">OK</button>
</div>
<div class="body_css">
    <h1 id="gameName"></h1>
    <!-- Add this right after <body> -->
    <div class="date-picker">
        <?php
        $dates = [
            [
                'label' => '<small>' . substr(date("l"),0,3) . '</small><br><span class="date-large">' . date("j") . '</span><br><small>' . date("M") . '</small>', // Today
                'date' => date("Y/m/d")
            ],
            [
                'label' => '<small>' . substr(date("l", strtotime("+1 day")),0,3) . '</small><br><span class="date-large">' . date("j", strtotime("+1 day")) . '</span><br><small>' . date("M", strtotime("+1 day")) . '</small>', // Tomorrow
                'date' => date("Y/m/d", strtotime("+1 day"))
            ],
            [
                'label' => '<small>' . substr(date("l", strtotime("+2 days")),0,3) . '</small><br><span class="date-large">' . date("j", strtotime("+2 days")) . '</span><br><small>' . date("M", strtotime("+2 days")) . '</small>', // Day After
                'date' => date("Y/m/d", strtotime("+2 days"))
            ]
        ];
 
        foreach ($dates as $date) {
            $is_active = ($date['date'] === $selected_date) ? 'active' : '';
            echo '
            <a href="slots.php?game_id=' . $game_id . '&date=' . $date['date'] . '&filter=' . $selected_filter . '&period=' . $selected_period . '&time_of_day=' . $selected_time_of_day . '">
                <button class="' . $is_active . '">' . $date['label'] . '</button>
            </a>';
        }
        ?>
    </div>
    <div class="filter-buttons">
        <!-- Duration Filter -->
         <div class="durationfltr">
        <?php $filters = ['30min','1hr']; ?>
        <?php foreach ($filters as $filter): ?>
            <a href="slots.php?game_id=<?= $game_id ?>&date=<?= $selected_date ?>&filter=<?= $filter ?>&period=<?= $selected_period ?>&time_of_day=<?= $selected_time_of_day ?>">
                <button class="<?= ($filter === $selected_filter) ? 'active' : '' ?>"><?= $filter ?></button>
            </a>
        <?php endforeach; ?>
        </div>
 
        <!-- Time of Day Filter -->
         <div class="mrngfltr">
        <?php $times_of_day = ['All','Morning','Afternoon','Evening','Night']; ?>
        <?php foreach ($times_of_day as $time):?>
            <a href="slots.php?game_id=<?= $game_id ?>&date=<?= $selected_date ?>&filter=<?= $selected_filter ?>&period=<?= $selected_period ?>&time_of_day=<?= $time ?>">
                <button class="<?= ($time === $selected_time_of_day) ? 'active' : '' ?>"><?= $time ?></button>
            </a>
        <?php endforeach;?>
        </div>
    </div>
    <div class="slots-container" id="slotsContainer">
        <!-- Slots will be loaded here via JavaScript -->
    </div>
 
    <!-- Booked Slots Details Section -->
    <div class="booked-details">
        <h2>Booking Details</h2>
        <table class="booked-table">
            <thead>
                <tr>
                    <th>Action</th>
                    <th>Booking ID</th>
                    <th>Username</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Slot</th>
                </tr>
            </thead>
            <tbody id="bookedSlotsTable">
                <!-- Booked slots will be loaded here via JavaScript -->
            </tbody>
        </table>
    </div>
 
    <!-- Booked Slots Cards for Mobile -->
    <div class="booked-cards" id="bookedSlotsCards">
        <!-- Booked slots cards will be loaded here via JavaScript -->
    </div>
</div>
 
<!-- Popup for Booking -->
<div id="overlay"></div>
<div id="popup">
    <h3>Book Slot</h3>
    <input type="text" id="phoneNumber" placeholder="Enter Phone Number" maxlength="10">
    <span id="phone_status"></span>
    <button id="submitBooking" disabled>Submit</button>
    <button id="closePopup">Close</button>
</div>
 
<script>
// Global variables
let selectedSlot = null;
let gameData = null;
 
// Helper functions for loader
function showLoader(message = 'Processing, please wait...') {
    document.body.classList.add('loader-active');
    document.getElementById('loaderContainer').style.display = 'flex';
    document.getElementById('loader').style.display = 'block';
    document.getElementById('loaderMessage').textContent = message;
    document.getElementById('loaderMessage').style.display = 'block';
}
 
function hideLoader() {
    document.body.classList.remove('loader-active');
    document.getElementById('loaderContainer').style.display = 'none';
    document.getElementById('loader').style.display = 'none';
    document.getElementById('loaderMessage').style.display = 'none';
}
 
// Function to show the message popup
function showMessage(message, isUserNotRegistered = false) {
    const messagePopup = document.getElementById('messagePopup');
    const messageText = document.getElementById('messageText');
    const messageOverlay = document.getElementById('messageOverlay');
    
    messageText.innerText = message;
    
    // Clear additional buttons
    const buttons = messagePopup.querySelectorAll('button');
    for (let i = 1; i < buttons.length; i++) {
        buttons[i].remove();
    }
    
    // Configure the close button
    const closeButton = buttons[0];
    closeButton.innerText = isUserNotRegistered ? 'Ok' : 'Ok';
    closeButton.onclick = () => {
        messagePopup.style.display = 'none';
        messageOverlay.style.display = 'none';
    };
    
    // Add "Add New User" button if needed
    if (isUserNotRegistered) {
        const addUserButton = document.createElement('button');
        addUserButton.innerText = 'Add New User';
        addUserButton.style.backgroundColor = '#4A5BE6';
        addUserButton.style.margin = '0 5px';
        addUserButton.onclick = () => {
            window.location.href = 'user_management/user_form.php';
        };
        closeButton.insertAdjacentElement('afterend', addUserButton);
    }
    
    // Set text color
    messageText.style.color = (message.includes('Failed') || message.includes('error') || message.includes('Error'))
        ? 'red'
        : 'green';
    
    // Show the popup
    messagePopup.style.display = 'block';
    messageOverlay.style.display = 'block';
}
 
// Function to fetch slot data using Fetch API
async function fetchSlotData() {
    showLoader('Loading slots...');
    
    try {
        const gameId = <?php echo $game_id; ?>;
        const date = "<?php echo $selected_date; ?>";
        
        // Fetch slots data
        const slotsResponse = await fetch("<?=$appUrl?>/filter_time.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: gameId, date: date })
        });
        
        if (!slotsResponse.ok) {
            throw new Error('Failed to fetch slots data');
        }
        
        const slotsData = await slotsResponse.json();
        
        // Fetch booked slots data
        const bookedResponse = await fetch("<?=$appUrl?>/book_slots.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ game_id: gameId, date: date })
        });
        
        if (!bookedResponse.ok) {
            throw new Error('Failed to fetch booked slots data');
        }
        
        const bookedSlotsData = await bookedResponse.json();
        
        return {
            name: slotsData.name,
            slots: slotsData.slots,
            filter: slotsData.filter,
            booked_slots: bookedSlotsData.booked_slots
        };
    } catch (error) {
        console.error('Error fetching slot data:', error);
        showMessage('Error loading slot data. Please try again.');
        return null;
    } finally {
        hideLoader();
    }
}
 
// Function to render available slots
function renderAvailableSlots(slotsData) {
    const slotsContainer = document.getElementById('slotsContainer');
    slotsContainer.innerHTML = '';
    
    if (!slotsData) {
        slotsContainer.innerHTML = '<p>No slots data available.</p>';
        return;
    }
    
    // Set game name
    document.getElementById('gameName').textContent = slotsData.name.toUpperCase();
    
    // Extract booked slots
    const bookedSlots = slotsData.booked_slots.map(booking => booking.slot);
    
    // Get filter values from URL
    const urlParams = new URLSearchParams(window.location.search);
    const selectedFilter = urlParams.get('filter') || '30min';
    const selectedPeriod = urlParams.get('period') || 'All';
    const selectedTimeOfDay = urlParams.get('time_of_day') || 'All';
    
    // Filter and render available slots
    const availableSlots = [];
    for (let i = 0; i < slotsData.slots.length; i++) {
        const slot = slotsData.slots[i];
        const filter = slotsData.filter[i];
        
        if (!bookedSlots.includes(slot)) {
            const period = slot.slice(-2).toUpperCase();
            const timeOfDay = getTimePeriod(slot);
            
            if ((selectedFilter === 'All' || filter === selectedFilter) &&
                (selectedPeriod === 'All' || period === selectedPeriod) &&
                (selectedTimeOfDay === 'All' || timeOfDay === selectedTimeOfDay)) {
                
                availableSlots.push({
                    time: slot,
                    filter: filter
                });
            }
        }
    }
    
    if (availableSlots.length === 0) {
        slotsContainer.innerHTML = '<p>No slots available.</p>';
        return;
    }
    
    availableSlots.forEach(slot => {
        const slotCard = document.createElement('div');
        slotCard.className = 'slot-card available';
        slotCard.dataset.slot = slot.time;
        slotCard.dataset.filter = slot.filter;
        slotCard.innerHTML = `<p>${slot.time}</p>`;
        slotsContainer.appendChild(slotCard);
        
        // Add click event to slot card
        slotCard.addEventListener('click', () => {
            selectedSlot = slot.time;
            document.getElementById('popup').style.display = 'block';
            document.getElementById('overlay').style.display = 'block';
        });
    });
}
 
// Function to render booked slots
function renderBookedSlots(bookedSlots) {
    const bookedTableBody = document.getElementById('bookedSlotsTable');
    const bookedCardsContainer = document.getElementById('bookedSlotsCards');
    
    bookedTableBody.innerHTML = '';
    bookedCardsContainer.innerHTML = '';
    
    if (!bookedSlots || bookedSlots.length === 0) {
        bookedTableBody.innerHTML = '<tr><td colspan="6">No slots booked for this date.</td></tr>';
        bookedCardsContainer.innerHTML = '<p>No slots booked for this date.</p>';
        return;
    }
    
    // Render table rows
    bookedSlots.forEach(booking => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <button class="cancel-btn"
                        data-book-id="${booking.id}"
                        data-phone-no="${booking.phone_no}"
                        data-slot="${booking.slot}"
                        data-date="<?php echo $selected_date; ?>">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
            <td>#${booking.id}</td>
            <td>${booking.username}</td>
            <td>${booking.phone_no}</td>
            <td>${booking.email}</td>
            <td>${booking.slot}</td>
        `;
        bookedTableBody.appendChild(row);
    });
    
    // Render mobile cards
    bookedSlots.forEach(booking => {
        const card = document.createElement('div');
        card.className = 'booked-card';
        card.innerHTML = `
            <p><strong>Username:</strong> ${booking.username}</p>
            <p><strong>Phone:</strong> ${booking.phone_no}</p>
            <p><strong>Email:</strong> ${booking.email}</p>
            <p><strong>Slot:</strong> ${booking.slot}</p>
            <button class="cancel-btn"
                    data-book-id="${booking.id}"
                    data-phone-no="${booking.phone_no}"
                    data-slot="${booking.slot}"
                    data-date="<?php echo $selected_date; ?>">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;
        bookedCardsContainer.appendChild(card);
    });
    
    // Add event listeners to cancel buttons
    document.querySelectorAll('.cancel-btn').forEach(button => {
        button.addEventListener('click', handleCancelBooking);
    });
}
 
// Function to get time period (same as PHP function)
function getTimePeriod(time) {
    const parts = time.split('-');
    const end = parts[1];
    const endPeriod = end.slice(-2).toUpperCase();
    const endTime = end.slice(0, -2);
    
    // Convert to 24-hour format
    let hours = parseInt(endTime.split(':')[0]);
    const minutes = parseInt(endTime.split(':')[1] || '0');
    
    if (endPeriod === 'PM' && hours < 12) hours += 12;
    if (endPeriod === 'AM' && hours === 12) hours = 0;
    
    const totalMinutes = hours * 60 + minutes;
    
    if (totalMinutes >= 360 && totalMinutes < 720) return 'Morning';
    if (totalMinutes >= 720 && totalMinutes < 1020) return 'Afternoon';
    if (totalMinutes >= 1020 && totalMinutes < 1200) return 'Evening';
    return 'Night';
}
 
// Handle cancel booking
async function handleCancelBooking(event) {
    const button = event.currentTarget;
    const bookId = button.getAttribute('data-book-id');
    const phoneNo = button.getAttribute('data-phone-no');
    const slot = button.getAttribute('data-slot');
    const date = button.getAttribute('data-date');
    
    const confirmCancel = confirm('Are you sure you want to cancel this booking?');
    if (!confirmCancel) return;
 
    showLoader('Cancelling booking...');
    button.disabled = true;
 
    try {
        const response = await fetch("<?=$appUrl?>/slot_cancle.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                auth: 'admin',
                phone_no: phoneNo,
                date: date,
                slot: slot,
                book_id: bookId
            })
        });
 
        const result = await response.json();
 
        if (result.success) {
            showMessage('Booking cancelled successfully!');
            // Refresh the data
            initializePage();
        } else {
            button.disabled = false;
            showMessage('Failed to cancel booking: ' + result.message);
        }
    } catch (error) {
        button.disabled = false;
        showMessage('An error occurred while cancelling the booking.');
    } finally {
        hideLoader();
    }
}
 
// Initialize the page
async function initializePage() {
    const slotsData = await fetchSlotData();
    if (slotsData) {
        renderAvailableSlots(slotsData);
        renderBookedSlots(slotsData.booked_slots);
    }
}
 
// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    initializePage();
    
    // Popup handling
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const phoneInput = document.getElementById('phoneNumber');
    const submitButton = document.getElementById('submitBooking');
    const closePopupButton = document.getElementById('closePopup');
    
    // Close popup
    closePopupButton.addEventListener('click', () => {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });
    
    // Validate phone number
    phoneInput.addEventListener('input', () => {
        const phone = phoneInput.value;
        submitButton.disabled = !(phone.length === 10 && /^\d+$/.test(phone));
    });
    
    // Submit booking
    submitButton.addEventListener('click', async () => {
        const phone = phoneInput.value.trim();
        if (!phone || phone.length !== 10 || !/^\d+$/.test(phone)) {
            showMessage('Please enter a valid 10-digit phone number');
            return;
        }
 
        if (!selectedSlot) {
            showMessage('No slot selected');
            return;
        }
 
        const confirmBooking = confirm(`Are you sure you want to book this slot?\n\nSlot: ${selectedSlot}\nPhone: ${phone}`);
        if (!confirmBooking) return;
 
        const gameId = <?php echo $game_id; ?>;
        const date = "<?php echo $selected_date; ?>";
        const selectedFilter = "<?php echo $selected_filter; ?>";
        let price = 0.0;
 
        showLoader('Booking your slot...');
        submitButton.disabled = true;
 
        try {
            // Fetch game price (if not already loaded)
            if (!gameData) {
                const gameDataResponse = await fetch(`<?=$appUrl?>/game_data.php`);
                gameData = await gameDataResponse.json();
            }
            
            if (Array.isArray(gameData)) {
                const selectedGame = gameData.find(game => game.id == gameId);
                
                if (selectedGame) {
                    price = selectedFilter === '1hr'
                        ? parseFloat(selectedGame.hour)
                        : parseFloat(selectedGame.half_hour);
                } else {
                    throw new Error('Game not found');
                }
            } else {
                throw new Error('Invalid game data');
            }
            
            // Submit booking
            const bookingResponse = await fetch("<?=$appUrl?>/book_game_admin.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    game_id: gameId,
                    date: date,
                    slot: selectedSlot,
                    phone_no: phone,
                    price: price.toFixed(2)
                })
            });
            
            const result = await bookingResponse.json();
            
            if (result.success) {
                showMessage('Slot booked successfully!');
                popup.style.display = 'none';
                overlay.style.display = 'none';
                phoneInput.value = '';
                initializePage(); // Refresh the page data
            } else {
                if (result.message === "Phone number is not registered") {
                    showMessage('Failed to book slot: ' + result.message, true);
                } else {
                    showMessage('Failed to book slot: ' + result.message);
                }
            }
        } catch (error) {
            showMessage('An error occurred while booking the slot.');
        } finally {
            hideLoader();
            submitButton.disabled = false;
        }
    });
});
</script>
</body>
</html>
 
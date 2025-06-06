<?php
include('connect_database.php');

$searchTerm = isset($_GET['search']) ? trim($_GET['search']) : '';

$recordsPerPage = isset($_GET['recordsPerPage']) ? (int)$_GET['recordsPerPage'] : 5;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$offset = ($page - 1) * $recordsPerPage;

$query = "SELECT * FROM games WHERE deleteval=1";

if (!empty($searchTerm)) {
    $query .= " AND name LIKE '%" . $conn->real_escape_string($searchTerm) . "%'";
}

$query .= " ORDER BY id DESC LIMIT $offset, $recordsPerPage";

$totalRecordsQuery = "SELECT COUNT(*) as total FROM games WHERE deleteval=1";
if (!empty($searchTerm)) {
    $totalRecordsQuery .= " AND name LIKE '%" . $conn->real_escape_string($searchTerm) . "%'";
}

$totalRecordsResult = $conn->query($totalRecordsQuery);
$totalRecords = $totalRecordsResult->fetch_assoc()['total'];
$totalPages = ceil($totalRecords / $recordsPerPage);

$result = $conn->query($query);

if (!$result) {
    die("Query Error: " . $conn->error);
}

if ($totalRecords == 0) {
    $noResultsMessage = "No records found!!";
} else {
    $noResultsMessage = "";
}
$showpagesec = $totalRecords > 0;
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game Management</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="css/navbar.css">
    <link rel="stylesheet" href="css/user_management.css">
    <link rel="stylesheet" href="css/game_management.css">
    <style>
    #slotModal {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        width: 500px;
        max-width: 40%;
        height: auto;
        max-height: 90vh;
        overflow-y: auto;
    }

    #overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
    }

    .close-popup {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        font-size: 20px;
        color: #333;
    }

    .close-popup:hover {
        color: #41C2CB;
    }

    .pd {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .pd span{
        margin-top: -10px;
    }
    </style>
</head>

<body>
    <?php include 'navbar.php' ?>
    <div class="main">
        <div class="sb">
            <div class="records-per-page" style="visibility: <?php echo $showpagesec ? 'visible' : 'hidden'; ?>;">
                <form method="GET" action="">
                    <label for="recordsPerPage">Show</label>
                    <select name="recordsPerPage" id="recordsPerPage" onchange="this.form.submit()">
                        <option value="5" <?php echo $recordsPerPage == 5 ? 'selected' : ''; ?>>5</option>
                        <option value="10" <?php echo $recordsPerPage == 10 ? 'selected' : ''; ?>>10</option>
                        <option value="15" <?php echo $recordsPerPage == 15 ? 'selected' : ''; ?>>15</option>
                    </select>
                    <label for="recordsPerPage">entries</label>
                    <input type="hidden" name="search" id="hiddenSearch" value="<?php echo htmlspecialchars($searchTerm); ?>">
                </form>
            </div>
            <div class="search-form">
                <div class="search-div">
                    <i class="fa-solid fa-magnifying-glass search-icon" style="color:lightgrey"></i>
                    <input id="searchField" type="text" placeholder="Search by name" 
                           value="<?php echo htmlspecialchars($searchTerm); ?>">
                    <i class="fa-solid fa-xmark clear-icon" id="clearLink" style="color:lightgrey"></i>
                </div>
            </div>
            <div class="adduser">
                <a href="game_management/game_form.php" style="text-decoration:none; color:white">
                    <div class="btn1">
                        <div><i class="fa-solid fa-user-plus"></i></div>
                        <div style="font-weight: bold">ADD GAME</div>
                    </div>
                </a>
            </div>
        </div>
        <div class="mobile-up-div">
            <div class="search-form">
                <div class="search-div">
                    <i class="fa-solid fa-magnifying-glass search-icon" style="color:lightgrey"></i>
                    <input id="searchFieldMobile" type="text" placeholder="Search by name"
                           value="<?php echo htmlspecialchars($searchTerm); ?>">
                    <i class="fa-solid fa-xmark clear-icon" id="clearLinkMobile" style="color:lightgrey"></i>
                </div>
            </div>
            <div class="dw">
                <div class="records-per-page" style="visibility: <?php echo $showpagesec ? 'visible' : 'hidden'; ?>;">
                    <form method="GET" action="">
                        <label for="recordsPerPageMobile">Show</label>
                        <select name="recordsPerPage" id="recordsPerPageMobile" onchange="this.form.submit()">
                            <option value="5" <?php echo $recordsPerPage == 5 ? 'selected' : ''; ?>>5</option>
                            <option value="10" <?php echo $recordsPerPage == 10 ? 'selected' : ''; ?>>10</option>
                            <option value="15" <?php echo $recordsPerPage == 15 ? 'selected' : ''; ?>>15</option>
                        </select>
                        <label for="recordsPerPageMobile">entries</label>
                        <input type="hidden" name="search" id="hiddenSearchMobile" value="<?php echo htmlspecialchars($searchTerm); ?>">
                    </form>
                </div>
                <div class="adduser">
                    <a href="game_management/game_form.php" style="text-decoration:none; color:white">
                        <div class="btn1">
                            <div><i class="fa-solid fa-user-plus"></i></div>
                            <div style="font-weight: bold">ADD GAME</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <?php if ($totalRecords == 0) : ?>
        <p class="no-records-message" style="text-align:center"><?php echo $noResultsMessage; ?></p>
        <?php else: ?>
        <table border='1'>
            <tr>
                <th>Action</th>
                <th>Name</th>
                <th>Price ₹ (30 min)</th>
                <th>Price ₹ (1 hr)</th>
                <th>Card Image</th>
                <th>Slider Image</th>
                <th>Slots</th>
            </tr>
            <?php while ($row = $result->fetch_assoc()) : ?>
            <tr>
                <td class='action-buttons'>
                    <a href='game_management/game_form.php?id=<?php echo $row["id"] ?>' class='edit'><i
                            class='fa-solid fa-pencil'></i></a>
                    <a href="#" class="delete" onclick="confirmDelete(<?php echo $row['id']; ?>)">
                        <i class="fas fa-trash-alt"></i>
                    </a>
                    <a href='game_management/view_game.php?id=<?php echo $row["id"] ?>' class='view'><i
                            class="fa-solid fa-file-lines"></i></a>
                </td>
                <td><?php echo htmlspecialchars($row["name"]); ?></td>
                <td><?php echo htmlspecialchars($row["half_hour"]); ?></td>
                <td><?php echo htmlspecialchars($row["hour"]); ?></td>
                <td><img src=<?php echo htmlspecialchars($row["card_image"]); ?> alt='Game Image' width='50'></td>
                <td><img src=<?php echo htmlspecialchars($row["slider_image"]); ?> alt='Slider Image' width='50'></td>
                <td><button class='view-slots-btn' data-game-id='<?php echo $row["id"]; ?>'><i
                            class="fa-solid fa-eye"></i></button></td>
            </tr>
            <?php endwhile; ?>
        </table>
        <?php endif; ?>
        <div class="mobile-view">
            <?php
        $result->data_seek(0);
        while ($row = $result->fetch_assoc()) : ?>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title"><?php echo htmlspecialchars($row["name"]); ?></h5>
                    <p class="card-text"><strong>Price ₹ (30 min):</strong>
                        <?php echo htmlspecialchars($row["half_hour"]); ?>
                    </p>
                    <p class="card-text"><strong>Price ₹ (1 hr):</strong> <?php echo htmlspecialchars($row["hour"]); ?>
                    </p>
                    <p class="card-text"><strong>Card Image:</strong> <img
                            src=<?php echo htmlspecialchars($row["card_image"]); ?> alt='Game Image' width='50'></p>
                    <p class="card-text"><strong>Slider Image:</strong> <img
                            src=<?php echo htmlspecialchars($row["slider_image"]); ?> alt='Slider Image' width='50'></p>
                    <div class="action-buttons">
                        <a href='game_management/game_form.php?id=<?php echo $row["id"] ?>' class='edit'><i
                                class='fa-solid fa-pencil'></i></a>
                        <a href="#" class="delete" onclick="confirmDelete(<?php echo $row['id']; ?>)">
                            <i class="fas fa-trash-alt"></i>
                        </a>
                        <a href='game_management/view_game.php?id=<?php echo $row["id"] ?>' class='view'><i
                                class="fa-solid fa-file-lines"></i></a>
                        <button class='view-slots-btn' data-game-id='<?php echo $row["id"]; ?>'><i
                                class="fa-solid fa-eye"></i></button>
                    </div>
                </div>
            </div>
            <?php endwhile; ?>
        </div>
        <div class="pagination">
            <?php if ($page > 1) : ?>
            <a
                href="?page=<?php echo $page - 1; ?>&search=<?php echo $searchTerm; ?>&recordsPerPage=<?php echo $recordsPerPage; ?>"><i
                    class="fa-solid fa-arrow-left-long"></i></a>
            <?php endif; ?>
            <?php for ($i = 1; $i <= $totalPages; $i++) : ?>
            <a href="?page=<?php echo $i; ?>&search=<?php echo $searchTerm; ?>&recordsPerPage=<?php echo $recordsPerPage; ?>"
                <?php echo ($page == $i) ? 'class="active"' : ''; ?>><?php echo $i; ?></a>
            <?php endfor; ?>
            <?php if ($page < $totalPages) : ?>
            <a
                href="?page=<?php echo $page + 1; ?>&search=<?php echo $searchTerm; ?>&recordsPerPage=<?php echo $recordsPerPage; ?>"><i
                    class="fa-solid fa-arrow-right-long"></i></a>
            <?php endif; ?>
        </div>
        <div id="slotModal" class="modal">
            <div class="modal-content">
                <div class="pd">
                    <span class="close-popup"><i class="fa-solid fa-xmark"></i></span>
                    <h2>All Slots</h2>
                </div>
                <div id="slotsContainer" class="modal-slots-container">Loading...</div>
            </div>
        </div>
        <div id="overlay" class="overlay"></div>
    </div>
    <script>
        function confirmDelete(gameId) {
            if (confirm("Are you sure you want to delete this game?")) {
                var url = "game_management/delete_game.php?id=" + gameId;
            }
        }
    $(document).ready(function() {
        // Function to perform search and update results
        function performSearch(searchTerm) {
            const recordsPerPage = $('#recordsPerPage').val();
            const page = 1; // Reset to first page on new search
            
            // Update hidden search fields
            $('#hiddenSearch').val(searchTerm);
            $('#hiddenSearchMobile').val(searchTerm);
            
            // Submit the form to refresh the page with new search results
            $('form').first().submit();
        }

        // Desktop search - trigger on input with 300ms delay
        var searchTimer;
        $('#searchField').on('input', function() {
            clearTimeout(searchTimer);
            searchTimer = setTimeout(function() {
                const searchTerm = $('#searchField').val();
                performSearch(searchTerm);
            }, 600);
        });

        // Mobile search - trigger on input with 300ms delay
        $('#searchFieldMobile').on('input', function() {
            clearTimeout(searchTimer);
            searchTimer = setTimeout(function() {
                const searchTerm = $('#searchFieldMobile').val();
                performSearch(searchTerm);
            }, 600);
        });

        // Clear search
        $('#clearLink').click(function() {
            $('#searchField').val('');
            performSearch('');
        });

        $('#clearLinkMobile').click(function() {
            $('#searchFieldMobile').val('');
            performSearch('');
        });

        

        $(".view-slots-btn").on("click", function() {
            var gameId = $(this).attr("data-game-id");
            $.ajax({
                url: "fetch_slots.php",
                type: "POST",
                data: {
                    game_id: gameId
                },
                dataType: "json",
                success: function(response) {
                    if (response.error) {
                        $("#slotsContainer").html("<p>" + response.error + "</p>");
                    } else {
                        var slotsHtml = response.slots.map(slot => {
                            return `<span class="modal-slot-item">${slot.trim()}</span>`;
                        }).join("");
                        $("#slotsContainer").html(slotsHtml);
                    }
                    $("#slotModal").show();
                    $("#overlay").show();
                    $("body").css("overflow", "hidden");
                },
                error: function(xhr, status, error) {
                    console.error("AJAX Error:", status, error);
                    alert("Failed to fetch slots.");
                }
            });
        });
        $(".close-popup, #overlay").on("click", function() {
            $("#slotModal").hide();
            $("#overlay").hide();
            $("body").css("overflow", "auto");
        });
    });
    </script>
</body>
</html>
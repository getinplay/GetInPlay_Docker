<?php
// Database connection
include('connect_database.php');

// Initialize search term
$searchTerm = '';
if (isset($_GET['search'])) {
    $searchTerm = $_GET['search'];
}

// Pagination variables
$recordsPerPage = isset($_GET['recordsPerPage']) ? (int)$_GET['recordsPerPage'] : 5;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$offset = ($page - 1) * $recordsPerPage;

// Fetch total number of records
$totalRecordsQuery = "SELECT COUNT(*) as total 
                      FROM register r
                      LEFT JOIN membership m ON r.membership_id = m.id
                      WHERE r.deleteval = 1";

if (!empty($searchTerm)) {
    $totalRecordsQuery .= " AND (";
    $searchFields = ["r.full_name", "r.email", "r.phone_no", "r.username", "m.name"];
    $conditions = [];

    foreach ($searchFields as $field) {
        $conditions[] = "$field LIKE '%$searchTerm%'";
    }
    $conditions[] = "r.gender = '$searchTerm'";
    $totalRecordsQuery .= implode(" OR ", $conditions) . ")";
}

$totalRecordsResult = $conn->query($totalRecordsQuery);
$totalRecords = $totalRecordsResult->fetch_assoc()['total'];
$totalPages = ceil($totalRecords / $recordsPerPage);
$showpagesec = $totalRecords > 0;

// Fetch user data with JOIN on membership table
$sql = "SELECT r.*, m.name AS membership_name 
        FROM register r
        LEFT JOIN membership m ON r.membership_id = m.id
        WHERE r.deleteval = 1";

if (!empty($searchTerm)) {
    $sql .= " AND (";
    $searchFields = ["r.full_name", "r.email", "r.phone_no", "r.username", "m.name"];
    $conditions = [];

    foreach ($searchFields as $field) {
        $conditions[] = "$field LIKE '%$searchTerm%'";
    }
    $conditions[] = "r.gender = '$searchTerm'";
    $sql .= implode(" OR ", $conditions) . ")";
}

$sql .= " ORDER BY r.id DESC LIMIT $offset, $recordsPerPage";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Management</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/navbar.css">
    <link rel="stylesheet" href="css/user_management.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
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
                <a href="user_management/user_form.php" style="text-decoration:none; color:white">
                    <div class="btn1">
                        <div><i class="fa-solid fa-user-plus"></i></div>
                        <div style="font-weight: bold">ADD USER</div>
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
                    <a href="user_management/user_form.php" style="text-decoration:none; color:white">
                        <div class="btn1">
                            <div><i class="fa-solid fa-user-plus"></i></div>
                            <div style="font-weight: bold">ADD USER</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>

        <div class="tablearea" id="searchResults">
            <?php if ($result->num_rows > 0) : ?>
            <!-- Desktop Table View -->
            <div class="desktop-view">
                <table border="1">
                    <tr>
                        <th>Action</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Phone no</th>
                        <th>Username</th>
                        <th>Membership</th>
                    </tr>
                    <?php while ($row = $result->fetch_assoc()) : ?>
                    <tr>
                        <td class="action-buttons">
                            <a href="user_management/user_form.php?id=<?php echo $row['id']; ?>" class="edit"><i
                                    class="fa-solid fa-pencil"></i></a>
                            <a href="#" class="delete" onclick="confirmDelete(<?php echo $row['id']; ?>)"><i
                                    class="fas fa-trash-alt"></i></a>
                            <a href="user_management/view_user.php?id=<?php echo $row['id']; ?>" class="view"><i
                                    class="fa-solid fa-file-lines"></i></a>
                        </td>
                        <td class="sametd"><?php echo $row['full_name']; ?></td>
                        <td class="sametd"><?php echo $row['email']; ?></td>
                        <td class="sametd"><?php echo ($row['gender'] === 'Other') ? 'N/A' : $row['gender']; ?></td>
                        <td class="sametd"><?php echo $row['phone_no']; ?></td>
                        <td class="sametd"><?php echo $row['username']; ?></td>
                        <td class="sametd"><?php echo $row['membership_name']; ?></td>
                    </tr>
                    <?php endwhile; ?>
                </table>
            </div>

            <!-- Mobile and Tablet Card View -->
            <div class="mobile-view">
                <?php
                // Reset the result pointer to reuse the data
                $result->data_seek(0);
                while ($row = $result->fetch_assoc()) : ?>
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title"><?php echo $row['full_name']; ?></h5>
                        <p class="card-text"><strong>Email:</strong> <?php echo $row['email']; ?></p>
                        <p class="card-text"><strong>Gender:</strong>
                            <?php echo ($row['gender'] === 'Other') ? 'N/A' : $row['gender']; ?></p>
                        <p class="card-text"><strong>Phone:</strong> <?php echo $row['phone_no']; ?></p>
                        <p class="card-text"><strong>Username:</strong> <?php echo $row['username']; ?></p>
                        <p class="card-text"><strong>Membership:</strong> <?php echo $row['membership_name']; ?></p>
                        <div class="action-buttons">
                            <a href="user_management/user_form.php?id=<?php echo $row['id']; ?>" class="edit"><i
                                    class="fa-solid fa-pencil"></i></a>
                            <a href="#" class="delete" onclick="confirmDelete(<?php echo $row['id']; ?>)"><i
                                    class="fas fa-trash-alt"></i></a>
                            <a href="user_management/view_user.php?id=<?php echo $row['id']; ?>" class="view"><i
                                    class="fa-solid fa-file-lines"></i></a>
                        </div>
                    </div>
                </div>
                <?php endwhile; ?>
            </div>

            <!-- Pagination Links -->
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
            <?php else : ?>
            <p>No records found!!</p>
            <?php endif; ?>
        </div>
    </div>

    <script>
    $(document).ready(function() {
        // Function to perform search and update results
        function performSearch(searchTerm) {
            const recordsPerPage = $('#recordsPerPage').val();
            const page = 1; // Reset to first page on new search
            
            // Update hidden search fields
            $('#hiddenSearch').val(searchTerm);
            $('#hiddenSearchMobile').val(searchTerm);
            
            $.ajax({
                url: window.location.pathname,
                type: 'GET',
                data: {
                    search: searchTerm,
                    recordsPerPage: recordsPerPage,
                    page: page
                },
                success: function(data) {
                    // Extract just the results portion from the response
                    const tempDiv = $('<div>').html(data);
                    const resultsHtml = tempDiv.find('#searchResults').html();
                    $('#searchResults').html(resultsHtml);
                }
            });
        }

        // Desktop search
        $('#searchField').on('input', function() {
            const searchTerm = $(this).val();
            performSearch(searchTerm);
        });

        // Mobile search
        $('#searchFieldMobile').on('input', function() {
            const searchTerm = $(this).val();
            performSearch(searchTerm);
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

        // Pagination handling
        $(document).on('click', '.pagination a', function(e) {
            e.preventDefault();
            const page = $(this).attr('href').split('page=')[1];
            const searchTerm = $('#searchField').val() || $('#searchFieldMobile').val();
            const recordsPerPage = $('#recordsPerPage').val() || $('#recordsPerPageMobile').val();
            
            $.ajax({
                url: window.location.pathname,
                type: 'GET',
                data: {
                    search: searchTerm,
                    recordsPerPage: recordsPerPage,
                    page: page
                },
                success: function(data) {
                    const tempDiv = $('<div>').html(data);
                    const resultsHtml = tempDiv.find('#searchResults').html();
                    $('#searchResults').html(resultsHtml);
                    window.scrollTo(0, 0);
                }
            });
        });
    });

    function confirmDelete(userId) {
        if (confirm("Are you sure you want to delete this user?")) {
            window.location.href = "user_management/delete_user.php?id=" + userId;
        }
    }
    </script>
</body>
</html>
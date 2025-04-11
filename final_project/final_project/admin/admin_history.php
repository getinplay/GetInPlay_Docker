<?php
session_start();
require_once __DIR__ . '/../load_env.php';

// Use the variables
$appUrl = getenv('APP_URL');
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Booking History</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>
  <link rel="stylesheet" href="css/navbar.css" />
  <link rel="stylesheet" href="css/admin_history.css" />
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
  <?php include "navbar.php"; ?>

  <div class="container">
    <h1>Booking History</h1>

    <div class="controls">
      <div class="search-container">
        <div class="search-input">
          <input type="text" id="search" placeholder="Search bookings..." />
          <i class="fas fa-times clear-icon"></i>
        </div>
      </div>
      <div class="tabs">
        <div class="tab active" data-view="upcoming">Upcoming Bookings</div>
        <div class="tab" data-view="past">Past Bookings</div>
        <div class="tab" data-view="canceled">Cancelled Bookings</div>
      </div>
      <div class="records-per-page">
        <label for="records">Show</label>
        <select id="records">
          <option value="12" selected>12</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <label for="records">entries</label>
      </div>
    </div>

    <div class="cards-container" id="history-data"></div>
    <div id="pagination"></div>
  </div>

  <script>
    $(document).ready(function () {
      let currentView = 'upcoming';
      let allData = { upcoming: [], past: [], canceled: [] };
      let currentPage = 1;
      let itemsPerPage = parseInt($('#records').val());
      let totalPages = 1;
      const apiUrl = `<?=$appUrl?>/admin_history.php`;

      loadData();

      function loadData() {
        $.ajax({
          url: apiUrl,
          method: 'GET',
          dataType: 'json',
          success: function (response) {
            if (response.status === 'success') {
              allData = {
                upcoming: response.upcoming || [],
                past: response.pastdata || [],
                canceled: response.cancle || []
              };
              updateDisplay();
            } else {
              $('#history-data').html('<div class="no-results">Error loading data</div>');
            }
          },
          error: function () {
            $('#history-data').html('<div class="no-results">Error connecting to server</div>');
          }
        });
      }

      function updateDisplay() {
        const searchQuery = $('#search').val().toLowerCase();
        const filteredData = allData[currentView].filter(item => {
          return Object.values(item || {}).some(val =>
            String(val).toLowerCase().includes(searchQuery)
          );
        });

        totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
        currentPage = Math.min(currentPage, totalPages);

        const start = (currentPage - 1) * itemsPerPage;
        const paginatedData = filteredData.slice(start, start + itemsPerPage);

        renderCards(paginatedData);
        renderPagination();
      }

      function renderCards(data) {
        let cards = '';
        if (data.length > 0) {
          data.forEach(booking => {
            let statusClass = currentView;
            let statusText = currentView === 'upcoming' ? 'Upcoming' :
                             currentView === 'past' ? 'Completed' : 'Cancelled';

            cards += `
              <div class="card">
                <div class="card-header">
                  <span class="username">Booking ID: #${booking.id || 'N/A'}</span>
                  <span class="status ${statusClass}">${statusText}</span>
                </div>
                <div class="card-body">
                  <div class="row"><span class="label">Username</span><span class="value">${booking.username || 'N/A'}</span></div>
                  <div class="row"><span class="label">Email</span><span class="value">${booking.email || 'N/A'}</span></div>
                  <div class="row"><span class="label">Phone</span><span class="value">${booking.phone_no || 'N/A'}</span></div>
                  <div class="row"><span class="label">Game</span><span class="value">${booking.game_name || 'N/A'}</span></div>
                  <div class="row"><span class="label">Slot</span><span class="value">${booking.slot || 'N/A'}</span></div>
                  <div class="row"><span class="label">Date</span><span class="value">${booking.book_date || 'N/A'}</span></div>
                </div>
              </div>`;
          });
        } else {
          cards = '<div class="no-results">No bookings found</div>';
        }

        $('#history-data').html(cards);
      }

      function renderPagination() {
        let pagination = '';

        pagination += `<button class="page-item prev" ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">
          <i class="fa-solid fa-arrow-left-long"></i></button>`;

        if (totalPages <= 6) {
          for (let i = 1; i <= totalPages; i++) {
            pagination += `<button class="page-item ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
          }
        } else {
          pagination += `<button class="page-item ${1 === currentPage ? 'active' : ''}" data-page="1">1</button>`;
          if (currentPage > 3) pagination += '<span class="dots">...</span>';

          let startPage = Math.max(2, currentPage - 2);
          let endPage = Math.min(totalPages - 1, currentPage + 2);
          for (let i = startPage; i <= endPage; i++) {
            pagination += `<button class="page-item ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
          }

          if (currentPage < totalPages - 2) pagination += '<span class="dots">...</span>';
          pagination += `<button class="page-item ${totalPages === currentPage ? 'active' : ''}" data-page="${totalPages}">${totalPages}</button>`;
        }

        pagination += `<button class="page-item next" ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">
          <i class="fa-solid fa-arrow-right-long"></i></button>`;

        $('#pagination').html(pagination);
      }

      // Event listeners
      $('.tab').on('click', function () {
        currentView = $(this).data('view');
        currentPage = 1;
        $('.tab').removeClass('active');
        $(this).addClass('active');
        updateDisplay();
      });

      $('#search').on('input', function () {
        currentPage = 1;
        updateDisplay();
      });

      $('.clear-icon').on('click', function () {
        $('#search').val('').trigger('input');
      });

      $('#records').on('change', function () {
        itemsPerPage = parseInt($(this).val());
        currentPage = 1;
        updateDisplay();
      });

      $(document).on('click', '.page-item:not(.disabled)', function () {
        currentPage = parseInt($(this).data('page'));
        updateDisplay();
      });
    });
  </script>
</body>
</html>

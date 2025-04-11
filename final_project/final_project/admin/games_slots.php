<?php
require_once __DIR__ . '/../load_env.php';
$appUrl = getenv('APP_URL');
$imageUrl = getenv('IMAGE_URL');
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Games Page</title>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <link rel="stylesheet" href="css/navbar.css">
  <link rel="stylesheet" href="css/game_slot.css">
</head>
<body>
  <?php include 'navbar.php'; ?>

  <div class="container">
    <h1 class="text-center display-4 fw-bold" style="color: var(--primary-red);">
      <i class="fas fa-gamepad me-3"></i>Games
    </h1>

    <!-- Search Bar -->
    <div class="search-container">
      <div class="search-wrapper">
        <i class="fas fa-search search-icon"></i>
        <input type="text" id="searchInput" class="search-bar" placeholder="Search games...">
        <i class="fas fa-times clear-icon" id="clearSearch"></i>
      </div>
    </div>

    <!-- Games Grid -->
    <div class="games-grid" id="gamesContainer">
      <!-- Game cards will be appended here -->
    </div>
    
    <!-- Optional: Placeholder for no search results message -->
    <div id="noResultsMessage" class="no-results" style="display:none;"></div>
  </div>

  <script>
    $(document).ready(function() {
      const apiUrl = `<?=$appUrl?>/game_data.php`; 
      const imageUrl = "<?php echo $imageUrl; ?>";

      // Function to build game cards
      function buildGameCards(games) {
        let html = '';
        if (games && games.length) {
          $.each(games, function(index, game) {
            html += `
              <a href="slots.php?game_id=${game.id}" class="game-card">
                  <div class="card-image">
                      <img src="${imageUrl + game.card_image}" alt="${game.name}" loading="lazy">
                  </div>
                  <div class="card-content">
                      <h3 class="game-title">${game.name.toUpperCase()}</h3>
                      <div class="price-tag">
                          <span>₹${game.half_hour} /30mins</span>
                          <span>₹${game.hour} /1hr</span>
                      </div>
                  </div>
              </a>
            `;
          });
        } else {
          html = '<div class="no-games"><h3>No games available at the moment</h3></div>';
        }
        $('#gamesContainer').html(html);
      }

      // AJAX call to fetch game data from API
      $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function(response) {
          // Check if the response contains the expected data structure.
          // You may need to adjust response access based on your API's JSON structure.
          if(response && Array.isArray(response)) {
            buildGameCards(response);
          } else if (response && response.data) {
            // If your API wraps data inside an object
            buildGameCards(response.data);
          } else {
            buildGameCards([]);
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error("API Request Failed:", textStatus, errorThrown);
          $('#gamesContainer').html('<div class="no-games"><h3>Error loading games data.</h3></div>');
        }
      });

      // Live Search Functionality
      $('#searchInput').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        const $games = $('.game-card');
        let anyVisible = false;

        $games.each(function() {
          const gameName = $(this).find('.game-title').text().toLowerCase();
          const isVisible = gameName.includes(searchTerm);
          $(this).toggle(isVisible);
          if (isVisible) { anyVisible = true; }
        });

        if (!anyVisible && searchTerm.length > 0) {
          $('#noResultsMessage').html(`<p>No games found matching "${searchTerm}"</p>`).show();
        } else {
          $('#noResultsMessage').hide();
        }
      });

      // Clear Search Input functionality
      $('#clearSearch').on('click', function() {
        $('#searchInput').val('').trigger('input');
        $(this).hide();
      });

      // Show/hide clear button on input
      $('#searchInput').on('input', function() {
        $('#clearSearch').toggle($(this).val().length > 0);
      }).trigger('input');
    });
  </script>
</body>
</html>

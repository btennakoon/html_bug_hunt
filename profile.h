<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile page - SocialBook</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/3008708a75.js" crossorigin="anonymous"></script>
</head>
<body>

    <nav>
        <div class="nav-left">
            <img src="images/logo.png" class="logo">
            <ul>
                <li><img src="images/notification.png"></li>
                <li><img src="images/inbox.png"></li>
                <li><img src="images/video.png"></li>
            </ul>
        </div>
        <div class="nav-right">
           
           <div class="search-box">
               <img src="images/search.png">
               <input type="text" placeholder="Search">
           </div>
           <div class="nav-user-icon online" onclick="settingsMenuToggle()">
              <img src="images/profile-pic.png" >
           </div>
           
        </div>
        <!-------------settings menu-------------->
        <div class="settings-menu">

            <div id="dark-btn">
                <span></span>
            </div>

            <div class="settings-menu-inner">
                <div class="user-profile">
                    <img src="images/profile-pic.png">
                    <div>
                        <p>John Nicholson</p>
                        <a href="#">See your profile</a>
                    </div>
                </div>
                <hr>
                <div class="user-profile">
                    <img src="images/feedback.png">
                    <div>
                        <p>Give Feedback</p>
                        <a href="#">Help us to improve the new design</a>
                    </div>
                </div>
                <hr>
                <div class="settings-links">
                    <img src="images/setting.png" class="settings-icon">
                    <a href="#">Settings & Privacy <img src="images/arrow.png" width="10px"></a>
                </div>
                <div class="settings-links">
                    <img src="images/help.png" class="settings-icon">
                    <a href="#">Help & Support <img src="images/arrow.png" width="10px"></a>
                </div>
                <div class="settings-links">
                    <img src="images/display.png" class="settings-icon">
                    <a href="#">Display & Accessibility <img src="images/arrow.png" width="10px"></a>
                </div>
                <div class="settings-links">
                    <img src="images/logout.png" class="settings-icon">
                    <a href="#">Logout <img src="images/arrow.png" width="10px"></a>
                </div>

            </div>
            
        </div>


</nav>

<!----------profile page----------->


<div class="profile-container">
     <img src="images/cover.png" class="cover-img">
     <div class="profile-details">
        <div class="pd-left">
            <div class="pd-row">
                <img src="images/profile.png">
                <div>
                    <h3>Jack Nicholson</h3>
                    <p>120 Friends - 20 mutual</p>
                </div>
            </div>
        </div>
        <div class="pd-right"></div>
     </div>
</div>





<div class="footer">
    <p>Copyright 2022 - Kelum Herath</p>
</div>
<script src="script.js"></script>
</body>
</html>

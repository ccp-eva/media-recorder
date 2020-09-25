<?php
  // Moves uploaded video file to a uploads folder
  $target_path = "uploads/" . basename($_FILES["vidfile"]["name"] . ".mp4");
  move_uploaded_file($_FILES["vidfile"]["tmp_name"], $target_path );
?>
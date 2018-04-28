<?php
  session_start();
  $server = "localhost";
  $username = "root";
  $password = "";
  $db = "rain";

  $conn = new mysqli($server, $username, $password, $db);

  $ip  = $_POST['ip'];
  $city = $_POST['city'];
  $country = $_POST['country'];

  $sql = 'SELECT * FROM data WHERE ip="'.$ip.'"';
  $results = $conn->query($sql);
  if($results->num_rows > 0){
    $amount = ($results->fetch_assoc())['amount'];
    $amount++;
    $sql = 'UPDATE data SET amount="'.$amount.'" WHERE ip="'.$ip.'"';
    $results = $conn->query($sql);
    if($conn->error) echo $conn->error;
  }
  else{
    $sql = 'INSERT INTO data (ip, city, country, amount) VALUES ("'.$ip.'", "'.$city.'", "'.$country.'", 1)';
    $results = $conn->query($sql);
    if($conn->error) echo $conn->error;
  }
?>

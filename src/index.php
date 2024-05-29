<?php
$serverName = "database-container";
$databaseName = "php_mysql_db";
$dbUsername = "php_test_user";  
$dbPassword = "php_user_pass"; 

// Create a connection to MySQL service
$conn = mysqli_connect($serverName, $dbUsername, $dbPassword, $databaseName);

// Check connection status and log the message
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

echo "Connected successfully to MySQL";

function test()
{
  static $count = 0;
  echo $count;
}

test();

// Close connection
mysqli_close($conn);
?>

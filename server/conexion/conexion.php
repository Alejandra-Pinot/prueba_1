<?php 
    $link = pg_connect("host=localhost dbname=test user=root password=root options='--client_encoding=UTF8'");
    if(!$link) {
        echo "Error";
        die();
    }
?>

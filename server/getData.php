<?php 
include_once './conexion/conexion.php';
include_once 'headers.php';

$select="SELECT motivo, des_motivo, estado, tipo FROM motivos_es_gt ORDER BY motivo ASC";
$query=pg_query($link,$select);
if (!$query) {
    echo json_encode(array('error'=>"Error al obtener la información."));
}else{
    $data=pg_fetch_all($query);
    //print_r($data);
    echo json_encode(array('success'=>"Información consultada con éxito.", 'data'=>$data));
}
?>
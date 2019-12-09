<?php 
include_once './conexion/conexion.php';
include_once 'headers.php';

$datos = json_decode(file_get_contents("php://input"),true);
$asc=$datos['asc'];

$orden=($asc)?"ASC":"DESC";

$select="SELECT motivo, des_motivo, estado, tipo FROM motivos_es_gt ORDER BY des_motivo ".$orden;
$query=pg_query($link,$select);

if(!$query){
    echo json_encode(array('error'=>"Error al consultar la información."));
}else{
    $data=pg_fetch_all($query);
    echo json_encode(array('success'=>"Información consultada com éxito.", 'data'=>$data));
}

?>
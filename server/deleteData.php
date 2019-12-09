<?php 
include_once './conexion/conexion.php';
include_once 'headers.php';

$datos = json_decode(file_get_contents("php://input"),true);
$motivo=$datos['motivo'];

$delete="DELETE FROM motivos_es_gt WHERE motivo=".$motivo;
$query=pg_query($link,$delete);

if(!$query){
    echo json_encode(array('error'=>"Error al eliminar el elemento."));
}else{
    echo json_encode(array('success'=>"Elemento eliminado con éxito.", 'data'=>$motivo));
}

?>
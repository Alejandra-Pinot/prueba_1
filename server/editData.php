<?php 
include_once './conexion/conexion.php';
include_once 'headers.php';

$data = json_decode(file_get_contents("php://input"),true);
$element=$data['element'];
$motivo=$element['motivo'];
$des_motivo=$element['des_motivo'];
$estado=strtoupper($element['estado']);
$tipo=strtoupper($element['tipo']);

$update="UPDATE motivos_es_gt  SET des_motivo='$des_motivo', estado='$estado', tipo='$tipo' WHERE motivo=".$motivo;
$query=pg_query($link, $update);

if(!$query){
    echo json_encode(array('error'=>"Error al actualizar el registro."));
}else{
    echo json_encode(array('success'=>"Datos actualizados con éxito."));
}

?>
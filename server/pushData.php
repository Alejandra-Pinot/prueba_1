<?php 
include_once './conexion/conexion.php';
include_once 'headers.php';

$data = json_decode(file_get_contents("php://input"),true);

//Creo la llave primaria consultando el valor máximo del campo motivos
$select="SELECT motivo FROM motivos_es_gt WHERE motivo=(SELECT MAX(motivo) FROM motivos_es_gt)";
$query=pg_query($link, $select);

if(!$query){
    echo json_encode(array('error'=>"Error al crear la PK."));die();
}else{
    $array=pg_fetch_assoc($query);
    $index=$array['motivo']+1;
    $element=$data['element'];
    //$motivo=$element['motivo'];
    $des_motivo=$element['des_motivo'];
    $estado=strtoupper($element['estado']);
    $tipo=strtoupper($element['tipo']);

    $insert="INSERT INTO motivos_es_gt (motivo, des_motivo,estado,tipo) VALUES ($index, '$des_motivo', '$estado', '$tipo')";
    $query=pg_query($link, $insert);
    
    if(!$query){
        echo json_encode(array('error'=>"Error al crear el registro"));
    }else{
        echo json_encode(array('success'=>'Registro creado con éxito.'));
    }
    
}




?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Line Tv</title>
    <!-- Asegúrate de que la ruta sea correcta, con el '/' al principio -->
    <link rel="stylesheet" href="/dist/css/index.css">
</head>
<body>

    <?php 
    include 'templates/header.php';
    ?>

    <main class="contenido-principal contenedor">
        
        <h1 class="texto1">Descubre y disfruta</h1>
        <h2 class="texto2">Servicio de televisión por internet via Streaming</h2>
    
        <?php 
        include 'templates/features.php';
        ?>
    </main>
    
    <div class="encontrar">
    <?php 
        include 'templates/encontrar.php';
    ?>
    </div>


    
</body>



</html>

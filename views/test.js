<form method="POST" action="/products/create" enctype="multipart/form-data">
    <input name="name" placeholder="nombre" type="text">
    <div>
        <input type="radio" id="opcion1" name="opcion" value="Comprador">
        <label for="opcion1">Comprador</label>
        <br>
        <input type="radio" id="opcion2" name="opcion" value="Administrador">
        <label for="opcion2">Administrador</label>
    </div>
    <input name="description" placeholder="descripcion" type="text">
    <input name="price" placeholder="precio" type="number">
    <input name="image" type="file">
    <button type="submit">CREATE</button> 
</form>
const getUsurioById = (id, callback) => {
    const usuario = {
        id,
        nombre: 'Gastón'
    }

    setTimeout(()=> {
        callback(usuario)
    },1500);
}

getUsurioById(10,(usuario) => {
    console.log(`Hola ${usuario.nombre}`);
});
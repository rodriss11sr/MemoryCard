
function ListCreator() {
    const [nombre, setNombre] = React.useState("");
    const JUEGOS_DATA = [];

    const handleCrear = () => {
        if (nombre.trim() === "") {
            alert("El nombre de la lista no puede estar vacío.");
            return;
        }
        //TODO: Agregar lógica para seleccionar juegos y asociarlos a la lista
        console.log("Lista creada:", { nombre, juegos: JUEGOS_DATA });
        alert(`Lista "${nombre}" creada con ${JUEGOS_DATA.length} juegos.`);
    };

    

};
export default ListCreator;
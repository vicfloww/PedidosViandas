document.addEventListener("DOMContentLoaded", function () {
    const diasMes = 30; // tomo como ejemplo un mes de 30 días.

    // bebidas:
    const bebidas = [
        "Agua Sin Gas",
        "Agua con Gas",
        "Jugo natural de Naranja",
        "Coca Zero",
        "Coca Cola Clásica",
        "Sprite Zero",
        "Sprite Clásica",
        "Fanta Zero",
        "Fanta Clásica",
    ];

    // plato principal:
    const platosPrincipales = [
        "Clásicos - Milanesa a la napolitana con Papas",
        "Clásicos - Tarta de Jamón y Queso",
        "Clásicos - Pizza de jamón y morrones",
        "Clásicos - Ravioles con Salsa Boloñesa",
        "Vegetariano - Ensalada de Quinoa con Palta, Queso y Tomate",
        "Vegetariano - Tacos de coliflor",
        "Vegetariano - Risotto de champiñones con espinacas",
        "Vegano - Curry de lentejas con arroz integral",
        "Vegano - Wrap vegano con hummus, verduras y salsa tahini",
        "Vegano - Hamburguesa de porotos negros con guacamole y chips de batata",
        "Keto - Filete de salmón al horno con brócoli al vapor",
        "Keto - Ensalada César con pollo a la parrilla",
        "Keto - Muslos de pollo al horno con espárragos y Bacon",
    ];

    // postres:
    const postres = [
        "Clásicos - Helado de vainilla",
        "Clásicos - Tarta de frutillas",
        "Clásicos - Mousse de chocolate",
        "Clásicos - Brownies de chocolate con nueces",
        "Vegano - Mousse de chocolate hecho con Paltas",
        "Vegetariano - Crumble de frutas, avena y nueces",
        "Vegetariano - Crepes rellenos de crema pastelera y frutas frescas",
        "Vegano - Trufas de cacao y almendras",
        "Vegano - Torta de zanahoria",
        "Vegano - Helado de plátano con trozos de chocolate y almendras",
        "Keto - Cheesecake con base de almendras",
        "Keto - Mousse de coco y chocolate sin azúcar",
        "Keto - Fresas con crema batida endulzada con stevia",
    ];

    const calendario = document.getElementById("calendario"); // elemento con el ID calendario
    const menu = document.getElementById("menu"); // elemento con el ID 'menu'
    const pedidoDia = document.getElementById("pedido-dia"); // elemento con el ID 'pedido-dia'
    const btnVolver = document.getElementById("btn-volver"); // elemento con el ID 'btn-volver'
    const btnVolverMenu = document.getElementById("btn-volver-menu"); // elemento con el ID 'btn-volver-menu'
    const btnCambiarPedido = document.getElementById("btn-cambiar-pedido"); // elemento con el ID 'btn-cambiar-pedido'
    const btnVolverPedido = document.getElementById("btn-volver-pedido"); // elemento con el ID 'btn-volver-pedido'

    let diaSeleccionado = null; // ariable diaSeleccionado en null

    // funcion para llenar un elemento select con las opciones dadas
    function llenarSelect(options, select) {
        options.forEach((option) => {
            const optionElement = document.createElement("option"); // crea un elemento <option>
            optionElement.textContent = option; // pone el texto del elemento <option> con la opción actual
            select.appendChild(optionElement); // agrega el elemento <option> al elemento select
        });
    }

    // funcion para mostrar el menu para un dia seleccionado
    function mostrarMenu(dia) {
        const pedidoGuardado = localStorage.getItem("pedido-" + dia);
        if (pedidoGuardado) {
            
            diaSeleccionado = dia; 
            mostrarPedido();
        } else {
            menu.classList.remove("hidden"); // saca la clase 'hidden' para mostrar el menu
            calendario.classList.add("hidden"); // pone la clase 'hidden' para ocultar el calendario
            diaSeleccionado = dia; // pone el día seleccionado en la variable diaSeleccionado
        }
    }

    // funcion para guardar el pedido para el día seleccionado en el localStorage
    function guardarPedido() {
        const bebidaSeleccionada = document.getElementById("select-bebidas").value; // Toma la bebida seleccionada
        const platoPrincipalSeleccionado = document.getElementById("select-platos").value; // Toma el plato principal seleccionado
        const postreSeleccionado = document.getElementById("select-postres").value; // Toma el postre seleccionado

        // crea un objeto con el pedido completo
        const pedido = {
            bebida: bebidaSeleccionada,
            platoPrincipal: platoPrincipalSeleccionado,
            postre: postreSeleccionado,
        };

        // guarda el pedido en el localStorage
        localStorage.setItem("pedido-" + diaSeleccionado, JSON.stringify(pedido));

        // mostrar el pedido
        mostrarPedido();
    }

    // función para mostrar el pedido guardado para un día seleccionado
    function mostrarPedido() {
        const pedidoGuardado = localStorage.getItem("pedido-" + diaSeleccionado); // Toma el pedido guardado del localStorage
        if (pedidoGuardado) {
            // SI hay un pedido guardado para el día seleccionado...
            const pedido = JSON.parse(pedidoGuardado); // pasa el pedido guardado de JSON a objeto

            // mueestra el detalle del pedido en el elemento pedidoDia
            pedidoDia.innerHTML = `
                <p>Bebida: ${pedido.bebida}</p>
                <p>Plato principal: ${pedido.platoPrincipal}</p>
                <p>Postre: ${pedido.postre}</p>
            `;

            pedidoDia.parentNode.classList.remove("hidden"); // saca la clase hidden para mostrar el detalle del pedido
            calendario.classList.add("hidden"); // pone la clase 'hidden' para ocultar el calendario
            menu.classList.add("hidden"); // pone la clase 'hidden' para ocultar el menu

            // cambia color a verde si hay un pedido guardado..
            const diaElement = calendario.querySelector(
                `.dia[data-dia="${diaSeleccionado}"]`
            ); // toma el elemento del día seleccionado en el calendario
            if (diaElement) {
                // SI tiene elemento....
                diaElement.classList.remove("dia-sin-pedido"); // saca la clase 'dia-sin-pedido'
                diaElement.classList.add("dia-pedido"); // agrega la clase 'dia-pedido'
            }
        }
    }

    // funcion para eliminar el pedido en el día seleccionado
    function eliminarPedido() {
        localStorage.removeItem("pedido-" + diaSeleccionado); // elimina el pedido del localStorage
        const diaElement = calendario.querySelector(
            `.dia[data-dia="${diaSeleccionado}"]`
        ); // toma el elemento del día en el calendario

        if (diaElement) {
            diaElement.classList.remove("dia-pedido"); // saca la clase 'dia-pedido'
            diaElement.classList.add("dia-sin-pedido"); // pone la clase 'dia-sin-pedido'
        }

        pedidoDia.innerHTML = ""; // borra el contenido del detalle del pedido
        pedidoDia.parentNode.classList.add("hidden"); // oculta el detalle del pedido
        calendario.classList.remove("hidden"); // muestra el calendario
        btnVolver.classList.add("hidden"); // oculta el botón de volver
    }

    // función para crear el calendario
    function generarCalendario() {
        for (let dia = 1; dia <= diasMes; dia++) {
            // itera sobre los días del mes

            const diaElement = document.createElement("div"); // crea un elemento <div> para el dia en el calendario
            diaElement.textContent = dia; // pone el número del día como texto del elemento <div>
            diaElement.classList.add("dia"); // pone la clase 'dia' al elemento
            diaElement.setAttribute("data-dia", dia); // pone el atributo 'data-dia' con el número del dia
            const pedidoGuardado = localStorage.getItem("pedido-" + dia); // toma el pedido guardado para el día actual

            if (pedidoGuardado) {
                // SI hay un pedido guardado...
                diaElement.classList.add("dia-pedido"); // pone clase 'dia-pedido'
            } else {
                diaElement.classList.add("dia-sin-pedido"); // pne la clase 'dia-sin-pedido'
            }
            diaElement.addEventListener("click", function () {
                //  evento click al elemento dia
                mostrarMenu(dia); // llama función para mostrar el menú para el día seleccionado
            });

            calendario.querySelector(".calendario-container").appendChild(diaElement); // agrega el elemento del día al calendario
        }
    }

    // llena los elementos select con las opciones de bebidas, platos principales y postres...
    llenarSelect(bebidas, document.getElementById("select-bebidas"));
    llenarSelect(platosPrincipales, document.getElementById("select-platos"));
    llenarSelect(postres, document.getElementById("select-postres"));

    // agrega un evento click al botón de guardar para llamar a la función guardarPedido
    document
        .getElementById("btn-guardar")
        .addEventListener("click", function () {
            guardarPedido();
            mostrarPedido();
        });


    // agrega un evento 'click' al botón de volver al menú para mostrar el calendario
    btnVolverMenu.addEventListener("click", function () {
        menu.classList.add("hidden");
        pedidoDia.innerHTML = ""; // limpia el contenido del detalle del pedido
        pedidoDia.parentNode.classList.add("hidden"); // oculta el detalle del pedido
        calendario.classList.remove("hidden"); // muestra el calendario
        btnVolver.classList.add("hidden"); // oculta el botón de volver
        

        // acctualiza el día en el calendario a verde si hay un pedido guardado
        const diaElement = calendario.querySelector(
            `.dia[data-dia="${diaSeleccionado}"]`
        ); // obtiene el elemento del día seleccionado en el calendario
        if (diaElement) {
            // SI se encuentra el elemento..
            diaElement.classList.add("dia-pedido"); // Agrega la clase 'dia-pedido'
            diaElement.classList.remove("dia-sin-pedido"); // Saca la clase 'dia-sin-pedido'
        }
    });
    btnVolverPedido.addEventListener("click", function () {
        pedidoDia.innerHTML = ""; //limpia el contenido del detalle del pedido
        pedidoDia.parentNode.classList.add("hidden"); // oculta el detalle del pedido
        calendario.classList.remove("hidden"); // muestra el calendario
        btnVolver.classList.add("hidden"); // oculta el botón de volver
    });

    // agrega un evento click al botón de cambiar pedido desde la página del pedido guardado para mostrar el menu
    btnCambiarPedido.addEventListener("click", function () {
        menu.classList.remove("hidden"); // sacala clase 'hidden' para mostrar el menú
        calendario.classList.add("hidden"); // agrega la clase 'hidden' para ocultar el calendario
        pedidoDia.parentNode.classList.add("hidden"); // oculta el detalle del pedido
        btnVolver.classList.add("hidden"); // oculta el botón de volver
    });

    // agrega un evento click al boton de eliminar pedido
    document
        .getElementById("btn-eliminar")
        .addEventListener("click", function () {
            eliminarPedido();
        });

    // genera el calendario al cargar la pagina
    generarCalendario();
});

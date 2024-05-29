function handle_disabled(select, content, opcion){
/* 
    Para habilitar/deshabilitar contenido y sus hijos de acuerdo a una opcion de select
    Params:
    select: html select donde se selecciona la opcion (ej. Student o Investigator)
    content: contenido html el cual se quiere deshabilitar y esconder de acuerdo a la opcion elegida de select (ej. input de Paper 2)
    opcion: opcion de select para deshabilitar/esconder content 
*/
    select.addEventListener('change', function(){
        const opcion_elegida = this.value;

        if (opcion_elegida === opcion){
            content.hidden = false;
            content.querySelectorAll('*').forEach(function(element){
                element.disabled = false;
            })
        } else {
            content.hidden = true;
            content.querySelectorAll('*').forEach(function(element){
                element.disabled = true;
            })
        }
    });
}

/* Habilitar/deshabilitar facturacion si es investigador/estudiante */
const tipo_de_inscripcion = document.getElementById('tipo_de_inscripcion');
const paper2 = document.getElementById('paper_2');
handle_disabled(tipo_de_inscripcion, paper2, 'Investigador');

/* Habilitar/deshabilitar facturacion de acuerdo la opcion si/no */
const generar_factura = document.getElementById('generar_factura');
const facturacion = document.getElementById('facturacion');
handle_disabled(generar_factura, facturacion, 'Si');

function mostrarAlerta(mensaje, error = null) {
    const alerta = document.createElement('P')
    alerta.textContent = mensaje
    if (error)
        alerta.classList.add('error')
    else
        alerta.classList.add('exito')

    const form = document.querySelector('.formulario')
    form.appendChild(alerta)
    // desaparecer el mensaje de error
    setTimeout(() => {
        alerta.remove()
    }, 3000)
    console.log(alerta)
}

function validarIsNum(input){
    const max_num = 4294967294; 
    if (isNaN(parseInt(input.value)) || input.value === '' || parseInt(input.value) < 1 || parseInt(input.value) > max_num){
        return false;
    } else {
        return true;
    }
}

function validarIsNumPaper2(input){
    /* Es necesario validar num_paper_2 por separado, ya que puede dejarlo vacio */
    if (input.value === '') {
        return true;
    }

    const max_num = 4294967294; 
    if (isNaN(parseInt(input.value)) || parseInt(input.value) < 1 || parseInt(input.value) > max_num){
        return false;
    } else {
        return true;
    }
}

function validarRFC(input){
    // Regex para validar RFC de México
    // https://es.stackoverflow.com/questions/31713/c%C3%B3mo-validar-un-rfc-de-m%C3%A9xico-y-su-digito-verificador
    const rfcRegex = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
    if (input.value.match(rfcRegex)) {
        return true;
    }else{
        return false;
    }
}

function validarCodigoPostal(input){
    /* Debe ser un numero, no puede estar vacio, y debe ser de tamaño 5*/
    if (isNaN(parseInt(input.value)) || input.value === '' || input.value.length !== 5){
        return false;
    }else{
        return true;
    }
}

/*  ARCHIVO 
    No puede ser vacio debe ser 1 archivo de RFC, y verificar tamaño 
    https://stackoverflow.com/questions/2966076/getting-file-size-in-javascript */
function getFileSize(archivo) {
    /* Calcula el tamaño del archivo en KB o MB */
    let fileSize = archivo.files[0].size.toString();

    if(fileSize.length < 7) 
        return `${Math.round(+fileSize/1024).toFixed(2)}kb`
    return `${(Math.round(+fileSize/1024)/1000).toFixed(2)}MB`
}

function validarArchivoNombreUnico(archivo1, archivo2){
    /* Verificar que el archivo de RFC sea unico */
    if (archivo1.files[0].name === archivo2.files[0].name){
        return false;
    }else{
        return true;
    }
}

function validarArchivo(archivo){
    /* Si el archivo pesa en MB, validar que sea menor de 3.00MB. Y también exista un archivo RFC adjuntado. */

    if (archivo.files.length === 0) {
        return false;
    }

    let archivo_size = getFileSize(archivo);
    if (archivo_size.includes('MB')){
        archivo_size = archivo_size.split('MB')[0];
        // console.log(archivo_size)
        if (parseInt(archivo_size) > 3.00){
            return false;
        } else {
            return true;
        }
    } else {
        // console.log(archivo_size)
        return true;
    }
}

function validarTexto(input){
    if (!isNaN(input.value) || input.value.length > 100 || input.value === ''){
        return false;
    }else{
        return true;
    }
}

function validarPaperIDSUnicos(paper1, paper2){
    if (paper1.value === paper2.value){
        return false;
    } else {
        return true;
    }
}

function clearFileInput(id) 
{ 
    /* Limpiar input de type file (si no se quiere facturacion se debe limpiar para no enviar nada) */
    var oldInput = document.getElementById(id); 

    var newInput = document.createElement("input"); 

    newInput.type = "file"; 
    newInput.id = oldInput.id; 
    // newInput.name = oldInput.name; 
    // newInput.className = oldInput.className; 
    // newInput.style.cssText = oldInput.style.cssText; 
    newInput.accept = oldInput.accept;

    oldInput.parentNode.replaceChild(newInput, oldInput); 
}

function clearTextFields(fields){
    /* Limpiar campos de texto */
    fields.forEach((field) => {
        field.value = '';
    });
}

const form = document.querySelector('.formulario')
form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    /* Inscripción */
    const tipo_de_inscripcion = document.getElementById('tipo_de_inscripcion');
    const num_paper_1 = document.getElementById('paper1');
    const num_paper_2 = document.getElementById('paper2');
    const num_folio = document.getElementById('num_folio');
    const archivo_ficha = document.getElementById('archivo_ficha');

    /* Facturación */
    const generar_factura = document.getElementById('generar_factura');
    const rfc = document.getElementById('rfc');
    const archivo_rfc = document.getElementById('archivo_rfc');
    const nombre_o_razon = document.getElementById('nombre_razon');
    const domicilio = document.getElementById('domicilio');
    const colonia = document.getElementById('colonia');
    const codigo_postal = document.getElementById('codigo_postal');
    const ciudad = document.getElementById('ciudad');
    const estado = document.getElementById('estado');

    let text_fields = [rfc, nombre_o_razon, domicilio, colonia, codigo_postal, ciudad, estado]
    let valido = true; // Bandera para saber si se puede enviar el formulario o no

    if (tipo_de_inscripcion.value === 'Student') {
        num_paper_2.value = ''
        /* 
            Validacion de campo de correo se realiza implicitamente en html input type=email 
            https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email
        */
        if (!validarIsNum(num_paper_1)) {
            mostrarAlerta('El valor de paper 1 no es valido...', true)
            valido = false;
        }

    } else {
        /* 
            Validacion de campo de correo se realiza implicitamente en html input type=email 
            https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email
        */
        if(!validarIsNum(num_paper_1)){
            mostrarAlerta('El valor de paper 1 no es valido...', true)
            valido = false;
        }
        if(!validarIsNumPaper2(num_paper_2)){
            mostrarAlerta('El valor de paper 2 no es valido...', true)
            valido = false;
        }
        if(!validarPaperIDSUnicos(num_paper_1, num_paper_2)){
            mostrarAlerta('El valor de paper 1 y paper 2 no son unicos...', true)
            valido = false;
        }
    }

    if (!validarIsNum(num_folio)) {
        mostrarAlerta('El número de folio no es valido...', true)
        valido = false;
    }

    if(!validarArchivo(archivo_ficha)){
        mostrarAlerta('El archivo ficha de depósito no es valido...', true);
        valido = false;
    }

    if (generar_factura.value === 'Si'){
        if (!validarRFC(rfc)) {
            mostrarAlerta('El campo RFC no es valido...', true);
            valido = false;
        }
        if (!validarArchivo(archivo_rfc)) {
            mostrarAlerta('El campo archivo de RFC no es valido...', true);
            valido = false;
        }
        if(!validarTexto(nombre_o_razon)){
            mostrarAlerta('El campo nombre o razon no es valido...', true);
            valido = false;
        }
        if(!validarTexto(domicilio)){
            mostrarAlerta('El campo domicilio no es valido...', true);
            valido = false;
        }
        if(!validarTexto(colonia)){
            mostrarAlerta('El campo colonia no es valida...', true);
            valido = false;
        }
        if(!validarCodigoPostal(codigo_postal)){
            mostrarAlerta('El campo codigo postal no es valida...', true);
            valido = false;
        }
        if(!validarTexto(ciudad)){
            mostrarAlerta('El campo ciudad no es valida...', true);
            valido = false;
        }
        if(!validarTexto(estado)){
            mostrarAlerta('El campo estado no es valido...', true);
            valido = false;
        }
        if(!validarArchivoNombreUnico(archivo_ficha, archivo_rfc)){
            mostrarAlerta('El archivo de RFC es el mismo que el archivo de ficha...', true);
            valido = false;
        }
    } else {
        clearTextFields(text_fields);
        clearFileInput('archivo_rfc');
    }


    if (valido) {
        console.log('Enviando formulario...');
        mostrarAlerta('Formulario enviado con exito!', false);
        let input_fields = form.getElementsByTagName('input');
        for (let i = 0; i < input_fields.length; i++) {
            console.log(`${input_fields[i].id}: ${input_fields[i].value}`);
        }
    }
});
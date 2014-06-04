// Valores iniciales de objetos
var objArrastrado,
		objContenedor,
		origenes = $('#origen'),
		objetos = $('#origen .widget'),
		destinos = $('.destino');

$(function() {

	// Eventos para el panel origen
	$.each(origenes, function(k, e) {
		e.addEventListener('dragenter', dragEnter, false);
		e.addEventListener('dragover', dragOver, false);
		e.addEventListener('drop', dragDrop, false);
		e.addEventListener('dragleave', dragLeave, false);
	});

	// Eventos para el objeto arrastrable
	$.each(objetos, function(k, e) {
		e.addEventListener('dragstart', dragStart, false);
		e.addEventListener('dragend', dragEnd, false);
	});

	// Eventos para el panel destino
	$.each(destinos, function(k, e) {
		e.addEventListener('dragenter', dragEnter, false);
		e.addEventListener('dragover', dragOver, false);
		e.addEventListener('drop', dragDrop, false);
		e.addEventListener('dragleave', dragLeave, false);
	});

});

/* El objeto 'comienza' a ser arrastrado */

function dragStart(event) {

	//console.log("dragStart!!");
	//console.log("dragStart(event): ", event);

	// Guardamos el objeto que es arrastrado
	objArrastrado = $(this);
	//console.log(objArrastrado.text());

	// Establecemos la operacion que se va a poder realizar
	event.dataTransfer.dropEffect = 'move';
	event.dataTransfer.effectAllowed = 'move';
	// Establecemos el dato y su tipo
	event.dataTransfer.setData('Data', this);
	// Centramos el objeto al cogerlo en las coord. x e y
	event.dataTransfer.setDragImage(this, 50, 50);

	//
	// Estilos del objeto al arrastrarlo
	//
	objArrastrado.css('border', '2px dashed');

	//
	// Imagen fantastam del objeto al arrastrarlo
	//
	// var dragIcon = document.createElement('img');
	// dragIcon.src = "http://developer.android.com/design/media/iconography_small_size.png";
	// dragIcon.width = 10;
	// event.dataTransfer.setDragImage(dragIcon, 35, 35);

}

/* Estamos 'entrando' en el area donde se puede dejar un objeto arrastrable */

function dragEnter(e) {

	//console.log("dragEnter!!");
	//console.log("dragEnter(event): ", event);

	// Ocultamos el objeto que se queda estatico
	objArrastrado.css('visibility', 'hidden');

	// Cambiamos el contorno y fondo del contenedor
	$(this).css({
		'background-color': 'rgba(255, 251, 242, 0.5)',
		'border-style': 'dashed'
	});

}

/* Situados 'encima' del area donde se puede dejar un objeto arrastrable */

function dragOver(e) {

	//console.log("dragOver!!");
	//console.log("dragOver(event): ", event);

	$('#coor_x').text(event.x);
	$('#coor_y').text(event.y);

	// Obtenemos el valor objeto del contenedor sobre el que se posa el objeto arrastrable
	objContenedor = $(this);

	//console.log(objContenedor);

	// El cursor del navegador indica el tipo de operación que se va a realizar
	//e.dataTransfer.dropEffect = 'move';

	// Necesario para dejar caer el objeto arrastrado
	if (e.preventDefault) e.preventDefault();

	// Ocultamos el texto DROG&DROP
	$("#origen p").hide();
	$("#destino p").hide();

}

/* Estamos 'soltando' un objeto arrastrable */

function dragDrop(event) {

	console.log("dragDrop!!");
	console.log("dragDrop(event): ", event);

	console.log(objArrastrado);

	//
	// Agregamos el objeto 'arrastrable' en el contenedor actual
	//
	// Con == se evita depositar el objeto
	//
	if(objArrastrado.className != 'widget') {
		$(this).append(objArrastrado);
	}

	// Necesario para evitar el redireccionamiento de navegadores
	if (event.stopPropagation) event.stopPropagation();

	// Restauramos el contorno del objeto y el color de fondo del contenedor
	$(this).css({
		'background-color': '',
		'border-style': 'solid'
	});

}

/* Estamos 'saliendo' del area donde se puede dejar un objeto arrastrable */

function dragLeave(e) {

	// Cambiamos el fondo del objeto contenedor
	$(this).css({
		'background-color': '',
		'border-style': 'solid'
	});

}

/* El objeto 'termina' de ser arrastrado */

function dragEnd(e) {

	// Si no hay elemento en el contenedor mostramos el texto
	/*if ($("#destino div").length === 0) $("#destino").append('<p>DRAG&DROP</p>');*/

	// Si no hay elemento en el contenedor mostramos el texto
	/*if ($("#origen div").length === 0) $("#origen").append('<p>DRAG&DROP</p>');*/

	/* Reseteamos valores modificados para inicializarlos */
	$(this).css({
		'background-color': '',
		'border-style': 'solid'
	});

	// Mostramos el objeto arrastrado previamente ocultado
	objArrastrado.css('visibility', 'visible');

}
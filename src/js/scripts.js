$(function() {
	// Valores iniciales de objetos
	var objArrastrado, objContenedor = 'null';

	// Eventos para el objeto arrastrable
	var objetos = $('#origen').find('.objeto');

	[].forEach.call(objetos, function(e) {
		e.addEventListener('dragstart', dragStart, false);
		e.addEventListener('dragend', dragEnd, false);
	});

	// Eventos para el panel origen
	var origenes = $('#origen');

	[].forEach.call(origenes, function(e) {
		e.addEventListener('dragenter', dragEnter, false);
		e.addEventListener('dragover', dragOver, false);
		e.addEventListener('drop', dragDrop, false);
		e.addEventListener('dragleave', dragLeave, false);
	});

	// Eventos para el panel destino
	var destinos = $('#destino');

	[].forEach.call(destinos, function(e) {
		e.addEventListener('dragenter', dragEnter, false);
		e.addEventListener('dragover', dragOver, false);
		e.addEventListener('drop', dragDrop, false);
		e.addEventListener('dragleave', dragLeave, false);
	});

	// Mostramos incialmente la etiqueta en el contenedor destino
	$("#destino").append('<p>DRAG&DROP</p>');

});

/* El objeto 'comienza' a ser arrastrado */

function dragStart(e) {

	// Guardamos el objeto que es arrastrado
	objArrastrado = this;

	// Establecemos la operacion que se va a poder realizar
	e.dataTransfer.effectAllowed = 'move';
	// Establecemos el dato y su tipo
	e.dataTransfer.setData('Data', this);
	// Centramos el objeto al cogerlo en las coord. x e y
	e.dataTransfer.setDragImage(this, 50, 50);

	// Resaltamos el objeto arrastrado
	$(objArrastrado).css('border', '2px dashed');

	// Creamos un elemento 'img' para añadir una imagen fantasma
	//var dragIcon = document.createElement('img');
	//dragIcon.src = "http://pilas.readthedocs.org/en/latest/_images/explosion.png";
	//dragIcon.width = 10;
	//e.dataTransfer.setDragImage(dragIcon, 35, 35);
}

/* Estamos 'entrando' en el area donde se puede dejar un objeto arrastrable */

function dragEnter(e) {

	// Ocultamos el objeto que se queda estatico
	$(objArrastrado).css('visibility', 'hidden');

	// Cambiamos el contorno y fondo del contenedor
	$(this).css({
		'background-color': 'rgba(255, 251, 242, 0.5)',
		'border-style': 'dashed'
	});

}

/* Situados 'encima' del area donde se puede dejar un objeto arrastrable */

function dragOver(e) {

	// Obtenemos el valor objeto del contenedor sobre el que se posa el objeto arrastrable
	objContenedor = this;

	// El cursor del navegador indica el tipo de operación que se va a realizar
	e.dataTransfer.dropEffect = 'move';

	// Necesario para dejar caer el objeto arrastrado
	if (e.preventDefault) e.preventDefault();

	// Ocultamos el texto DROG&DROP
	$("#origen p").hide();
	$("#destino p").hide();

}

/* Estamos 'soltando' un objeto arrastrable */

function dragDrop(e) {

	// Agregamos el objeto 'arrastrable' en el contenedor actual
	$(this).append(objArrastrado);

	// Necesario para evitar el redireccionamiento de navegadores
	if (e.stopPropagation) e.stopPropagation();

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
	if ($("#destino div").length === 0) $("#destino").append('<p>DRAG&DROP</p>');

	// Si no hay elemento en el contenedor mostramos el texto
	if ($("#origen div").length === 0) $("#origen").append('<p>DRAG&DROP</p>');

	/* Reseteamos valores modificados para inicializarlos */
	$(this).css({
		'background-color': '',
		'border-style': 'solid'
	});

	// Mostramos el objeto arrastrado previamente ocultado
	$(objArrastrado).css('visibility', 'visible');

}
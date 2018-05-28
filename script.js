$(window).on('load', populateIdeasToPage);
$('.title-input').add($('.body-input')).on('keyup', enableSaveButton);
$('ul').on('focus', ('.idea-title, .idea-body'), makeContentEditable);
$('ul').on('click', '.delete-button', removeIdea);

$('.idea-form').on('submit', function (event) {
	event.preventDefault();
	setIdeaToStorage(newIdea(newIdea));
	displayIdea(generateIdea(newIdea(newIdea)));
	clearForm();
});

function enableSaveButton() {
	if ($('.title-input').val() === '' || $('.body-input').val() === '') {
		$('.save-button').prop('disabled', true);
	} else {
		$('.save-button').prop('disabled', false);
	}
}

function clearForm() {
	$('.idea-form')[0].reset();
	$('.save-button').prop('disabled', true);
}

function Idea(title, body) {
	this.title = title;
	this.body = body;
	this.id = Date.now();
	this.quality = "swill";
	this.isRead = false;
}

function newIdea(newIdea) {
	var newIdea = new Idea($('.title-input').val(), $('.body-input').val());
	return newIdea
}

function displayIdea(idea) {
	$('ul').prepend(idea);
}

function generateIdea(newIdea) {
	var ideaCard =
		`<li role="idea card" aria-selected="true" class="idea-card" data-id="${newIdea.id}">
        <header class="idea-head">
            <h2 class="idea-title" tabindex="1" contenteditable="false" aria-label="enter to edit content">${newIdea.title}</h2>
            <button class="delete-button" aria-label="delete"></button>
        </header>
        <p class="idea-body" tabindex="0" contenteditable="false" type="submit">${newIdea.body}</p>
        <footer>
            <button id="up" class="upvote-button" aria-label="upvote"></button>
            <button id="down" class="downvote-button" aria-label="downvote"></button>
            <small>quality: ${newIdea.quality}</small>
        </footer>
    </li>`;
	return ideaCard;
};


// $('ul').on('click', ('.upvote-button, .downvote-button'), selectedIdea);

function makeContentEditable(event) {
	if ($(event.target).prop('contenteditable', false)){
		$(event.target).prop('contenteditable', true)
	} else {
		$(event.target).prop('contenteditable', false);
	}
}

function selectedIdea(event) {
	return $(this).closest('li').attr('data-id');
}

function currentIdea(ideaId) {
	var ideaId = $(this).closest('li').attr('data-id');
	var currentIdea = getIdeaFromStorage(ideaId);
	console.log(currentIdea);
	return currentIdea;
}

function removeIdea() {
	$(this).closest('li').remove();
	localStorage.removeItem($(this).closest('li').attr('data-id'));
}

function getIdeaFromStorage(idea) {
	return JSON.parse(localStorage.getItem(idea));
}

function setIdeaToStorage(newIdea) {
	return localStorage.setItem(JSON.stringify(newIdea.id), JSON.stringify(newIdea));
}

function populateIdeasToPage() {
	Object.keys(localStorage).forEach(function(idea) {
		displayIdea(generateIdea(JSON.parse(localStorage.getItem(idea))));
	})
}


$('ul').on('click', ('.upvote-button, .downvote-button'), function(event){
		var ideaId = $(this).closest('li').attr('data-id');
		var currentIdea = getIdeaFromStorage(ideaId);

		//USE TERNARY STATEMENTS

		//Output
		currentIdea.quality = 'quality: different';
		$(this).siblings('small').text(currentIdea.quality);

    // if ($(this).className === 'upvote-button' || $(this).className === 'downvote-button'){
    //     if ($(this).className === 'upvote-button' && currentIdea.quality === 'plausible'){
    //         currentIdea.quality = 'genius';
    //         $($(event.target).siblings('p.quality').children()[0]).text(currentIdea.quality);

    //     } else if ($(this).className === 'upvote-button' && currentIdea.quality === 'swill') {
    //         currentIdea.quality = 'plausible';
    //         $($(event.target).siblings('p.quality').children()[0]).text(currentIdea.quality);

    //     } else if ($(this).className === 'downvote-button' && currentIdea.quality === 'plausible') {
    //         currentIdea.quality = 'swill'
    //         $($(event.target).siblings('p.quality').children()[0]).text(currentIdea.quality);

    //     } else if ($(this).className === 'downvote-button' && currentIdea.quality === 'genius') {
    //         currentIdea.quality = 'plausible'
    //         $($(event.target).siblings('p.quality').children()[0]).text(currentIdea.quality);

    //     } else if ($(this).className === 'downvote-button' && currentIdea.quality === 'swill') {
    //         currentIdea.quality = 'swill';

    //     } else if ($(this).className === 'upvote-button' && currentIdea.quality === 'genius') {
    //         currentIdea.quality = 'genius';
    //     }

    // var cardHTML = $(event.target).closest('.card-container');
    // var cardHTMLId = cardHTML[0].id;
    // var cardObjectInJSON = localStorage.getItem(cardHTMLId);
    // var cardObjectInJS = JSON.parse(cardObjectInJSON);

    // cardObjectInJS.quality = qualityVariable;
    // }
});
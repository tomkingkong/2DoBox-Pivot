$(window).on('load', populateIdeasToPage);

$('.title-input').add($('.body-input')).on('keyup', enableSaveButton);

function enableSaveButton() {
	if ($('.title-input').val() !== '' && $('.body-input').val() !== '') {
		$('.save-button').prop('disabled', false);
	} else {
		return false;
	}
}

$('.idea-form').on('submit', function (event) {
	event.preventDefault();
	setIdeaToStorage(newIdea(newIdea));
	displayIdea(generateIdea(newIdea(newIdea)));
	clearForm();
});

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
	var newIdea = new Idea($(".title-input").val(), $(".body-input").val());
	return newIdea
}

function generateIdea(newIdea) {
	var ideaCard =
		`<li role="idea card" aria-selected="true" class="idea-card" data-id="${newIdea.id}">
        <header class="idea-head">
            <h2 class="idea-title" tabindex="1" contenteditable="false" aria-label="enter to edit content">${newIdea.title}</h2>
            <button class="delete-button" aria-label="delete"></button>
        </header>
        <p class="idea-body" tabindex="0" contenteditable="true" type="submit">${newIdea.body}</p>
        <footer>
            <button id="up" class="upvote-button" aria-label="upvote"></button>
            <button id="down" class="downvote-button" aria-label="downvote"></button>
            <small>quality: ${newIdea.quality}</small>
        </footer>
    </li>`;
	return ideaCard;
};

function displayIdea(idea) {
	$("ul").prepend(idea);
}

$('ul').on('click', ('.upvote-button, .downvote-button'), currentIdea);

function currentIdea(ideaID) {
	var ideaID = $(this).closest('li').attr('data-id');
	var currentIdea = getIdeaFromStorage(ideaID);
	return currentIdea;
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

// $.each(localStorage, function(key) {
//     var cardData = JSON.parse(this);
//     numCards++;
//     $('.bottom-box').prepend(newCard(key, cardData.title, cardData.body, cardData.quality));
// });

// $('.bottom-box').on('click', function(event){
//     var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
//     var qualityVariable;

//     if (event.target.className === "upvote" || event.target.className === "downvote"){

//         if (event.target.className === "upvote" && currentQuality === "plausible"){
//             qualityVariable = "genius";
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//         } else if (event.target.className === "upvote" && currentQuality === "swill") {
//             qualityVariable = "plausible";
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//         } else if (event.target.className === "downvote" && currentQuality === "plausible") {
//             qualityVariable = "swill"
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//         } else if (event.target.className === "downvote" && currentQuality === "genius") {
//             qualityVariable = "plausible"
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//         } else if (event.target.className === "downvote" && currentQuality === "swill") {
//             qualityVariable = "swill";

//         } else if (event.target.className === "upvote" && currentQuality === "genius") {
//             qualityVariable = "genius";
//         }

//     var cardHTML = $(event.target).closest('.card-container');
//     var cardHTMLId = cardHTML[0].id;
//     var cardObjectInJSON = localStorage.getItem(cardHTMLId);
//     var cardObjectInJS = JSON.parse(cardObjectInJSON);

//     cardObjectInJS.quality = qualityVariable;

//     var newCardJSON = JSON.stringify(cardObjectInJS);
//     localStorage.setItem(cardHTMLId, newCardJSON);
//     }

//     else if (event.target.className === "delete-button") {
//         var cardHTML = $(event.target).closest('.card-container').remove();
//         var cardHTMLId = cardHTML[0].id;
//         localStorage.removeItem(cardHTMLId);
//     }
// });
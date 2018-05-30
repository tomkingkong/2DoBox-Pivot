$(window).on('load', populateIdeasToPage);
$('.title-input').add($('.body-input')).on('keyup', enableSaveButton);
$('ul').on('focus', ('.idea-title, .idea-body'), makeContentEditable);
$('ul').on('click', ('.upvote-btn, .downvote-btn'), voting)
$('ul').on('click', '.delete-btn', removeIdea);
$('.search').on('keyup', search);

$('.idea-form').on('submit', function (event) {
	event.preventDefault();
	setIdeaToStorage(newIdea(newIdea));
	displayIdea(generateIdea(newIdea(newIdea)));
	clearForm();
});

function enableSaveButton() {
	($('.title-input').val() === '' || $('.body-input').val() === '') ? 
	$('.save-btn').prop('disabled', true) : 	$('.save-btn').prop('disabled', false);
}

function clearForm() {
	$('.idea-form')[0].reset();
	$('.save-btn').prop('disabled', true);
}

function Idea(title, body) {
	this.title = title;
	this.body = body;
	this.id = Date.now();
	this.quality = 'swill';
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
					<button class="delete-btn" aria-label="delete"></button>
        </header>
        <p class="idea-body" tabindex="0" contenteditable="false" type="submit">${newIdea.body}</p>
        <footer>
					<button id="up" class="upvote-btn" aria-label="upvote"></button>
					<button id="down" class="downvote-btn" aria-label="downvote"></button>
					<h3>quality:&nbsp;</h4>
					<small>${newIdea.quality}</small>
        </footer>
    </li>`;
	return ideaCard;
};

function makeContentEditable(event) {
	if ($(event.target).prop('contenteditable', false)){
		$(event.target).prop('contenteditable', true)
	} else {
		$(event.target).prop('contenteditable', false);
	}
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

function voting(event) {
	var currentIdea = getIdeaFromStorage($(this).closest('li').attr('data-id'));
	var qualityArray = ['swill', 'plausible', 'genius'];
	var thisQuality = qualityArray.indexOf(currentIdea.quality);
	(this.className === 'upvote-btn' && thisQuality < 2) ? (thisQuality++, currentIdea.quality = qualityArray[thisQuality])
	: (this.className === 'downvote-btn' && thisQuality > 0) ? (thisQuality--, currentIdea.quality = qualityArray[thisQuality]) 
	: null;
	setIdeaToStorage(currentIdea);
	location.reload();
}

function search() {
	$('li').remove();
	var storageList = [];
	var search = $('.search').val();
	var regexp = new RegExp(search, 'ig');
	Object.keys(localStorage).forEach(function(idea){
		storageList.push(JSON.parse(localStorage.getItem(idea)));
		return storageList.filter(idea => idea.title.match(regexp) || idea.body.match(regexp)).forEach(idea => displayIdea(generateIdea(idea)));
	})
}
var fill = document.querySelector('.fill');
var empties = document.querySelectorAll('.empty');

//fill listeners
fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);

//loop through empties and call drag events
for(var empty of empties) {
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop);

}

//drag functions
function dragStart() {
   this.className += ' hold';
   setTimeout(() => (this.className = 'invisible'), 0);
}

function dragEnd() {
   this.className = 'fill';
}

function dragOver(e) {
   e.preventDefault();
}

function dragEnter(e) {
   e.preventDefault();
   this.className += ' hovered';
}

function dragLeave() {
   this.className = 'empty';
}

function dragDrop() {
   this.className ='empty';
   this.append(fill);
}
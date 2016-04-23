var terminal1
var terminal2

Terminal.on(window, 'load', function(){
	setTimeout(function(){
		lights.click()
		terminal1 = new tty.Window()
		document.title = "Terminal"
		terminal1.resize(50, 10)
	}, 20)
	setTimeout(function(){
		terminal1.split('left', 100)
	}, 50)
})

window.onbeforeunload = function(e) {
	return 'Are you sure you want to leave this page?  You will lose any unsaved data.';
};

window.onkeydown = function(e) {
	if(e.keyCode === 49 && e.ctrlKey && terminal2 && confirm('Are you sure you want to KILL TERMINAL 2???')) {
		// ctrl + 1
		terminal2.destroy()
		terminal2 = null
		terminal1.split('left', 100)
	} else if(e.keyCode === 50 && e.ctrlKey) {
		// ctrl + 2
		terminal1.split('left', 55)
		terminal2 = new tty.Window()
		terminal2.resize(50, 10)
		setTimeout(function(){
			terminal2.split('right', 45)
		}, 50)
	}
}

var resizeTimer

window.onresize = function(e) {
	resizePrep(terminal1)
	if(terminal2) resizePrep(terminal2)
	clearTimeout(resizeTimer)
	resizeTimer = setTimeout(function() {
		terminal1.element.style.display = 'block';
		terminal1.split('left', 100)
		if(terminal2) {
			terminal2.element.style.display = 'block';
			terminal2.split('right', 45)
		}
	}, 200)
}

function resizePrep(term) {
	term.resize(50, 10)
	term.element.style.display = 'none';
	term.element.style.width = '';
	term.element.style.height = '';
	term.element.style.overflow = '';
	term.element.style.opacity = '';
	term.element.style.cursor = '';
	term.focused.element.style.height = '';
}

tty.Window.prototype.split = function(side, percent) {
	delete this.minimize;
	
  var self = this
    , el = this.element
    , term = this.focused
    , x
    , y;

  var m = {
    cols: term.cols,
    rows: term.rows,
    left: el.offsetLeft,
    top: el.offsetTop
  };

  window.scrollTo(0, 0);

  x = (window.innerWidth / (100 / percent)) / term.element.offsetWidth;
  y = window.innerHeight / term.element.offsetHeight;
  x = (x * term.cols) | 0;
  y = (y * term.rows) | 0;

  el.style.left = side === 'left' ? '0%' : (100 - percent) + '%';
  el.style.top = '0px';
  el.style.width = percent + '%';
  el.style.height = '100%';
  term.element.style.width = '100%';
  term.element.style.height = '100%';
  el.style.boxSizing = 'border-box';
  this.grip.style.display = 'none';

	this.resize(x, y);

};

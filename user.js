Terminal.on(window, 'load', function(){
	var terminal
	setTimeout(function(){
		terminal = new tty.Window()
		document.title = "Terminal"
		terminal.resize(50, 30)
	}, 20)
	setTimeout(function(){
		terminal.maximize()
	}, 30)
})

window.onbeforeunload = function(e) {
	return 'Are you sure you want to leave this page?  You will lose any unsaved data.';
};

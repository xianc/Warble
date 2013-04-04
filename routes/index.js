
exports.chat = function(req, res){
	res.render('chat', { title: 'Chat Client' });
};

exports.docs = function (req, res) {
	res.render('docs', { title: 'Exercise Documentation'} );
};
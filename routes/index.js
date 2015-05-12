
/*
 * GET home page.
 */
var fs = require('fs')
function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
        	var name2 = name.substring(7);
            files_.push(name2);
        }
    }
    return files_;
}

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.second = function(req, res){
	  res.render('digitrecognition', { title: 'Express' });
};

exports.mnist = function(req, res){
	var pics0 = getFiles('public/images/0');
	var pics1 = getFiles('public/images/1');
	var pics2 = getFiles('public/images/2');
	var pics3 = getFiles('public/images/3');
	var pics4 = getFiles('public/images/4');
	var pics5 = getFiles('public/images/5');
	var pics6 = getFiles('public/images/6');
	var pics7 = getFiles('public/images/7');
	var pics8 = getFiles('public/images/8');
	var pics9 = getFiles('public/images/9');
	
	res.render('mnist', { pic0: pics0,pic1: pics1,pic2: pics2,pic3: pics3,pic4: pics4,pic5: pics5,pic6: pics6,pic7: pics7,pic8: pics8,pic9: pics9 });
};


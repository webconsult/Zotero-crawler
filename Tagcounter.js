var tags = [];
var articles = [];
var columns = [];
var csv = '';
var columnID = 0;

function logTags() {
	console.log(tags);
}

//Article Contructor
Article = function(_title, _journal, _date, _volume, _issue, _pages, _abstract,_articleTags, _authors, _theme, _type, _theory, _findings, _relevance) {
	this.title = normalizeAttr(_title);
	this.journal = normalizeAttr(_journal);
	this.date = normalizeAttr(_date);
	this.volume = normalizeAttr(_volume);
	this.issue = normalizeAttr(_issue);
	this.pages = normalizeAttr(_pages);
	this.abstract = normalizeAttr(_abstract);
	this.year = this.date.replace(/[A-Za-z$-]/g, "").trim();
	this.authors = normalizeAttr(_authors); //Array
	this.tags = normalizeAttr(_articleTags); //Array full of Tag objects
	this.theme = normalizeAttr(_theme);
	this.type = _type; //ArticleType object
	this.theory = normalizeAttr(_theory); //Array of theories
	this.findings = normalizeAttr(_findings); //Array of findings
	this.relevance = normalizeAttr(_relevance);
};

//Getters
Article.prototype.getTitle = function() {
	return this.title;
};
Article.prototype.getJournal = function() {
	return this.journal;
};
Article.prototype.getDate = function() {
	return this.date;
};
Article.prototype.getVolume = function() {
	return this.volume;
};
Article.prototype.getIssue = function() {
	return this.issue;
};
Article.prototype.getPages = function() {
	return this.pages;
};
Article.prototype.getAbstract = function() {
	return this.abstract;
};
Article.prototype.getYear = function() {
	return this.year;
};
Article.prototype.getTags = function() {
	return this.tags;
};
Article.prototype.getTagsCSV = function() {
	var string = '';
	for (var i in this.tags) {
		string = string + this.tags[i];
		
		//Add a trailing comma for all BUT the last element
		if (i != this.tags.length -1) {
			string = string + ', ';
		}
	}
	return string;
};
Article.prototype.getFindings = function() {
	return this.findings;
};
Article.prototype.getFindingsCSV = function() {
	var string = '';
	for (var i in this.findings) {
		string = string + this.findings[i];
		
		//Add a trailing comma for all BUT the last element
		if (i != this.findings.length -1) {
			string = string + ', ';
		}
	}
	return string;
};
Article.prototype.getAuthors = function() {
	return this.authors;
};
Article.prototype.getAuthorByID = function(ID) {
	return this.authors[ID];
};
Article.prototype.getAuthorsCSV = function() {
	var string = '';
	for (var i in this.authors) {
		
		string = string + this.authors[i];
		
		//Attaches a comma to all BUT the last element
		if (i != this.authors.length -1) {
			string = string + ', ';
		}
	}
	return string;
};
Article.prototype.getTheme = function() {
	return this.theme;
};

Article.prototype.getTheory = function() {
	var out = '';
	for (var n in this.theory) {
		out += this.theory[n];
		if (n != this.theory.length-1){
			out += ', ';
		}
	}
	return out;
};
Article.prototype.getFindings = function() {
	var out = '';
	for (var n in this.findings) {
		out += this.findings[n];
		if (n != this.findings.length-1){
			out += ', ';
		}
	}
	return out;
};
Article.prototype.getRelevance = function() {
	return this.relevance;
};
Article.prototype.getType = function() {
	return this.type;
};

//Setters
Article.prototype.setTitle = function(_title) {
	this.title = title;
};
Article.prototype.setJournal = function(_journal) {
	this.journal = journal;
};
Article.prototype.setDate = function(_date) {
	this.date = date;
};
Article.prototype.setVolume = function(_volume) {
	this.volume = volume;
};
Article.prototype.setIssue = function(_issue) {
	this.issue = issue;
};
Article.prototype.setPages = function(_pages) {
	this.pages = pages;
};
Article.prototype.setAbstract = function(_abstract) {
	this.abstract = abstract;
};
Article.prototype.setYear = function(_year) {
	this.year = year;
};
Article.prototype.setTags = function(_tags) {
	this.tags = tags;
};
Article.prototype.setFirstAuthor = function(_firstAuthor) {
	this.firstAuthor = firstAuthor;
};
Article.prototype.setSecondAuthor = function(_secondAuthor) {
	this.secondAuthor = secondAuthor;
};
Article.prototype.setThirdAuthor = function(_thirdAuthor) {
	this.thirdAuthor = thirdAuthor;
};
Article.prototype.setFourthAuthor = function(_fourthAuthor) {
	this.fourthAuthor = fourthAuthor;
};

//ArticleType Constructor
ArticleType = function(input) {



	this.qualitative = false;
	this.quantitative = false;
	this.conceptual = false;
	this.explorative = false;
	this.literatureReview = false;

	for (var i = 0; i < input.length; i++) {
		if (input[i].toLowerCase() == 'qualitative') {
			this.qualitative = true;
		}
		if (input[i].toLowerCase() == 'quantitative') {
			this.quantitative = true;
		}
		if (input[i].toLowerCase() == 'conceptual') {
			this.conceptual = true;
		}
		if (input[i].toLowerCase() == 'explorative') {
			this.explorative = true;
		}
		if (input[i].toLowerCase() == 'literature review') {
			this.literatureReview = true;
		}
	}
};

//Getters
ArticleType.prototype.isQualitative = function() {
	return this.qualitative;
};
ArticleType.prototype.isQuantitative = function() {
	return this.quantitative;
};
ArticleType.prototype.isConceptual = function() {
	return this.conceptual;
};
ArticleType.prototype.isExplorative = function() {
	return this.exploratory;
};
ArticleType.prototype.isLiteratureReview = function() {
	return this.literatureReview;
};
ArticleType.prototype.getArticleType = function() {
	var types = [];
	var output = '';
	for (var i in this) {
		if(this[i] === true) {
			types.push(i);
		}
	}
	for (var n in types) {
		output += fixStr(types[n]);
		if (types.length-1 != n) {
			output += ', ';
		}
	}
	return output;
};

//Column constructor
//Columns enables matching headers and datasets
Column = function(_header, _dataSet) {
	this.columnID = columnID++; //ID auto-increments for each instantiated object
	this.header = _header;
	this.dataSet = _dataSet;
};

//Getters
Column.prototype.getID = function() {
	return this.columnID;
};
Column.prototype.getHeader = function() {
	return this.header;
};
Column.prototype.getDataset = function() {
	return this.dataset;
};



function printObject(o) {
  var out = '';
  for (var p in o) {
	if (o[p] === true) {
		alert(p + ' ja');
	}else{
		alert(p + 'n ej');
	}
  }
}


//Tag Constructor
Tag = function(_name) {
	this.name = _name;
	this.count = 1;
	this.synonyms = [_name];
};
Tag.prototype.getName = function() {
	return this.name;
};
Tag.prototype.getCount = function() {
	return this.count;
};
Tag.prototype.getSynonyms = function() {
	return this.synonyms;
};
Tag.prototype.increment = function() {
	this.count++;
};
Tag.prototype.addSynonym = function(string) {
	this.synonyms.push(string);
};
Tag.prototype.isMatch = function(string) {
	
	for (var i=0; i<this.synonyms.length; i++) {
		if (synonyms[i] == string) {
			return true;
		}
	}
	return false;
};

function getCountByName(_name) {
	for (var i=0; i<tags.length; i++) {
		if (_name === tags[i].getName()) {
			return tags[i];
		}
	}
}

function countTag(_name) {
	
	//converts all tags to lower case
	_name = _name.toLowerCase();

	//indicates whether a match have been
	//found among the previous identified tags
	var match = false;

	//Stores a reference to the matched object (if any)
	var matched;

	//Iterates through found tags and either increments an existing tag
	//or creates a new one
	for (var i=0; i<tags.length; i++) {
		if(tags[i].getName() == _name){
			match = true;
			matched = tags[i];
		}
	}
	if (match === true) {
		matched.increment();

	}else {
		//If no match, create new object, append it to the array and return the reference
		var newObject = new Tag(_name);
		tags.push(newObject);
		return newObject;
	}
}

function generateCSV() {
	
	for (var i=0; i<tags.length; i++) {
		csv = csv + '"' + tags[i].getName() + '"' + ',' + '"' + tags[i].getCount() + '"'  + '\n';
	}

	return csv;
}

function generateCsvFromTags() {

		$('ul.tags li').each(function() {
		countTag($(this).text());
	});
	console.log(generateCSV());
}

//Crawls the DOM and creates objects accordingly
function generateArticleObjects() {
	
	//Is run for each article
	$('li.item').each(function() {
		
		var title, journal, date, volume, issue, pages, abstract, year, theme, relevance, type;
		var authors = [];
		var articleTags = [];
		var types = [];
		var theory = [];
		var findings = [];
		title = $(this).children('h2').text();
		
		//Sets up basic attributes for the articles based on clear-text headings
		$(this).find('tr').each(function() {
			var text = $(this).children('th').text();
			if (text == 'Author') {
				authors.push($(this).children('td').text());
			} else if (text == 'Abstract') {
				abstract = $(this).children('td').text();
			} else if (text == 'Publication') {
				journal = $(this).children('td').text();
			} else if (text == 'Volume') {
				volume = $(this).children('td').text();
			} else if (text == 'Issue') {
				issue = $(this).children('td').text();
			} else if (text == 'Pages') {
				pages = $(this).children('td').text();
			} else if (text == 'Date') {
				date = $(this).children('td').text();
			}
		});

		theme = $(this).find('ul.notes div.theme').text();
		relevance = $(this).find('ul.notes div.relevance').text();

		//Pushing to arrays
		$(this).find('ul.notes div.theory').each(function() {
			theory.push($(this).text());
		});
		$(this).find('ul.notes div.findings').each(function() {
			findings.push($(this).text());
		});
		$(this).find('ul.notes div.type').each(function() {
			types.push($(this).text());
		});
		$(this).find('ul.notes div.type').each(function() {
			types.push($(this).text());
		});
		type = new ArticleType(types);
		$(this).find('ul.tags li').each(function() {
			articleTags.push($(this).text());
		});

		

		//Build object
		articles.push(new Article(title, journal, date, volume, issue, pages, abstract, articleTags, authors, theme, type, theory, findings, relevance));
	});
	return 'article objects generated';
}

//Takes a newline character (i.e. \n or <br/> or '' in order to avoid newlines) and an array 
//containing elements to be wrapped CSV-style. Ends each run with a newline
function elementLineCSV(_newlineString, _elements) {
	
	output = '';
	var elements = _elements;
	var newline = _newlineString;
	
	//Writes the CSV to the output string
	for (var i in elements){
		output += '"' + elements[i] + '"';
		if (elements.length-1 != i) {
			output += ',';
		}
	}

	//Adds the newline character
	output += newline;

	return output;
}

//Takes an arbitrary list of headers and automatically generates the according CSV
//Supported headers: title, journal, date, volume, issue, pages, abstract, year, tags, authors, theme, type, theory, findings, relevance
function customListCSV() {

	var headers = [];
	var emptystring = 'n/a';
	var newline = '\n';

	//Populate the headers-array from the arguments
	for (var x in arguments) {
		headers.push(arguments[x]);
	}

	//Writes all of the headers to the first line of the CSV
	output = elementLineCSV(newline, headers);

	//Runs for each article (data row)
	for (var n in articles) {
		var row = [];
		var article = articles[n];

		//Each matched header represents a data column
		for (var i in headers) {
			if (headers[i].toLowerCase() == 'title') {
				if (typeof article.getTitle() == 'string') {
					row.push(article.getTitle());
				} else {
					row.push(emptystring);
				}
			} else if (headers[i].toLowerCase() == 'journal') {
				if (typeof article.getJournal() == 'string') {
					row.push(article.getJournal());
				} else {
					row.push(emptystring);
				}
			} else if (headers[i].toLowerCase() == 'date') {
				if (typeof article.getDate() == 'string') {
					row.push(article.getDate());
				} else {
					row.push(emptystring);
				}
			} else if (headers[i].toLowerCase() == 'volume') {
				if (typeof article.getVolume() == 'string') {
					row.push(article.getVolume());
				} else {
					row.push(emptystring);
				}
			} else if (headers[i].toLowerCase() == 'issue') {
				if (typeof article.getIssue() == 'string') {
					row.push(article.getIssue());
				} else {
					row.push(emptystring);
				}
			} else if (headers[i].toLowerCase() == 'pages') {
				if (typeof article.getPages() == 'string') {
					row.push(article.getPages());
				} else {
					row.push(emptystring);
				}
			} else if (headers[i].toLowerCase() == 'abstract') {
				if (typeof article.getAbstract() == 'string') {
					row.push(article.getAbstract());
				} else {
					row.push(emptystring);
				}
			} else if (headers[i].toLowerCase() == 'year') {
				if (typeof article.getYear() == 'string') {
					row.push(article.getYear());
				} else {
					row.push(emptystring);
				}
			} else if (headers[i].toLowerCase() == 'tags') {
				if (typeof article.getTagsCSV() == 'string') {
					row.push(article.getTagsCSV());
				} else {
					row.push(emptystring);
				}
			} else if (headers[i].toLowerCase() == 'authors') {
				if (typeof article.getAuthorsCSV() == 'string') {
					row.push(article.getAuthorsCSV());
				} else {
					row.push(emptystring);
				}
			} else if (headers[i].toLowerCase() == 'theme') {
				if (typeof article.getTheme() == 'string') {
					row.push(article.getTheme());
				} else {
					row.push(emptystring);
				}
			} else if (headers[i].toLowerCase() == 'type') {

				var type = article.getType().getArticleType();

				if (typeof type == 'string') {
					row.push(type);
				} else {
					row.push(emptystring);
				}
			} else if (headers[i].toLowerCase() == 'theory') {
				if (typeof article.getTheory() == 'string') {
					row.push(article.getTheory());
				} else {
					row.push(emptystring);
				}
			} else if (headers[i].toLowerCase() == 'findings') {
				if (typeof article.getFindingsCSV() == 'string') {
					row.push(article.getFindingsCSV());
				} else {
					row.push(emptystring);
				}
			} else if (headers[i].toLowerCase() == 'relevance') {
				if (typeof article.getRelevance() == 'string') {
					row.push(article.getRelevance());
				} else {
					row.push(emptystring);
				}
			} else {
				row.push('"unmatched column"');
			}
		}
		//Format and add line to output
		output += elementLineCSV(newline,row);
		
	}

	return output;
}

//Takes an arbitrary list of headers and automatically generates the according CSV
//Supported headers: title, journal, date, volume, issue, pages, abstract, year, tags, authors, theme, type, theory
function customTable() {

	var headers = [];
	
	var table = new Table();
	var emptystring = '';


	//Populate the headers array
	for (var i in arguments) {
		headers.push(arguments[i]);
	}

	//Each header is matched with a number of possible keywords
	for (var k in headers) {
		
		if (headers[k].toLowerCase() == 'title') {

			var column = [];
			//Adds the header as first element of the column
			column.push(headers[k].toUpperCase());

			//Loop through all articles
			for (var n in articles) {
				var title = articles[n].getTitle();

				if (typeof title == 'string') {
					//Adds each element to the column
					column.push(title);
				} else {
					//Adds an empty string in case no element is found
					column.push(emptystring);
				}
			}
			//Adds the populated column to the table
			table.addColumnAsArray(column);
		}
		else if (headers[k].toLowerCase() == 'journal') {

			var column = [];
			//Adds the header as first element of the column
			column.push(headers[k].toUpperCase());

			//Loop through all articles
			for (var n in articles) {
				var journal = articles[n].getJournal();

				if (typeof journal == 'string') {
					//Adds each element to the column
					column.push(journal);
				} else {
					//Adds an empty string in case no element is found
					column.push(emptystring);
				}
			}
			//Adds the populated column to the table
			table.addColumnAsArray(column);
		}
		else if (headers[k].toLowerCase() == 'date') {

			var column = [];
			//Adds the header as first element of the column
			column.push(headers[k].toUpperCase());

			//Loop through all articles
			for (var n in articles) {
				var date = articles[n].getDate();

				if (typeof date == 'string') {
					//Adds each element to the column
					column.push(date);
				} else {
					//Adds an empty string in case no element is found
					column.push(emptystring);
				}
			}
			//Adds the populated column to the table
			table.addColumnAsArray(column);
		}
		else if (headers[k].toLowerCase() == 'volume') {

			var column = [];
			//Adds the header as first element of the column
			column.push(headers[k].toUpperCase());

			//Loop through all articles
			for (var n in articles) {
				var volume = articles[n].getVolume();

				if (typeof volume == 'string') {
					//Adds each element to the column
					column.push(volume);
				} else {
					//Adds an empty string in case no element is found
					column.push(emptystring);
				}
			}
			//Adds the populated column to the table
			table.addColumnAsArray(column);
		}
		else if (headers[k].toLowerCase() == 'issue') {

			var column = [];
			//Adds the header as first element of the column
			column.push(headers[k].toUpperCase());

			//Loop through all articles
			for (var n in articles) {
				var issue = articles[n].getIssue();

				if (typeof issue == 'string') {
					//Adds each element to the column
					column.push(issue);
				} else {
					//Adds an empty string in case no element is found
					column.push(emptystring);
				}
			}
			//Adds the populated column to the table
			table.addColumnAsArray(column);
		}
		else if (headers[k].toLowerCase() == 'pages') {

			var column = [];
			//Adds the header as first element of the column
			column.push(headers[k].toUpperCase());

			//Loop through all articles
			for (var n in articles) {
				var pages = articles[n].getPages();

				if (typeof pages == 'string') {
					//Adds each element to the column
					column.push(pages);
				} else {
					//Adds an empty string in case no element is found
					column.push(emptystring);
				}
			}
			//Adds the populated column to the table
			table.addColumnAsArray(column);
		}
		else if (headers[k].toLowerCase() == 'abstract') {

			var column = [];
			//Adds the header as first element of the column
			column.push(headers[k].toUpperCase());

			//Loop through all articles
			for (var n in articles) {
				var abstract = articles[n].getAbstract();

				if (typeof abstract == 'string') {
					//Adds each element to the column
					column.push(abstract);
				} else {
					//Adds an empty string in case no element is found
					column.push(emptystring);
				}
			}
			//Adds the populated column to the table
			table.addColumnAsArray(column);
		}
		else if (headers[k].toLowerCase() == 'year') {

			var column = [];
			//Adds the header as first element of the column
			column.push(headers[k].toUpperCase());

			//Loop through all articles
			for (var n in articles) {
				var year = articles[n].getYear();

				if (typeof year == 'string') {
					//Adds each element to the column
					column.push(year);
				} else {
					//Adds an empty string in case no element is found
					column.push(emptystring);
				}
			}
			//Adds the populated column to the table
			table.addColumnAsArray(column);
		}
		else if (headers[k].toLowerCase() == 'tags') {

			var column = [];
			//Adds the header as first element of the column
			column.push(headers[k].toUpperCase());

			//Loop through all articles
			for (var n in articles) {
				var tags = articles[n].getTagsCSV();

				if (typeof tags == 'string') {
					//Adds each element to the column
					column.push(tags);
				} else {
					//Adds an empty string in case no element is found
					column.push(emptystring);
				}
			}
			//Adds the populated column to the table
			table.addColumnAsArray(column);
		}
		else if (headers[k].toLowerCase() == 'authors') {

			var column = [];
			//Adds the header as first element of the column
			column.push(headers[k].toUpperCase());

			//Loop through all articles
			for (var n in articles) {
				var authors = articles[n].getAuthorsCSV();

				if (typeof authors == 'string') {
					//Adds each element to the column
					column.push(authors);
				} else {
					//Adds an empty string in case no element is found
					column.push(emptystring);
				}
			}
			//Adds the populated column to the table
			table.addColumnAsArray(column);
		}
		else if (headers[k].toLowerCase() == 'theme') {

			var column = [];
			//Adds the header as first element of the column
			column.push(headers[k].toUpperCase());

			//Loop through all articles
			for (var n in articles) {
				var theme = articles[n].getTheme();

				if (typeof theme == 'string') {
					//Adds each element to the column
					column.push(theme);
				} else {
					//Adds an empty string in case no element is found
					column.push(emptystring);
				}
			}
			//Adds the populated column to the table
			table.addColumnAsArray(column);
		}
		else if (headers[k].toLowerCase() == 'type') {

			var column = [];
			//Adds the header as first element of the column
			column.push(headers[k].toUpperCase());

			//Loop through all articles
			for (var n in articles) {
				var type = articles[n].getType().getArticleType();

				if (typeof type == 'string') {
					//Adds each element to the column
					column.push(type);
				} else {
					//Adds an empty string in case no element is found
					column.push(emptystring);
				}
			}
			//Adds the populated column to the table
			table.addColumnAsArray(column);
		}
		else if (headers[k].toLowerCase() == 'theory') {

			var column = [];
			//Adds the header as first element of the column
			column.push(headers[k].toUpperCase());

			//Loop through all articles
			for (var n in articles) {
				var theory = articles[n].getTheory();

				if (typeof theory == 'string') {
					//Adds each element to the column
					column.push(theory);
				} else {
					//Adds an empty string in case no element is found
					column.push(emptystring);
				}
			}
			//Adds the populated column to the table
			table.addColumnAsArray(column);
		}
		else if (headers[k].toLowerCase() == 'findings') {

			var column = [];
			//Adds the header as first element of the column
			column.push(headers[k].toUpperCase());

			//Loop through all articles
			for (var n in articles) {
				var findings = articles[n].getFindings();

				if (typeof findings == 'string') {
					//Adds each element to the column
					column.push(findings);
				} else {
					//Adds an empty string in case no element is found
					column.push(emptystring);
				}
			}
			//Adds the populated column to the table
			table.addColumnAsArray(column);
		}
		else if (headers[k].toLowerCase() == 'relevance') {

			var column = [];
			//Adds the header as first element of the column
			column.push(headers[k].toUpperCase());

			//Loop through all articles
			for (var n in articles) {
				var relevance = articles[n].getRelevance();

				if (typeof relevance == 'string') {
					//Adds each element to the column
					column.push(relevance);
				} else {
					//Adds an empty string in case no element is found
					column.push(emptystring);
				}
			}

			//Adds the populated column to the table
			table.addColumnAsArray(column);
		}
		else {
			console.log('customTable() was supplied with wrong arguments');
		}
	}
	//Renders the table as CSV
	table.renderCSV();
}
function checkedTable() {

}

//Converts from 'camelCase' to 'Camel Case'
function fixStr(str) {
    var out = str.replace(/^\s*/, "");  // strip leading spaces
    out = out.replace(/^[a-z]|[^\s][A-Z]/g, function(str, offset) {
        if (offset === 0) {
            return(str.toUpperCase());
        } else {
            return(str.substr(0,1) + " " + str.substr(1).toUpperCase());
        }
    });
    return(out);
}

//Function intended to be run on all attributes, when new objects are created
function normalizeAttr(object) {
	
	if (object instanceof Array) {
		var array = object;
		for (var i in array) {
			object[i] = replaceQuotes(array[i]);
		}
		return array;
	} else if (typeof object == 'string') {
		var string = object;
		string = replaceQuotes(string);
		return string;
	}  else if (typeof object == 'undefined') {
		//Do nothing
	} else {
		console.log('could not normalize attribute');
	}

	
}

//Converts doublequotes to singlequotes
function replaceQuotes(string) {
	return string.replace(/\"/g,'\'');
}

$(document).ready(function() {

	//"de-escape HTML by converting &lt; to < and &gt; to >" and converts doublequotes "" to singlequotes ''
	$('ul.notes li p').each(function(){
		var $this = $(this);
		var t = $this.text();
		$this.html(t.replace('&lt','<').replace('&gt', '>'));
	});



	console.log(generateArticleObjects());
});
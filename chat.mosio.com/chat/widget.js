//
// v3

(function() {
	var _mosio_popout_url = 'https://chat.mosio.com/par/chat/new_chat/mb2623';
	var _is_literati = 0;
	var _params = {"tab_url":"","tab_width":"px","tab_height":"px","tab_top":"20%","tab_bottom":"auto","tab_left":"auto","tab_right":"0px","html":"\t<div id=\"mosio_widget_tab\" class=\"mosio_patron_tab\"><\/div>\n"};

	// add widget css
	var css_link = document.createElement('link');
	css_link.type = 'text/css';
	css_link.rel = 'stylesheet';
	css_link.href = "https://chat.mosio.com/par/css/widget_styled.css?" + Math.floor(Math.random()*10000000);
	var doc_head = document.getElementsByTagName("head")[0];
	doc_head.appendChild(css_link);
	
	// add widget html
	addHtml(_params.html);

	// add click handler and custom styling
	var tab_elem = document.getElementById('mosio_widget_tab');
	if (tab_elem) {
		// add handler to tab to open new window on click
		tab_elem.onclick = mosio_tab_click;

		if (typeof _params.tab_url !== 'undefined' && _params.tab_url.length) {
			// custom tab
			tab_elem.style.backgroundImage = 'url(' + _params.tab_url + ')';
			tab_elem.style.width           = _params.tab_width;
			tab_elem.style.height          = _params.tab_height;
			tab_elem.style.top             = _params.tab_top;
			tab_elem.style.bottom          = _params.tab_bottom;
			tab_elem.style.left            = _params.tab_left;
			tab_elem.style.right           = _params.tab_right;
		}
		else {
			// default tab
			tab_elem.style.backgroundImage = 'url(https://9826e3916e43c62be1f9-7eb285c8c80cad365ec80c3238ae427f.ssl.cf2.rackcdn.com/tab_aaq2.png)';
			
			// look for custom placement
			if (typeof _params.tab_top !== 'undefined' && _params.tab_top.length) {
				tab_elem.style.top             = _params.tab_top;
				tab_elem.style.bottom          = _params.tab_bottom;
				tab_elem.style.left            = _params.tab_left;
				tab_elem.style.right           = _params.tab_right;
			}
		}
		
		if (_is_literati) {
			tab_elem.style.top = '10%';
		}
	}
	

	/**
	* new popout chat
	*/
	function mosio_tab_click() {
		mosio_chat_window = window.open(_mosio_popout_url,'mosio_chat','height=430,width=510,scrollbars=1');
		if (window.focus) {
			mosio_chat_window.focus();
		}
		return false;
	}


	/**
	* Add an html string to the widget container
	*/
	function addHtml(new_html) {
		if ('______array' == new_html) {
			// ignore ______array marker ([].toString())
			return;
		}
		
		// append html
		var container = document.getElementById('mosio-widget-container');
		if (container) {
			container.innerHTML = new_html;
		}
		else {
			// create the mosio-widget-container element
			var wc = document.createElement('div');
			wc.setAttribute('id', 'mosio-widget-container');
			wc.innerHTML = new_html;
			document.body.appendChild(wc);
		}
	}

})(); // We call our anonymous function immediately



<?php
class heti extends Plugin {

	function about() {
		return array(1.0,
			"Apply Heti Chinese Enhancement (https://github.com/sivan/heti) to articles.",
			"Zihao Diao (ericdiao)");
	}

	function init($host) {
		$this->host = $host;
	}

	function get_js() {
		$js = file_get_contents(dirname(__FILE__) . "/js/init.js");
		return $js;
	}

    function get_css() {
        $css = file_get_contents(dirname(__FILE__) . "/css/init.css");
        return $css;
    }

	function api_version() {
		return 2;
	}

}
?>
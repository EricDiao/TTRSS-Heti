<?php
class heti extends Plugin {

	function about() {
		return array(1.0,
			"Apply Heti Chinese Enhancement (https://github.com/sivan/heti) to articles.",
			"Zihao Diao (ericdiao)");
	}

	function init($host) {
		$this->host = $host;

		$host->add_hook($host::HOOK_FORMAT_ARTICLE, $this);
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

	function hook_format_article($html, $row) {
		$doc = new DOMDocument();
		$doc->preserveWhiteSpace = false;
		$doc->formatOutput = true;
		@$doc->loadHTML($html);

		$og_tag_site_name = $doc->createElement('meta');
		$og_tag_site_name->setAttribute('property', 'og:site_name');
		$og_tag_site_name->setAttribute('content', "Tiny Tiny RSS - Shared Article");
		$doc->getElementsByTagName('head')->item(0)->appendChild($og_tag_site_name);


		$viewport = $doc->createElement('meta');
		$viewport->setAttribute('name', 'viewport');
		$viewport->setAttribute('content', 'width=device-width, initial-scale=1.0');
		$doc->getElementsByTagName('head')->item(0)->appendChild($viewport);

		$script = $doc->createElement('script');
		$script->setAttribute('type', 'text/javascript');
		$script->setAttribute('src', 'plugins.local/heti/heti/heti-addon.min.js');
		$doc->getElementsByTagName('head')->item(0)->appendChild($script);

		$css_link = $doc->createElement('link');
		$css_link->setAttribute('rel', 'stylesheet');
		$css_link->setAttribute('type', 'text/css');
		$css_link->setAttribute('href', 'plugins.local/heti/heti/heti.min.css');
		$doc->getElementsByTagName('head')->item(0)->appendChild($css_link);
		
		$heti_addon_script = $doc->createElement('script');
		$heti_addon_script->setAttribute('type', 'text/javascript');
		$heti_addon_script->nodeValue = file_get_contents(dirname(__FILE__) . "/js/share-plugin.include.js");
		$doc->getElementsByTagName('head')->item(0)->appendChild($heti_addon_script);

		$heti_global_sytle = $doc->createElement('style');
		$heti_global_sytle->nodeValue = file_get_contents(dirname(__FILE__) . "/css/share-plugin.include.css");
		$doc->getElementsByTagName('head')->item(0)->appendChild($heti_global_sytle);

		$xpath = new DOMXPath($doc);
		$entries = $xpath->query("/html/body/div/div");
		foreach ($entries as $entry) {
			$entry->setAttribute('class', $entry->getAttribute('class') . ' heti');
		}

		$entries = $xpath->query("/html/head/meta[@property='og:description']");
		foreach ($entries as $entry) {
			$entry->setAttribute('content', "Shared Article «" . $entry->getAttribute('content') . "» on Tiny Tiny RSS");
		}

		if (isset($row['feed_title'])) {
			$entries = $xpath->query("/html/body/div/div/div[1]/div[2]");
			foreach ($entries as $entry) {
				$feed_title = $doc->createElement('div');
				$feed_title->nodeValue = $row['feed_title'];
				// $feed_title->setAttribute('class', 'feed_title');
				$entry->insertBefore($feed_title, $entry->firstChild);
			}

			$entries = $xpath->query("/html/head/title");
			foreach ($entries as $entry) {
				$entry->nodeValue = $entry->nodeValue . " | " . $row['feed_title'];
			}

			$entries = $xpath->query("/html/head/meta[@property='og:title']");
			foreach ($entries as $entry) {
				$entry->setAttribute('content', $entry->getAttribute('content') . " | " . $row['feed_title']);
			}
		}

		return $doc->saveHTML();
	}

}
?>
<div align='center'>
	<h3>sectorJS</h3>
	<span>Yes, another small JS library.</span>
	<hr>
	<h3>What is Sector?</h3>
	<p>
		Sector is a small subset of vanilla JavaScript functions for super niche needs.<br>
		It is not meant to be a replacement for libraries like jQuery, which are similar in usage<br>
		and structure.
	</p>
	<hr>
	<h3>Installation</h3>
	<span>Add one of the following script tags to your <code>&lt;head&gt;</code> tag</span><br><br>
	<span><b>Unminified Version</b></span><br>
	<code>&lt;script src=&quot;https://cdn.jsdelivr.net/gh/wickedlizerd/sectorJS/sector.js&quot;&gt;&lt;/script&gt;</code><br><br>
	<span><b>Minified Version</b></span><br>
	<code>&lt;script src=&quot;https://cdn.jsdelivr.net/gh/wickedlizerd/sectorJS/sector.min.js&quot;&gt;&lt;/script&gt;</code><br>
	<hr>
	<h3>Setup</h3>
    <span>Sector Currently Supports 4 Configurable Flags:</span><br><br>
    <a href="#SECTORJS_PREFIX">SECTORJS_PREFIX</a><br>
    <a href="#SECTORJS_DEARRAY_SINGLE_ELEMENT">SECTORJS_DEARRAY_SINGLE_ELEMENT</a>*<br>
    <a href="#">SECTORJS_MAX_FIND_PARENT_ITERATIONS</a><br>
    <a href="#">SECTORJS_UNBIND_OLD_PREFIX</a>*<br><br>
    <span>*Experimental flag. Default value recommended as unexpected issues can occur when changing flag value.</span><br><br>
    <hr>
    <span id="SECTORJS_PREFIX"><b>SECTORJS_PREFIX</b> (Default: <code>'sctr'</code>)</span><br>
    <span>Name to which access Sector by.</span><br><br>
    <code class="language-js">
    	window['SECTORJS_PREFIX'] = '$'; // Sector would now be called using $(...) instead of sctr(...)
    </code><br><br>
    <span><b>This flag should only be set prior to importing Sector!</b><br>Setting this flag after Sector has already initialized could be fatal to Sector.</span><br><br>
    <hr>
    <span id="SECTORJS_DEARRAY_SINGLE_ELEMENT"><b>SECTORJS_DEARRAY_SINGLE_ELEMENT</b> (Default: <code>true</code>)</span><br>
    <span>Changes behaviour when SectorJS returns a single element array</span><br><br>
    <div align='left'>
    	<pre><code class="language-js">
        sctr('body'); // Returns HTMLBodyElement<br>
    	window['SECTORJS_DEARRAY_SINGLE_ELEMENT'] = false; // Sector will no longer de-array single element arrays<br>
        sctr('body'); // Now returns Array ( [HTMLBodyElement] )
    	</code></pre>
    </div><br><br>
    <hr>
    <span id="SECTORJS_MAX_FIND_PARENT_ITERATIONS"><b>SECTORJS_MAX_FIND_PARENT_ITERATIONS</b> (Default: <code>50</code>)</span><br>
    <span>Maximum number of parents <code>sctr#parentIterate(...)</code> will iterate through before forcefully stopping</span><br><br>
    <div align='left'>
    	<pre><code class="language-js">
		sctr.parentIterate(myElem, 10); // Finds 10th parent<br>
    	window['SECTORJS_MAX_FIND_PARENT_ITERATIONS'] = 5;<br>
		sctr.parentIterate(myElem, 10); // Finds 5th parent, as a maximum cap is set with Sector
    	</code></pre>
    </div><br><br>
    <hr>
</div>

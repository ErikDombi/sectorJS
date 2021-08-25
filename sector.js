'{"version":"1.1.0"}'

;(function() {
    'use strict';
    
    let setFlag = (flag, value) => {
        if(window[flag] === undefined)
            window[flag] = value;
    }

    if(window['SECTORJS_INIT']) {
        console.error(`[SectorJS] Instance of SectorJS already created with binding '${window['SECTORJS_PREFIX']}'`);
        return;
    }

    setFlag('SECTORJS_INIT', true);

    // EXPIREMENTAL FEATURE FLAGS
    setFlag('SECTORJS_DEARRAY_SINGLE_ELEMENT', true);
    setFlag('SECTORJS_UNBIND_OLD_PREFIX', true);

    // CONFIG FLAGS
    setFlag('SECTORJS_MAX_FIND_PARENT_ITERATIONS', 50);
    setFlag('SECTORJS_PREFIX', 'sctr');

    // SectorJS Scope Globals
    var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z;

    /**
     * Find element by query string
     * @param {string} s - Selector
     * @param {HTMLElement} e - [Optional] Target Element (Defaults: document)
     * @param {Boolean} d - [Optional]Should dearray value (Default: true)
     */
    let sctr = (s, e, d) => sctr.Dearray((e || document).querySelectorAll(s), d);

    /**
     * Get all children and grandchildren of element
     * @param {*} e - Target element
     * @returns {Array<HTMLElement>} Array of Children / Grandchildren
     */
    sctr.allChildren = (e) => sctr('*', e);

    /**
     * Find Elements in Array that have a property with a specific value
     * @param {Array} e - Array to search
     * @param {string || function} p - Property Name or function to evaluate
     * @param {any} v - Desired property value
     * @param {boolean} d - Dearray return value
     */
    sctr.byProperty = (e, p, v, d) => (e.nodeType && (e = e.children),
        sctr.Dearray($.grep(e, (m) => (typeof p === 'function' ? p(m) : m[p]) === v), d));

    /**
     * Find Elements in Array that have a property which contains a value
     * @param {Array} e - Array to search
     * @param {string || function} p - Property Name or function to evaluate
     * @param {any} v - Desired property value
     * @param {boolean} d - [Optional] Dearray return value (Default: true)
     */
    sctr.byPropertyContains = (e, p, v, d) => (e.nodeType && (e = e.children),
        sctr.Dearray($.grep(e, (m) => (typeof p === 'function' ? p(m) : m[p]).includes(v)), d));

    /**
     * Convert an array to a single element if the array only has one element
     * @param {Array} e - Array of elements 
     * @param {Boolean} d - [Optional] Should dearray element (Default: true)
     * @returns {Array} Elements / Single Element
     */
    sctr.Dearray = (e, d) => 
        (window['SECTORJS_DEARRAY_SINGLE_ELEMENT'] && e.length === 1 && (d || true)) ? e[0] : e;

    sctr.toArray = (e) => 
        Array.from(e);

    /**
     * Remove an element from an array
     * @param {Array} a - Array to remove element from
     * @param {Element} e - Element to remove
     * @returns {Array} Modified Array
     */
    sctr.arrRemove = (a, e) => 
        (a = sctr.toArray(a), (f = (i = a.indexOf(e)) !== -1) && a.splice(i, 1), a);

    /**
     * Get an element's attribute
     * @param {HTMLElement} e - Target Element
     * @param {string} a - Attribute Name
     * @param {string} b - [Optional] Secondary Attribute Name if First is undefined
     * @returns {string} Attribute Value
     */
    sctr.attr = (e, a, b) => 
        e.getAttribute(a) || e.getAttribute(b);

    /**
     * Find a parent element that meets specific criteria
     * @param {HTMLElement} e - Target element 
     * @param {Function} f - Is Correct Target Evaluation
     * @returns {HTMLElement} Parent Element
     */
    sctr.findParent = (e, f) => {
        let parent = e.parentElement;
        let i = 0;
        while(parent != undefined && !f(parent) && i < window['SECTORJS_MAX_FIND_PARENT_ITERATIONS'])
            (++i, parent = parent.parentElement)
        return parent;
    }

    /**
     * Find a parent element that has a specific class
     * @param {HTMLElement} e - Target Element 
     * @param {string} c - Class Name
     * @returns {HTMLElement} Parent Element
     */
    sctr.findParentByClass = (e, c) =>
        sctr.findParent(e, (x) => x.classList.contains(c));

    /**
     * Find a parent element that has a specific attribute
     * @param {HTMLElement} e - Target Element 
     * @param {string} c - Attribute name 
     * @param {string} v - Attribute value 
     * @returns {HTMLElement} Parent Element
     */
    sctr.findParentByAttribute = (e, c, v) =>
        sctr.findParent(e, (x) => sctr.attr(x, c) === v)

    /**
     * Find a parent 'n' iterations above
     * @param {HTMLElement} e - Target Element 
     * @param {Number} n - Number of parent elements to iterate over
     * @returns {HTMLElement} Parent Element
     */
    sctr.parentIterate = (e, n) => {
        for(let j = 0; e != undefined && j < n; e = e.parentElement, ++j);
        return e;
    }



    /* Sector Meta Functions */

    sctr.$addFunctionAlias = (e, n) =>
        sctr[n] = sctr[e], sctr[n];

    sctr.$changePrefix = (e) => {
        if(!window[e])
            window[e] = (console.log(`[SectorJS] Bound to prefix '${e}'`), window['SECTORJS_PREFIX'] = e, window['SECTORJS_UNBIND_OLD_PREFIX'] && (window[sectorPrefix] = undefined), sectorPrefix = e, sctr);
        else
            (console.error(`[SectorJS] Failed to bind prefix '${e}'. ${window['SECTORJS_UNBIND_OLD_PREFIX'] ? (`Rebinding to old prefix '${sectorPrefix}'`) : ''}`));
        return window[e];
    }

    let sectorPrefix = window['SECTORJS_PREFIX'];
    sctr.$changePrefix(sectorPrefix);
})();   

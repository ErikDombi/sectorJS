'{"version":"1.0.0"}'

// EXPIREMENTAL FEATURE FLAGS
const SECTORJS_DEARRAY_SINGLE_ELEMENT = true;

// CONFIG FLAGS
const SECTORJS_MAX_FIND_PARENT_ITERATIONS = 50;

/**
 * Find element by query string
 * @param {string} s - Selector
 * @param {HTMLElement} e - [Optional] Target Element (Defaults: document)
 * @param {Boolean} d - [Optional]Should dearray value (Default: true)
 */
_ = (s, e, d) => _.Dearray(_r = (e || document).querySelectorAll(s), d);

/**
 * Get all children and grandchildren of element
 * @param {*} e - Target element
 * @returns {Array<HTMLElement>} Array of Children / Grandchildren
 */
_.allChildren = (e) => _('*', e);

/**
 * Find Elements in Array that have a property with a specific value
 * @param {Array} e - Array to search
 * @param {string || function} p - Property Name or function to evaluate
 * @param {any} v - Desired property value
 * @param {boolean} d - Dearray return value
 */
_.byProperty = (e, p, v, d) => (e.nodeType && (e = e.children),
    _.Dearray($.grep(e, (m) => (typeof p === 'function' ? p(m) : m[p]) === v), d));

/**
 * Find Elements in Array that have a property which contains a value
 * @param {Array} e - Array to search
 * @param {string || function} p - Property Name or function to evaluate
 * @param {any} v - Desired property value
 * @param {boolean} d - [Optional] Dearray return value (Default: true)
 */
_.byPropertyContains = (e, p, v, d) => (e.nodeType && (e = e.children),
    _.Dearray($.grep(e, (m) => (typeof p === 'function' ? p(m) : m[p]).includes(v)), d));

/**
 * Convert an array to a single element if the array only has one element
 * @param {Array} e - Array of elements 
 * @param {Boolean} d - [Optional] Should dearray element (Default: true)
 * @returns {Array} Elements / Single Element
 */
_.Dearray = (e, d) => 
    (SECTORJS_DEARRAY_SINGLE_ELEMENT && e.length === 1 && (d || true)) ? e[0] : e;

_.toArray = (e) => 
    Array.from(e);

/**
 * Remove an element from an array
 * @param {Array} a - Array to remove element from
 * @param {Element} e - Element to remove
 * @returns {Array} Modified Array
 */
_.arrRemove = (a, e) => 
    (a = _.toArray(a), (f = (i = a.indexOf(e)) !== -1) && a.splice(i, 1), a);

/**
 * Get an element's attribute
 * @param {HTMLElement} e - Target Element
 * @param {string} a - Attribute Name
 * @param {string} b - [Optional] Secondary Attribute Name if First is undefined
 * @returns {string} Attribute Value
 */
_.attr = (e, a, b) => 
    e.getAttribute(a) || e.getAttribute(b);

/**
 * Find a parent element that meets specific criteria
 * @param {HTMLElement} e - Target element 
 * @param {Function} f - Is Correct Target Evaluation
 * @returns {HTMLElement} Parent Element
 */
_.findParent = (e, f) => {
    let parent = e.parentElement;
    let i = 0;
    while(parent != undefined && !f(parent) && i < SECTORJS_MAX_FIND_PARENT_ITERATIONS)
        (++i, parent = parent.parentElement)
    return parent;
}

/**
 * Find a parent element that has a specific class
 * @param {HTMLElement} e - Target Element 
 * @param {string} c - Class Name
 * @returns {HTMLElement} Parent Element
 */
_.findParentByClass = (e, c) =>
    _.findParent(e, (x) => x.classList.contains(c));

/**
 * Find a parent element that has a specific attribute
 * @param {HTMLElement} e - Target Element 
 * @param {string} c - Attribute name 
 * @param {string} v - Attribute value 
 * @returns {HTMLElement} Parent Element
 */
_.findParentByAttribute = (e, c, v) =>
    _.findParent(e, (x) => _.attr(x, c) === v)

/**
 * Find a parent 'n' iterations above
 * @param {HTMLElement} e - Target Element 
 * @param {Number} n - Number of parent elements to iterate over
 * @returns {HTMLElement} Parent Element
 */
_.parentIterate = (e, n) => {
    for(j = 0; e != undefined && j < n; e = e.parentElement, ++j);
    return e;
}

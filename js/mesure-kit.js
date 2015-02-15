
/** Simple function to perform rough timing of a function.

	@param destId
		Identifier of the element to be fille with duration output.
                This identifier also identify the test in a Bench object.
	@param fn
		Closure to evaluate in the loop
	@param nbLoop
		Number of iteration to perform. Default is 10.

	@return Duration of the run (user time)

 */
function chronoTime(destId, fn, nbLoop) 
{
	if ( !nbLoop ) { nbLoop = 10 }
  	var $dest = $('#'+destId);
  
  	$dest.html('...');
  	var beginTS  = new Date().getTime();
  
  	for ( var idx = 0 ; idx < nbLoop ; ++idx ) {
		fn();
  	}
  
  	var endTS = new Date().getTime();
  
  	var duration = endTS - beginTS;
  
  $dest.html(duration + ' ms');
  
  return duration;
};


// --------------------

/** Create a bench of tests.
 * 
 * @param {type} options
 * @returns {undefined}
 */
function Bench(options) {
    options = $.extend({}, options);
    
    // Track options
    this.nbLoop = options['nbLoop'] || 10; // Number of loop in a single run
    
    // Each run will be stored in this table in a map indexed by test id
    // this.runResult[ testId ] = [ durationRun1, durationRun2, ... ]
    this.runResult = { };
    
    this.registeredTest = { };
};

Bench.prototype.saveResult = function(id, duration) {
    var resultList = this.runResult[ id ] || [];
    resultList.push(duration);
};


/** Register a new test.
 * 
 * @param {string} id
 *  Identify both the test and a DOM element where the result shall be shown.
 *  
 * @param {function} setupFn
 *  A closure to run before the nbLoop's runs of the test
 *  
 * @param {function} bodyFn
 *  Closure implementing the test.
 *  
 * @param {function} cleanupFn
 *  A closure to call after all runs of the test.
 *  
 * @returns {int}
 *  Duration of the nbLoop runs in milliseconds.
 */
Bench.prototype.addTest = function(id, bodyFn, setupFn, cleanupFn) {
    this.registeredTest[ id ] = {
        setup: setupFn,
        body: bodyFn,
        cleanup: cleanupFn
    };
};



/* Run identified test an nbLoop times.
 * 
 * @param {string} id
 *  Identifier of the test (and also identifier of DOM element where run 
 *  result will be output.
 *  
 * @returns {Number}
 *  Duration of the test runs in milliseconds.
 */
Bench.prototype.runTest = function(id) {
    var theTest  = this.registeredTest[ id ];
    var duration = 0;
    
    if ( 'function' === typeof theTest.setup   ) { theTest.setup(); }
    if ( 'function' === typeof theTest.body    ) { 
        duration = chronoTime(id, theTest.body, this.nbLoop);
        this.saveResult(id, duration);
    }
    if ( 'function' === typeof theTest.cleanup ) { theTest.cleanup(); }
    
    return duration;
};



/** Run all the test registered using the addTest() method.
 * 
 * All tests will be run nbLoop times.
 * 
 * Timer results will be tracked in the object.
 * 
 * @returns {undefined}
 */
Bench.prototype.runAllTests = function() {
    for ( var testId in this.registeredTest ) {
        this.runTest(testId);
    }
};

/** Run a global bench of tests.
 * 
 * @param {int} nbRun
 *  Number of run for each tests. That mean each test will be run
 *  nbLoop * nbRun.
 *  All results will be tracked in the object.
 * 
 * @returns {undefined}
 * 
 */
Bench.prototype.runBench = function(nbRun) {
    for ( var runIdx = 0 ; runIdx < nbRun ; ++runId ) {
        this.runAllTests();
    }
};

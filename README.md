# jQuery vs JavaScript performances

*Summary:*
Few simple tests to highlight some performances differences between simple jQuery and JavaScript APIs.

This set of pages was intented to perform some basic performance tests on jQuery. 
The goal was to identify some possible source for performance bottleneck in some projects.

Current set of bench are covering three core features:

- [Test 1](./raw/master/each-or-loop.html)
    Differences between `each()` and native `for` loop.
- [Test 2](./raw/master/perf-proxy.html)
    The cost of `$.proxy()` compared to a much simplier JavaScript closure.
- [Test 3](./raw/master/perf-div-creation.html)
    The cost of DOM element creation in jQuery tool compared to 

This is clearly not a benchmark for jQuery. The idea is to find clue to select the proper API regarding the current implement context and constrains.

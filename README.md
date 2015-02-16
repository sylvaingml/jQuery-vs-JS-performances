# jQuery vs JavaScript performances

*Summary:*
Few simple tests to highlight some performances differences between simple jQuery and JavaScript APIs.

This set of pages was intended to perform some basic performance tests on jQuery. 
The goal was to identify some possible source for performance bottleneck in some projects.

Current set of bench are covering three core features:

- Differences between `each()` and native `for` loop.
- The cost of `$.proxy()` compared to a much simpler JavaScript closure.
- The cost of DOM element creation in jQuery tool compared to 

This is clearly not a benchmark for jQuery. The idea is to find clue to select the proper API regarding the current implement context and constrains.

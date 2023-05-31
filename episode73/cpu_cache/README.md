# Example for cache friendly programming

Episode: https://engineeringkiosk.dev/podcast/episode/73-cache-freundliches-programmieren-cpu-caches-ersetzungsstrategien-und-cache-invalidierung/

## Javascript

run the program `node index.js <mode>` to see the difference
when looping over a 2d array in different ways

`mode` can be `all`, `row` or `column`, default is `all`

## Use perf to measure the difference and see the cache misses

On linux you can use `perf` to measure the difference in cache misses
when looping over a 2d array in different ways:

`perf stat -e L1-dcache-loads,L1-dcache-load-misses,L1-dcache-stores node index.js row`

Output:
```
 Performance counter stats for 'node index.js row':

     5.242.356.688      L1-dcache-loads:u                                                     
       200.602.228      L1-dcache-load-misses:u          #    3,83% of all L1-dcache accesses 
   <not supported>      L1-dcache-stores:u                                                    

       1,759947559 seconds time elapsed

       1,423945000 seconds user
       0,405984000 seconds sys
```

Run the same command with different modes to compare the cache misses.

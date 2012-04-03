# GenIDMod.js
This is a Node.js library that generates a unique numeric ID. It uses 
the time in microseconds and a counter to cater for sub-millisecond 
accesses. These are joined to form a value that is passed back in json 
format.

It is similar in concept to Twitter's Snowflake project. Just a lot less 
code and more limitations. It cannot run on more than one server instance, 
but it can handle 4096 iterations within a single millisecond with 
rollover protection.

##Distributed mode
Unique instance ID (0-63) can be used.

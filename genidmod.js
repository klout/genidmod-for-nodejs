/* 
 GenIDMod.js
 --------
 This is a Node.js library that generates a unique numeric ID. It uses
 the time in microseconds and a counter to cater for sub-millisecond
 accesses. These are joined to form a value that is passed back in json
 format.

 It is similar in concept to Twitter's Snowflake project. Just a lot less
 code and more limitations. It cannot run on more than one server instance,
 but it can handle 256 iterations within a single millisecond with
 rollover protection.

 Unique instance ID (0-63) can be used.

 Licensed with the MIT license
 -----------------------------
 Copyright (c) 2011 Stephen Perelson

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

var genid = function (id) {
    this.m_count = 0;
    this.counter = 0;
    this.millisOld = 0;
    this.id = id;
}

genid.prototype.gen = function gen() {
    var protectRollover = false;
    // 01 Jan 2012 is the selected epoch. Use
    // 		Date.UTC(2012,0,1)
    var millis = new Date().getTime() - 1325376000000;

    if (this.millisOld == millis) {
        this.counter++;
        // Rollover protection
        if (this.counter == 255) {
            protectRollover = true;
            this.counter = 0;
            setTimeout(gen, 1);
        }
    } else {
        this.millisOld = millis;
        this.counter = 0;
    }

    if (protectRollover == false) {
        // this use 6-bit 64 instances and 8-bit 256 counter values
        millis = millis * Math.pow(2, 14);
        var id2 = this.id * Math.pow(2, 8);
        var uid = millis + id2 + this.counter;
        return uid;
    }
}

exports.genid = genid;

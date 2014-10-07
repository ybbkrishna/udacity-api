var https = require('https');
var get = require('../../src/utils').get;
var expect = require('chai').expect;
var Catalog = require('../../src/udacity').Catalog;

describe('Udacity API: Catalog Tests', function() {
    var cat = new Catalog();

    it('should be version v0', function() {
        expect(cat.version).to.equal('v0');
    });

    describe('Function: Catalog.prototype.all', function() {
        it('should return unfiltered data', function(done) {
            get(cat.info, undefined, function(err, data) {
                cat.all(function(err, data2) {
                    expect(data).to.eql(data2);
                    done();
                });
            });
        });

        it('should throw the correct error when the hostname is incorrect', function(done) {
            cat.info.hostname = 'x';
            cat.all(function(err, data) {
                expect(err.message).to.equal('getaddrinfo ENOTFOUND x');
                done();
            });
        });

        it('should throw the correct error when the path is incorrect', function(done) {
            cat.info.hostname = 'www.udacity.com';
            cat.info.path = '/public-api/v0/courses/oops';
            cat.all(function(err, data) {
                expect(err instanceof Error).to.equal(true);
                expect(err.message).to.equal('404 page not found');
                expect(data).to.be.undefined;
                done();
            });
        });
    });
    
    describe('Function: Catalog.prototype.get', function() {
        it('should return all data when no filter is passed in', function(done) {
            cat.info.path = '/public-api/v0/courses';
            get(cat.info, undefined, function(err, data) {
                cat.get(undefined, function(err2, data2) {
                    expect(err).to.be.undefined;
                    expect(err2).to.be.undefined;
                    expect(data).to.eql(data2);
                    done();
                });
            });
        });
        
        it('should return an array of arrays for the track course lists', function(done) {
            var filter = function(json) {
                var output = [];
                var t = json.tracks;
                for (var i in t) {
                    output.push(t[i].courses);
                }
                return output;
            };
            
            cat.get(filter, function(err, data) {
                expect(err).to.be.undefined;
                expect(data instanceof Array).to.equal(true);
                for (var i in data) {
                    expect(data[i] instanceof Array).to.equal(true);   
                }
                done();
            });
        });
    });
    
    describe('Function: Catalog.prototype.courses', function() {
        
    });
    
    describe('Function: Catalog.prototype.course', function() {
        
    });
    
    describe('Function: Catalog.prototype.tracks', function() {
        
    });
    
    describe('Function: Catalog.prototype.track', function() {
        it('should return one object with the correct keys', function(done) {
            cat.track('Data Science', function(err, data) {
                expect(err).to.be.undefined;
                expect(data).to.have.keys([
                    'courses',
                    'name',
                    'description'
                ]);
                expect(data.courses instanceof Array).to.equal(true);
                done();
            });
        });

        it('should throw an error when an invalid name is passed in', function(done) {
            cat.track('ABCDEFG', function(err, data) {
                expect(data).to.be.undefined;
                expect(err instanceof Error).to.equal(true);
                expect(err.message).to.equal('track "ABCDEFG" not found');
                done();
            });
        }); 
    });
    
    describe('Function: Catalog.prototype.instructors', function() {
        
    });
});
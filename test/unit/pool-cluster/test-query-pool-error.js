var assert = require('assert');
var common = require('../../common');

var cluster = common.createPoolCluster();
var server  = common.createFakeServer();

var poolConfig = common.getTestConfig({port: common.fakeServerPort});

server.listen(common.fakeServerPort, function (err) {
  assert.ifError(err);

  var pool = cluster.of('SLAVE*', 'ORDER');

  pool.query('SELECT 1', function (err, rows) {
    assert.ok(err, 'got error');
    assert.equal(err.code, 'POOL_NOEXIST');
    server.destroy();
  });
});

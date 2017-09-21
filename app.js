window.onload = function () {
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  }

  var abi = [{ "inputs": [], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "x", "type": "uint256" } ], "name": "Foobar", "type": "event" } ];
  var address = "0x90439224046d79b569cba4d282994b4c447c81fbabe366310216f41a7758d95a";
  var TestContract = web3.eth.contract(abi);
  var testInstance = TestContract.at(address);

  var foobarEvent = testInstance.Foobar(null, {fromBlock: 0, toBlock: 'latest'}, function (error, result) {
    if (error)
      console.error(error)
    else
      console.log("Got a foobar with " + result.args.x.toString());
  });
}

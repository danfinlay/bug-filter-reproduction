pragma solidity ^0.4.4;

contract Test {
    event Foobar(uint256 x);

    function Test() {
        Foobar(1);
        Foobar(2);
        Foobar(3);
    }
}
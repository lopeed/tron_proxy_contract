// MyProxy.sol
pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract MyProxy is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    address private _implementation;

    // Función para inicializar el contrato
    function initialize(address implementationAddress) public initializer {
        _implementation = implementationAddress;
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    // Función que retorna la dirección de la implementación
    function implementation() public view returns (address) {
        return _implementation;
    }

    // Función para realizar las actualizaciones
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    // Fallback function que delega todas las llamadas al contrato de implementación
    fallback() external payable {
        address impl = _implementation;
        require(impl != address(0), "Implementation address is not set");
        (bool success, ) = impl.delegatecall(msg.data);
        require(success, "Delegatecall failed");
    }

    receive() external payable {}
}

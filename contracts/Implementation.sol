// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Implementation is Initializable, ERC20Upgradeable, UUPSUpgradeable, OwnableUpgradeable {
    
    uint256 public value;

    // Inicialización del contrato
    function initialize(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint256 _value
    ) public initializer {
        __ERC20_init(name, symbol);
        _mint(_msgSender(), initialSupply);
        value = _value;
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    // Esta función autoriza quien puede actualizar el contrato
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    // Función para cambiar el valor
    function setValue(uint256 newValue) public {
        value = newValue;
    }
}

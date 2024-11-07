// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Implementation is Initializable, ERC20Upgradeable, UUPSUpgradeable, OwnableUpgradeable {
    
    // Inicialización del contrato
    function initialize(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) public initializer {
        __ERC20_init(name, symbol);
        _mint(_msgSender(), initialSupply);
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    // Esta función autoriza quien puede actualizar el contrato
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    // Función para mintear más tokens
    function addSupply(uint256 newSupply) public onlyOwner {
        _mint(_msgSender(), newSupply);
    }

    function burn(uint256 amount) public {
    _burn(msg.sender, amount);
    }
 
}

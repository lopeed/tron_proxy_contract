const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const Implementation = artifacts.require("Implementation");
const UUPSBox = artifacts.require("UUPSBox");

module.exports = async function (deployer, network, accounts) {
    // Desplegar la implementación del contrato de token
    const implementationInstance = await deployProxy(
        Implementation, 
        ['SimbadProxy', 'SPRXY', '100000000000000000000000',100], 
        { deployer, kind: 'uups' }
    );

    // Desplegar el proxy UUPS configurado para la implementación del contrato de token
    const proxyInstance = await deployProxy(
        UUPSBox, 
        [], 
        { deployer, kind: 'uups' }
    );

    // Ahora el contrato de token debería estar accesible a través del proxy
    console.log('Implementation contract deployed at:', implementationInstance.address);
    console.log('Proxy contract deployed at:', proxyInstance.address);
};

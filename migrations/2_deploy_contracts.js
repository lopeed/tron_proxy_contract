const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const Implementation = artifacts.require("Implementation");

module.exports = async function (deployer) {
  try {
    // Despliega el proxy e inicializa con los argumentos especificados
    const implementationInstance = await deployProxy(
      Implementation,
      ['SimbadProxy', 'SPRXY', '100000000000000000000000'], // Argumentos de la función `initialize`
      { deployer, kind: 'uups' }
    );

    console.log('Proxy contract deployed at:', implementationInstance.address);
  } catch (error) {
    console.error('Error during deployment:', error);
  }
};

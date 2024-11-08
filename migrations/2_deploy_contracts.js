const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const LopeedToken = artifacts.require('LopeedToken');

module.exports = async function (deployer) {
  try {
    // Despliega el proxy e inicializa con los argumentos especificados
    const implementationInstance = await deployProxy(
      LopeedToken,
      ['Lopeed', 'LPT'], // Argumentos de la función `initialize`
      { deployer, initializer: 'initialize', kind: 'uups' }
    );

    console.log('Proxy contract deployed at:', implementationInstance.address);
  } catch (error) {
    console.error('Error during deployment:', error);
  }
};

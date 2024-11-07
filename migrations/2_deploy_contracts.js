const Implementation = artifacts.require("Implementation");
const MyProxy = artifacts.require("MyProxy");

module.exports = async function (deployer, network, accounts) {
  // Desplegar el contrato de implementación (ERC20)
  const implementationInstance = await deployer.deploy(Implementation);
  console.log("Implementation contract deployed at:", implementationInstance.address);

  // Desplegar el contrato de proxy apuntando a la dirección de la implementación
  const proxyInstance = await deployer.deploy(MyProxy, implementationInstance.address);
  console.log("Proxy contract deployed at:", proxyInstance.address);

  // Inicializar el contrato de implementación a través del proxy
  const implementationAddress = await proxyInstance.implementation();
  const implementation = await Implementation.at(implementationAddress);

  // Llamamos a la función initialize del contrato de implementación a través del proxy
  await implementation.initialize("SimbadProxy", "SPRX", "100000000000000000000000"); // Pasando parámetros para la inicialización
  console.log("Contract initialized through proxy.");

  // Verificar el estado del contrato (nombre, símbolo y suministro total) a través del proxy
  const name = await proxyInstance.name();
  console.log("Token name:", name);

  const symbol = await proxyInstance.symbol();
  console.log("Token symbol:", symbol);

  const totalSupply = await proxyInstance.totalSupply();
  console.log("Total Supply:", totalSupply.toString());
};

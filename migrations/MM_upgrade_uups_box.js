const UUPSBox = artifacts.require("UUPSBox");
const UUPSBoxV2 = artifacts.require("UUPSBoxV2");

module.exports = async function (deployer) {
    try {
        // Despliega la primera versión del contrato (UUPSBox)
        await deployer.deploy(UUPSBox);
        const uupsBox = await UUPSBox.deployed();

        // Inicializa la primera versión del contrato
        await uupsBox.initialize();
        console.info("Initial UUPSBox deployed at", uupsBox.address);

        // Obtén el valor antes de actualizar
        let beforeValue = await uupsBox.getValue();
        console.info("Value before upgrade:", beforeValue.toNumber());

        // Despliega la segunda versión del contrato (UUPSBoxV2)
        await deployer.deploy(UUPSBoxV2);
        const uupsBoxV2 = await UUPSBoxV2.deployed();

        // Realiza la actualización de UUPSBox a UUPSBoxV2
        await uupsBox.upgradeTo(uupsBoxV2.address);
        console.info("UUPSBox upgraded to UUPSBoxV2 at", uupsBoxV2.address);

        // Interactúa con el contrato actualizado (UUPSBoxV2)
        let afterValue = await uupsBox.getValue();
        console.info("Value after upgrade:", afterValue.toNumber());

        // Usa las nuevas funciones de UUPSBoxV2
        await uupsBox.setValueV2(afterValue.toNumber() + 200);
        let newV2Value = await uupsBox.getValueV2();
        console.info("New ValueV2:", newV2Value.toNumber());
        
    } catch (error) {
        console.error("UUPS upgrade error:", error);
    }
};

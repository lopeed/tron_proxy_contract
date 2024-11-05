// migrations/MM_upgrade_uups_box.js
const TransparentUpgradeableProxy = artifacts.require(
    '@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol/TransparentUpgradeableProxy.json'
);
const Box = artifacts.require('UUPSBox');
const BoxV2 = artifacts.require('UUPSBoxV2');

module.exports = async function (deployer) {
    try {
        // Deploy the new BoxV2 implementation contract
        await deployer.deploy(BoxV2);

        // Upgrade proxy contract
        const proxyContract = await TransparentUpgradeableProxy.at(Box.address);
        await proxyContract.upgradeTo(BoxV2.address);
        console.info('Upgraded', Box.address);

        // Call proxy contract
        const box = await BoxV2.at(Box.address);
        const beforeValue = await box.value();
        console.info('Value before', beforeValue.toNumber());

        // Set new Value
        await box.setValue(beforeValue.toNumber() + 100);
        const afterValue = await box.value();
        console.info('Value after', afterValue.toNumber());

        // Read new V2 Value
        const beforeValueV2 = await box.valueV2();
        console.info('ValueV2 before', beforeValueV2.toNumber());

        // Set new V2 Value
        await box.setValueV2(beforeValueV2.toNumber() + 100);
        const afterValueV2 = await box.valueV2();
        console.info('ValueV2 after', afterValueV2.toNumber());
    } catch (error) {
        console.error('UUPS: upgrade box error', error);
    }
};
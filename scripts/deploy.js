const hre = require("hardhat");

async function main() {
   const upload = await hre.ethers.deployContract("Imageuploading");

  await upload.waitForDeployment();

  console.log(
    ` deployed to ${upload.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

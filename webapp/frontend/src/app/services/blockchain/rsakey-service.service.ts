import { Injectable } from '@angular/core';
import { ethers, Contract } from 'ethers';

@Injectable({
  providedIn: 'root',
})
export class RSAKeyService {
  private contractAddress = 'CONTRACT_ADDRESS'; // Replace with your contract address
  private abi = ['ABI_JSON_HERE']; // Replace with your contract ABI

  private provider: ethers.providers.JsonRpcProvider;
  private contract: Contract;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider('YOUR_INFURA_JSON_RPC_URL'); // Replace with your Infura URL or Ethereum node URL
    this.contract = new ethers.Contract(this.contractAddress, this.abi, this.provider);
  }

  async getRSAKey(walletAddress: string): Promise<string> {
    try {
      const rsaKey = await this.contract.rsaKeys(walletAddress);
      return rsaKey;
    } catch (error) {
      console.error('Error getting RSA key:', error);
      throw error;
    }
  }

  async updateRSAKey(rsaKey: string, privateKey: string): Promise<void> {
    try {
      const wallet = new ethers.Wallet(privateKey, this.provider);
      const contractWithSigner = this.contract.connect(wallet);

      const transaction = await contractWithSigner.updateRSAKey(rsaKey, {
        value: ethers.utils.parseEther('0.01'), // Replace with the desired fee in Ether
      });

      await transaction.wait();
      console.log('RSA key updated successfully');
    } catch (error) {
      console.error('Error updating RSA key:', error);
      throw error;
    }
  }
}

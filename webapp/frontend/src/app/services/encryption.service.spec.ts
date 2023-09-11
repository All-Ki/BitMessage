import { TestBed } from '@angular/core/testing';

import { EncryptionService } from './encryption.service';

describe('EncryptionService', () => {
  let service: EncryptionService;
  let wallet1: any;
  let wallet2: any;
  const pk1= "0x8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f"
  const pk2= "0x8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de2f"


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should generate RSA key pair from input string', async () => {
    const testSeed = '0x8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f'; // Replace with your test seed

    const result = await EncryptionService.generateRSAKeyPairFromPrivateKey(testSeed);

    expect(result.private_key).toBeDefined();
    expect(result.public_key).toBeDefined();

    // You might want to add more specific expectations about the key pair properties, if needed
  });

  it('should handle input string starting with "0x"', async () => {
    const testSeed = '0x8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f'; // Replace with your test seed starting with "0x"
    const expectedSeed = '0x8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f'; // Expected seed after removing "0x"

    const result = await EncryptionService.generateRSAKeyPairFromPrivateKey(testSeed);
    const result2 = await EncryptionService.generateRSAKeyPairFromPrivateKey(expectedSeed);

    expect(result.private_key).toEqual(result2.private_key);
    // Add assertions to check that the seed was correctly processed
    // You might need to access internal parts of the function or expose relevant properties/methods for testing
  });
  it("should encrypt and decrypt data", async () => {
    const data = "test data";
    wallet1 = await EncryptionService.generateRSAKeyPairFromPrivateKey(pk1);
    wallet2 = await EncryptionService.generateRSAKeyPairFromPrivateKey(pk2);
    const encrypted = await EncryptionService.encryptData(data, wallet1.public_key);
    const decrypted = await EncryptionService.decryptData(encrypted, wallet1.private_key);
    expect(decrypted).toEqual(data);
    const encrypted2 = await EncryptionService.encryptData(data, wallet2.public_key);
    const decrypted2 = await EncryptionService.decryptData(encrypted2, wallet2.private_key);
    expect(decrypted2).toEqual(data);
    const decrypted3 = await EncryptionService.decryptData(encrypted2, wallet1.private_key);
    expect(decrypted3).not.toEqual(data);
  })

})
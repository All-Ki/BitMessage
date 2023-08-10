import { TestBed } from '@angular/core/testing';

import { EncryptionService } from './encryption.service';

describe('EncryptionService', () => {
  let service: EncryptionService;
  let wallet1: any;
  let wallet2: any;
  const pk1= "0x8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f"
  const pk2= "0x8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de2f"
  beforeAll(async () => {


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should generate RSA key pair from input string', async () => {
    const testSeed = 'yourtestseed'; // Replace with your test seed

    const result = await EncryptionService.generateRSAKeyPairFromString(testSeed);

    expect(result.private_key).toBeDefined();
    expect(result.public_key).toBeDefined();

    // You might want to add more specific expectations about the key pair properties, if needed
  });

  it('should handle input string starting with "0x"', async () => {
    const testSeed = '0xyourtestseed'; // Replace with your test seed starting with "0x"
    const expectedSeed = 'yourtestseed'; // Expected seed after removing "0x"

    const result = await EncryptionService.generateRSAKeyPairFromString(testSeed);
    const result2 = await EncryptionService.generateRSAKeyPairFromString(expectedSeed);

    expect(result.private_key).toEqual(result2.private_key);
    // Add assertions to check that the seed was correctly processed
    // You might need to access internal parts of the function or expose relevant properties/methods for testing
  });

});
})
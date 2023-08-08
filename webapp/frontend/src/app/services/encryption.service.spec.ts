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
});

import { TestBed } from '@angular/core/testing';

import { FolderDocService } from './folder-doc.service';

describe('FolderDocService', () => {
  let service: FolderDocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FolderDocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
